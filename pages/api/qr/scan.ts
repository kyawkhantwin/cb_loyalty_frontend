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
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const tokenFromBody =
    req.body && typeof req.body === 'object' && typeof (req.body as { token?: unknown }).token === 'string'
      ? ((req.body as { token: string }).token as string)
      : null;

  const token =  tokenFromBody;
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

  await logQrScan({
    tokenId: payload.tokenId,
    scannedAt: new Date().toISOString(),
    ip: getIp(req),
    userAgent: typeof req.headers['user-agent'] === 'string' ? req.headers['user-agent'] : null,
    referer: typeof req.headers.referer === 'string' ? req.headers.referer : null,
  });

  return res.status(200).json({ ok: true, tokenId: payload.tokenId, data: payload.data });
}

