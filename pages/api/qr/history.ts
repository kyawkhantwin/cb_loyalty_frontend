import type { NextApiRequest, NextApiResponse } from 'next';
import { readQrScans } from '@/lib/qr/storage';

type HistoryResponse =
  | { ok: true; scans: Awaited<ReturnType<typeof readQrScans>> }
  | { ok: false; error: string };

function parseLimit(value: unknown): number | undefined {
  if (typeof value !== 'string') return undefined;
  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) return undefined;
  return parsed;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<HistoryResponse>) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const limit = parseLimit(req.query.limit);
  const scans = await readQrScans({ limit });
  return res.status(200).json({ ok: true, scans });
}

