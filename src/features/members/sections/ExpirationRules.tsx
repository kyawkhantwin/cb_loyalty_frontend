'use client';

import React, { useState } from 'react';
import { Card, Select, Input, Button, Label, ListBox, Separator, Switch } from '@heroui/react';
import { CalendarClock, Save, AlertTriangle } from 'lucide-react';

export const ExpirationRules = () => {
    const [enabled, setEnabled] = useState(true);
    const [period, setPeriod] = useState('12');

    return (
        <Card className="p-6 border shadow-sm max-w-2xl">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-warning/10 text-warning rounded-lg">
                        <CalendarClock size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Point Expiration Logic</h2>
                        <p className="text-sm text-default-500">Configure rules for point "burn" and inactivity.</p>
                    </div>
                </div>
                <Switch isSelected={enabled} onValueChange={setEnabled} />
            </div>

            <Separator className="mb-6" />

            <div className={`space-y-6 ${!enabled ? 'opacity-50 pointer-events-none' : ''}`}>
                <div className="flex flex-col gap-2">
                    <Label className="font-bold">Expiration Policy</Label>
                    <Select selectedKey="rolling">
                        <Select.Trigger className="w-full border p-2 rounded-lg bg-background">
                            <Select.Value />
                        </Select.Trigger>
                        <Select.Popover className="bg-background border rounded-lg shadow-lg">
                            <ListBox>
                                <ListBox.Item id="rolling">Rolling (X months after earn)</ListBox.Item>
                                <ListBox.Item id="fixed">Fixed Date (e.g. End of Year)</ListBox.Item>
                                <ListBox.Item id="inactivity">Inactivity Based</ListBox.Item>
                            </ListBox>
                        </Select.Popover>
                    </Select>
                </div>

                <div className="flex items-center justify-between gap-12">
                    <div>
                        <h3 className="font-bold">Validity Period</h3>
                        <p className="text-sm text-default-400">Months before points expire.</p>
                    </div>
                    <div className="w-32">
                        <Input 
                            type="number" 
                            variant="primary" 
                            value={period} 
                            onChange={(e) => setPeriod(e.target.value)}
                            label="Months"
                        />
                    </div>
                </div>

                <Card className="p-4 bg-default-50 border-none">
                    <div className="flex gap-3">
                        <AlertTriangle className="text-warning flex-shrink-0" size={20} />
                        <p className="text-xs text-default-600">
                            Members will receive a push notification 30 days before their points are set to expire. 
                            This setting applies globally to all card templates.
                        </p>
                    </div>
                </Card>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-end">
                <Button variant="primary">
                    <Save size={18} />
                    Save Rules
                </Button>
            </div>
        </Card>
    );
};
