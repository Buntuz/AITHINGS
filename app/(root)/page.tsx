//https://ui.shadcn.com/docs/components/accordion
//https://www.youtube.com/watch?v=_sIug3Y1YcA&list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI&index=67

"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BASE_URL } from '@/config/config'
import NavBar1 from '@/components/shared/NavBar1'
import { useTheme } from "next-themes"
import CardFlip from '../../components/CardFlip'
import FileUpload from '../../components/FileUpload'
import Footer from '@/components/shared/Footer1';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import HeroSection from '@/components/shared/HeroSection'
import AchievmentSection from '@/components/shared/AchievmentSection'
import ProjectsShowcase from '@/components/shared/Projects'
import { useScroll, motion, useSpring } from "framer-motion"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export type Venue = {
  rows:[{
  id: number;
  name: string;
  email: string;
  school_location: string;
  venue_name: string;
  venuedate: string;
  year: string,
  theme: string,
  expoyear: string,
  time: string,
  career_expo_year_id: number;
  cellphone: string; }]
}

type Event = {
  rows:[{
        id: number;
        name: string;
        date_event: string; 
        year: string,
        theme: string,
        time_event: string,
    }]
    
};

type CardProps = React.ComponentProps<typeof Card>

const Home: React.FC = ({ className, ...props }: CardProps) => {
  const { setTheme } = useTheme()
  const { scrollYProgress } = useScroll()

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [events, setEvents] = useState<Event | null>();
 
  useEffect(() => {
    const fetchVenue = async () => {
      try {
            const response = await axios.get<string>(`${BASE_URL}/api/allevents`);
            const jsonData = JSON.parse(response.data); // Convert string to JSON object
              if (jsonData) {
                setEvents(prevState=> {
                  return {...prevState,  ...jsonData };
                })
              }
      } catch (error) {
        console.error('Error fetching venue:', error);
      }
    };

    fetchVenue();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await axios.post('../api/students', { values});
  }

  return (
    <>
    <motion.div className="progress-bar" style={{ scaleX }} />
    {/*
    <div className="shadow p-4">
      <iframe src={fileUrl} width="100%" height="400px" title="File Viewer" />
    </div>
  */}
  
  <NavBar1 />
  <HeroSection />
  <AchievmentSection />
  {/*<Pricing /> */}
  <ProjectsShowcase />
  <SignedIn>
  <UserButton afterSignOutUrl='/' showName />
  </SignedIn>

  <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
  </SignedOut>
  
   <SignedIn>
     {/*<FileUpload />
    <CardFlip />*/}
   </SignedIn>

   <Footer />

    
    </>
  )
}
export default Home
