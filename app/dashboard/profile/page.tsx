// app/profile/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface UserProfile {
  lastname?: string;
  firstname?: string;
  avatar_url?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    lastname: '',
    firstname: '',
    avatar_url: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
        // Fetch user profile data
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();
        // console.log('Profile data:', session.user.id, profileData);
        if (profileData) {
          
          setProfile(profileData);
        }
      }
    };
    getSession();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          ...profile,
          // updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .select();

      if (error) throw error;
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      await supabase.auth.refreshSession();
    } catch (error) {
      setMessage({ text: 'Error updating profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800">Please log in to view your profile</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-8 bg-gradient-to-r from-blue-500 to-blue-600">
            <h1 className="text-3xl font-bold text-white">Profile Settings</h1>
            <p className="mt-2 text-blue-100">Manage your account preferences and personal information</p>
          </div>

          {/* Message Alert */}
          {message.text && (
            <div className={`px-6 py-3 ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}

          {/* Profile Form */}
          <form onSubmit={handleProfileUpdate} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  disabled
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md text-gray-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstname"
                    value={profile.firstname || ''}
                    onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastname"
                    value={profile.lastname || ''}
                    onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-3 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Sign Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
