'use client';

import React, { useState, Key } from 'react';
import {
    Modal,
    Button,
    Input,
    Select,
    Label,
    ListBox,
} from '@heroui/react';
import { Member, MemberTier, MemberStatus } from '../types';

interface MemberFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Partial<Member>) => void;
    initialData?: Member;
    isLoading?: boolean;
}

export const MemberForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }: MemberFormProps) => {
    const [formData, setFormData] = useState<Partial<Member>>(
        initialData || { name: '', email: '', tier: 'Silver' as MemberTier, status: 'Active' as MemberStatus }
    );

    const handleTierChange = (key: React.Key | null) => {
        if (key === null) return;
        setFormData((prev) => ({
            ...prev,
            tier: key as MemberTier
        }));
    };

    const handleStatusChange = (key: React.Key | null) => {
        if (key === null) return;
        setFormData((prev) => ({
            ...prev,
            status: key as MemberStatus
        }));
    };

    return (
        <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose} variant="blur">
            <Modal.Container placement="center">
                <Modal.Dialog className="bg-background rounded-xl p-6 w-full max-w-md outline-none border border-divider">
                    <Modal.Header>
                        <Modal.Heading className="text-xl font-bold">
                            {initialData ? 'Edit Member' : 'New Member'}
                        </Modal.Heading>
                    </Modal.Header>

                    <Modal.Body className="flex flex-col gap-5 py-4">
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Name</Label>
                            <Input
                                variant="primary"
                                value={formData.name || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFormData(prev => ({ ...prev, name: e.target.value }));
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Email</Label>
                            <Input
                                variant="primary"
                                type="email"
                                value={formData.email || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setFormData(prev => ({ ...prev, email: e.target.value }));
                                }}
                            />
                        </div>

                        <div className="flex gap-4">
                            <div className="flex-1">
                                <Select
                                    selectedKey={formData.tier}
                                    onSelectionChange={handleTierChange}
                                >
                                    <Label className="text-sm">Tier</Label>
                                    <Select.Trigger className="flex justify-between border border-divider p-2 rounded-lg w-full">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover className="bg-background border border-divider rounded-lg shadow-lg">
                                        <ListBox className="outline-none p-1">
                                            <ListBox.Item id="Silver" textValue="Silver" className="p-2 data-[focused]:bg-default-100">
                                                <Label>Silver</Label>
                                            </ListBox.Item>
                                            <ListBox.Item id="Gold" textValue="Gold" className="p-2 data-[focused]:bg-default-100">
                                                <Label>Gold</Label>
                                            </ListBox.Item>
                                            <ListBox.Item id="Platinum" textValue="Platinum" className="p-2 data-[focused]:bg-default-100">
                                                <Label>Platinum</Label>
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <Select
                                    selectedKey={formData.status}
                                    onSelectionChange={handleStatusChange}
                                >
                                    <Label className="text-sm">Status</Label>
                                    <Select.Trigger className="flex justify-between border border-divider p-2 rounded-lg w-full">
                                        <Select.Value />
                                        <Select.Indicator />
                                    </Select.Trigger>

                                    <Select.Popover className="bg-background border border-divider rounded-lg shadow-lg">
                                        <ListBox className="outline-none p-1">
                                            <ListBox.Item id="Active" textValue="Active" className="p-2 data-[focused]:bg-default-100">
                                                <Label>Active</Label>
                                            </ListBox.Item>
                                            <ListBox.Item id="Inactive" textValue="Inactive" className="p-2 data-[focused]:bg-default-100">
                                                <Label>Inactive</Label>
                                            </ListBox.Item>
                                            <ListBox.Item id="Banned" textValue="Banned" className="p-2 data-[focused]:bg-default-100 text-danger">
                                                <Label>Banned</Label>
                                            </ListBox.Item>
                                        </ListBox>
                                    </Select.Popover>
                                </Select>
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer className="flex gap-2 justify-end mt-4">
                        <Button variant="ghost" onPress={onClose}>Cancel</Button>
                        <Button
                            variant="primary"
                            isPending={isLoading}
                            onPress={() => onSubmit(formData)}
                        >
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
    );
};
