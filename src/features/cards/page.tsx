'use client';

import React from 'react';
import {Breadcrumbs, Button} from '@heroui/react';
import { TemplateCard } from '@/features/wallet/components/TemplateCard';
import { WalletDistribution } from '@/features/wallet/components/WalletDistribution';
import {Plus} from "lucide-react";
import { useRouter } from 'next/navigation'
import {NavigationRoutes} from "@/shared/NavItems";
import {GoogleLoyaltyPassBuilder} from "@/features/cards/components/GoogleLoyaltyPassBuilder";
export function CardsPage() {
    const router = useRouter()
    const onPressCreateCard = ()=>{
        router.push(NavigationRoutes.cards.create)
    }
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-4">
        <Breadcrumbs>
          <Breadcrumbs.Item href="/">Dashboard</Breadcrumbs.Item>
          <Breadcrumbs.Item>Cards</Breadcrumbs.Item>
        </Breadcrumbs>

        <div className={'flex items-center justify-between'}>
       <div >
           <h1 className="text-4xl font-extrabold tracking-tight text-default-900">Cards</h1>
           <p className="text-default-500 text-lg">Create and distribute loyalty cards (dummy for now).</p>
       </div>
<Button onPress={onPressCreateCard} variant={"primary"}> <Plus />Create Card</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TemplateCard platform="Apple" />
        <TemplateCard platform="Google" />
        <TemplateCard platform="Samsung" />
      </div>


      <div className="mt-8">
        <WalletDistribution />
      </div>
    </div>
  );
}

