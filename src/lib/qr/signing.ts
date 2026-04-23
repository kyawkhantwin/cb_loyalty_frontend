import crypto from 'node:crypto';

export type SignedQrTokenPayload = {
  tokenId: string;
  createdAt: string;
  expiresAt: string | null;
  data: Record<string, unknown>;
};

function getSecret(): string {
  const secret = process.env.QR_SIGNING_SECRET;
  if (!secret) {
    throw new Error('Missing QR_SIGNING_SECRET env var');
  }
  return secret;
}

function base64UrlEncode(input: string | Buffer): string {
  const buffer = typeof input === 'string' ? Buffer.from(input, 'utf8') : input;
  return buffer
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replaceAll('=', '');
}

function base64UrlDecodeToString(input: string): string {
  const padded = input.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(input.length / 4) * 4, '=');
  return Buffer.from(padded, 'base64').toString('utf8');
}

function sign(data: string, secret: string): string {
  const digest = crypto.createHmac('sha256', secret).update(data).digest();
  return base64UrlEncode(digest);
}

export function createSignedQrToken(payload: SignedQrTokenPayload): string {
  const secret = getSecret();
  const body = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(body, secret);
  return `${body}.${signature}`;
}

export function verifySignedQrToken(token: string): SignedQrTokenPayload {
  const secret = getSecret();
  const [body, signature] = token.split('.');
  if (!body || !signature) {
    throw new Error('Invalid token format');
  }

  const expected = sign(body, secret);
  const a = Buffer.from(expected, 'utf8');
  const b = Buffer.from(signature, 'utf8');
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    throw new Error('Invalid token signature');
  }

  const parsed = JSON.parse(base64UrlDecodeToString(body)) as SignedQrTokenPayload;
  if (!parsed?.tokenId || !parsed.createdAt || !('data' in parsed)) {
    throw new Error('Invalid token payload');
  }

  if (parsed.expiresAt) {
    const expires = Date.parse(parsed.expiresAt);
    if (!Number.isFinite(expires)) {
      throw new Error('Invalid expiresAt');
    }
    if (Date.now() > expires) {
      throw new Error('Token expired');
    }
  }

  return parsed;
}

export function newTokenId(): string {
  return crypto.randomUUID();
}

