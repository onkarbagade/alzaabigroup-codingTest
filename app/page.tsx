'use client';

import React, { useState } from 'react';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import { CONTACTS, User } from '@/lib/data';
import clsx from 'clsx';

export default function Home() {
  const [selectedContact, setSelectedContact] = useState<User>(CONTACTS[0]);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const handleContactSelect = (contact: User) => {
    setSelectedContact(contact);
    setShowMobileChat(true);
  };

  const handleBackToContacts = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="flex h-full w-full relative">
      {/* Chat List - Full width on mobile if chat not active, Fixed width on desktop */}
      <div className={clsx(
        "h-full bg-white border-r border-gray-100 flex flex-col shrink-0 transition-all duration-300 ease-in-out absolute md:relative z-10 w-full md:w-96",
        showMobileChat ? "-translate-x-full md:translate-x-0" : "translate-x-0",
      )}>
        <ChatList
          onSelectContact={handleContactSelect}
          selectedContactId={selectedContact?.id}
        />
      </div>

      {/* Chat Window - Full width on mobile if active, Flex 1 on desktop */}
      <div className={clsx(
        "flex-1 h-full bg-white absolute md:relative w-full md:w-auto transition-transform duration-300 ease-in-out z-20 md:z-0",
        showMobileChat ? "translate-x-0" : "translate-x-full md:translate-x-0"
      )}>
        <ChatWindow
          contact={selectedContact}
          onBack={handleBackToContacts}
        />
      </div>
    </div>
  );
}
