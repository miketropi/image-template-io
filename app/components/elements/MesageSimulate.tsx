'use client';

import { useState } from 'react';
import { MessageCircleMore } from 'lucide-react';
export const explain = {
  name: 'Message Simulate',
  description: 'A component that simulates a message conversation between a user and another person.',
  icon: <MessageCircleMore />,
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

interface MessageSimulateProps {
  initialMessages?: Message[];
  userAvatar?: string;
  otherAvatar?: string;
  otherName?: string;
  otherStatus?: string;
  containerClassName?: string;
  messageContainerHeight?: string;
  userMessageColor?: string;
  otherMessageColor?: string;
  userTextColor?: string;
  otherTextColor?: string;
  inputPlaceholder?: string;
  onSendMessage?: (message: Message) => void;
}

export default function MessageSimulate({
  initialMessages = [
    {
      id: 1,
      text: "Hey there! 👋",
      sender: 'other',
      timestamp: new Date('2024-01-10T10:00:00')
    },
    {
      id: 2, 
      text: "Hi! How are you?",
      sender: 'user',
      timestamp: new Date('2024-01-10T10:01:00')
    }
  ],
  userAvatar = '',
  otherAvatar = '',
  otherName = 'John Doe',
  otherStatus = 'Active now',
  containerClassName = 'w-full max-w-md mx-auto',
  messageContainerHeight = 'h-96',
  userMessageColor = 'bg-blue-500',
  otherMessageColor = 'bg-gray-200',
  userTextColor = 'text-white',
  otherTextColor = 'text-gray-800',
  inputPlaceholder = 'Type a message...',
  onSendMessage
}: MessageSimulateProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user' as const,
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMsg]);
      setNewMessage('');
      
      if (onSendMessage) {
        onSendMessage(newMsg);
      }
    }
  };

  return (
    <div className={`${containerClassName} border rounded-lg shadow-lg bg-white`}>
      {/* Header */}
      <div className="border-b p-3 bg-gray-50">
        <div className="flex items-center space-x-2">
          {otherAvatar ? (
            <img src={otherAvatar} alt={otherName} className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-500"></div>
          )}
          <div>
            <p className="font-semibold">{otherName}</p>
            <p className="text-xs text-gray-500">{otherStatus}</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className={`${messageContainerHeight} overflow-y-auto p-4 space-y-4`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'other' && otherAvatar && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={otherAvatar} alt={otherName} className="w-6 h-6 rounded-full mr-2 self-end" />
            )}
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? `${userMessageColor} ${userTextColor} rounded-br-none`
                  : `${otherMessageColor} ${otherTextColor} rounded-bl-none`
              }`}
            >
              <p>{message.text}</p>
              <p className="text-xs mt-1 opacity-70">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </p>
            </div>
            {message.sender === 'user' && userAvatar && (
              <img src={userAvatar} alt="You" className="w-6 h-6 rounded-full ml-2 self-end" />
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t p-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={inputPlaceholder}
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleSend}
            className={`${userMessageColor} ${userTextColor} rounded-full p-2 hover:opacity-90 focus:outline-none`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

