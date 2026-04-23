'use client';

import { Button, Card } from "@heroui/react";
import { QrCode, Link as LinkIcon, Share2, Mail } from "lucide-react";

const ChannelButton = ({ icon: Icon, label, color }: any) => (
  <Button variant="ghost" className={`h-24 flex-col gap-2 ${color}`} fullWidth>
    <Icon size={24} />
    <span className="font-bold text-xs">{label}</span>
  </Button>
);

export const WalletDistribution = () => (
  <Card className="border-none shadow-sm">
    <Card.Content className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div><h3 className="text-xl font-bold">Distribution Hub</h3><p className="text-default-500 text-sm">Issue passes via multiple channels.</p></div>
        <Button  variant="ghost" ><Share2 size={18}/>Quick Share</Button>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ChannelButton icon={QrCode} label="Static QR" color="bg-blue-50 text-blue-600" />
        <ChannelButton icon={LinkIcon} label="Deep Link" color="bg-purple-50 text-purple-600" />
        <ChannelButton icon={Mail} label="Email Blast" color="bg-orange-50 text-orange-600" />
        <ChannelButton icon={Share2} label="SMS Invite" color="bg-green-50 text-green-600" />
      </div>
    </Card.Content>
  </Card>
);
