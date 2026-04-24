'use client';

import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Spinner } from '@heroui/react';
import { Merchant } from '../types';
import { MerchantCard } from '../components/MerchantCard';
import { MerchantForm } from '../components/MerchantForm';
import { useGetMerchantsQuery } from '../api/useGetMerchantsQuery';
import { useCreateMerchantMutation } from '../api/useCreateMerchantMutation';
import { useUpdateMerchantMutation } from '../api/useUpdateMerchantMutation';
import { useDeleteMerchantMutation } from '../api/useDeleteMerchantMutation';

export interface MerchantDirectoryHandle {
    openCreateModal: () => void;
}

export const MerchantDirectory = forwardRef<MerchantDirectoryHandle>((props, ref) => {
    const { data: response, isLoading } = useGetMerchantsQuery();
    const merchants = response?.data || [];

    const [merchantToEdit, setMerchantToEdit] = useState<Merchant | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const createMutation = useCreateMerchantMutation();
    const updateMutation = useUpdateMerchantMutation();
    const deleteMutation = useDeleteMerchantMutation();

    useImperativeHandle(ref, () => ({
        openCreateModal: () => setIsCreateModalOpen(true)
    }));

    if (isLoading && merchants.length === 0) {
        return (
            <div className="flex justify-center p-12">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {merchants.map((merchant) => (
                    <MerchantCard 
                        key={merchant.id} 
                        merchant={merchant} 
                        onEdit={setMerchantToEdit}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                ))}
            </div>

            <MerchantForm 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={(data) => createMutation.mutate(data as any, { onSuccess: () => setIsCreateModalOpen(false) })}
                isLoading={createMutation.isPending}
            />

            <MerchantForm 
                isOpen={!!merchantToEdit}
                initialData={merchantToEdit ?? undefined}
                onClose={() => setMerchantToEdit(null)}
                onSubmit={(data) => {
                    if (merchantToEdit) {
                        updateMutation.mutate(
                            { merchantId: merchantToEdit.id, merchantData: data },
                            { onSuccess: () => setMerchantToEdit(null) }
                        );
                    }
                }}
                isLoading={updateMutation.isPending}
            />
        </div>
    );
})
