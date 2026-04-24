'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Settings, Shield, ChevronDown, ChevronRight } from 'lucide-react';
import { navItems, NavItem, NavSubItem } from "@/shared/NavItems";

function isActivePath(pathname: string, href: string, isParent: boolean = false): boolean {
  if (href === '/') return pathname === '/';
  if (isParent) return pathname.startsWith(href);
  return pathname === href;
}

export function Sidebar() {
  const pathname = usePathname() ?? '/';
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newExpanded: Record<string, boolean> = { ...expandedItems };
    navItems.forEach(item => {
      if (item.subItems && pathname.startsWith(item.href)) {
        newExpanded[item.id] = true;
      }
    });
    setExpandedItems(newExpanded);
  }, [pathname]);

  const toggleExpand = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <aside className="w-72 border-r flex-col hidden lg:flex sticky top-0 h-screen bg-background">
      <div className="p-8 flex items-center gap-3 font-bold text-2xl tracking-tight">
        <div className="rounded-xl p-2 border bg-accent/10 border-accent/20">
          <Shield size={24} className="text-accent-foreground" />
        </div>
        <span>LoyaltyOS</span>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const hasSubItems = item.subItems && item.subItems.length > 0;
          const isParentActive = isActivePath(pathname, item.href, true);
          const isExpanded = expandedItems[item.id];

          return (
            <div key={item.id} className="space-y-1">
              <div className="relative group">
                <Link
                  href={item.href}
                  aria-current={isParentActive ? 'page' : undefined}
                  className={[
                    'flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 border',
                    isParentActive ? 'bg-accent/10 text-foreground border-foreground/10' : 'border-transparent text-foreground/70 hover:text-foreground hover:bg-foreground/5',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <item.icon
                      size={20}
                      className={isParentActive ? 'text-foreground' : 'text-foreground/60 group-hover:text-foreground transition-colors'}
                    />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  
                  {hasSubItems && (
                    <button 
                      onClick={(e) => toggleExpand(e, item.id)}
                      className="p-1 hover:bg-foreground/10 rounded-md transition-colors"
                    >
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  )}
                </Link>
              </div>

              {hasSubItems && isExpanded && (
                <div className="ml-9 space-y-1 border-l pl-4 border-foreground/10 animate-in slide-in-from-left-2 duration-200">
                  {item.subItems!.map(subItem => {
                    const isSubActive = pathname === subItem.href;
                    return (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={[
                          'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                          isSubActive ? 'bg-accent text-foreground font-bold' : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5',
                        ].join(' ')}
                      >
                        {subItem.icon && <subItem.icon size={14} />}
                        <span>{subItem.name}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <div className="rounded-2xl p-4 flex items-center gap-3 border bg-card/50">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold border bg-background">AD</div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Admin User</p>
            <p className="text-xs text-foreground/50 truncate">admin@loyaltyos.com</p>
          </div>
          <Settings size={18} className="cursor-pointer text-foreground/60 hover:text-foreground" />
        </div>
      </div>
    </aside>
  );
}
