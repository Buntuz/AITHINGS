"use client";

import React, { useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import SimpleMDE from "react-simplemde-editor";
//import "easymde/dist/easymde.min.css";
import { BASE_URL } from "@/config/config";

import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css'; // Add css for the editor

const formSchema = z.object({
  title: z.string().min(2, { message: "Enter valid title." }),
  post: z.string().min(2, { message: "Please write a valid post." }),
  category_id: z.number(),
  author_id: z.number(),
});

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
//const NewArticlePage: React.FC = () => {
  export default function NewArticlePage({ params, searchParams }: PageProps) {
    
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      post: "",
      title: "",
      category_id: 0,
      author_id: 0,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    values.category_id = 1;
    values.author_id = 569;

    form.resetField("post");
    form.resetField("title");

    try {
      const response = await axios.post(`${BASE_URL}/api/savepost`, { values });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error occurred:", error);
      if (axios.isAxiosError(error) && error.response) {
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      }
    }
  };

  const [content, setContent] = useState('');

  const handleContentChange = (value: string) => {
    setContent(value);
  };



  return (
    <section className="flex justify-center shadow-lg min-h-screen bg-gray-100 p-6">
      <div className="w-11/12 m-4 rounded-sm bg-white p-6">
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <div className="grid gap-1.5">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Post</FormLabel>
                        <FormControl>
                          <Controller
                            control={form.control}
                            name="post"
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
                  <Button type="submit">Save changes</Button>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

//export default NewArticlePage;
