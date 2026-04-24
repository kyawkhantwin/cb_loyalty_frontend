'use client';

import React, { useState, useEffect } from 'react';
import { Table, Button, Chip, Avatar, Spinner } from '@heroui/react';
import { ShieldOff, RefreshCcw, Smartphone, Apple, Earth } from 'lucide-react';
import { useGetIssuedCardsQuery } from '../api/useGetIssuedCardsQuery';
import { IssuedCard } from '../types';

const PLATFORM_ICONS = { 
    Apple: Apple, 
    Google: Earth, 
    Samsung: Smartphone 
};

const COLUMNS = [
    { name: "CARD ID", uid: "id" },
    { name: "MEMBER", uid: "member" },
    { name: "PLATFORM", uid: "platform" },
    { name: "BALANCE", uid: "balance" },
    { name: "STATUS", uid: "status" },
    { name: "ACTIONS", uid: "actions" },
];

export const IssuedCardList = () => {
    const { data: response, isLoading } = useGetIssuedCardsQuery();
    const cards = response?.data || [];

    if (isLoading) return <div className="flex justify-center p-12"><Spinner size="lg" /></div>;

    const renderCell = (card: IssuedCard, columnKey: React.Key) => {
        const Icon = PLATFORM_ICONS[card.platform] || Smartphone;
        
        switch (columnKey) {
            case "id":
                return <span className="font-mono text-xs">{card.id}</span>;
            case "member":
                return (
                    <div className="flex items-center gap-2">
                        <Avatar  size="sm" >
                            <Avatar.Fallback >
                                {card.memberName[0]}
                            </Avatar.Fallback>
                        </Avatar>
                        <span className="font-medium">{card.memberName}</span>
                    </div>
                );
            case "platform":
                return (
                    <div className="flex items-center gap-2">
                        <Icon size={16} />
                        <span>{card.platform}</span>
                    </div>
                );
            case "balance":
                return <span className="font-bold">{card.balance} pts</span>;
            case "status":
                return (
                    <Chip 
                        size="sm" 
                        variant={card.status === 'Active' ? 'primary' : 'secondary'}
                    >
                        {card.status}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="flex gap-2">
                        <Button isIconOnly size="sm" variant="ghost"><RefreshCcw size={16} /></Button>
                        <Button isIconOnly size="sm" variant="ghost" className="text-danger"><ShieldOff size={16} /></Button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Issued Loyalty Cards</h2>
            <Table variant="primary" className="border shadow-sm">
                <Table.ScrollContainer>
                    <Table.Content aria-label="Issued Cards Table">
                        <Table.Header columns={COLUMNS}>
                            {(column) => (
                                <Table.Column id={column.uid} isRowHeader={column.uid === 'id'}>
                                    {column.name}
                                </Table.Column>
                            )}
                        </Table.Header>
                        <Table.Body items={cards}>
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
