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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { GetStaticProps, GetStaticPaths } from 'next';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
    message: "First must be at least 2 characters.",
  }),
})

 
export type School = {
  rows:[{
  id: number;
  name: string;
  email: string;
  school_location: string;
  cellphone: string; }]
}

type CardProps = React.ComponentProps<typeof Card>


interface PostConfig {
  venue_name: string;
  frontMatter: FrontMatterConfig;
}

interface FrontMatterConfig {
  id: string;
}
//const School : React.FC<SchoolProps> = ({ params }: { params: { id: string} }, { className, ...props }: CardProps) => {
 // const School: React.FC<SchoolProps> = ({ params, className, ...props }) => {
//const ReadStudentsWithSchoolIDPage = ({ params }: { params: { id: string,schoolname: string} }) => {
const School = ({ params }: { params: { id: string} }, { className, ...props }: CardProps) => {
  //const School : React.FC<PostConfig> = (frontMatter, { className, ...props }: CardProps) => {
  //holder teachers data
  const [schooldata, setSchools] = useState<School | null>();

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get(`/api/schools?id=${params.id}`);
        setSchools(prevState=> {
          return {...prevState,  ...response.data };
        })
        
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchSchools();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstname: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //const response = await axios.post('YOUR_API_ENDPOINT', values);
   // const res = await axios.post('../api/students', { values});
   alert("Buntu")
   // console.log(res)
    console.log(values)
  }



  return (
    <>
      <section className='flex justify-center shadow-lg min-h-screen'>
          <div className='w-11/12 m-4 rounded-sm bg-white'>
              <h1 className='text-center mt-3 font-bold text-3xl'>
                Schools Buntu
              </h1>
              <div className='flex items-center flex-wrap mt-20 justify-center gap-4'>
              {schooldata?.rows.map((school, index) => (
                <> 
                <Link href={`/studentdetails/${school.id}/${school.name}/read?schoolname=${school.name}`}>
                
                <Card className="w-[350px]">
                      <CardHeader>
                        <CardTitle>{school.name} {index}</CardTitle>
                        <CardDescription>Registered Student.</CardDescription>
                      </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                {school.school_location} 
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
export default School
