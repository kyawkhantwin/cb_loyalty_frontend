'use client';

import {Button, Card, CardFooter, Chip} from "@heroui/react";
import { Smartphone, Apple, Edit3, Earth, Trash2 } from "lucide-react";
import { WalletTemplate } from '../types';

const PLATFORM_ICONS = { 
    Apple: Apple, 
    Google: Earth, 
    Samsung: Smartphone 
};

interface TemplateCardProps {
    template: WalletTemplate;
    onEdit?: (template: WalletTemplate) => void;
    onDelete?: (id: string) => void;
}

export const TemplateCard = ({ template, onEdit, onDelete }: TemplateCardProps) => {
    const Icon = PLATFORM_ICONS[template.platform] || Smartphone;
    
    return (
        <Card 
            className="border h-[300px] shadow-sm hover:shadow-md transition-all group overflow-hidden"
            style={{ 
                backgroundColor: template.backgroundColor,
                color: template.foregroundColor
            }}
        >
            <Card.Content className="p-6 relative">
                <div className="flex justify-between items-start mb-6">
                    <div className="p-3 border rounded-xl" style={{ borderColor: `${template.foregroundColor}40` }}>
                        <Icon size={24} />
                    </div>
                    <Chip 
                        variant="secondary" 
                        size="sm"
                        style={{ 
                            backgroundColor: `${template.foregroundColor}20`,
                            color: template.foregroundColor,
                            borderColor: `${template.foregroundColor}40`
                        }}
                    >
                        {template.status}
                    </Chip>
                </div>

                <h3 className="text-2xl font-bold mb-1">{template.name}</h3>
                <p className="text-sm opacity-60">{template.description}</p>
            </Card.Content>

            <CardFooter 
                className="border-t p-4 flex justify-between items-center"
                style={{ borderColor: `${template.foregroundColor}20` }}
            >
                <div className="flex items-center gap-2">
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        style={{ color: template.foregroundColor }}
                        onPress={() => onEdit?.(template)}
                    >
                        <Edit3 size={16}/>
                    </Button>
                    <Button
                        isIconOnly
                        size="sm"
                        variant="ghost"
                        className="text-danger"
                        onPress={() => onDelete?.(template.id)}
                    >
                        <Trash2 size={16}/>
                    </Button>
                </div>
                <span className="text-xs font-medium opacity-70">Updated: {new Date(template.lastUpdated).toLocaleDateString()}</span>
            </CardFooter>
        </Card>
    );
};
