"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/config/config";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Add css for the editor
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const formSchema = z.object({
  name: z.string().min(2, { message: "Enter valid Name." }),
  email: z.string().min(2, { message: "Please enter valid email." }),
  message: z.string().min(7, { message: "Please enter valid message. More than 15 words" }),
});

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function SaveContactDetails() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/savecontactform`, { values });
      console.log("Response:", response.data);
      toast.success("Message sent successfully!");
      form.reset();
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("An error occurred while sending the message.");
      if (axios.isAxiosError(error) && error.response) {
        console.log("Response data:", error.response.data);
      }
    }
  };

  const [content, setContent] = useState("");
  const handleContentChange = (value: string) => {
    setContent(value);
  };

  return (
    <>
      <ToastContainer />
      <section className="flex justify-center shadow-lg min-h-screen bg-gray-100 p-6">
        <div className="w-11/12 m-4 rounded-sm bg-white p-6">
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-4">
                  <div className="grid gap-1.5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Controller
                              control={form.control}
                              name="message"
                              render={({ field }) => (
                                <ReactQuill
                                  placeholder="Type your message here."
                                  value={field.value}
                                  onChange={field.onChange}
                                />
                              )}
                            />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button type="submit">Submit</Button>
                  </div>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
}
