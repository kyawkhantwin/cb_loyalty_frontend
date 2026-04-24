'use client';

import React, { useRef } from 'react';
import {
    Breadcrumbs,
    Button,
    Tabs
} from "@heroui/react";
import { Plus, Store, Users, DollarSign, Key } from "lucide-react";
import { MerchantDirectory, MerchantDirectoryHandle } from "./sections/MerchantDirectory";
import { StaffManagement } from "./sections/StaffManagement";
import { SettlementDashboard } from "./sections/SettlementDashboard";
import { TerminalKeys } from "./sections/TerminalKeys";

export const MerchantsPage = () => {
    const directoryRef = useRef<MerchantDirectoryHandle>(null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <Breadcrumbs>
                    <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
                    <Breadcrumbs.Item >Merchants</Breadcrumbs.Item>
                </Breadcrumbs>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-default-900">
                            Merchant Ecosystem
                        </h1>
                        <p className="text-default-500 text-lg">
                            Manage partner businesses, settlement nodes, and staff access.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        className="font-bold shadow-lg shadow-primary/20"
                        onPress={() => directoryRef.current?.openCreateModal()}
                    >
                        <Plus size={20} />
                        Add Merchant
                    </Button>
                </div>
            </div>

            <Tabs variant="underlined" className="w-full border-b border-divider">
                <Tabs.List className="gap-6 h-12">
                    <Tabs.Tab id="directory" textValue="Directory" className="flex items-center gap-2 px-1">
                        <Store size={18} />
                        <span>Merchant Registry</span>
                    </Tabs.Tab>
                    <Tabs.Tab id="staff" textValue="Staff" className="flex items-center gap-2 px-1">
                        <Users size={18} />
                        <span>Staff Accounts</span>
                    </Tabs.Tab>
                    <Tabs.Tab id="settlements" textValue="Settlements" className="flex items-center gap-2 px-1">
                        <DollarSign size={18} />
                        <span>Settlements</span>
                    </Tabs.Tab>
                    <Tabs.Tab id="keys" textValue="API Keys" className="flex items-center gap-2 px-1">
                        <Key size={18} />
                        <span>Terminal Keys</span>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel id="directory" className="py-8">
                    <MerchantDirectory ref={directoryRef} />
                </Tabs.Panel>
                
                <Tabs.Panel id="staff" className="py-8">
                    <StaffManagement />
                </Tabs.Panel>

                <Tabs.Panel id="settlements" className="py-8">
                    <SettlementDashboard />
                </Tabs.Panel>

                <Tabs.Panel id="keys" className="py-8">
                    <TerminalKeys />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};
