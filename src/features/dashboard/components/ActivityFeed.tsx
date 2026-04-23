'use client';

import {Avatar, Card, Chip} from "@heroui/react";



const events = [
  { id: 1, user: 'Alex M.', action: 'Earned Points', amount: '+450', time: '5m ago', type: 'earn' },
  { id: 2, user: 'Sarah L.', action: 'Redeemed Offer', amount: '-1200', time: '12m ago', type: 'burn' },
  { id: 3, user: 'Mike T.', action: 'Tier Upgraded', amount: 'Gold', time: '1h ago', type: 'tier' },
];

const EventItem = ({ ev }: { ev: typeof events[0] }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl transition-colors group">
    <Avatar  size="sm" className="text-primary font-bold" />
    <div className="flex-1"><p className="text-sm font-bold">{ev.user}</p><p className="text-xs text-default-500">{ev.action}</p></div>
    <div className="text-right"><p className={`text-sm font-bold ${ev.type === 'earn' ? 'text-green-600' : 'text-primary'}`}>{ev.amount}</p><p className="text-xs text-default-400">{ev.time}</p></div>
  </div>
);

export const ActivityFeed = () => (
  <Card className="border-none shadow-sm">
    <Card.Content className="p-6 space-y-4">
      <div className="flex justify-between items-center"><h3 className="font-bold text-xl">Live Activity</h3><Chip variant="primary" color="success" size="sm" className="animate-pulse">Live</Chip></div>
      <div className="space-y-1">{events.map((ev) => <EventItem key={ev.id} ev={ev} />)}</div>
    </Card.Content>
  </Card>
);
