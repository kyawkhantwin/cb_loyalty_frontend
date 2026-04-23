'use client';

import {Button, Card, CardFooter, Chip} from "@heroui/react";
import { Smartphone, Apple, Edit3, Earth } from "lucide-react";

const PLATFORM_ICONS = { Apple: Apple, Google: Earth, Samsung: Smartphone };

const Header = ({ name }: { name: string }) => (
    <div className="flex justify-between items-start mb-6">
        <div className="p-3 border rounded-xl">
            <Smartphone size={24} />
        </div>
        <Chip variant="primary" size="sm">Active</Chip>
    </div>
);

export const TemplateCard = ({ platform }: { platform: 'Apple' | 'Google' | 'Samsung' }) => (
    <Card className="border h-[300px] shadow-sm hover:shadow-md transition-all group overflow-hidden">
        <Card.Content className="p-6 relative">
            {/*/!* Ghost background icon *!/*/}
            {/*<div className="absolute top-[-20%] right-[-10%] opacity-5 group-hover:scale-110 transition-transform duration-500">*/}
            {/*    <Smartphone size={200} />*/}
            {/*</div>*/}

            <Header name={platform} />

            <h3 className="text-2xl font-bold mb-1">{platform} Wallet</h3>
            <p className="text-sm opacity-60">Official {platform} Loyalty Pass</p>
        </Card.Content>

        <CardFooter className="border-t p-4 flex justify-between items-center">
            <span className="text-xs font-medium opacity-70">Last synced: 2h ago</span>
            <Button
                size="sm"
                variant="outline"
            >
                    <Edit3 size={14}/>
                Edit Template
            </Button>
        </CardFooter>
    </Card>
);