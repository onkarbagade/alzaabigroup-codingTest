'use client';

import React from 'react';
import { LayoutGrid, Plus, MoreHorizontal, Clock, CheckCircle2 } from 'lucide-react';

export default function TaskPage() {
    const tasks = [
        { id: 1, title: 'Design System Update', status: 'In Progress', priority: 'High', date: 'Oct 24' },
        { id: 2, title: 'Dashboard UI Revamp', status: 'Completed', priority: 'Medium', date: 'Oct 22' },
        { id: 3, title: 'Client Meeting Prep', status: 'Pending', priority: 'Urgent', date: 'Oct 25' },
    ];

    return (
        <div className="flex-1 h-full bg-slate-50 p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Tasks</h1>
                        <p className="text-slate-500 mt-1">Manage and track your daily activities</p>
                    </div>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all shadow-lg shadow-indigo-200">
                        <Plus size={20} />
                        New Task
                    </button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                            <Clock size={24} />
                        </div>
                        <h3 className="text-indigo-900 font-bold text-lg">Processing</h3>
                        <p className="text-3xl font-black text-indigo-600 mt-2">12</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4">
                            <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-green-900 font-bold text-lg">Completed</h3>
                        <p className="text-3xl font-black text-green-600 mt-2">48</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
                            <LayoutGrid size={24} />
                        </div>
                        <h3 className="text-amber-900 font-bold text-lg">Total Tasks</h3>
                        <p className="text-3xl font-black text-amber-600 mt-2">60</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Task Name</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Priority</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {tasks.map((task) => (
                                <tr key={task.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className="text-slate-900 font-semibold">{task.title}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-indigo-100 text-indigo-800'
                                            }`}>
                                            {task.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 text-sm">{task.priority}</td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">{task.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
