'use client';

import React from 'react';
import { Card, Table, Button, Chip, Separator } from '@heroui/react';
import { Download, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';

const SETTLEMENTS = [
    { id: '1', merchant: 'Coffee House #12', date: '2024-04-20', redemptions: 450, amount: 2250, status: 'Paid' },
    { id: '2', merchant: 'Urban Outfitters', date: '2024-04-21', redemptions: 120, amount: 8400, status: 'Pending' },
    { id: '3', merchant: 'FitLife Gym', date: '2024-04-22', redemptions: 35, amount: 1750, status: 'Processing' },
];

const COLUMNS = [
    { name: "MERCHANT", uid: "merchant" },
    { name: "SETTLEMENT DATE", uid: "date" },
    { name: "REDEMPTIONS", uid: "redemptions" },
    { name: "TOTAL AMOUNT", uid: "amount" },
    { name: "STATUS", uid: "status" },
];

const StatCard = ({ title, value, sub, icon: Icon, color }: any) => (
    <Card className="p-6 border shadow-sm">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-default-500 font-medium mb-1">{title}</p>
                <h3 className="text-3xl font-bold">{value}</h3>
                <p className="text-xs text-default-400 mt-1">{sub}</p>
            </div>
            <div className={`p-3 rounded-xl bg-${color}/10 text-${color}`}>
                <Icon size={24} />
            </div>
        </div>
    </Card>
);

export const SettlementDashboard = () => {
    const renderCell = (item: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "merchant":
                return <span className="font-bold">{item.merchant}</span>;
            case "date":
                return <span>{item.date}</span>;
            case "redemptions":
                return <span>{item.redemptions}</span>;
            case "amount":
                return <span>${item.amount.toLocaleString()}</span>;
            case "status":
                return (
                    <Chip 
                        size="sm" 
                        variant={item.status === 'Paid' ? 'primary' : item.status === 'Pending' ? 'secondary' : 'default'}
                    >
                        {item.status}
                    </Chip>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard 
                    title="Total Redemptions" 
                    value="12,450" 
                    sub="+12% from last month" 
                    icon={TrendingUp} 
                    color="primary"
                />
                <StatCard 
                    title="Total Payouts" 
                    value="$45,200" 
                    sub="Next payout in 2 days" 
                    icon={DollarSign} 
                    color="success"
                />
                <StatCard 
                    title="Pending Settlements" 
                    value="$8,400" 
                    sub="2 merchants awaiting" 
                    icon={Wallet} 
                    color="warning"
                />
                <StatCard 
                    title="Redemption Value" 
                    value="$3.63" 
                    sub="Average per point" 
                    icon={TrendingDown} 
                    color="secondary"
                />
            </div>

            <Card className="p-6 border shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">Recent Settlements</h2>
                    <Button variant="ghost" size="sm">
                        <Download size={16} />
                        Export CSV
                    </Button>
                </div>

                <Table variant="primary">
                    <Table.ScrollContainer>
                        <Table.Content aria-label="Settlements Table">
                            <Table.Header columns={COLUMNS}>
                                {(column) => (
                                    <Table.Column id={column.uid} isRowHeader={column.uid === 'merchant'}>
                                        {column.name}
                                    </Table.Column>
                                )}
                            </Table.Header>
                            <Table.Body items={SETTLEMENTS}>
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
            </Card>
        </div>
    );
};
