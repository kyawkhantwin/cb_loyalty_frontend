'use client';

import React, { useMemo, useState } from 'react';
import { Breadcrumbs, Button, Input, Spinner, Table, Chip } from '@heroui/react';
import { RefreshCw, Search } from 'lucide-react';
import { useGetQrScansQuery } from './api/useGetQrScansQuery';
import type { QrScanRecord } from './types';

const COLUMNS = [
  { name: 'SCANNED AT', uid: 'scannedAt' },
  { name: 'USER', uid: 'uid' },
  { name: 'CUSTOMER', uid: 'cid' },
  { name: 'MERCHANT', uid: 'merchant' },
  { name: 'TYPE', uid: 't' },
  { name: 'MEMBER', uid: 'member' },
  { name: 'IP', uid: 'ip' },
  { name: 'DEVICE', uid: 'userAgent' },
  { name: 'TOKEN', uid: 'tokenId' },
];

const EMPTY_SCANS: QrScanRecord[] = [];

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}

function rowText(scan: QrScanRecord): string {
  return [
    scan.scannedAt,
    scan.uid ?? '',
    scan.cid ?? '',
    scan.merchantName ?? '',
    scan.merchantId ?? '',
    scan.merchantBranchId ?? '',
    scan.t ?? '',
    scan.member?.level ?? '',
    scan.member?.code ?? '',
    scan.member?.name ?? '',
    scan.ip ?? '',
    scan.userAgent ?? '',
    scan.tokenId,
  ]
    .join(' ')
    .toLowerCase();
}

function renderCell(scan: QrScanRecord, columnKey: string) {
  switch (columnKey) {
    case 'scannedAt':
      return <span className="font-mono text-xs">{formatDateTime(scan.scannedAt)}</span>;
    case 'uid':
      return scan.uid ? <span className="font-semibold">{scan.uid}</span> : <span className="text-default-400">—</span>;
    case 'cid':
      return scan.cid ? <span className="font-mono text-xs">{scan.cid}</span> : <span className="text-default-400">—</span>;
    case 't':
      return scan.t ? <Chip size="sm" variant="primary">{scan.t}</Chip> : <span className="text-default-400">—</span>;
    case 'merchant': {
      const name = scan.merchantName;
      const id = scan.merchantId;
      const branch = scan.merchantBranchId;
      if (!name && !id && !branch) return <span className="text-default-400">—</span>;
      return (
        <div className="flex flex-col">
          {name ? <span className="text-sm font-medium">{name}</span> : null}
          {/*{id || branch ? (*/}
          {/*  <span className="text-xs text-default-500 font-mono">*/}
          {/*    {id ?? '—'}{branch ? ` / ${branch}` : ''}*/}
          {/*  </span>*/}
          {/*) : null}*/}
        </div>
      );
    }
    case 'member': {
      const level = scan.member?.level;
      const code = scan.member?.code;
      const name = scan.member?.name;
      if (!level && !code && !name) return <span className="text-default-400">—</span>;
      return (
        <div className="flex flex-col">
          {name ? <span className="text-sm font-medium">{name}</span> : null}
          {level ? <span className="text-sm font-medium">{level}</span> : null}
          {/*{code ? <span className="text-xs text-default-500 font-mono">{code}</span> : null}*/}
        </div>
      );
    }
    case 'ip':
      return scan.ip ? <span className="font-mono text-xs">{scan.ip}</span> : <span className="text-default-400">—</span>;
    case 'userAgent':
      return scan.userAgent ? (
        <span className="text-xs text-default-500 line-clamp-2 max-w-[420px]">{scan.userAgent}</span>
      ) : (
        <span className="text-default-400">—</span>
      );
    case 'tokenId':
      return <span className="font-mono text-xs">{scan.tokenId}</span>;
    default:
      return null;
  }
}

export const QrHistoryPage = () => {
  const [limit] = useState(500);
  const [filter, setFilter] = useState('');

  const query = useGetQrScansQuery(limit);
  const scans = query.data ?? EMPTY_SCANS;

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return scans;
    return scans.filter(s => rowText(s).includes(f));
  }, [filter, scans]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>QR Scan History</Breadcrumbs.Item>
        </Breadcrumbs>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-default-900">QR Scan History</h1>
            <p className="text-default-500 text-lg">Track who scanned which QR and when.</p>
          </div>

          <div className="flex gap-3 items-center w-full sm:w-auto">
            <div className="relative w-full sm:w-[320px]">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Search size={16} className="text-default-400" />
              </div>
              <Input
                fullWidth
                variant="primary"
                className="pl-10"
                placeholder="Search uid / cid / ip / token..."
                value={filter}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e.target.value)}
              />
            </div>
            <Button isDisabled={query.isFetching} onPress={() => query.refetch()} className="font-bold">
              <RefreshCw size={18} />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      <Table variant="primary" className="shadow-sm">
        <Table.ScrollContainer>
          <Table.Content aria-label="QR Scan History">
            <Table.Header columns={COLUMNS}>
              {(column) => (
                <Table.Column id={column.uid} isRowHeader={column.uid === 'uid'}>
                  {column.name}
                </Table.Column>
              )}
            </Table.Header>

            <Table.Body
              items={filtered}
              renderEmptyState={() => (
                <div className="flex justify-center p-10 text-default-400">
                  {query.isLoading ? <Spinner /> : query.isError ? 'Failed to load scan history' : 'No scans yet'}
                </div>
              )}
            >
              {(scan: QrScanRecord) => (
                <Table.Row id={`${scan.tokenId}-${scan.scannedAt}`}>
                  {COLUMNS.map(col => (
                    <Table.Cell key={col.uid}>{renderCell(scan, col.uid)}</Table.Cell>
                  ))}
                </Table.Row>
              )}
            </Table.Body>

            {query.isFetching && filtered.length > 0 && (
              <Table.LoadMore isLoading>
                <Table.LoadMoreContent>
                  <Spinner size="sm" />
                </Table.LoadMoreContent>
              </Table.LoadMore>
            )}
          </Table.Content>
        </Table.ScrollContainer>
      </Table>
    </div>
  );
};
