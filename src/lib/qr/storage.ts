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

export async function logQrIssued(record: QrIssuedRecord): Promise<void> {
  writeLock = writeLock.then(() => appendJsonl(issuedPath, record));
  return writeLock;
}

export async function logQrScan(record: QrScanRecord): Promise<void> {
  writeLock = writeLock.then(() => appendJsonl(scansPath, record));
  return writeLock;
}

