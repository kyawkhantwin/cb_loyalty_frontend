'use client';

import React from 'react';
import {
    Chip,
    Tooltip,
    Button,
    TooltipTrigger,
    Avatar
} from '@heroui/react';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { Member, MemberTier, MemberStatus } from '../types';


const TIER_COLOR_MAP: Record<MemberTier, "warning" | "default" | "accent"> = {
    Silver: "default",
    Gold: "warning",
    Platinum: "accent"
};

const STATUS_COLOR_MAP: Record<MemberStatus, "success" | "danger" | "warning"> = {
    Active: "success",
    Banned: "danger",
    Inactive: "warning"
};

/**
 * 2. Strategy Definitions (Open for Extension)
 */
const columnStrategies: Record<string, (member: Member, onAction: (key: string) => void) => React.ReactNode> = {
    name: (member) => (
        <div className="flex items-center gap-3">
            {/* Manual Composition replacing the removed User component */}
            <Avatar size="md" className="rounded-lg border border-divider">
                <Avatar.Image src={member.avatar} alt={member.name} />
                <Avatar.Fallback delayMs={600}>
                    {member.name.charAt(0)}
                </Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col overflow-hidden">
                <span className="truncate text-sm font-semibold text-default-900">
                    {member.name}
                </span>
                <span className="truncate text-xs text-default-500">
                    {member.email}
                </span>
            </div>
        </div>
    ),
    points: (member) => (
        <div className="font-bold text-primary">{member.points.toLocaleString()} pts</div>
    ),
    tier: (member) => (
        <Chip color={TIER_COLOR_MAP[member.tier]} variant="soft" size="sm">
            {member.tier}
        </Chip>
    ),
    status: (member) => (
        <Chip color={STATUS_COLOR_MAP[member.status]} variant="tertiary" size="sm">
            <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-current" />
            {member.status}
        </Chip>
    ),
    actions: (_, onAction) => (
        <div className="flex gap-2">
            <Tooltip>
                <TooltipTrigger>
                    <Button variant="ghost" isIconOnly size="sm" onPress={() => onAction('adjust')}>
                        <Edit size={18} className="text-default-400" />
                    </Button>
                </TooltipTrigger>
                <Tooltip.Content className="bg-background border border-divider p-2 rounded-md shadow-md text-xs">
                    Adjust Points
                </Tooltip.Content>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button variant="ghost" isIconOnly size="sm" onPress={() => onAction('edit')}>
                        <Eye size={18} className="text-default-400" />
                    </Button>
                </TooltipTrigger>
                <Tooltip.Content className="bg-background border border-divider p-2 rounded-md shadow-md text-xs">
                    Edit Member
                </Tooltip.Content>
            </Tooltip>

            <Tooltip>
                <TooltipTrigger>
                    <Button variant="danger" isIconOnly size="sm" onPress={() => onAction('delete')}>
                        <Trash2 size={18} />
                    </Button>
                </TooltipTrigger>
                <Tooltip.Content className="bg-background border border-divider p-2 rounded-md shadow-md text-xs">
                    Delete Member
                </Tooltip.Content>
            </Tooltip>
        </div>
    )
};


export const MemberTableCell = ({
                                    member,
                                    columnKey,
                                    onAction
                                }: {
    member: Member,
    columnKey: React.Key,
    onAction: (actionKey: string) => void
}) => {
    // Strategy Pattern: O(1) lookup, extremely extensible.
    const renderCell = columnStrategies[columnKey as string];
    return renderCell ? renderCell(member, onAction) : null;
};