'use client';

import React, { useState } from 'react';
import {
    Modal,
    Button,
    Input,
    Select,
    Label,
    ListBox,
} from '@heroui/react';
import { WalletTemplate, WalletPlatform } from '../types';

interface TemplateDesignerProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Partial<WalletTemplate>) => void;
    initialData?: WalletTemplate;
    isLoading?: boolean;
}

export const TemplateDesigner = ({ isOpen, onClose, onSubmit, initialData, isLoading }: TemplateDesignerProps) => {
    const [formData, setFormData] = useState<Partial<WalletTemplate>>(
        initialData || { 
            name: '', 
            platform: 'Apple', 
            backgroundColor: '#000000', 
            foregroundColor: '#FFFFFF',
            description: '',
            status: 'Draft'
        }
    );

    const handlePlatformChange = (key: React.Key | null) => {
        if (key === null) return;
        setFormData((prev) => ({
            ...prev,
            platform: key as WalletPlatform
        }));
    };

    return (
        <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose} variant="blur">
            <Modal.Container placement="center">
                <Modal.Dialog className="bg-background rounded-xl p-6 w-full max-w-md outline-none border border-divider">
                    <Modal.Header>
                        <Modal.Heading className="text-xl font-bold">
                            {initialData ? 'Edit Template' : 'New Template'}
                        </Modal.Heading>
                    </Modal.Header>

                    <Modal.Body className="flex flex-col gap-5 py-4">
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Template Name</Label>
                            <Input
                                variant="primary"
                                value={formData.name || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFormData(prev => ({ ...prev, name: e.target.value }));
                                }}
                            />
                        </div>

                        <Select
                            selectedKey={formData.platform}
                            onSelectionChange={handlePlatformChange}
                        >
                            <Label className="text-sm">Platform</Label>
                            <Select.Trigger className="flex justify-between border border-divider p-2 rounded-lg">
                                <Select.Value />
                                <Select.Indicator />
                            </Select.Trigger>

                            <Select.Popover className="bg-background border border-divider rounded-lg shadow-lg">
                                <ListBox className="outline-none p-1">
                                    <ListBox.Item id="Apple" textValue="Apple" className="p-2 data-[focused]:bg-default-100">
                                        <Label>Apple Wallet</Label>
                                    </ListBox.Item>
                                    <ListBox.Item id="Google" textValue="Google" className="p-2 data-[focused]:bg-default-100">
                                        <Label>Google Pay</Label>
                                    </ListBox.Item>
                                    <ListBox.Item id="Samsung" textValue="Samsung" className="p-2 data-[focused]:bg-default-100">
                                        <Label>Samsung Wallet</Label>
                                    </ListBox.Item>
                                </ListBox>
                            </Select.Popover>
                        </Select>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm">Background</Label>
                                <Input
                                    type="color"
                                    variant="primary"
                                    value={formData.backgroundColor || '#000000'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFormData(prev => ({ ...prev, backgroundColor: e.target.value }));
                                    }}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label className="text-sm">Foreground</Label>
                                <Input
                                    type="color"
                                    variant="primary"
                                    value={formData.foregroundColor || '#FFFFFF'}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setFormData(prev => ({ ...prev, foregroundAt: e.target.value }));
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Description</Label>
                            <Input
                                variant="primary"
                                value={formData.description || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFormData(prev => ({ ...prev, description: e.target.value }));
                                }}
                            />
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="flex gap-2 justify-end mt-4">
                        <Button variant="ghost" onPress={onClose}>Cancel</Button>
                        <Button
                            variant="primary"
                            isPending={isLoading}
                            onPress={() => onSubmit(formData)}
                        >
                            Save Template
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    );
};
