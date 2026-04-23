'use client';

import React from 'react';
import { Breadcrumbs } from '@heroui/react';
import { GoogleLoyaltyPassBuilder } from '../components/GoogleLoyaltyPassBuilder';

export function CreateCardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/cards">Cards</Breadcrumbs.Item>
          <Breadcrumbs.Item>Create</Breadcrumbs.Item>
        </Breadcrumbs>

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-default-900">Create Card</h1>
          <p className="text-default-500 text-lg">Dummy Google Loyalty Card builder.</p>
        </div>
      </div>

      <GoogleLoyaltyPassBuilder />
    </div>
  );
}

