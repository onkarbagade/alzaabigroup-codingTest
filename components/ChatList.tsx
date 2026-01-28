'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, UserPlus, MoreVertical, Filter, Star, Trash2, VolumeX, MessageSquareX, CheckCheck, Calendar, Clock } from 'lucide-react';
import Image from 'next/image';
import { CONTACTS, User } from '@/lib/data';
import clsx from 'clsx';

interface ChatListProps {
    onSelectContact: (contact: User) => void;
    selectedContactId?: string;
}

const ChatList = ({ onSelectContact, selectedContactId }: ChatListProps) => {
    const [filter, setFilter] = useState('All');

    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLButtonElement>(null);

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

    const filteredContacts = CONTACTS.filter(contact => {
        const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter =
            filter === 'All' ? true :
                filter === 'Unread' ? (contact.unreadCount && contact.unreadCount > 0) :
                    filter === 'Favourites' ? false : // Assuming no favourites data yet
                        filter === 'Groups' ? false : true; // Assuming no groups data yet

        return matchesSearch && matchesFilter;
    });

    return (
        <div className="w-full bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
            {/* Header */}
            <div className="p-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                    LOREM <span className="font-normal text-slate-500">ISPUM</span>
                </h1>
                <div className="flex items-center gap-2 text-gray-500">
                    <button className="p-1 hover:bg-gray-100 rounded-full">
                        <UserPlus size={20} />
                    </button>
                    <button
                        ref={menuRef}
                        className="p-1 hover:bg-gray-100 rounded-full relative"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <MoreVertical size={20} />
                        {isMenuOpen && (
                            <div className="absolute top-8 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 flex flex-col py-2">
                                <MenuItem icon={<UserPlus size={16} />} label="New Group" />
                                <MenuItem icon={<Star size={16} />} label="Spotlighted Messages" />
                                <MenuItem icon={<Trash2 size={16} />} label="Delete Contacts" borderBottom />
                                <MenuItem icon={<VolumeX size={16} />} label="Mute Notifications" active />
                                <MenuItem icon={<MessageSquareX size={16} />} label="Clear Chats" />
                                <MenuItem icon={<CheckCheck size={16} />} label="Read All Chats" />
                                <MenuItem icon={<Calendar size={16} />} label="Scheduled Messages" />
                                <MenuItem icon={<Clock size={16} />} label="Add Status" />
                            </div>
                        )}
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="px-4 pb-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-100 text-gray-700 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-200 text-sm"
                    />
                    <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" size={18} />
                </div>
            </div>

            {/* Filters */}
            <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
                {['All', 'Unread', 'Groups', 'Favourites'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={clsx(
                            'px-4 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                            filter === f
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-transparent text-gray-500 hover:bg-gray-50 border border-transparent hover:border-gray-200'
                        )}
                    >
                        {f}
                    </button>
                ))}
                <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
                    <div className="rotate-90">
                        <Filter size={16} />
                    </div>
                </button>
            </div>

            {/* Contact List */}
            <div className="flex-1 overflow-y-auto">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <div
                            key={contact.id}
                            onClick={() => onSelectContact(contact)}
                            className={clsx(
                                'flex items-start gap-3 p-4 cursor-pointer hover:bg-slate-50 transition-colors border-b border-gray-50/50',
                                selectedContactId === contact.id ? 'bg-slate-50 border-l-4 border-l-indigo-500 pl-[12px]' : 'pl-4'
                            )}
                        >
                            <div className="relative shrink-0">
                                <Image
                                    src={contact.avatar}
                                    alt={contact.name}
                                    width={48}
                                    height={48}
                                    className="rounded-full object-cover w-12 h-12"
                                />
                                {contact.status === 'online' && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                                {contact.status === 'away' && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white rounded-full"></div>
                                )}
                            </div>

                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h3 className="font-semibold text-slate-800 text-sm">{contact.name}</h3>
                                    <span className="text-[10px] text-gray-400 font-medium">{contact.lastMessageTime?.includes('am') || contact.lastMessageTime?.includes('pm') ? contact.lastMessageTime : contact.lastMessageTime?.split(' ').slice(0, 3).join(' ')}</span>
                                </div>
                                <p className="text-xs text-indigo-400 mb-1">{contact.role}</p>
                                <div className="flex items-center justify-between">
                                    <p className={clsx("text-xs truncate max-w-[85%]", contact.unreadCount ? "text-slate-700 font-medium" : "text-gray-500")}>
                                        {contact.lastMessage}
                                    </p>
                                    {contact.unreadCount && (
                                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                                            {contact.unreadCount}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6 text-gray-500 space-y-3">
                        {filter === 'Groups' ? (
                            <>
                                <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-400">
                                    <UserPlus size={32} />
                                </div>
                                <h3 className="text-slate-800 font-semibold">No Groups Yet</h3>
                                <p className="text-xs max-w-[200px]">You haven't joined any groups. Create a new group to start collaborating with your team.</p>
                                <button className="mt-2 text-xs bg-indigo-600 text-white px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
                                    Create Group
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                                    <Search size={32} />
                                </div>
                                <p className="text-sm">No contacts found</p>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatList;

const MenuItem = ({ icon, label, active = false, borderBottom = false }: { icon: React.ReactNode, label: string, active?: boolean, borderBottom?: boolean }) => (
    <div className={clsx(
        "flex items-center gap-3 px-4 py-2.5 text-sm cursor-pointer hover:bg-gray-50 transition-colors",
        active ? "bg-slate-50 relative" : "text-gray-600",
        borderBottom ? "border-b border-gray-100 mb-1 pb-3" : ""
    )}>
        {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-amber-500" />}
        <span className={clsx(active ? "text-slate-800" : "text-gray-400")}>{icon}</span>
        <span className={clsx("font-medium", active ? "text-slate-900" : "")}>{label}</span>
        {label === 'New Group' || label === 'Read All Chats' || label === 'Scheduled Messages' ? <div className="ml-auto"><div className="w-1.5 h-1.5 rounded-full bg-transparent"></div></div> : <div className="ml-auto text-gray-300 transform rotate-[-90deg] text-[10px]">
        </div>}
        <div className="ml-auto text-gray-400">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 9L5 5L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
    </div>
)
