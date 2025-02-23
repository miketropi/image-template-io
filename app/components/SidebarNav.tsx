"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FileText, Settings, LogOut, Sidebar, User } from 'lucide-react';

export default function SidebarNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: Home
    },
    {
      name: 'Profile',
      href: '/dashboard/profile',
      icon: User
    },
    {
      name: 'Templates', 
      href: '/dashboard/templates',
      icon: FileText
    },
    {
      name: 'Settings',
      href: '/dashboard/settings', 
      icon: Settings
    }
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-6">
        <h2 className="text-xl font-bold text-gray-800">
          <div className="flex items-center gap-2">
            <Sidebar className="w-6 h-6" />
            <span>Menu</span>
          </div>
        </h2>
      </div>

      <nav className="flex-1 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <hr className="my-4" />

      <div className="px-2 py-4">
        <button 
          onClick={() => {/* Add logout handler */}}
          className="flex items-center gap-3 px-3 py-2 w-full text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
