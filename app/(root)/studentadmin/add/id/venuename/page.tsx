//https://ui.shadcn.com/docs/components/accordion
//https://ui.shadcn.com/docs/components/form

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
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import Link from 'next/link'

import { GetStaticProps, GetStaticPaths } from 'next';
import { useRouter } from 'next/router';

/*
//https://www.youtube.com/watch?v=9goIlPIFNzE
async function get(id:string) {
  const schoolids = await fetch(`https://jsonplaceholder.typicode.com/todos${id}`)
  if(!schoolids){
    throw new Error("No Data Found");
  }

  return schoolids.json();
}

interface schoolids{
  userID: String;
  id: number;
  title: string;
  completed: string;
}

export async function generateStaticParams() {
  const schooldata = await fetch(`https://jsonplaceholder.typicode.com/todos`).then((res) => res.json())
  return schooldata.map((schoolsitem: any) =>({
    schools: schoolsitem.id.toString()
  }))
}

*/

const formSchema2 = z.object({
  firstname: z.string().min(2, {
    message: "First must be at least 2 characters.",
 }),
  lastname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  school_id: z.string(),
  studyguide: z.string(),
  venue_id: z.string().default("")
  
})

 
export type School = {
  rows:[{
  id: string;
  name: string;
  email: string;
  schoolname: string;
  lastname: string;
  school_id: string;
  venue_id: string;
  school_location:string;
  cellphone: string; }]
}

export type StudyGuide = {
  rows:[{
  id: string;
  Name: string;
  SubjectName: string;
   }]
}
type CardProps = React.ComponentProps<typeof Card>

type SchoolProps = {
  school: School;
};

const AddStudent = ({ params }: { params: { id: string,venuename: string} }, { className, ...props }: CardProps) => {

  //holder teachers data
  const [schooldata, setSchools] = useState<School | null>();
  const [schooldatabyid, setSchoolsByID] = useState<School | null>();

  const [studyguidedata, setStudyGuide] = useState<StudyGuide | null>();
  const [showContent, setShowContent] = useState<boolean>(false); // State variable to control visibility

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        
        const response = await axios.get(`/api/schools`);
        setSchools(prevState=> {
          return {...prevState,  ...response.data };
        })
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchStudyGuides = async () => {
      try {
        
        const response = await axios.get(`/api/studyguides`);
        setStudyGuide(prevState=> {
          return {...prevState,  ...response.data };
        })
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };
    

    const fetchSchoolByVenueID = async () => {
      try {
        const response = await axios.get(`/api/schools?id=${params.id}`);
        setSchoolsByID(prevState=> {
          return {...prevState,  ...response.data };
        })
        
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchSchools();
    fetchStudyGuides();
    fetchSchoolByVenueID();

  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      firstname: "",
      lastname: "",
      school_id: "",
      studyguide: "",
      venue_id: params.id
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema2>) {
    
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //const response = await axios.post('YOUR_API_ENDPOINT', {nae:"dsds"});
    alert("dsdsds")
    const res = await axios.post('/api/students', { values});
    
    console.log(res)
    
    console.log(values)
  }

  const toggleContent = () => {
    setShowContent(!showContent); // Toggle the visibility state
  };

  
  return (
    <>

  <section className='flex justify-center shadow-lg min-h-screen'>
      <div className='w-11/12 m-4 rounded-sm bg-white'>
              <h1 className='text-center mt-3 font-bold text-3xl'>
                <Button onClick={toggleContent} variant="secondary">Add Student</Button>
              </h1>
          {/*
          <Card className="w-[650px] mt-7" hidden={!showContent}>
            <CardHeader>
            <CardTitle>{decodeURIComponent(params.venuename as string)}</CardTitle>
            <CardDescription>Add Student.</CardDescription>
          </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-1.5">

                      <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>


                    <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="lastname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Surname" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>


                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="school_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="School Name" {...field} />
                              </FormControl>
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="studyguide"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input placeholder="Study guide" {...field} />
                              </FormControl>
                              
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>

                          
                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="school_id"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select School</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a school" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {schooldata?.rows.map((school, index)=>(
                                    <SelectItem key={index} value={school.id.toString()}>{school.name}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>

                      <div className="flex flex-col space-y-1.5">
                        <FormField
                          control={form.control}
                          name="studyguide"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Select study guide</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="study guide" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {studyguidedata?.rows.map((study, index)=>(
                                    <SelectItem key={index} value={study.SubjectName.toString()}>{study.Name} {study.SubjectName}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div> 

                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button type="submit">Submit</Button>
                </CardFooter>
          </form>
          </Form>
          </Card>
                                  
          */}


<Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Student</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-0 items-center gap-4">
                    
                    <FormField
                          control={form.control}
                          name="firstname"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-right">First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Name" {...field} />
                              </FormControl>
                              <FormDescription>
                                
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Surname" {...field} />
                            </FormControl>
                            <FormDescription>
                            
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                      control={form.control}
                      name="school_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="School Name" {...field} />
                          </FormControl>
                          
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studyguide"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="Study guide" {...field} />
                          </FormControl>
                          
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="school_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select School</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a school" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {schooldata?.rows.map((school, index)=>(
                                <SelectItem key={index} value={school.id.toString()}>{school.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studyguide"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Select study guide</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="study guide" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {studyguidedata?.rows.map((study, index)=>(
                                <SelectItem key={index} value={study.SubjectName.toString()}>{study.Name} {study.SubjectName}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                </div>  

                 <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>

            </form>

          </Form>
        </div>
       
      </DialogContent>
</Dialog>



    <div className='flex items-center flex-wrap mt-20 justify-center gap-4'>
              {schooldatabyid?.rows.map((school, index) => (
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



  {/*  <Form {...form}>
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
    </>
  )
}
export default AddStudent
//http://localhost:3000/studentadmin/AddStudent/1/ffdd

