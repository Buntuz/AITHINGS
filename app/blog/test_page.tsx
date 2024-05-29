//https://ui.shadcn.com/docs/components/accordion
"use client"
import React from 'react'
import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../components/shared/ProtectedRoute';

import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken'
import { BASE_URL } from '@/config/config'
import LoggedData from '../../components/shared/LoggedData'

import CardFlip from '../../components/CardFlip'
import FileUpload from '../../components/FileUpload'

import Image from 'next/image';

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

type AccessToken = {
  fresh: boolean;
  iat: string;
  exp: string;
  message:[
    number, // user_id
    string, // username
    number, // person_id
    number, // school_id (assuming it's a number)
    string, // last_name
    string, // first_name
    string  // role_type
  ];

  // Add other properties as needed
};

type AccessTokenMessage = [
  number, // user_id
  string, // username
  number, // person_id
  number, // school_id (assuming it's a number)
  string, // last_name
  string, // first_name
  string  // role_type
];

type CardProps = React.ComponentProps<typeof Card>

const Home: React.FC = ({ className, ...props }: CardProps) => {

   const userData1 = LoggedData();
  //holder teachers data
  const [venuedata, setVenue] = useState<Venue | null>();
  const [events, setEvents] = useState<Event | null>();
  const [fileUrl, setFileUrl] = useState('https://revolvingloan.siyahlumainvest.co.za/data/api/uploads/loan_comments/Nondwe.pdf');

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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //const response = await axios.post('YOUR_API_ENDPOINT', values);
    const res = await axios.post('../api/students', { values});
   //alert("Buntu")
   // console.log(res)
    //console.log(values)
  }

  return (
    <>
    {/*
    <div className="shadow p-4">
      <iframe src={fileUrl} width="100%" height="400px" title="File Viewer" />
    </div>
  
    <FileUpload />
    <CardFlip /> */}

   {/* <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          */}
      <section className='flex justify-center shadow-lg min-h-screen'>
          <div className='w-11/12 m-4 rounded-sm bg-white'>
              <h3 className='text-center mt-0 font-bold text-1xl'>

                  {userData1 && (
                  <>
                   {userData1.schoolId} {userData1.lastName} {userData1.firstName} {userData1.roleType}
                  </>
                )}

              </h3>

              <div className='flex items-center flex-wrap mt-20 justify-center gap-4'>
              {events?.rows?.map((venue, index) => (
                <>
                <Link key={venue.id} href={`/studentadmin?vanueid=${venue.id}&venuname=${venue.name}`}>
                
                <Card key={venue.id} className="w-[350px]">
                      <CardHeader>
                        <CardTitle>{venue.name}</CardTitle>
                        <CardDescription> {venue.year} Theme: {venue.theme} </CardDescription>
                      </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    {venue.date_event} 
                                </div>
                                <div className="grid w-full items-center gap-4">
                                    {venue.time_event} 
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              
                              <Button type="submit">More</Button>
                            </CardFooter>
                </Card>
                
                </Link>
                </>
              ))}
              </div>
          </div>
  </section>
    </>
  )
}
//export default Home
export default ProtectedRoute(Home);
