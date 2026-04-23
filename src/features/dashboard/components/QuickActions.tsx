'use client';

import { Card,  } from "@heroui/react";
import { Plus, Send, FileText, Settings } from "lucide-react";

const ACTION_LIST = [
  { name: 'Issue Points', icon: Plus, color: 'text-blue-600' },
  { name: 'Send Promo', icon: Send, color: 'text-purple-600' },
  { name: 'Generate Report', icon: FileText, color: 'text-orange-600' },
  { name: 'System Config', icon: Settings, color: 'text-gray-600' },
];

export const QuickActions = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {ACTION_LIST.map((action) => (
      <Card key={action.name} className=" hover:scale-[1.02] transition-transform">
        <Card.Content className="flex flex-col items-center gap-3 py-6">
          <div className={`p-3 rounded-2xl ${action.color}`}><action.icon size={24} /></div>
          <span className="font-bold text-sm text-default-700">{action.name}</span>
        </Card.Content>
      </Card>
    ))}
  </div>
);
