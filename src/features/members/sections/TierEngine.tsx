'use client';

import React, { useState } from 'react';
import { Card, Input, Button, Label, Separator } from '@heroui/react';
import { Save, ShieldCheck } from 'lucide-react';

interface TierThresholds {
    silver: number;
    gold: number;
    platinum: number;
}

export const TierEngine = () => {
    const [thresholds, setThresholds] = useState<TierThresholds>({
        silver: 0,
        gold: 1000,
        platinum: 5000
    });

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => setIsSaving(false), 800);
    };

    return (
        <Card className="p-6 border shadow-sm max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-primary/10 text-primary rounded-lg">
                    <ShieldCheck size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-bold">Tier Threshold Engine</h2>
                    <p className="text-sm text-default-500">Define point requirements for member levels.</p>
                </div>
            </div>

            <Separator className="mb-6" />

            <div className="space-y-6">
                <div className="flex items-center justify-between gap-12">
                    <div>
                        <h3 className="font-bold text-lg">Silver Tier</h3>
                        <p className="text-sm text-default-400">Entry level for all new members.</p>
                    </div>
                    <div className="w-32">
                        <Input 
                            type="number" 
                            variant="primary" 
                            value={thresholds.silver.toString()} 
                            isDisabled
                            label="Min Points"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-12">
                    <div>
                        <h3 className="font-bold text-lg text-amber-600">Gold Tier</h3>
                        <p className="text-sm text-default-400">Premium benefits and rewards.</p>
                    </div>
                    <div className="w-32">
                        <Input 
                            type="number" 
                            variant="primary" 
                            value={thresholds.gold.toString()} 
                            onChange={(e) => setThresholds(prev => ({ ...prev, gold: parseInt(e.target.value) }))}
                            label="Min Points"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between gap-12">
                    <div>
                        <h3 className="font-bold text-lg text-indigo-600">Platinum Tier</h3>
                        <p className="text-sm text-default-400">Elite status with exclusive access.</p>
                    </div>
                    <div className="w-32">
                        <Input 
                            type="number" 
                            variant="primary" 
                            value={thresholds.platinum.toString()} 
                            onChange={(e) => setThresholds(prev => ({ ...prev, platinum: parseInt(e.target.value) }))}
                            label="Min Points"
                        />
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
                <Button 
                    variant="primary" 
                    onPress={handleSave}
                    isPending={isSaving}
                >
                    <Save size={18} />
                    Save Configuration
                </Button>
            </div>
        </Card>
    );
};
