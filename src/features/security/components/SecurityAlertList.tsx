'use client';

import React from 'react';
import {
    Table,
    Chip,
    // Removed cn if not used, but kept imports consolidated
} from "@heroui/react";
import { SecurityAlert, AlertSeverity } from '../types';

// V3 Update: Change "primary" to "accent"
const SEVERITY_COLOR: Record<AlertSeverity, "default" | "warning" | "danger" | "accent"> = {
    Low: "default",
    Medium: "warning",
    High: "danger",
    Critical: "danger"
};

const SeverityChip = ({ s }: { s: AlertSeverity }) => (
    <Chip
        color={SEVERITY_COLOR[s]}
        variant="primary"
        size="sm"
    >
        {s}
    </Chip>
);

const TimeLabel = ({ t }: { t: string }) => (
    <div className="text-xs text-default-400">
        {new Date(t).toLocaleTimeString()}
    </div>
);

export const SecurityAlertList = ({ alerts }: { alerts: SecurityAlert[] }) => {
    return (
        <Table
            aria-label="Security Alerts"
            variant="primary"
        >
            <Table.ScrollContainer>
                <Table.Content>
                    <Table.Header>
                        <Table.Column id="severity" width={100}>LEVEL</Table.Column>
                        <Table.Column id="description" isRowHeader>DESCRIPTION</Table.Column>
                        <Table.Column id="timestamp">TIME</Table.Column>
                    </Table.Header>

                    <Table.Body
                        items={alerts}
                        renderEmptyState={() => (
                            <div className="flex justify-center py-8 text-default-400 text-sm">
                                No active alerts
                            </div>
                        )}
                    >
                        {(item) => (
                            <Table.Row key={item.id}>
                                <Table.Cell>
                                    <SeverityChip s={item.severity} />
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="text-sm font-medium text-default-900">
                                        {item.description}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <TimeLabel t={item.timestamp} />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};