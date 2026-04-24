import { LayoutDashboard, QrCode, Shield, Store, Users, Wallet } from "lucide-react";

export const navItems = [
    { name: 'Overview', icon: LayoutDashboard, href: '/', id: 'Overview' },
    { name: 'Members', icon: Users, href: '/members', id: 'Members' },
    { name: 'Cards', icon: Wallet, href: '/cards', id: 'Cards' },
    { name: 'Merchants', icon: Store, href: '/merchants', id: 'Merchants' },
    { name: 'QR History', icon: QrCode, href: '/qr-history', id: 'QR History' },
    { name: 'Security', icon: Shield, href: '/security', id: 'Security' },
] as const;

export const NavigationRoutes = {
    dashboard:{
        index:'/'
    },
    members: {index:'/members'},
    cards: {index:'/cards',create: "/cards/create"},
    merchants: {index:'/merchants'},
    qrHistory: { index: '/qr-history' },
    security: {index: '/security'},
}
