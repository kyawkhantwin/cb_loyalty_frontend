'use client';

import { Shield, Activity, Lock, Globe } from "lucide-react";
import { SecurityAlertList } from "./components/SecurityAlertList";
import { SecurityAlert } from "./types";
import {Breadcrumbs, Card, CardHeader} from "@heroui/react";

const MOCK_ALERTS: SecurityAlert[] = [
  { id: '1', type: 'Fraud', severity: 'Critical', description: 'Multi-scan detected in NYC/LA', timestamp: new Date().toISOString() },
  { id: '2', type: 'System', severity: 'Medium', description: 'High latency on Apple Wallet API', timestamp: new Date().toISOString() },
  { id: '3', type: 'Auth', severity: 'Low', description: 'New merchant login from unknown IP', timestamp: new Date().toISOString() },
];

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <Card className="border-none shadow-sm">
    <Card.Content className="flex flex-row items-center gap-4 py-6">
      <div className={`p-3 rounded-xl bg-default-100 ${color}`}><Icon size={24} /></div>
      <div><p className="text-sm text-default-500">{label}</p><h4 className="text-2xl font-bold">{value}</h4></div>
    </Card.Content>
  </Card>
);

export const SecurityPage = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col gap-2">
      <Breadcrumbs><Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item><Breadcrumbs.Item>Security & Health</Breadcrumbs.Item></Breadcrumbs>

      <h1 className="text-4xl font-extrabold tracking-tight">Security & Analytics</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="System Uptime" value="99.98%" icon={Activity} color="text-green-500" />
      <StatCard label="Active Threats" value="3" icon={Shield} color="text-red-500" />
      <StatCard label="Global Latency" value="42ms" icon={Globe} color="text-blue-500" />
      <StatCard label="Encrypted Nodes" value="124" icon={Lock} color="text-purple-500" />
    </div>

    <Card className="border-none shadow-sm">
      <CardHeader className="px-6 py-4 border-b border-default-100"><h3 className="text-xl font-bold">Threat Intelligence Feed</h3></CardHeader>
      <Card.Content className="p-0"><SecurityAlertList alerts={MOCK_ALERTS} /></Card.Content>
    </Card>
  </div>
);
