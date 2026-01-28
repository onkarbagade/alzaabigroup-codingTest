'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    Search,
    Bell,
    MoreVertical,
    Paperclip,
    Smile,
    Mic,
    Play,
    Pause,
    CheckCheck,
    ArrowLeft,
    Info,
    ListChecks,
    Heart,
    Star,
    VolumeX,
    MessageSquareX,
    Calendar,
    Clock,
    Image as ImageIcon
} from 'lucide-react';
import Image from 'next/image';
import { User, Message, getMessagesForContact } from '@/lib/data';
import clsx from 'clsx';

interface ChatWindowProps {
    contact: User | null;
    onBack?: () => void;
}

const ChatWindow = ({ contact, onBack }: ChatWindowProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [playingAudio, setPlayingAudio] = useState<string | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenuModal, setActiveMenuModal] = useState<string | null>(null);
    const menuRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (contact) {
            setMessages(getMessagesForContact(contact.id));
        }
    }, [contact]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    if (!contact) {
        return <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50 text-gray-400">Select a contact to start chatting</div>;
    }

    const handleSendMessage = () => {
        if (!inputText.trim()) return;
        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: 'me',
            text: inputText,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages([...messages, newMessage]);
        setInputText('');
    };

    const toggleAudio = (id: string) => {
        if (playingAudio === id) {
            setPlayingAudio(null);
        } else {
            setPlayingAudio(id);
        }
    };

    const handleMenuClick = (label: string) => {
        setActiveMenuModal(label);
        setIsMenuOpen(false);
    }

    return (
        <div className="flex-1 flex flex-col h-full bg-white relative w-full">
            {activeMenuModal && (
                <MenuActionModal
                    title={activeMenuModal}
                    onClose={() => setActiveMenuModal(null)}
                />
            )}
            {/* Header */}
            <div className="h-20 border-b border-gray-100 flex items-center justify-between px-4 md:px-6 shrink-0 bg-white z-20">
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Back Button for Mobile */}
                    <button onClick={onBack} className="md:hidden p-2 -ml-2 text-gray-600">
                        <ArrowLeft size={24} />
                    </button>

                    <div className="relative">
                        <Image
                            src={contact.avatar}
                            alt={contact.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover w-10 h-10 md:w-12 md:h-12"
                        />
                        {contact.status === 'online' && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 text-base md:text-lg">{contact.name}</h2>
                        <p className="text-xs md:text-sm text-indigo-500">{contact.role}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-4 text-gray-500">
                    <button className="hidden sm:block p-2 hover:bg-gray-50 rounded-full transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="p-2 hover:bg-gray-50 rounded-full transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                    </button>
                    <button
                        ref={menuRef}
                        className="p-2 hover:bg-gray-50 rounded-full transition-colors relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <MoreVertical size={20} />
                        {isMenuOpen && (
                            <div className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col py-2">
                                <MenuItem icon={<Info size={16} />} label="Info" onClick={() => handleMenuClick('Info')} />
                                <MenuItem icon={<ListChecks size={16} />} label="Select Messages" onClick={() => handleMenuClick('Select Messages')} />
                                <MenuItem icon={<VolumeX size={16} />} label="Mute Notifications" active onClick={() => handleMenuClick('Mute Notifications')} />
                                <MenuItem icon={<Heart size={16} />} label="Add To Favorites" onClick={() => handleMenuClick('Add To Favorites')} />
                                <MenuItem icon={<Star size={16} />} label="Spotlighted Messages" onClick={() => handleMenuClick('Spotlighted Messages')} />
                                <MenuItem icon={<MessageSquareX size={16} />} label="Clear Chat" onClick={() => handleMenuClick('Clear Chat')} />
                                <MenuItem icon={<CheckCheck size={16} />} label="Read All Chats" onClick={() => handleMenuClick('Read All Chats')} />
                                <MenuItem icon={<Calendar size={16} />} label="Scheduled Messages" onClick={() => handleMenuClick('Scheduled Messages')} />
                                <MenuItem icon={<ImageIcon size={16} />} label="Gallery" onClick={() => handleMenuClick('Gallery')} />
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-white space-y-6">
                {messages.map((msg, index) => {
                    const isMe = msg.senderId === 'me';
                    return (
                        <div key={msg.id} className={clsx("flex flex-col", isMe ? "items-end" : "items-start")}>

                            {/* Message Content */}
                            <div className={clsx(
                                "max-w-[85%] md:max-w-[70%] rounded-2xl p-4 relative shadow-sm",
                                isMe ? "bg-blue-50 text-slate-800 rounded-br-none" : "bg-gray-50 text-slate-800 rounded-bl-none",
                                msg.image ? "p-0 overflow-hidden bg-transparent shadow-none" : ""
                            )}>
                                {/* Image Message */}
                                {msg.image && (
                                    <div className="relative">
                                        <Image
                                            src={msg.image}
                                            alt="Shared image"
                                            width={300}
                                            height={200}
                                            className="rounded-2xl"
                                        />
                                        <div className="absolute bottom-2 right-2 bg-black/30 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                                            <span>15:05</span>
                                            <span>02 Jun 2025 10:00 am</span>
                                            <CheckCheck size={12} className="text-blue-400" />
                                        </div>
                                    </div>
                                )}

                                {/* Audio Message */}
                                {msg.audio && (
                                    <div className="flex items-center gap-2 md:gap-3 min-w-[240px] md:min-w-[280px]">
                                        <button
                                            onClick={() => toggleAudio(msg.id)}
                                            className={clsx("w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0", isMe ? "bg-blue-200 text-blue-700" : "bg-gray-200 text-gray-600")}
                                        >
                                            {playingAudio === msg.id ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                                        </button>
                                        <div className="flex-1 flex flex-col gap-1">
                                            {/* Fake Waveform */}
                                            <div className="flex items-center gap-[2px] h-6 md:h-8">
                                                {Array.from({ length: 30 }).map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={clsx("w-1 rounded-full", isMe ? "bg-blue-400" : "bg-gray-800")}
                                                        style={{ height: `${Math.max(20, ((i * 17) % 80) + 20)}%` }}
                                                    ></div>
                                                ))}
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] text-gray-500 font-medium">
                                                <span>{playingAudio === msg.id ? '00:12' : msg.audioDuration}</span>
                                                <div className="flex items-center gap-1">
                                                    <span>{msg.timestamp}</span>
                                                    {isMe && <CheckCheck size={12} className="text-blue-500" />}
                                                </div>
                                            </div>
                                        </div>
                                        {msg.id === 'm3' /* Specific tweak for the design ref */ && (
                                            <div className="text-xs bg-gray-200 px-1.5 py-0.5 rounded text-gray-600 font-medium">1x</div>
                                        )}
                                    </div>
                                )}


                                {/* Text Message */}
                                {msg.text && (
                                    <div className="space-y-1">
                                        <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                                        <div className="flex items-center justify-end gap-1 mt-1">
                                            <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                                            {isMe && <CheckCheck size={14} className="text-blue-500" />}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-white border-t border-gray-100">
                <div className="bg-gray-100 rounded-full px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 md:gap-3">
                    <button className="text-gray-400 hover:text-gray-600">
                        <Smile size={24} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 hidden sm:block">
                        <Paperclip size={24} />
                    </button>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message here"
                        className="flex-1 bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
                    />
                    <button className="text-gray-400 hover:text-gray-600">
                        <Mic size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;

const MenuItem = ({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) => (
    <div
        onClick={onClick}
        className={clsx(
            "flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors",
            active ? "bg-slate-50 relative" : "text-gray-600"
        )}
    >
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-amber-500" />}
        <span className={clsx(active ? "text-slate-800" : "text-gray-400")}>{icon}</span>
        <span className={clsx("font-medium", active ? "text-slate-900" : "")}>{label}</span>
        <div className="ml-auto text-gray-400">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    </div>
)

const MenuActionModal = ({ title, onClose }: { title: string, onClose: () => void }) => {
    const [selectedMute, setSelectedMute] = useState<string | null>(null);

    useEffect(() => {
        if (title === 'Mute Notifications') {
            const saved = localStorage.getItem('muteStatus');
            if (saved) {
                setSelectedMute(saved);
            }
        }
    }, [title]);

    const handleSave = () => {
        if (title === 'Mute Notifications') {
            if (selectedMute) {
                localStorage.setItem('muteStatus', selectedMute);
            } else {
                localStorage.removeItem('muteStatus');
            }
        }
        onClose();
    };

    const muteOptions = [
        "For 30 minutes",
        "For 1 hour",
        "Until I turn it back on",
        "Custom Date & Time"
    ];

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-md-md overflow-hidden animate-in fade-in zoom-in duration-200" style={{ maxWidth: '448px' }}>
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-[#0F1035] rounded-full flex items-center justify-center text-white mb-6">
                        {title === 'Mute Notifications' ? <VolumeX size={32} /> : <Info size={32} />}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{title}</h2>
                    <p className="text-sm text-gray-500 max-w-xs mb-8">
                        {title === 'Mute Notifications'
                            ? 'Pause alerts while staying in this conversation, notifications remain muted temporarily.'
                            : `Manage settings for ${title}. This is a placeholder for the requested action.`}
                    </p>

                    {title === 'Mute Notifications' && (
                        <div className="w-full space-y-3 mb-8 text-left">
                            {muteOptions.map((option) => (
                                <div
                                    key={option}
                                    onClick={() => setSelectedMute(selectedMute === option ? null : option)}
                                    className={clsx(
                                        "flex items-center justify-between p-3.5 border rounded-xl cursor-pointer transition-all",
                                        selectedMute === option
                                            ? "border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500"
                                            : "border-gray-200 hover:bg-gray-50"
                                    )}
                                >
                                    <span className={clsx(
                                        "text-sm font-semibold",
                                        selectedMute === option ? "text-indigo-700" : "text-gray-700"
                                    )}>
                                        {option}
                                    </span>
                                    <div className={clsx(
                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                        selectedMute === option
                                            ? "border-indigo-600 bg-indigo-600"
                                            : "border-gray-300 bg-white"
                                    )}>
                                        {selectedMute === option && (
                                            <div className="w-1.5 h-1.5 rounded-full bg-white" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={handleSave}
                            className="w-full py-3 bg-[#FF0073] hover:bg-[#D90062] text-white rounded-xl font-bold transition-all shadow-lg shadow-pink-100"
                        >
                            Save
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 border border-gray-200 text-gray-500 rounded-xl font-bold hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
