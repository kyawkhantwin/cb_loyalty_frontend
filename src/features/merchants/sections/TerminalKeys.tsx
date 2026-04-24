'use client';

import React from 'react';
import { Card, Button, Table, Chip, Tooltip } from '@heroui/react';
import { Key, Copy, RefreshCw, QrCode, ShieldAlert } from 'lucide-react';

const KEYS = [
    { id: '1', merchant: 'Coffee House #12', key: 'pk_live_458...x8z', type: 'Static QR', status: 'Active' },
    { id: '2', merchant: 'Urban Outfitters', key: 'pk_live_921...m3p', type: 'API Key', status: 'Active' },
    { id: '3', merchant: 'FitLife Gym', key: 'pk_live_102...a9q', type: 'Static QR', status: 'Revoked' },
];

const COLUMNS = [
    { name: "MERCHANT / NODE", uid: "merchant" },
    { name: "ACCESS KEY", uid: "key" },
    { name: "TYPE", uid: "type" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export const TerminalKeys = () => {
    const renderCell = (item: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "merchant":
                return <span className="font-medium">{item.merchant}</span>;
            case "key":
                return (
                    <div className="flex items-center gap-2">
                        <code className="bg-default-100 px-2 py-1 rounded text-xs">{item.key}</code>
                        <Button isIconOnly size="sm" variant="ghost"><Copy size={14} /></Button>
                    </div>
                );
            case "type":
                return (
                    <Chip size="sm" variant="secondary" className="gap-1">
                        {item.type === 'Static QR' ? <QrCode size={12} /> : <Key size={12} />}
                        {item.type}
                    </Chip>
                );
            case "status":
                return (
                    <Chip 
                        size="sm" 
                        variant={item.status === 'Active' ? 'primary' : 'default'}
                    >
                        {item.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex gap-2">
                        <Tooltip content="Regenerate Key">
                            <Button isIconOnly size="sm" variant="ghost"><RefreshCw size={16} /></Button>
                        </Tooltip>
                        <Button isIconOnly size="sm" variant="ghost" className="text-danger">Revoke</Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <Card className="p-6 border shadow-sm bg-danger/5 border-danger/20">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-danger/10 text-danger rounded-xl">
                        <ShieldAlert size={28} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-danger-900">Security Warning</h2>
                        <p className="text-sm text-danger-700">API keys provide direct access to issuance nodes. Never share them or commit to frontend code.</p>
                    </div>
                </div>
            </Card>

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Terminal Access Keys</h2>
                    <p className="text-default-500">Manage credentials for physical point-of-sale integration.</p>
                </div>
                <Button variant="primary">
                    <Key size={18} />
                    Generate New Key
                </Button>
            </div>

            <Table variant="primary" className="border shadow-sm">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Terminal Keys Table">
                        <Table.Header columns={COLUMNS}>
                            {(column) => (
                                <Table.Column id={column.uid} isRowHeader={column.uid === 'merchant'}>
                                    {column.name}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body items={KEYS}>
                            {(item) => (
                                <Table.Row id={item.id}>
                                    {COLUMNS.map((col) => (
                                        <Table.Cell key={col.uid}>
                                            {renderCell(item, col.uid)}
                                        </Table.Cell>
                                    ))}
                                </Table.Row>
                            )}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
};
