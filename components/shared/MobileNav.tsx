"use client"
import React, { useEffect, useState } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";

import  Link  from 'next/link'
import Image from 'next/image'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { navLinks } from '@/constants';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import LoggedData from '../../components/shared/LoggedData'
import Cookies from 'js-cookie'; // Import js-cookie library

// Define the UserData type
type UserData = {
    userId: number;
    username: string;
    personId: number;
    schoolId: number;
    lastName: string;
    firstName: string;
    roleType: string;
  };
  
const MobileNav = () => {
    const pathname = usePathname();
    const userData = LoggedData();
    const [loggedData, setLoggedData] = useState<UserData | null>();
    const router = useRouter(); // Initialize useRouter

    useEffect(() => {
        setLoggedData(userData)
    }, [setLoggedData]);

    const handleLogout = () => {
        // Clear the access_token cookie
        Cookies.remove('access_token');
      
        // Redirect to the login page or any other page as needed
        // For example, if your login page route is '/login':
        router.push('/login'); // Make sure to import the useRouter hook from 'next/router'
        window.location.reload(); 
      };

  return (
    <header className='header'>
        <Link href='/' className='flex items-center gap-2 md:py-2'>
            <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28} />
        </Link>

        <nav className='flex gap-2'>
            <>
                <Button asChild className='button bg-purple-gradient bg-cover'>  
                                <Link href="/sign-in">Login</Link>
                            </Button>
                <Sheet>
                <SheetTrigger> 
                    <Image 
                    src="/assets/icons/menu.svg"
                    alt="menu"
                    width={32}
                    height={32}
                    className='cursor-pointer' />

                </SheetTrigger>
                <SheetContent className='sheet-content sm:w-64'>
                    <>
                        <Image
                            src="/assets/images/logo-text.svg"
                            alt="logo"
                            width={152}
                            height={23}
                            />


                        <ul className='header-nav_elements'>
                            {navLinks.map((link)=>{
                                    const isActive = link.route === pathname

                                    return(
                                        <li 
                                         className={` ${ isActive && 'gradient-text'} p-18 flex
                                         whitespace-nowrap text-dark-700` }
                                        key={link.route}
                                        >
                                                <Link className='sidebar-link cursor-pointer' 
                                                
                                                    href={link.route}>
                                                    <Image 
                                                    src={link.icon}
                                                    alt='log'
                                                    width={24}
                                                    height={24}
                                                   
                                                    />
                                                    {link.label}
                                                </Link>
                                        </li>
                                    )
                                })}

{ userData? (
                            <>
                                  <li className='flex-center cursor-pointer gap-2 p-4'>
                                    <Button onClick={handleLogout} asChild className='button bg-purple-gradient bg-cover'>  
                                        <Link onClick={handleLogout} href="/login">Log Out</Link>
        
                                    </Button>
                                </li>
                            </>
                           ):(
                            <li className='flex-center cursor-pointer gap-2 p-4'>
                            <Button asChild className='button bg-purple-gradient bg-cover'>  
                                <Link href="/sign-in">Login</Link>
                            </Button>
                            </li>
                           )}  

                           
                            </ul>

                    </>
                </SheetContent>
                </Sheet>

            </>

         {/*     <>
                    <Button asChild className='button bg-purple-gradient bg-cover'>
                        <Link href="/sign-in">Login</Link>
                    </Button>
            </> */}
        </nav>
    </header>
  )
}
export default MobileNav
