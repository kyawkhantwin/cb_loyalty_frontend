import { LayoutDashboard, QrCode, Shield, Store, Users, Wallet, Settings2, Filter, CalendarClock, UserPlus, DollarSign, Key } from "lucide-react";

export interface NavSubItem {
    name: string;
    href: string;
    icon?: any;
    id: string;
}

export interface NavItem {
    name: string;
    icon: any;
    href: string;
    id: string;
    subItems?: NavSubItem[];
}

export const navItems: NavItem[] = [
    { name: 'Overview', icon: LayoutDashboard, href: '/', id: 'Overview' },
    { 
        name: 'Members', 
        icon: Users, 
        href: '/members', 
        id: 'Members',
        subItems: [
            { name: 'Member Directory', href: '/members', icon: Users, id: 'MemberDirectory' },
            { name: 'Tier Engine', href: '/members/tiers', icon: Settings2, id: 'TierEngine' },
            { name: 'Segment Builder', href: '/members/segments', icon: Filter, id: 'SegmentBuilder' },
            { name: 'Expiration Logic', href: '/members/expiration', icon: CalendarClock, id: 'ExpirationLogic' },
        ]
    },
    { name: 'Cards', icon: Wallet, href: '/cards', id: 'Cards' },
    { 
        name: 'Merchants', 
        icon: Store, 
        href: '/merchants', 
        id: 'Merchants',
        subItems: [
            { name: 'Merchant Registry', href: '/merchants', icon: Store, id: 'MerchantRegistry' },
            { name: 'Staff Accounts', href: '/merchants/staff', icon: UserPlus, id: 'StaffAccounts' },
            { name: 'Settlements', href: '/merchants/settlements', icon: DollarSign, id: 'Settlements' },
            { name: 'Terminal Keys', href: '/merchants/keys', icon: Key, id: 'TerminalKeys' },
        ]
    },
    { name: 'QR History', icon: QrCode, href: '/qr-history', id: 'QR History' },
    { name: 'Security', icon: Shield, href: '/security', id: 'Security' },
];

export const NavigationRoutes = {
    dashboard:{
        index:'/'
    },
    members: {
        index:'/members',
        tiers: '/members/tiers',
        segments: '/members/segments',
        expiration: '/members/expiration'
    },
    cards: {index:'/cards',create: "/cards/create"},
    merchants: {
        index:'/merchants',
        staff: '/merchants/staff',
        settlements: '/merchants/settlements',
        keys: '/merchants/keys'
    },
    qrHistory: { index: '/qr-history' },
    security: {index: '/security'},
}
