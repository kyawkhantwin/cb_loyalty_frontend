'use client';

import { Card,  } from "@heroui/react";
import { Users, UserPlus, TrendingUp, AlertTriangle } from "lucide-react";

const stats = [
  { label: 'Total Members', value: '12,842', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { label: 'New This Month', value: '+425', icon: UserPlus, color: 'text-green-500', bg: 'bg-green-50' },
  { label: 'Avg. Points', value: '1,250', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
  { label: 'Pending Risks', value: '12', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
];

export const MemberStats = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
    {stats.map((stat) => (
      <Card key={stat.label}  className="backdrop-blur-md">
        <Card.Content className="flex flex-row items-center gap-4 p-4">
          <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
            <stat.icon size={24} />
          </div>
          <div>
            <p className="text-small text-default-500 font-medium">{stat.label}</p>
            <h4 className="text-2xl font-bold">{stat.value}</h4>
          </div>
        </Card.Content>
      </Card>
    ))}
  </div>
);
