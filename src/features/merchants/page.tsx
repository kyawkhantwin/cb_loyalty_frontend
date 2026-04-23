'use client';

import React from 'react';
import {
    Breadcrumbs,
    Button
} from "@heroui/react";
import { Plus } from "lucide-react";
import { MerchantCard } from "./components/MerchantCard";

const MERCHANTS = [
    { name: 'Coffee House #12', branches: 4, category: 'Food & Drink' },
    { name: 'Urban Outfitters', branches: 12, category: 'Retail' },
    { name: 'FitLife Gym', branches: 2, category: 'Health' },
];

export const MerchantsPage = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col gap-4">
            {/* V3 Breadcrumbs: uses BreadcrumbItem export directly */}
            <Breadcrumbs
            >
                <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
                <Breadcrumbs.Item >Merchants</Breadcrumbs.Item>
            </Breadcrumbs>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-default-900">
                        Merchant Registry
                    </h1>
                    <p className="text-default-500 text-lg">
                        Profiles for partner businesses and issuance nodes.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="font-bold shadow-lg shadow-primary/20"
                    onPress={() => console.log("Add Merchant")}
                >
                    <Plus size={20} />
                    Add Merchant
                </Button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {MERCHANTS.map((m) => (
                <MerchantCard key={m.name} {...m} />
            ))}
        </div>
    </div>
);