'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import UserProfile from "./UserProfile";

export default function Navbar() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any  
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      }
    };
    getSession();
  }, []);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
            <Link href="/" className="text-gray-900 font-bold">Image Template / io</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-800 hover:text-gray-600 px-3 py-2">Home</Link>
              <Link href="/features" className="text-gray-800 hover:text-gray-600 px-3 py-2">Features</Link>
              <Link href="/pricing" className="text-gray-800 hover:text-gray-600 px-3 py-2">Pricing</Link>
              <Link href="/contact" className="text-gray-800 hover:text-gray-600 px-3 py-2">Contact</Link>
            </div>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <UserProfile />
                </div>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="text-gray-800 hover:text-gray-600 px-3 py-2">Login</Link>
                <Link href="/auth/signup" className="bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-2 rounded-md">Sign up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 