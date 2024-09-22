"use client";
import React from 'react'
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {User} from "next-auth"
import { Button } from './ui/button';

function Navbar() {
    const { data: session } = useSession();
    const user: User  = session?.user as User;

    const handleSignOut = () => {
      // const deployedUrl = process.env.NEXT_PUBLIC_DEPLOYED_URL || window.location.origin;
      signOut({
        callbackUrl: 'https://whisper-ol6t.onrender.com/', // Redirect to homepage after logging out
      });
    };
    
  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <a href="/" className="text-xl font-bold mb-4 md:mb-0">
          True Feedback
        </a>
        {session ? (
          <>
            <span className="mr-4">
              Welcome, {user?.username || user?.email}
            </span>
            <Button onClick={handleSignOut} className="w-full md:w-auto bg-slate-100 text-black" variant='outline'>
              Logout
            </Button>
          </>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-slate-100 text-black" variant={'outline'}>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar