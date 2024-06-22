// components/NavBar.tsx
//https://clerk.com/blog/add-onboarding-flow-for-your-application-with-clerk

"use client";

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Button } from "@/components/ui/button";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg">
          <Link href="/">Home</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/about" className="text-white">About</Link>
          <Link href="/contact" className="text-white">Contact</Link>
          <SignedIn>
            <UserButton afterSignOutUrl='/' showName />
          </SignedIn>
          <SignedOut>
            <Button asChild className="bg-purple-gradient text-white">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
