'use client';

import React, { Suspense } from 'react';
import { Breadcrumbs } from '@heroui/react';
import { GoogleLoyaltyPassBuilder } from '../components/GoogleLoyaltyPassBuilder';
import { useSearchParams } from 'next/navigation';

function CreateCardContent() {
  const searchParams = useSearchParams();
  const platform = searchParams.get('platform') || 'Google';

  const platformNames: Record<string, string> = {
    'Apple': 'Apple Wallet',
    'Google': 'Google Pay',
    'Samsung': 'Samsung Wallet'
  };

  const displayName = platformNames[platform] || 'Google Pay';

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item href="/cards">Cards</Breadcrumbs.Item>
          <Breadcrumbs.Item>Create</Breadcrumbs.Item>
        </Breadcrumbs>

        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-default-900">Issue {displayName} Pass</h1>
          <p className="text-default-500 text-lg">Configure and distribute a new loyalty pass for {displayName}.</p>
        </div>
      </div>

      <GoogleLoyaltyPassBuilder platform={platform} />
    </div>
  );
}

export function CreateCardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-default-500">Loading builder...</div>}>
      <CreateCardContent />
    </Suspense>
  );
}
