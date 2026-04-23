import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'node:crypto';
import { createSignedQrToken, newTokenId } from '@/lib/qr/signing';
import { logQrIssued } from '@/lib/qr/storage';
import QRCode from 'qrcode';

type LoyaltyQrData = {
  t: string;
  cid: string;
  uid: string;
  member?: {
    level?: string;
    code?: string;
  };
  exp?: string;
  sig?: string;
};

type GenerateRequestBody = {
  data?: LoyaltyQrData;
  expiresInSeconds?: number | null;
};

function getSigningSecret(): string {
  const secret = process.env.QR_SIGNING_SECRET;
  if (!secret) throw new Error('Missing QR_SIGNING_SECRET env var');
  return secret;
}

function signLoyaltyQrData(input: Omit<LoyaltyQrData, 'sig'>, secret: string): string {
  const canonical = JSON.stringify(input);
  return crypto.createHmac('sha256', secret).update(canonical).digest('hex').slice(0, 12);
}

function defaultExpYyyyMmDdFromIso(expiresAtIso: string | null): string | undefined {
  if (!expiresAtIso) return undefined;
  const date = new Date(expiresAtIso);
  const yyyy = String(date.getUTCFullYear());
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(date.getUTCDate()).padStart(2, '0');
  return `${yyyy}${mm}${dd}`;
}

function getOriginFromRequest(req: NextApiRequest): string {
  const proto = (req.headers['x-forwarded-proto'] as string | undefined)?.split(',')[0]?.trim() || 'http';
  const host =
    (req.headers['x-forwarded-host'] as string | undefined)?.split(',')[0]?.trim() ||
    (req.headers.host ? req.headers.host : 'localhost:3000');
  return `${proto}://${host}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  let body: GenerateRequestBody = {};
  if (req.body && typeof req.body === 'object') {
    body = req.body as GenerateRequestBody;
  }

  const data = body.data;
  if (!data?.t || !data?.cid || !data?.uid) {
    return res.status(400).json({ ok: false, error: 'Missing required fields: data.t, data.cid, data.uid' });
  }

  let secret: string;
  try {
    secret = getSigningSecret();
  } catch (err) {
    return res.status(500).json({ ok: false, error: err instanceof Error ? err.message : 'Server misconfigured' });
  }

  const tokenId = newTokenId();
  const createdAt = new Date().toISOString();
  const expiresInSeconds = body.expiresInSeconds ?? 60 * 60 * 24;
  const expiresAt =
    expiresInSeconds === null ? null : new Date(Date.now() + Math.max(1, expiresInSeconds) * 1000).toISOString();

  const exp = data.exp ?? defaultExpYyyyMmDdFromIso(expiresAt);
  const unsigned: Omit<LoyaltyQrData, 'sig'> = {
    t: data.t,
    cid: data.cid,
    uid: data.uid,
    member: data.member,
    exp,
  };
  const sig = data.sig ?? signLoyaltyQrData(unsigned, secret);
  const signedData: LoyaltyQrData = { ...unsigned, sig };

  const token = createSignedQrToken({ tokenId, createdAt, expiresAt, data: signedData });
  const scanUrl = encodeURIComponent(token)

  await logQrIssued({ tokenId, createdAt, expiresAt, data: signedData as unknown as Record<string, unknown> });

  let qrSvg: string | null = null;
  try {
    qrSvg = await QRCode.toString(scanUrl, { type: 'svg', margin: 2, width: 256, errorCorrectionLevel: 'M' });
  } catch {
    qrSvg = null;
  }

  return res.status(200).json({
    ok: true,
    tokenId,
    token,
    scanUrl,
    data: signedData,
    qrSvg,
  });
}
