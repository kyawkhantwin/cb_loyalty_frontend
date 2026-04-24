'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Select, Label, ListBox, Chip, Separator } from '@heroui/react';
import { Plus, Trash2, Filter, Save } from 'lucide-react';

interface SegmentRule {
    id: string;
    field: string;
    operator: string;
    value: string;
}

export const SegmentBuilder = () => {
    const [rules, setRules] = useState<SegmentRule[]>([
        { id: '1', field: 'points', operator: 'greater_than', value: '1000' }
    ]);
    const [segmentName, setSegmentName] = useState('');

    const addRule = () => {
        setRules([...rules, { id: Math.random().toString(), field: 'status', operator: 'equals', value: 'Active' }]);
    };

    const removeRule = (id: string) => {
        setRules(rules.filter(r => r.id !== id));
    };

    return (
        <div className="space-y-6 max-w-4xl">
            <Card className="p-6 border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-secondary/10 text-secondary rounded-lg">
                        <Filter size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Dynamic Segment Builder</h2>
                        <p className="text-sm text-default-500">Create logic-based member groups for targeted campaigns.</p>
                    </div>
                </div>

                <div className="flex flex-col gap-4 mb-8">
                    <Label className="font-bold">Segment Name</Label>
                    <Input 
                        placeholder="e.g. High-Value Active Members" 
                        variant="primary"
                        value={segmentName}
                        onChange={(e) => setSegmentName(e.target.value)}
                    />
                </div>

                <Separator className="mb-6" />

                <div className="space-y-4">
                    <Label className="font-bold block mb-2">Rules Configuration</Label>
                    {rules.map((rule, index) => (
                        <div key={rule.id} className="flex items-end gap-3 p-4 bg-default-50 rounded-xl border border-default-200">
                            <div className="flex-1 space-y-2">
                                <Label className="text-xs">Field</Label>
                                <Select selectedKey={rule.field}>
                                    <Select.Trigger className="w-full border p-2 rounded-lg bg-background">
                                        <Select.Value />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-background border rounded-lg shadow-lg">
                                        <ListBox>
                                            <ListBox.Item id="points">Points Balance</ListBox.Item>
                                            <ListBox.Item id="tier">Member Tier</ListBox.Item>
                                            <ListBox.Item id="status">Status</ListBox.Item>
                                            <ListBox.Item id="joinedAt">Join Date</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-xs">Operator</Label>
                                <Select selectedKey={rule.operator}>
                                    <Select.Trigger className="w-full border p-2 rounded-lg bg-background">
                                        <Select.Value />
                                    </Select.Trigger>
                                    <Select.Popover className="bg-background border rounded-lg shadow-lg">
                                        <ListBox>
                                            <ListBox.Item id="greater_than">Greater Than</ListBox.Item>
                                            <ListBox.Item id="less_than">Less Than</ListBox.Item>
                                            <ListBox.Item id="equals">Equals</ListBox.Item>
                                            <ListBox.Item id="contains">Contains</ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <div className="flex-1 space-y-2">
                                <Label className="text-xs">Value</Label>
                                <Input 
                                    variant="primary" 
                                    value={rule.value} 
                                    onChange={(e) => {
                                        const newRules = [...rules];
                                        newRules[index].value = e.target.value;
                                        setRules(newRules);
                                    }}
                                />
                            </div>

                            <Button 
                                isIconOnly 
                                variant="ghost" 
                                className="text-danger"
                                onPress={() => removeRule(rule.id)}
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    ))}

                    <Button variant="ghost" className="w-full border-dashed" onPress={addRule}>
                        <Plus size={18} />
                        Add New Rule
                    </Button>
                </div>

                <Separator className="my-8" />

                <div className="flex justify-between items-center">
                    <div className="text-sm text-default-400">
                        <span className="font-bold text-default-600">Estimate:</span> ~1,240 members match these rules.
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost">Cancel</Button>
                        <Button variant="primary">
                            <Save size={18} />
                            Create Segment
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
