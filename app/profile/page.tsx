// app/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
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

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);  // Reset user state after logout
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
            <div className="px-6 py-8 sm:p-10">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Your Profile</h1>
                <p className="mt-4 text-lg text-gray-600">Manage your personal information and account settings</p>
              </div>

              <div className="mt-10">
                <div className="space-y-8">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Email Address</h3>
                        <p className="mt-2 text-lg font-medium text-gray-900">{user.email}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">Account ID</h3>
                        <p className="mt-2 text-lg font-medium text-gray-900 break-all">{user.id}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-8">
                    <button
                      onClick={handleLogout}
                      className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
