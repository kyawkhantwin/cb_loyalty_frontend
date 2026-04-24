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
import { Merchant, MerchantStatus } from '../types';

interface MerchantFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: Partial<Merchant>) => void;
    initialData?: Merchant;
    isLoading?: boolean;
}

export const MerchantForm = ({ isOpen, onClose, onSubmit, initialData, isLoading }: MerchantFormProps) => {
    const [formData, setFormData] = useState<Partial<Merchant>>(
        initialData || { name: '', category: '', branches: 1, status: 'Active' as MerchantStatus }
    );

    const handleStatusChange = (key: React.Key | null) => {
        if (key === null) return;
        setFormData((prev) => ({
            ...prev,
            status: key as MerchantStatus
        }));
    };

    return (
        <Modal.Backdrop isOpen={isOpen} onOpenChange={onClose} variant="blur">
            <Modal.Container placement="center">
                <Modal.Dialog className="bg-background rounded-xl p-6 w-full max-w-md outline-none border border-divider">
                    <Modal.Header>
                        <Modal.Heading className="text-xl font-bold">
                            {initialData ? 'Edit Merchant' : 'New Merchant'}
                        </Modal.Heading>
                    </Modal.Header>

                    <Modal.Body className="flex flex-col gap-5 py-4">
                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Merchant Name</Label>
                            <Input
                                variant="primary"
                                value={formData.name || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const val = e.target.value;
                                    setFormData(prev => ({ ...prev, name: val }));
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Category</Label>
                            <Input
                                variant="primary"
                                value={formData.category || ''}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const val = e.target.value;
                                    setFormData(prev => ({ ...prev, category: val }));
                                }}
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <Label className="text-sm">Branches</Label>
                            <Input
                                type="number"
                                variant="primary"
                                value={formData.branches?.toString() || '0'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const val = parseInt(e.target.value);
                                    setFormData(prev => ({ ...prev, branches: val }));
                                }}
                            />
                        </div>

                        <Select
                            selectedKey={formData.status}
                            onSelectionChange={handleStatusChange}
                        >
                            <Label className="text-sm">Status</Label>
                            <Select.Trigger className="flex justify-between border border-divider p-2 rounded-lg">
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
                                    <ListBox.Item id="Pending" textValue="Pending" className="p-2 data-[focused]:bg-default-100">
                                        <Label>Pending</Label>
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
        </Modal.Backdrop>
    );
};
