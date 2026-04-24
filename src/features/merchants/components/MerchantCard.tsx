'use client';

import React from 'react';
import {
  Card,
  Avatar,
  Chip,
  Button
} from "@heroui/react";
import { MapPin, ArrowUpRight, Edit2, Trash2 } from "lucide-react";
import { Merchant } from '../types';

interface MerchantCardProps {
  merchant: Merchant;
  onEdit?: (merchant: Merchant) => void;
  onDelete?: (id: string) => void;
}

export const MerchantCard = ({ merchant, onEdit, onDelete }: MerchantCardProps) => {
  const { name, branches, category, status } = merchant;
  return (
      <Card
          className="border-none bg-background shadow-sm hover:shadow-md transition-all group"
      >
        <Card.Content className="p-6 flex flex-row items-center gap-6">
          <Avatar
              size="lg"
              className="bg-default-100 text-default-600 font-bold"
              name={name}
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold truncate text-default-900">
                {name}
              </h3>
              <Chip
                  size="sm"
                  variant="secondary"
              >
                {category}
              </Chip>
              <Chip
                  size="sm"
                  variant={status === 'Active' ? 'primary' : 'default'}
              >
                {status}
              </Chip>
            </div>

            <div className="flex items-center gap-1 text-default-400 text-sm">
              <MapPin size={14} />
              <span>{branches} Locations</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
                isIconOnly
                variant="ghost"
                size="sm"
                onPress={() => onEdit?.(merchant)}
            >
                <Edit2 size={16} />
            </Button>
            <Button
                isIconOnly
                variant="ghost"
                size="sm"
                className="text-danger"
                onPress={() => onDelete?.(merchant.id)}
            >
                <Trash2 size={16} />
            </Button>
            <div className="p-3 rounded-full bg-default-50 text-default-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors ml-2">
                <ArrowUpRight size={20} />
            </div>
          </div>
        </Card.Content>
      </Card>
  );
};
