'use client';

import React from 'react';
import { Table, Button, Chip, Avatar } from '@heroui/react';
import { Plus, Trash2, Mail, Shield } from 'lucide-react';

interface StaffMember {
    id: string;
    name: string;
    email: string;
    merchant: string;
    role: 'Admin' | 'Cashier' | 'Manager';
    status: 'Active' | 'Inactive';
}

const MOCK_STAFF: StaffMember[] = [
    { id: '1', name: 'Alice Johnson', email: 'alice@coffeehouse.com', merchant: 'Coffee House #12', role: 'Manager', status: 'Active' },
    { id: '2', name: 'Bob Smith', email: 'bob@coffeehouse.com', merchant: 'Coffee House #12', role: 'Cashier', status: 'Active' },
    { id: '3', name: 'Charlie Davis', email: 'charlie@fitlife.com', merchant: 'FitLife Gym', role: 'Cashier', status: 'Inactive' },
];

const COLUMNS = [
    { name: "STAFF MEMBER", uid: "staff" },
    { name: "MERCHANT", uid: "merchant" },
    { name: "ROLE", uid: "role" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export const StaffManagement = () => {
    const renderCell = (staff: StaffMember, columnKey: React.Key) => {
        switch (columnKey) {
            case "staff":
                return (
                    <div className="flex items-center gap-3">
                        <Avatar name={staff.name} size="sm" />
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">{staff.name}</span>
                            <span className="text-xs text-default-400">{staff.email}</span>
                        </div>
                    </div>
                );
            case "merchant":
                return <span className="text-sm">{staff.merchant}</span>;
            case "role":
                return (
                    <Chip size="sm" variant="secondary" className="gap-1">
                        <Shield size={12} />
                        {staff.role}
                    </Chip>
                );
            case "status":
                return (
                    <Chip 
                        size="sm" 
                        variant={staff.status === 'Active' ? 'primary' : 'default'}
                    >
                        {staff.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex gap-1">
                        <Button isIconOnly size="sm" variant="ghost"><Mail size={16} /></Button>
                        <Button isIconOnly size="sm" variant="ghost" className="text-danger"><Trash2 size={16} /></Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold">Staff Sub-Accounts</h2>
                    <p className="text-sm text-default-500">Manage cashier and manager access for merchant nodes.</p>
                </div>
                <Button variant="primary">
                    <Plus size={18} />
                    Invite Staff
                </Button>
            </div>

            <Table variant="primary" className="border shadow-sm">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Staff Management Table">
                        <Table.Header columns={COLUMNS}>
                            {(column) => (
                                <Table.Column id={column.uid} isRowHeader={column.uid === 'staff'}>
                                    {column.name}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body items={MOCK_STAFF}>
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
