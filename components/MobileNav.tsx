'use client';

import React from 'react';
import { LayoutGrid, Users, MessageCircle, Briefcase, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNavLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}
        >
            <div className={isActive ? 'text-red-500 scale-110 transition-transform' : ''}>
                {icon}
            </div>
            <span className="text-[10px] font-bold">{label}</span>
        </Link>
    );
};

export default function MobileNav() {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0F1035] border-t border-white/5 flex items-center justify-around px-2 shrink-0 z-[100]">
            <MobileNavLink href="/task" icon={<LayoutGrid size={24} />} label="Task" />
            <MobileNavLink href="/hrms" icon={<Users size={24} />} label="HRMS" />
            <MobileNavLink href="/" icon={<MessageCircle size={24} />} label="Connect" />
            <MobileNavLink href="/asset" icon={<Briefcase size={24} />} label="Asset" />
            <MobileNavLink href="/settings" icon={<Settings size={24} />} label="Settings" />
        </div>
    );
}
