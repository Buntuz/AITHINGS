"use client"
import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
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

const SideBar = () => {
    const pathname =  usePathname();
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
    <>
    {userData?.userId && userData.userId > 0 && (
    <aside className='sidebar'>
        <div className='flex size-full flex-col gap-4'>
            <Link href="/" className="sidebar-log0">
                <Image src="/assets/images/logo.png" alt="logo" width={180} height={28} />
            </Link>  
            <nav className='sidebar-nav'>
                <>
                    <ul className='sidebar-nav_elements'>
                        {navLinks.slice(0,3).map((link)=>{
                            const isActive = link.route === pathname
                           // const shouldRenderLink = !(userData?.roleType === 'teacher' && link.route === '/studentdetails/readstudents');
                            const shouldRenderLink = !(userData?.roleType === 'teacher' && link.route === '/studentdetails/readstudents');

                            return shouldRenderLink && (
                                <li key={link.route} className={`sidebar-nav_element group ${
                                    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                                }`}>
                                        <Link className='sidebar-link' href={link.route}>
                                            <Image 
                                            src={link.icon}
                                            alt='log'
                                            width={24}
                                            height={24}
                                            className={`${isActive && 'brightness-200'}`}
                                            />
                                            {link.label}
                                        </Link>
                                </li>
                            )
                        })}
                        </ul>
                   
                    <ul className='sidebar-nav_elements'>

                    {navLinks.slice(3).map((link)=>{
                            const isActive = link.route === pathname

                            return(
                                <li key={link.route} className={`sidebar-nav_element group ${
                                    isActive ? 'bg-purple-gradient text-white' : 'text-gray-700'
                                }`}>
                                        <Link className='sidebar-link' href={link.route}>
                                            <Image 
                                            src={link.icon}
                                            alt='log'
                                            width={24}
                                            height={24}
                                            className={`${isActive && 'brightness-200'}`}
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
            </nav>

            
        </div>
    </aside>
    )}
    </>
  )
}

export default SideBar
