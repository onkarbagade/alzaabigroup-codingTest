'use client';

import React from 'react';
import { Settings, User, Bell, Lock, Globe, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
    const sections = [
        { id: 'profile', icon: User, label: 'Profile Information', desc: 'Manage your public details' },
        { id: 'security', icon: Shield, label: 'Password & Security', desc: 'Secure your account access' },
        { id: 'notifications', icon: Bell, label: 'Notifications', desc: 'Choose what you want to hear' },
        { id: 'privacy', icon: Lock, label: 'Privacy Settings', desc: 'Control who sees your activity' },
        { id: 'language', icon: Globe, label: 'Language & Region', desc: 'Customize your local experience' },
        { id: 'billing', icon: CreditCard, label: 'Billing & Payments', desc: 'Manage subscriptions and cards' },
    ];

    return (
        <div className="flex-1 h-full bg-[#FAFAFC] p-8 overflow-y-auto font-sans">
            <div className="max-w-4xl mx-auto">
                <header className="mb-12">
                    <h1 className="text-4xl font-black text-[#0F1035] tracking-tight">Settings</h1>
                    <p className="text-slate-500 font-medium mt-2">Adjust your personal preferences and configurations</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sections.map((section) => (
                        <div key={section.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/10 transition-all cursor-pointer group">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all shadow-sm">
                                    <section.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#0F1035]">{section.label}</h3>
                                    <p className="text-sm text-slate-400 font-medium">{section.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-[#0F1035] rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-2xl font-black mb-4">Go Premium</h2>
                        <p className="text-indigo-200 max-w-md mb-8">Unlock advanced features including unlimited cloud storage, real-time collaboration, and priority support.</p>
                        <button className="bg-white text-[#0F1035] px-8 py-3 rounded-2xl font-black hover:bg-slate-100 transition-all shadow-xl">
                            Upgrade Now
                        </button>
                    </div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/20 blur-[80px] rounded-full"></div>
                </div>
            </div>
        </div>
    );
}
