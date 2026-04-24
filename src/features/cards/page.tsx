'use client';

import React from 'react';
import { Breadcrumbs, Button, Popover, ListBox } from '@heroui/react';
import { Plus, Smartphone, Apple, Earth } from "lucide-react";
import { useRouter } from 'next/navigation';
import { NavigationRoutes } from "@/shared/NavItems";
import { IssuedCardList } from "./sections/IssuedCardList";

export function CardsPage() {
    const router = useRouter();
    
    const handlePlatformSelect = (platform: string) => {
        router.push(`${NavigationRoutes.cards.create}?platform=${platform}`);
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col gap-4">
                <Breadcrumbs>
                    <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
                    <Breadcrumbs.Item>Issued Cards</Breadcrumbs.Item>
                </Breadcrumbs>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight text-default-900">Card Inventory</h1>
                        <p className="text-default-500 text-lg">Manage individual issued passes and real-time balances.</p>
                    </div>
                    
                    <Popover>
                        <Popover.Trigger>
                            <Button variant="primary">
                                <Plus size={20} />
                                Issue New Card
                            </Button>
                        </Popover.Trigger>
                        <Popover.Content className="w-56">
                            <Popover.Dialog>
                                <Popover.Heading className="text-sm font-bold px-2 py-1 opacity-70 uppercase tracking-wider">Select Platform</Popover.Heading>
                                <ListBox className="outline-none" onAction={(key) => handlePlatformSelect(key as string)}>
                                    <ListBox.Item id="Apple" textValue="Apple Wallet" className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-default-100">
                                        <div className="flex items-center gap-2">
                                            <Apple size={18} />
                                            <span>Apple Wallet</span>
                                        </div>
                                    </ListBox.Item>
                                    <ListBox.Item id="Google" textValue="Google Pay" className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-default-100">
                                        <div className="flex items-center gap-2">
                                            <Earth size={18} />
                                            <span>Google Pay</span>
                                        </div>
                                    </ListBox.Item>
                                    <ListBox.Item id="Samsung" textValue="Samsung Wallet" className="flex items-center gap-2 p-2 rounded-lg cursor-pointer hover:bg-default-100">
                                        <div className="flex items-center gap-2">
                                            <Smartphone size={18} />
                                            <span>Samsung Wallet</span>
                                        </div>
                                    </ListBox.Item>
                                </ListBox>
                            </Popover.Dialog>
                        </Popover.Content>
                    </Popover>
                </div>
            </div>

            <IssuedCardList />
        </div>
    );
}
