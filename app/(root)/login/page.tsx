
"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { BASE_URL } from '@/config/config'
import axios from 'axios'

import{Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation'; // Import useRouter hook

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import jwt from 'jsonwebtoken'

const formSchema3 = z.object({
  username: z.string().min(2, {
    message: "Please enter username.",
 }),
  password: z.string().min(2, {
    message: "Please enter password.",
  })
})

export type Message = {
  message: string;
}

const LoginPage = () => {
  const [response, setResponse] = useState<Message | null>();
  const router = useRouter(); // Initialize useRouter
  
  const form = useForm<z.infer<typeof formSchema3>>({
    resolver: zodResolver(formSchema3),
    defaultValues: {
      username: "",
      password: "",
      
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema3>) {
    
    await axios.post(`${BASE_URL}/api/login`, { values }, {
      headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
      }
    })
    .then(response => {
      // Handle response
      //console.log(response)

      const { access_token } = response.data;
      const final_token = jwt.decode(access_token)
      console.log(jwt.decode(response.data.access_token))
      Cookies.set('access_token', access_token);
     // Cookies.set('response', response.data);
      
      router.push('/'); 
      window.location.reload(); 
      
      //setResponse(response.data.access_token);
     // setResponse(prevState=> {
      //  return {...prevState,  ... response.data};
     // })
      form.resetField("username");
      form.resetField("password");
    })
    .catch(error => {
      // Handle error
      console.error('Error occurred:', error);
      setResponse(error?.response?.data?.message);
    

    });
    
  }

  return (
    <section className='flex justify-center shadow-lg min-h-screen'>
      <div className='w-11/12 m-4 rounded-sm bg-white'>
          <Card className="w-[350px] ml-auto mr-auto">
          <div>
                <Alert>
                          <AlertTitle></AlertTitle>
                          <AlertDescription>
                            { JSON.stringify(response) }
                          </AlertDescription>
                    </Alert>
                </div>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Provide Login Detais.</CardDescription>
              <CardDescription>
                    
              </CardDescription>
            </CardHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                         
            <CardContent>
                <div className="grid w-full items-center gap-4">
                  
                
                        <FormField
                                      control={form.control}
                                      name="username"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-right">Username</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Username" {...field} />
                                          </FormControl>
                                          <FormDescription>
                                            
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                          />

                          <FormField
                                      control={form.control}
                                      name="password"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-right">password</FormLabel>
                                          <FormControl>
                                            <Input placeholder="password" {...field} />
                                          </FormControl>
                                          <FormDescription>
                                            
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                          />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
            </Form> 
          </Card>
      </div>
    </section>

  )
}

export default LoginPage
