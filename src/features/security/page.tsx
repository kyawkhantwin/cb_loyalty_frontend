'use client';

import React from 'react';
import { Shield, Activity, Lock, Globe, BarChart3, Map as MapIcon } from "lucide-react";
import { SecurityAlertList } from "./components/SecurityAlertList";
import { SecurityAlert } from "./types";
import { Breadcrumbs, Card, CardHeader, Tabs } from "@heroui/react";
import { InstallationMetrics } from "./sections/InstallationMetrics";
import { RedemptionHeatmap } from "./sections/RedemptionHeatmap";

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
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
        <Breadcrumbs.Item>Security & Analytics</Breadcrumbs.Item>
      </Breadcrumbs>
      <h1 className="text-4xl font-extrabold tracking-tight">Security & Analytics</h1>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="System Uptime" value="99.98%" icon={Activity} color="text-green-500" />
      <StatCard label="Active Threats" value="3" icon={Shield} color="text-red-500" />
      <StatCard label="Global Latency" value="42ms" icon={Globe} color="text-blue-500" />
      <StatCard label="Encrypted Nodes" value="124" icon={Lock} color="text-purple-500" />
    </div>

    <Tabs variant="underlined" className="w-full border-b border-divider">
        <Tabs.List className="gap-6 h-12">
            <Tabs.Tab id="threats" textValue="Threats" className="flex items-center gap-2 px-1">
                <Shield size={18} />
                <span>Threat Intelligence</span>
            </Tabs.Tab>
            <Tabs.Tab id="metrics" textValue="Metrics" className="flex items-center gap-2 px-1">
                <BarChart3 size={18} />
                <span>Installation Metrics</span>
            </Tabs.Tab>
            <Tabs.Tab id="heatmap" textValue="Heatmap" className="flex items-center gap-2 px-1">
                <MapIcon size={18} />
                <span>Redemption Heatmap</span>
            </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel id="threats" className="py-8">
            <Card className="border-none shadow-sm">
                <CardHeader className="px-6 py-4 border-b border-default-100">
                    <h3 className="text-xl font-bold">Threat Intelligence Feed</h3>
                </CardHeader>
                <Card.Content className="p-0">
                    <SecurityAlertList alerts={MOCK_ALERTS} />
                </Card.Content>
            </Card>
        </Tabs.Panel>
        
        <Tabs.Panel id="metrics" className="py-8">
            <InstallationMetrics />
        </Tabs.Panel>

        <Tabs.Panel id="heatmap" className="py-8">
            <RedemptionHeatmap />
        </Tabs.Panel>
    </Tabs>
  </div>
);
