'use client';

import React from 'react';
import { Briefcase, Package, HardDrive, Cpu, Smartphone, Monitor } from 'lucide-react';

export default function AssetPage() {
    const assets = [
        { id: 1, name: 'MacBook Pro M3', category: 'Hardware', serial: 'SN-9283-X', status: 'Assigned', icon: Monitor },
        { id: 2, name: 'Adobe Creative Cloud', category: 'Software', serial: 'L-1282-A', status: 'Active', icon: Package },
        { id: 3, name: 'iPhone 15 Pro', category: 'Mobile', serial: 'SN-0021-M', status: 'Stock', icon: Smartphone },
    ];

    return (
        <div className="flex-1 h-full bg-slate-50 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 font-black tracking-widest text-xs uppercase mb-3">
                            <div className="w-4 h-1 bg-indigo-600 rounded-full"></div>
                            Inventory Control
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tight">Assets</h1>
                    </div>
                    <div className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex gap-1">
                        <button className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold text-sm">All Assets</button>
                        <button className="px-6 py-2 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm">Hardware</button>
                        <button className="px-6 py-2 text-slate-500 hover:bg-slate-50 rounded-xl font-bold text-sm">Software</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {assets.map((asset) => (
                        <div key={asset.id} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-slate-50 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 rounded-3xl flex items-center justify-center mb-8 transition-all duration-500">
                                    <asset.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">{asset.name}</h3>
                                <div className="flex items-center gap-2 mb-8">
                                    <span className="text-slate-400 text-sm font-bold uppercase tracking-widest">{asset.category}</span>
                                    <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                                    <span className="text-slate-400 text-sm font-medium">{asset.serial}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${asset.status === 'Assigned' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        {asset.status}
                                    </div>
                                    <button className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl -translate-x-4 group-hover:translate-x-0">
                                        <HardDrive size={18} />
                                    </button>
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-bl-[5rem] -translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
