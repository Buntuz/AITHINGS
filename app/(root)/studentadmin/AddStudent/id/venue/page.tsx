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

const formSchema1 = z.object({
  
  firstname: z.string().min(2, {
    message: "First must be at least 2 characters.",
  }),
})

 
export type Teacher = {
  rows:[{
  id: number;
  name: string;
  email: string;
  cellphone: string; }]
}

type CardProps = React.ComponentProps<typeof Card>

const StudentAdd : React.FC = ({ className, ...props }: CardProps) => {

  //holder teachers data
  const [teacherdata, setTeachers] = useState<Teacher | null>();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        
        const response = await axios.get(`/api/students?id=${1}`);
        console.log(response.data)
        const { teachers } = response.data;

        setTeachers(prevState=> {
          return {...prevState,  ...response.data };
        })

        //setTeachers(teachers);
        console.log(teacherdata)
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema1>>({
    resolver: zodResolver(formSchema1),
    defaultValues: {
      firstname: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmitssd(values: z.infer<typeof formSchema1>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //const response = await axios.post('YOUR_API_ENDPOINT', values);
    const res = await axios.post('/api/students', { values});
    console.log(res)
    console.log(values)
  }



  return (
    <>
    <p>{ teacherdata && JSON.stringify(teacherdata.rows)}  ssasa
    </p>
    
    <div>
      <h1>Teachers</h1>
      <ul>
        {teacherdata?.rows.map((teacher, index) => (
          <>
          <li key={teacher.id}>{teacher.name}</li>
          <li key={index}>{teacher.email}</li>
          </>
        ))}
      </ul>
        </div>
  
    <Card className="w-[650px]">
      <CardHeader>
        <CardTitle>Student Admin</CardTitle>
        <CardDescription>Register Student.</CardDescription>
      </CardHeader>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitssd)} className="space-y-8">
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
                            <Input placeholder="shadcn" {...field} />
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
                    <Label htmlFor="name">Last Name</Label>
                    <Input id="lastname" placeholder="Last Name" />
                  </div>

                  <RadioGroup defaultValue="comfortable">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="default" id="r1" />
                    <Label htmlFor="r1">Default</Label>
                  
                    <RadioGroupItem value="comfortable" id="r2" />
                    <Label htmlFor="r2">Comfortable</Label>
                  
                    <RadioGroupItem value="compact" id="r3" />
                    <Label htmlFor="r3">Compact</Label>
                  </div>
                </RadioGroup>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">School</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                      </SelectContent>
                    </Select>
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

    </>
  )
}
export default StudentAdd

