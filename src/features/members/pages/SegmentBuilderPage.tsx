'use client';

import React from 'react';
import { Breadcrumbs } from "@heroui/react";
import { SegmentBuilder } from "../sections/SegmentBuilder";

export const SegmentBuilderPage = () => (
  <div className="space-y-6">
    <div className="flex flex-col gap-2">
      <Breadcrumbs>
        <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
        <Breadcrumbs.Item href="/members">Members</Breadcrumbs.Item>
        <Breadcrumbs.Item>Segment Builder</Breadcrumbs.Item>
      </Breadcrumbs>
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dynamic Segment Builder</h1>
          <p className="text-default-500">Create logic-based member groups for targeted campaigns.</p>
        </div>
      </div>
    </div>
    
    <SegmentBuilder />
  </div>
);
