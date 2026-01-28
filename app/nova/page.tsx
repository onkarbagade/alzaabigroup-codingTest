'use client';

import React from 'react';
import { Zap, Sparkles, Rocket, Ghost, Braces, Terminal } from 'lucide-react';

export default function NovaPage() {
    return (
        <div className="flex-1 h-full bg-[#030303] flex items-center justify-center p-8 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse delay-1000"></div>
            </div>

            <div className="max-w-3xl w-full relative z-10 text-center">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full text-purple-400 text-xs font-black uppercase tracking-[0.2em] mb-12">
                    <Zap size={14} className="fill-purple-400" />
                    Next Gen Platform
                </div>

                <h1 className="text-7xl md:text-8xl font-black text-white tracking-tighter mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                    NOVA <span className="text-purple-500">AI</span>
                </h1>

                <p className="text-xl text-slate-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
                    The future of automation and artificial intelligence integrated directly into your workflow. Experience speed like never before.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <button className="w-full md:w-auto bg-white text-black px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                        Explore Nova
                    </button>
                    <button className="w-full md:w-auto bg-white/5 border border-white/10 backdrop-blur-md text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/10 transition-all">
                        Documentation
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-24">
                    {[
                        { icon: Sparkles, label: 'Generative' },
                        { icon: Rocket, label: 'Fast' },
                        { icon: Braces, label: 'API First' },
                        { icon: Terminal, label: 'Seamless' }
                    ].map((item) => (
                        <div key={item.label} className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-[2rem] flex flex-col items-center gap-4 group hover:bg-white/10 transition-all cursor-default">
                            <item.icon size={24} className="text-purple-400 group-hover:scale-110 transition-transform" />
                            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
