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
import { Member, MemberTier } from '../types';

interface MemberFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Partial<Member>) => void;
    initialData?: Member;
    isLoading?: boolean;
}

export const MemberForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }: MemberFormProps) => {
    // Explicitly typing the state to Partial<Member>
    const [formData, setFormData] = useState<Partial<Member>>(
        initialData || { name: '', email: '', tier: 'Silver' as MemberTier }
    );

    // Fix TS2345: Handle selection with proper type casting
    const handleTierChange = (key: React.Key | null) => {
        if (key === null) return; // Or handle as needed

        setFormData((prev) => ({
            ...prev,
            tier: key as MemberTier // Cast the non-null Key to your specific type
        }));
    };

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose}>
            <Modal.Backdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <Modal.Container className="fixed inset-0 flex items-center justify-center p-4">
                <Modal.Dialog className="bg-background rounded-xl p-6 w-full max-w-md outline-none border border-divider">
                    <Modal.Header>
                        <Modal.Heading className="text-xl font-bold">
                            {initialData ? 'Edit Member' : 'New Member'}
                        </Modal.Heading>
                    </Modal.Header>

                    <Modal.Body className="flex flex-col gap-5 py-4">
                        {/* Fix TS2322 & TS7006 */}
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Name</Label>
                            <Input
                                variant="primary"
                                value={formData.name || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const val = e.target.value;
                                    setFormData(prev => ({ ...prev, name: val }));
                                }}
                            />
                        </div>

                        <Select
                            selectedKey={formData.tier}
                            onSelectionChange={handleTierChange}
                        >
                            <Label className="text-sm">Tier</Label>
                            <Select.Trigger className="flex justify-between border border-divider p-2 rounded-lg">
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
        </Modal>
    );
};