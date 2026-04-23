'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Settings, Shield, Store, Users, Wallet } from 'lucide-react';
import {navItems} from "@/shared/NavItems";

function isActivePath(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}



export function Sidebar() {
  const pathname = usePathname() ?? '/';

  return (
    <aside className="w-72 border-r flex-col hidden lg:flex sticky top-0 h-screen">
      <div className="p-8 flex items-center gap-3 font-bold text-2xl tracking-tight">
        <div className="rounded-xl p-2 border">
          <Shield size={24} />
        </div>
        <span>LoyaltyOS</span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map(item => {
          const active = isActivePath(pathname, item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border',
                active ? 'bg-accent     text-foreground border-foreground/10' : 'border-transparent text-foreground/70 hover:text-foreground hover:bg-foreground/5',
              ].join(' ')}
            >
              <item.icon
                size={20}
                className={active ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground transition-colors'}
              />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="rounded-2xl p-4 flex items-center gap-3 border">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold border">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-xs truncate">admin@loyaltyos.com</p>
          </div>
          <Settings size={18} className="cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}
