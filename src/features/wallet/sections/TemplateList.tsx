'use client';

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Spinner } from '@heroui/react';
import { WalletTemplate } from '../types';
import { TemplateCard } from '../components/TemplateCard';
import { TemplateDesigner } from '../components/TemplateDesigner';
import { useGetTemplatesQuery } from '../api/useGetTemplatesQuery';
import { useCreateTemplateMutation } from '../api/useCreateTemplateMutation';
import { useUpdateTemplateMutation } from '../api/useUpdateTemplateMutation';
import { useDeleteTemplateMutation } from '../api/useDeleteTemplateMutation';

export interface TemplateListHandle {
    openCreateModal: () => void;
}

export const TemplateList = forwardRef<TemplateListHandle>((props, ref) => {
    const { data: response, isLoading } = useGetTemplatesQuery();
    const templates = response?.data || [];

    const [templateToEdit, setTemplateToEdit] = useState<WalletTemplate | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const createMutation = useCreateTemplateMutation();
    const updateMutation = useUpdateTemplateMutation();
    const deleteMutation = useDeleteTemplateMutation();

    useImperativeHandle(ref, () => ({
        openCreateModal: () => setIsCreateModalOpen(true)
    }));

    if (isLoading && templates.length === 0) {
        return (
            <div className="flex justify-center p-12">
                <Spinner size="lg" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <TemplateCard 
                        key={template.id} 
                        template={template} 
                        onEdit={setTemplateToEdit}
                        onDelete={(id) => deleteMutation.mutate(id)}
                    />
                ))}
            </div>

            <TemplateDesigner 
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={(data) => createMutation.mutate(data as any, { onSuccess: () => setIsCreateModalOpen(false) })}
                isLoading={createMutation.isPending}
            />

            <TemplateDesigner 
                isOpen={!!templateToEdit}
                initialData={templateToEdit ?? undefined}
                onClose={() => setTemplateToEdit(null)}
                onSubmit={(data) => {
                    if (templateToEdit) {
                        updateMutation.mutate(
                            { templateId: templateToEdit.id, templateData: data },
                            { onSuccess: () => setTemplateToEdit(null) }
                        );
                    }
                }}
                isLoading={updateMutation.isPending}
            />
        </div>
    );
});

TemplateList.displayName = 'TemplateList';
