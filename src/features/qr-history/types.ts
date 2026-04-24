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

export type GetQrScansResponse =
  | { ok: true; scans: QrScanRecord[] }
  | { ok: false; error: string };
