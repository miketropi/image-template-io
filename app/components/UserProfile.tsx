"use client";

import { useEffect, useState } from "react";
import { createPagesBrowserClient, User } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";

export default function UserProfile() {
  const supabase = createPagesBrowserClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    }
    fetchUser();
  }, []);

  if (!user) return <>
    <Link href="/auth/login">Login</Link>
  </>;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <div className="group cursor-pointer text-black">
          <div className="flex items-center gap-2">
            Welcome, {user.email}
          </div>
          <div className="absolute right-0 pt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 invisible group-hover:visible">
            <Link
              href="/dashboard"
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </Link>
            <button 
              onClick={async () => {
                await supabase.auth.signOut();
                setUser(null);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
