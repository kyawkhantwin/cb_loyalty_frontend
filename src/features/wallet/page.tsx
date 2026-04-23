'use client';

import React from 'react';
// V3 Consolidation: Import from the main package
import {
    Breadcrumbs,
    Button
} from "@heroui/react";
import { Plus } from "lucide-react";
import { TemplateCard } from "./components/TemplateCard";
import { WalletDistribution } from "./components/WalletDistribution";

export const WalletPage = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <Breadcrumbs

                >
                    <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
                    <Breadcrumbs.Item >Wallet Templates</Breadcrumbs.Item>
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
                    >
                        <Plus size={20} />
                        New Template
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <TemplateCard platform="Apple" />
                <TemplateCard platform="Google" />
                <TemplateCard platform="Samsung" />
            </div>

            <div className="mt-8">
                <WalletDistribution />
            </div>
        </div>
    );
};