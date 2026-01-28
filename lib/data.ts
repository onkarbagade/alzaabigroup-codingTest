export interface Message {
  id: string;
  senderId: string; // 'me' or 'other'
  text?: string;
  image?: string;
  audio?: boolean; // simple flag for now
  audioDuration?: string;
  timestamp: string;
  isRead?: boolean;
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: "online" | "offline" | "away";
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export const CURRENT_USER = {
  id: "me",
  name: "Me",
  avatar: "https://i.pravatar.cc/150?u=me",
};

export const CONTACTS: User[] = [
  {
    id: "1",
    name: "Daniel Roberts",
    role: "Marketing Lead",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    status: "online",
    unreadCount: 12,
    lastMessage: "Please let me know once you're available.",
    lastMessageTime: "02 Jun 2025 11:00 am",
  },
  {
    id: "2",
    name: "James Anderson",
    role: "Operations Manager",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    status: "online",
    lastMessage:
      "Good morning, I hope you are doing well. I am writing to follow up on...",
    lastMessageTime: "08:30 am",
  },
  {
    id: "3",
    name: "Emily Carter",
    role: "NorthPeak Services",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    status: "away",
    lastMessage:
      "We are currently reviewing the details and will get back to you with an...",
    lastMessageTime: "12:15 pm",
  },
  {
    id: "4",
    name: "Michael Thompson",
    role: "Human Resources",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=150",
    status: "offline",
    lastMessage: "I've shared the updated file—kindly review.",
    lastMessageTime: "Yesterday 10:15 am",
  },
  {
    id: "5",
    name: "Sarah Williams",
    role: "Procurement Officer",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    status: "online",
    unreadCount: 8,
    lastMessage: "Thanks for the quick response.",
    lastMessageTime: "14 Jun 2025 04:20 pm",
  },
  {
    id: "6",
    name: "Matthew Johnson",
    role: "IT Administrator",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    status: "online",
    unreadCount: 11,
    lastMessage: "Can we schedule a call today?",
    lastMessageTime: "28 Mar 2025 08:30 am",
  },
  {
    id: "7",
    name: "Christopher Davis",
    role: "Customer Service Manager",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
    status: "online",
    lastMessage:
      "Please find the attached document for your review. Let us know if any...",
    lastMessageTime: "27 Jul 2025 09:40 am",
  },
  {
    id: "8",
    name: "Andrew Taylor",
    role: "Sales Coordinator",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150",
    status: "offline",
    unreadCount: 21,
    lastMessage: "I'm following up on the earlier message.",
    lastMessageTime: "08 Aug 2025 01:10 pm",
  },
];

// Main conversation with Daniel (ID: 1)
const DANIEL_MESSAGES: Message[] = [
  {
    id: "m1",
    senderId: "me",
    image: "/send%20img1.png",
    timestamp: "02 Jun 2025 10:00 am",
  },
  {
    id: "m1-2",
    senderId: "1", // Daniel
    image: "/send%20img2.png",
    timestamp: "02 Jun 2025 10:02 am",
  },
  {
    id: "m2",
    senderId: "1",
    text: "pls check the spacing issue on the dashboard cards",
    timestamp: "02 Jun 2025 10:02 am",
  },
  {
    id: "m3",
    senderId: "1",
    audio: true,
    audioDuration: "34:05",
    timestamp: "02 Jun 2025 11:00 am",
    isRead: true,
  },
  {
    id: "m4",
    senderId: "me",
    audio: true,
    audioDuration: "01:05",
    timestamp: "02 Jun 2025 11:10 am",
  },
  {
    id: "m5",
    senderId: "me",
    text: "Can you check the spacing issue on the dashboard cards?",
    timestamp: "Yesterday 11:00 pm",
    isRead: true,
  },
  {
    id: "m6",
    senderId: "me",
    text: "Great. Please push before 6 PM.\nI've updated the portfolio layout based on yesterday's discussion.\n- Reduced card height\n- Softer shadow\n- Aligned status pills to the right\nPlease review and share feedback.",
    timestamp: "Today 11:00 am",
  },
  {
    id: "m7",
    senderId: "me",
    text: "Can you check the spacing issue on the dashboard cards?",
    timestamp: "Today 11:00 am",
    isRead: true,
  },
];

const JAMES_MESSAGES: Message[] = [
  {
    id: "j1",
    senderId: "2",
    text: "Good morning, I hope you are doing well. I am writing to follow up on the proposal sent last week.",
    timestamp: "08:30 am",
    isRead: false,
  },
  {
    id: "j2",
    senderId: "me",
    text: "Hi James, yes I received it. I will review it today.",
    timestamp: "09:00 am",
  },
];

const SARAH_MESSAGES: Message[] = [
  {
    id: "s1",
    senderId: "5",
    text: "Thanks for the quick response.",
    timestamp: "14 Jun 2025 04:20 pm",
  },
  {
    id: "s2",
    senderId: "me",
    text: "No problem!",
    timestamp: "14 Jun 2025 04:25 pm",
  },
];

const REALISTIC_REPLIES_ME = [
  "I'll take a look at it shortly.",
  "Can you send me the updated file?",
  "That sounds good to me.",
  "Let's reschedule the meeting to 3 PM.",
  "Thanks for the update!",
  "I appreciate your help with this.",
  "Could you clarify the last point?",
  "I'm on it.",
  "Just submitting the report now.",
  "Have a great weekend!",
];

const REALISTIC_REPLIES_OTHER = [
  "Here is the document you asked for.",
  "I've updated the design based on your feedback.",
  "Are we still on for the call today?",
  "Please review the attached invoice.",
  "The project timeline has been updated.",
  "I'll get back to you by EOD.",
  "Do you have a minute to chat?",
  "Great work on the presentation!",
  "Let me know if you need anything else.",
  "The client approved the changes.",
];

const generateDummyMessages = (contactId: string): Message[] => {
  return Array.from({ length: 15 }).map((_, i) => {
    const isMe = i % 2 !== 0; // Alternate senders
    const isAudio = Math.random() < 0.15; // 15% chance of audio
    const isImage = !isAudio && Math.random() < 0.1; // 10% chance of image (if not audio)

    const baseMessage: Message = {
      id: `gen-${contactId}-${i}`,
      senderId: isMe ? "me" : contactId,
      timestamp: `10:${10 + i} am`,
      isRead: true,
    };

    if (isAudio) {
      return {
        ...baseMessage,
        audio: true,
        audioDuration: `0${Math.floor(Math.random() * 5)}:${10 + Math.floor(Math.random() * 50)}`,
      };
    }

    if (isImage) {
      return {
        ...baseMessage,
        image: i % 2 === 0 ? "/send%20img1.png" : "/send%20img2.png", // Reuse existing images
      };
    }

    return {
      ...baseMessage,
      text: isMe
        ? REALISTIC_REPLIES_ME[
            Math.floor(Math.random() * REALISTIC_REPLIES_ME.length)
          ]
        : REALISTIC_REPLIES_OTHER[
            Math.floor(Math.random() * REALISTIC_REPLIES_OTHER.length)
          ],
    };
  });
};

export const getMessagesForContact = (contactId: string): Message[] => {
  switch (contactId) {
    case "1":
      return DANIEL_MESSAGES;
    case "2":
      return JAMES_MESSAGES;
    case "5":
      return SARAH_MESSAGES;
    default:
      return generateDummyMessages(contactId);
  }
};

// Deprecated export for backward compatibility if needed, but we should switch to function
export const MESSAGES: Message[] = DANIEL_MESSAGES;
