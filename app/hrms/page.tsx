'use client';

import React from 'react';
import { Users, UserPlus, Search, Filter, Mail, Phone } from 'lucide-react';
import Image from 'next/image';

export default function HRMSPage() {
    const employees = [
        { id: 1, name: 'Alex Johnson', role: 'Senior Developer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', email: 'alex@example.com' },
        { id: 2, name: 'Sarah Miller', role: 'UI/UX Designer', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', email: 'sarah@example.com' },
        { id: 3, name: 'Mike Ross', role: 'Product Manager', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', email: 'mike@example.com' },
    ];

    return (
        <div className="flex-1 h-full bg-slate-50 p-8 overflow-y-auto font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">HRMS Portal</h1>
                        <p className="text-slate-500 font-medium">Employee Directory & Management</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all shadow-sm">
                            <Filter size={18} />
                            Filter
                        </button>
                        <button className="bg-[#0F1035] text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-opacity-90 transition-all shadow-lg">
                            <UserPlus size={18} />
                            Add Employee
                        </button>
                    </div>
                </header>

                <div className="relative mb-8 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, role, or department..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-indigo-50 transition-all shadow-sm hover:border-slate-200"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {employees.map((emp) => (
                        <div key={emp.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer group">
                            <div className="flex items-start justify-between mb-6">
                                <div className="relative">
                                    <Image
                                        src={emp.avatar}
                                        alt={emp.name}
                                        width={80}
                                        height={80}
                                        className="rounded-2xl object-cover ring-4 ring-slate-50"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                </div>
                                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Mail size={16} /></button>
                                    <button className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Phone size={16} /></button>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1">{emp.name}</h3>
                            <p className="text-indigo-600 font-bold text-sm mb-6">{emp.role}</p>

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Active Status</span>
                                <span className="text-sm text-green-600 font-black">Full Time</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
