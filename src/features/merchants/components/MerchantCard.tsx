'use client';

import React from 'react';
// V3: Import from the main consolidated package
import {
  Card,
  Avatar,
  Chip
} from "@heroui/react";
import { MapPin, ArrowUpRight } from "lucide-react";

interface MerchantCardProps {
  name: string;
  branches: number;
  category: string;
}

export const MerchantCard = ({ name, branches, category }: MerchantCardProps) => {
  return (
      <Card
          // V3 maintains isPressable but handles the RAC "press" state internally
          className="border-none bg-background shadow-sm hover:shadow-md transition-all group"
      >
        <Card.Content className="p-6 flex flex-row items-center gap-6">
          <Avatar
              size="lg"
              className="bg-default-100 text-default-600 font-bold"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold truncate text-default-900">
                {name}
              </h3>
              {/* In v3, ensure color matches your updated theme config */}
              <Chip
                  size="sm"
                  variant="secondary"
              >
                {category}
              </Chip>
            </div>

            <div className="flex items-center gap-1 text-default-400 text-sm">
              <MapPin size={14} />
              <span>{branches} Locations</span>
            </div>
          </div>

          <div className="p-3 rounded-full bg-default-50 text-default-400 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
            <ArrowUpRight size={20} />
          </div>
        </Card.Content>
      </Card>
  );
};