'use client';

import { MemberStats } from "../members/components/MemberStats";
import { QuickActions } from "./components/QuickActions";
import { ActivityFeed } from "./components/ActivityFeed";

export const DashboardPage = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold tracking-tight text-default-900">Dashboard</h1>
      <p className="text-default-500 text-lg">System-wide performance and engagement overview.</p>
    </div>

    <QuickActions />
    <MemberStats />

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 h-[400px]  rounded-3xl border border-default-100 flex items-center justify-center text-default-300 font-medium italic">
        (Engagement Chart Placeholder)
      </div>
      <ActivityFeed />
    </div>
  </div>
);
