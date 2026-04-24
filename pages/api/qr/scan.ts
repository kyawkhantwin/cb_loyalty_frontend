import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'node:crypto';
import { verifySignedQrToken } from '@/lib/qr/signing';
import { logQrScan } from '@/lib/qr/storage';

function getSigningSecret(): string {
  const secret = process.env.QR_SIGNING_SECRET;
  if (!secret) throw new Error('Missing QR_SIGNING_SECRET env var');
  return secret;
}

function signLoyaltyQrData(input: Record<string, unknown>, secret: string): string {
  const canonical = JSON.stringify(input);
  return crypto.createHmac('sha256', secret).update(canonical).digest('hex').slice(0, 12);
}

function getIp(req: NextApiRequest): string | null {
  const xff = req.headers['x-forwarded-for'];
  if (typeof xff === 'string') return xff.split(',')[0]?.trim() ?? null;
  return null;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const body = req.body && typeof req.body === 'object' ? (req.body as Record<string, unknown>) : null;
  const token = body && typeof body.token === 'string' ? body.token : null;
  if (!token) {
    return res.status(400).json({ ok: false, error: 'Missing token' });
  }

  let payload: { tokenId: string; data: Record<string, unknown> };
  try {
    const verified = verifySignedQrToken(token);
    payload = { tokenId: verified.tokenId, data: verified.data as Record<string, unknown> };
  } catch (err) {
    return res.status(401).json({ ok: false, error: err instanceof Error ? err.message : 'Invalid token' });
  }

  let secret: string;
  try {
    secret = getSigningSecret();
  } catch (err) {
    return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : 'Server misconfigured' });
  }

  const sig = typeof payload.data.sig === 'string' ? payload.data.sig : null;
  const unsigned: Record<string, unknown> = { ...payload.data };
  delete unsigned.sig;
  const expectedSig = signLoyaltyQrData(unsigned, secret);
  if (!sig || sig !== expectedSig) {
    return res.status(401).json({ ok: false, error: 'Invalid data signature' });
  }

  const t = typeof payload.data.t === 'string' ? payload.data.t : undefined;
  const cid = typeof payload.data.cid === 'string' ? payload.data.cid : undefined;
  const uid = typeof payload.data.uid === 'string' ? payload.data.uid : undefined;
  const memberRaw = payload.data.member;
  const member =
    memberRaw && typeof memberRaw === 'object'
      ? {
          level: typeof (memberRaw as { level?: unknown }).level === 'string' ? (memberRaw as { level: string }).level : undefined,
          code: typeof (memberRaw as { code?: unknown }).code === 'string' ? (memberRaw as { code: string }).code : undefined,
          name: typeof (memberRaw as { name?: unknown }).name === 'string' ? (memberRaw as { name: string }).name : undefined,
        }
      : undefined;

  const merchantId = body && typeof body.merchantId === 'string' ? body.merchantId : undefined;
  const merchantName = body && typeof body.merchantName === 'string' ? body.merchantName : undefined;
  const merchantBranchId = body && typeof body.merchantBranchId === 'string' ? body.merchantBranchId : undefined;
  const scannedByDeviceId = body && typeof body.scannedByDeviceId === 'string' ? body.scannedByDeviceId : undefined;

  await logQrScan({
    tokenId: payload.tokenId,
    scannedAt: new Date().toISOString(),
    t,
    cid,
    uid,
    member,
    merchantId,
    merchantName,
    merchantBranchId,
    scannedByDeviceId,
    ip: getIp(req),
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : null,
    referer: typeof req.headers.referer === 'string' ? req.headers.referer : null,
  });

  return res.status(200).json({ ok: true });
}
