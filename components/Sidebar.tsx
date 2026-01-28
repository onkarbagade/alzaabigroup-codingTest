'use client';

import React from 'react';
import {
    Briefcase,
    Users,
    MessageCircle,
    LayoutGrid,
    FileText,
    Settings,
    Zap,
    LogOut
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();

    const menuItems = [
        { id: 'task', label: 'Task', icon: LayoutGrid, href: '/task' },
        { id: 'hrms', label: 'HRMS', icon: Users, href: '/hrms' },
        { id: 'connect', label: 'Connect', icon: MessageCircle, href: '/' },
        { id: 'asset', label: 'Asset', icon: Briefcase, href: '/asset' },
        { id: 'doc', label: 'Doc', icon: FileText, href: '/doc' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
        { id: 'nova', label: 'Nova', icon: Zap, href: '/nova' },
    ];

    return (
        <div className="h-screen w-20 bg-[#0F1035] flex flex-col items-center py-6 text-gray-400 shrink-0">
            {/* Logo */}
            <div className="mb-8">
                <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-red-400 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    A
                </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 flex flex-col gap-6 w-full">
                {menuItems.map((item) => {
                    // Check if active. Home '/' is strict match, others are prefix or exact.
                    // Actually simpliest is exact match for all given the flat structure, or active if startsWith for nested routes.
                    // Let's stick to exact match for ease, except maybe root which might be treated specially.
                    // For now: exact match for '/' and 'startsWith' for others if needed, but let's do simple comparison first.
                    // But typically 'connect' (/) matches everything if we use startsWith.
                    // Let's do: active if pathname === item.href OR (item.href !== '/' && pathname.startsWith(item.href))
                    const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

                    return (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex flex-col items-center justify-center gap-1 w-full py-2 relative group transition-colors hover:text-white ${isActive ? 'text-white' : ''
                                }`}
                        >
                            {isActive && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-amber-500 rounded-r-md" />
                            )}
                            <item.icon size={24} strokeWidth={1.5} />
                            <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
                        </Link>
                    )
                })}
            </div>

            {/* Logout / User */}
            <div className="flex flex-col gap-6 items-center w-full">
                <button className="flex flex-col items-center gap-1 hover:text-white transition-colors">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-b from-purple-500 to-indigo-600 p-[2px]">
                        <div className="w-full h-full rounded-full bg-[#0F1035] p-[2px] overflow-hidden">
                            <Image
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                                alt="Current User"
                                width={100}
                                height={100}
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    <span className="text-[10px] font-medium">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
