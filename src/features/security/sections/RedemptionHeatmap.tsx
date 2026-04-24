'use client';

import React from 'react';
import { Card, Chip, Table } from '@heroui/react';
import { Map, MapPin, Activity } from 'lucide-react';

const TOP_LOCATIONS = [
    { id: '1', city: 'New York, NY', redemptions: '4,250', intensity: 'High' },
    { id: '2', city: 'London, UK', redemptions: '3,800', intensity: 'High' },
    { id: '3', city: 'San Francisco, CA', redemptions: '1,920', intensity: 'Medium' },
    { id: '4', city: 'Tokyo, JP', redemptions: '1,450', intensity: 'Medium' },
];

const COLUMNS = [
    { name: "LOCATION", uid: "city" },
    { name: "REDEMPTIONS", uid: "redemptions" },
    { name: "INTENSITY", uid: "intensity" },
];

export const RedemptionHeatmap = () => {
    const renderCell = (item: any, columnKey: React.Key) => {
        switch (columnKey) {
            case "city":
                return (
                    <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-default-400" />
                        <span className="text-sm font-medium">{item.city}</span>
                    </div>
                );
            case "redemptions":
                return <span className="font-bold">{item.redemptions}</span>;
            case "intensity":
                return (
                    <Chip 
                        size="sm" 
                        variant={item.intensity === 'High' ? 'primary' : 'secondary'}
                    >
                        {item.intensity}
                    </Chip>
                );
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 border shadow-sm relative overflow-hidden h-[500px]">
                <div className="flex items-center gap-3 mb-6 relative z-10">
                    <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                        <Map size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Global Redemption Heatmap</h2>
                        <p className="text-sm text-default-500">Geospatial activity of point burn events.</p>
                    </div>
                </div>

                {/* Mock Map View */}
                <div className="absolute inset-0 top-24 bg-default-100 flex items-center justify-center">
                    <div className="relative w-full h-full bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1000')] bg-cover opacity-40 mix-blend-multiply"></div>
                    
                    {/* Pulsing Heat points */}
                    <div className="absolute top-1/4 left-1/3 w-12 h-12 bg-primary/40 rounded-full animate-ping"></div>
                    <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-primary rounded-full shadow-lg"></div>

                    <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-secondary/40 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-secondary rounded-full shadow-lg"></div>

                    <div className="absolute bottom-1/3 right-1/4 w-10 h-10 bg-primary/40 rounded-full animate-ping"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary rounded-full shadow-lg"></div>
                </div>
            </Card>

            <div className="space-y-6">
                <Card className="p-6 border shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-lg">High Activity Nodes</h3>
                        <Activity className="text-default-400" size={20} />
                    </div>

                    <Table variant="primary">
                        <Table.ScrollContainer>
                            <Table.Content aria-label="Heatmap Table">
                                <Table.Header columns={COLUMNS}>
                                    {(column) => (
                                        <Table.Column id={column.uid} isRowHeader={column.uid === 'city'}>
                                            {column.name}
                                        </Table.Column>
                                    )}
                                </Table.Header>
                                <Table.Body items={TOP_LOCATIONS}>
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

                <Card className="p-6 border shadow-sm bg-primary text-primary-foreground">
                    <h4 className="font-bold mb-2">Insight</h4>
                    <p className="text-sm opacity-90 leading-relaxed">
                        Activity in NYC has increased by 24% this week. We recommend activating a "Coffee House" localized campaign for Manhattan members.
                    </p>
                </Card>
            </div>
        </div>
    );
};
