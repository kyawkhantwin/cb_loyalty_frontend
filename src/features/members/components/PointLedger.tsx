'use client';

import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/table';
import { Chip } from '@heroui/chip';
import { PointTransaction } from '../types';

const TRANSACTION_TYPE_COLOR: Record<PointTransaction['type'], "success" | "danger" | "warning"> = { Earned: "success", Burned: "danger", Adjusted: "warning" };

const TransactionTypeCell = ({ type }: { type: PointTransaction['type'] }) => <Chip color={TRANSACTION_TYPE_COLOR[type]} variant="flat" size="sm">{type}</Chip>;
const TransactionAmountCell = ({ amount, type }: { amount: number, type: PointTransaction['type'] }) => <div className={`font-bold ${type === 'Burned' ? 'text-danger' : 'text-success'}`}>{type === 'Burned' ? '' : '+'}{amount}</div>;
const TransactionDateCell = ({ date }: { date: string }) => <div className="text-default-400 text-xs">{new Date(date).toLocaleDateString()}</div>;

const RenderLedgerCell = ({ transaction, columnKey }: { transaction: PointTransaction, columnKey: React.Key }) => {
  if (columnKey === "type") return <TransactionTypeCell type={transaction.type} />;
  if (columnKey === "amount") return <TransactionAmountCell amount={transaction.amount} type={transaction.type} />;
  if (columnKey === "date") return <TransactionDateCell date={transaction.createdAt} />;
  return <div className="text-sm font-medium">{transaction.source}</div>;
};

export const PointLedger = ({ transactions }: { transactions: PointTransaction[] }) => (
  <Table aria-label="Transaction Ledger" removeWrapper className="bg-transparent">
    <TableHeader>
      <TableColumn key="date">DATE</TableColumn>
      <TableColumn key="source">SOURCE</TableColumn>
      <TableColumn key="type">TYPE</TableColumn>
      <TableColumn key="amount" align="end">AMOUNT</TableColumn>
    </TableHeader>
    <TableBody items={transactions} emptyContent="No transactions found">
      {(transaction) => (
        <TableRow key={transaction.id}>
          {(columnKey) => (
            <TableCell>
              <RenderLedgerCell transaction={transaction} columnKey={columnKey}/>
            </TableCell>
          )}
        </TableRow>
      )}
    </TableBody>
  </Table>
);
