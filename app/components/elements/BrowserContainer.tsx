"use client";

import { Chrome } from "lucide-react";
import { useState } from 'react';
import DynamicLoader from "../template-builder/DynamicLoader";

interface BrowserContainerProps {
  children: React.ReactNode;
  url?: string;
  childrenData?: any;
}

export const explain = {
  name: "Browser Container",
  icon: <Chrome />,
  description: "A browser container component that displays a browser interface with a URL bar and traffic lights.",
}

export default function BrowserContainer({ children, childrenData, url = "https://example.com" }: BrowserContainerProps) {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className={`w-full rounded-lg shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Browser Header */}
      <div className={`${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-t-lg border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* Traffic Lights and Theme Toggle */}
        <div className="flex items-center px-4 py-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          
          {/* URL Bar */}
          <div className="flex-1 mx-4">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-md px-3 py-1 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} flex items-center`}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {url}
            </div>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`px-3 py-1 rounded-md ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-600'}`}
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
      
      {/* Browser Content */}
      <div className={`p-4 ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>
        { children }
        { childrenData && <DynamicLoader components={ childrenData } /> }
      </div>
    </div>
  );
}
