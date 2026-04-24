'use client';

import React, { useState } from 'react';
import { Card, Button, Input, Select, Label, ListBox, Separator, Checkbox } from '@heroui/react';
import { Send, Bell, Eye, Target } from 'lucide-react';

export const PushNotificationComposer = () => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');
    const [isSending, setIsSending] = useState(false);

    const handleSend = () => {
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            setMessage('');
            setTitle('');
        }, 1200);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 border shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                        <Bell size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Push Notification Composer</h2>
                        <p className="text-sm text-default-500">Send real-time alerts to member lock-screens.</p>
                    </div>
                </div>

                <Separator className="mb-6" />

                <div className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <Label className="font-bold">Target Audience</Label>
                        <Select selectedKey="all">
                            <Select.Trigger className="w-full border p-2 rounded-lg bg-background">
                                <Select.Value />
                            </Select.Trigger>
                            <Select.Popover className="bg-background border rounded-lg shadow-lg">
                                <ListBox>
                                    <ListBox.Item id="all">All Card Holders</ListBox.Item>
                                    <ListBox.Item id="gold">Gold Tier Only</ListBox.Item>
                                    <ListBox.Item id="platinum">Platinum Tier Only</ListBox.Item>
                                    <ListBox.Item id="segment">Custom Segment...</ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="font-bold">Notification Title</Label>
                        <Input 
                            placeholder="e.g. Flash Sale!" 
                            variant="primary"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label className="font-bold">Message Content</Label>
                        <Input 
                            placeholder="Enter your message here..." 
                            variant="primary"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-4 p-4 bg-default-50 rounded-xl border border-default-200">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm">Vibrate Device</Label>
                            <Checkbox defaultSelected />
                        </div>
                        <div className="flex items-center justify-between">
                            <Label className="text-sm">Play Sound</Label>
                            <Checkbox defaultSelected />
                        </div>
                    </div>
                </div>

                <Separator className="my-6" />

                <div className="flex justify-end gap-3">
                    <Button variant="ghost">Save Draft</Button>
                    <Button 
                        variant="primary" 
                        onPress={handleSend}
                        isPending={isSending}
                    >
                        <Send size={18} />
                        Blast Notification
                    </Button>
                </div>
            </Card>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-default-500">
                    <Eye size={18} />
                    <span className="text-sm font-bold uppercase tracking-wider">Lock Screen Preview</span>
                </div>
                
                <div className="relative w-[320px] h-[600px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl p-4 overflow-hidden self-center lg:self-start">
                    {/* Phone Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl z-10"></div>
                    
                    {/* Wallpaper mock */}
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-500 to-purple-800 opacity-80"></div>
                    
                    {/* Time */}
                    <div className="relative z-10 flex flex-col items-center mt-12 text-white/90">
                        <span className="text-6xl font-light">12:45</span>
                        <span className="text-sm font-medium">Friday, April 24</span>
                    </div>

                    {/* Notification Toast */}
                    <div className="relative z-10 mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
                        {(title || message) && (
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-white shadow-lg">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                                        <Bell size={12} className="text-white" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase opacity-60">LoyaltyOS</span>
                                </div>
                                <h4 className="font-bold text-sm">{title || 'Notification Title'}</h4>
                                <p className="text-xs opacity-80 line-clamp-2">{message || 'Your notification message will appear here.'}</p>
                            </div>
                        )}
                    </div>

                    {/* Bottom bar */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/40 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};
