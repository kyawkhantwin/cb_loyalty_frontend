'use client';

import React, { useRef } from 'react';
import {
    Breadcrumbs,
    Button,
    Tabs
} from "@heroui/react";
import { Plus, Smartphone, Bell, Share2 } from "lucide-react";
import { WalletDistribution } from "./components/WalletDistribution";
import { TemplateList, TemplateListHandle } from "./sections/TemplateList";
import { PushNotificationComposer } from "./sections/PushNotificationComposer";

export const WalletPage = () => {
    const listRef = useRef<TemplateListHandle>(null);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <Breadcrumbs>
                    <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
                    <Breadcrumbs.Item >Wallet System</Breadcrumbs.Item>
                </Breadcrumbs>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-default-900">
                            Wallet System
                        </h1>
                        <p className="text-default-500 text-lg">
                            Distribute and manage digital passes for mobile wallets.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        className="font-bold shadow-lg shadow-primary/20"
                        onPress={() => listRef.current?.openCreateModal()}
                    >
                        <Plus size={20} />
                        New Template
                    </Button>
                </div>
            </div>

            <Tabs variant="underlined" className="w-full border-b border-divider">
                <Tabs.List className="gap-6 h-12">
                    <Tabs.Tab id="templates" textValue="Templates" className="flex items-center gap-2 px-1">
                        <Smartphone size={18} />
                        <span>Wallet Templates</span>
                    </Tabs.Tab>
                    <Tabs.Tab id="notifications" textValue="Notifications" className="flex items-center gap-2 px-1">
                        <Bell size={18} />
                        <span>Push Composer</span>
                    </Tabs.Tab>
                    <Tabs.Tab id="distribution" textValue="Distribution" className="flex items-center gap-2 px-1">
                        <Share2 size={18} />
                        <span>Distribution Hub</span>
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel id="templates" className="py-8">
                    <TemplateList ref={listRef} />
                </Tabs.Panel>
                
                <Tabs.Panel id="notifications" className="py-8">
                    <PushNotificationComposer />
                </Tabs.Panel>

                <Tabs.Panel id="distribution" className="py-8">
                    <WalletDistribution />
                </Tabs.Panel>
            </Tabs>
        </div>
    );
};
