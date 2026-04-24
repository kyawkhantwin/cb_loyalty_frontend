'use client';

import React from 'react';
import { Breadcrumbs } from "@heroui/react";
import { TierEngine } from "../sections/TierEngine";

export const TierEnginePage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/members">Members</Breadcrumbs.Item>
        <Breadcrumbs.Item>Tier Engine</Breadcrumbs.Item>
      </Breadcrumbs>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tier Threshold Engine</h1>
          <p className="text-default-500">Define point requirements for member levels.</p>
        </div>
      </div>
    </div>
    
    <TierEngine />
  </div>
);
