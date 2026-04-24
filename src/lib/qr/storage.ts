import { promises as fs } from 'node:fs';
import path from 'node:path';

export type QrIssuedRecord = {
  tokenId: string;
  createdAt: string;
  expiresAt: string | null;
  data: Record<string, unknown>;
};

export type QrScanRecord = {
  tokenId: string;
  scannedAt: string;
  t?: string;
  cid?: string;
  uid?: string;
  member?: {
    level?: string;
    code?: string;
    name?: string;
  };
  merchantId?: string;
  merchantName?: string;
  merchantBranchId?: string;
  scannedByDeviceId?: string;
  ip: string | null;
  userAgent: string | null;
  referer: string | null;
};

const dataDir = path.join(process.cwd(), '.data');
const issuedPath = path.join(dataDir, 'qr-issued.jsonl');
const scansPath = path.join(dataDir, 'qr-scans.jsonl');

let writeLock: Promise<void> = Promise.resolve();

async function ensureDataDir(): Promise<void> {
  await fs.mkdir(dataDir, { recursive: true });
}

async function appendJsonl(filePath: string, record: unknown): Promise<void> {
  await ensureDataDir();
  const line = `${JSON.stringify(record)}\n`;
  await fs.appendFile(filePath, line, 'utf8');
}

async function readJsonl<T>(filePath: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    const lines = raw.split('\n').filter(Boolean);
    const records: T[] = [];
    for (const line of lines) {
      try {
        records.push(JSON.parse(line) as T);
      } catch {
        // ignore malformed lines
      }
    }
    return records;
  } catch (err) {
    if ((err as NodeJS.ErrnoException | null)?.code === 'ENOENT') return [];
    throw err;
  }
}

export async function logQrIssued(record: QrIssuedRecord): Promise<void> {
  writeLock = writeLock.then(() => appendJsonl(issuedPath, record));
  return writeLock;
}

export async function logQrScan(record: QrScanRecord): Promise<void> {
  writeLock = writeLock.then(() => appendJsonl(scansPath, record));
  return writeLock;
}

export async function readQrScans(options?: { limit?: number }): Promise<QrScanRecord[]> {
  const limit = Math.max(1, Math.min(5000, options?.limit ?? 200));
  const all = await readJsonl<QrScanRecord>(scansPath);
  return all.slice(-limit).reverse();
}
