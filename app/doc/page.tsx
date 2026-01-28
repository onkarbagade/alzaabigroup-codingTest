'use client';

import React from 'react';
import { FileText, File, Download, Search, MoreVertical, Trash2 } from 'lucide-react';

export default function DocPage() {
    const docs = [
        { id: 1, name: 'Project Requirements.pdf', size: '2.4 MB', date: '2 hours ago', type: 'PDF' },
        { id: 2, name: 'Brand Guidelines.zip', size: '12.8 MB', date: 'Yesterday', type: 'ZIP' },
        { id: 3, name: 'Marketing Strategy.docx', size: '850 KB', date: 'Oct 20, 2023', type: 'DOC' },
        { id: 4, name: 'Financial Report Q3.xlsx', size: '1.2 MB', date: 'Oct 15, 2023', type: 'XLS' },
    ];

    return (
        <div className="flex-1 h-full bg-[#FAFAFB] p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h1 className="text-4xl font-black text-[#1A1C1E] tracking-tight">Documents</h1>
                        <p className="text-[#848B92] font-medium mt-1">Shared files and documentation</p>
                    </div>
                    <button className="bg-[#005BFF] hover:bg-[#004ECC] text-white px-8 py-3.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-100">
                        Upload File
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {['All Files', 'PDFs', 'Images', 'Archives'].map((cat, i) => (
                        <button key={cat} className={`p-6 rounded-3xl border text-left transition-all ${i === 0 ? 'bg-white border-[#E8E9EB] shadow-sm ring-2 ring-blue-500/10' : 'bg-transparent border-transparent hover:bg-white hover:border-[#E8E9EB]'
                            }`}>
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${i === 0 ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'
                                }`}>
                                <FileText size={24} />
                            </div>
                            <h3 className="font-black text-[#1A1C1E]">{cat}</h3>
                            <p className="text-sm text-[#848B92] font-medium">124 files</p>
                        </button>
                    ))}
                </div>

                <div className="bg-white rounded-[2.5rem] border border-[#E8E9EB] shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-[#F1F2F4] flex items-center gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848B92]" size={18} />
                            <input
                                type="text"
                                placeholder="Search documents..."
                                className="w-full bg-[#F8F9FA] border-none rounded-xl py-2.5 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                    </div>
                    <div className="divide-y divide-[#F1F2F4]">
                        {docs.map((doc) => (
                            <div key={doc.id} className="p-6 flex items-center justify-between hover:bg-[#F8F9FA] transition-all group">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-white border border-[#E8E9EB] rounded-2xl flex items-center justify-center text-blue-500 shadow-sm">
                                        <File size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#1A1C1E]">{doc.name}</h3>
                                        <div className="flex items-center gap-3 text-xs text-[#848B92] font-semibold mt-1">
                                            <span>{doc.size}</span>
                                            <div className="w-1 h-1 bg-[#D1D3D6] rounded-full"></div>
                                            <span>{doc.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                                    <button className="p-2.5 text-[#848B92] hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Download size={20} /></button>
                                    <button className="p-2.5 text-[#848B92] hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
