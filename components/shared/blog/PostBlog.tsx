"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import CategoriesBlog from "@/components/shared/blog/shared/CategoriesBlog"
import { BASE_URL } from "@/config/config";
import useApiPost from '@/components/hooks/useApiPost'
import useApiFetch from '@/components/hooks/useApiFetch'
import axios from "axios";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Image from 'next/image'
import mountains from '../../../public/SpaceCity.jpg'

const FormSchema = z.object({
    post: z.string().min(10, {message: "Post must be at least 10 characters.",})
    .max(160, {message: "Post must not be longer than 100 characters.",}),
    title: z.string().min(10, {message: "Title must be at least 10 characters.",})
    .max(160, {message: "Bio must not be longer than 30 characters.",}),
    category_id: z.string().min(1, {message: "Select category ID",})
    .max(1, {message: "Category ID must be selected.",}),
    author_id: z.string().min(1, {message: "Select author",})
    .max(5, {message: "Author ID.",}),
    currentDate: z.string().min(1, {message: "Lets have date",})
    .max(50, {message: "Lets have date.",}),
    
})

// Define a TypeScript interface for the blog post data
interface BlogPost {
    map(arg0: (post: any) => React.JSX.Element): unknown;
    id: number;
    title: string;
    author: string;
    date: string;
    image: string;
    description: string;
  }

interface CardProps {
    blogpost: BlogPost
  }


  interface Comment {
    id: number;
    name: string;
    description: string;
  }

  export type StudyGuide = {
    [x: string]: any;
    rows:[{
    id: string;
    Name: string;
    SubjectName: string;
     }]
  }
  
  const defaultStudyGuide: StudyGuide = {
    rows:[{
      id: "0",
      Name: "No Subject",
      SubjectName: "No Subject ",
       }]
  };
const PostBlog: FC<CardProps> = ({ blogpost }): JSX.Element => {

    const [categorydata, setCategory] = useState<StudyGuide | typeof defaultStudyGuide>();
    const { datapost, isLoading, error, postData } = useApiPost();

    const { dataFetched: dataFetched, isLoading: isLoadingData, error: dataError, fetchData:fetchData} = useApiFetch();
    const [isVisible, setIsVisible] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        category: '',
        author_id: '569',
        currentDate: '0'
        // Other fields as needed
      });

    const apiUrl = `${BASE_URL}/api/categorylist`;
        const headers = {method: 'GET',
          config: { 
            headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'content-type': 'application/x-www-form-urlencoded',
           // 'Authorization': `Bearer `+ localStorage.getItem('accessToken')
            }
            },
          headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer `+ localStorage.getItem('accessToken')
          }
        }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
        title: "",
        post: "",
        currentDate: "0",
        author_id: '569',
        
      }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    
   // const { name, value } = e.target;
    //setFormData((prevData) => ({
    //    ...prevData,
       // [name]: value,
    //  }));

   
    
    //const author_id = 1;
    //values.author_id = author_id.toString()
    // Get the current date
const currentDate = new Date();

// Get the year, month, and day components of the current date
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because month is zero-based
const day = String(currentDate.getDate()).padStart(2, '0');

// Create the formatted date string in "YYYY-MM-DD" format
const formattedDate = `${year}-${month}-${day}`;

// Now you can use formattedDate in your values object or wherever you need it
values.currentDate = formattedDate;

    alert(JSON.stringify(values))
    const imagefile = ''

    

          const url = `${BASE_URL}/api/savepost`;
          const response = await postData(url, values);
          
          
         // alert(JSON.stringify(response));

    return false;

    //form.reset();
    form.resetField("post");
    form.resetField("title");
    form.resetField("category_id");
    form.resetField("author_id");

    //alert(JSON.stringify({ values}))
    return false;
   // return false;
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //const response = await axios.post('YOUR_API_ENDPOINT', {nae:"dsds"});

    
    
        await axios.post(`${BASE_URL}/api/savestudents`, { values})
        .then(response => {
          // Handle successful response
          //console.log('Response:', response.data);
         // setResponse(response.data);

        })
        .catch(error => {
          // Handle error
          if (error.response) {
            // The request was made and the server responded with a status code
            console.log('Response data:', error.response.data);
            console.log('Response status:', error.response.status);
            console.log('Response headers:', error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log('Request:', error.request);
          } else {
            // Something happened in setting up the request that triggered an error
            console.log('Error:', error.message);
          }
          console.error('Error occurred:', error);
        });

  }

    function onSubmitd(data: z.infer<typeof FormSchema>) {
        toast({
        title: "You submitted the following values:",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
        })
    }

    useEffect(() => {
     
        const fetchAll = async () => {
            const response = fetchData(apiUrl, headers);
        }
       
        fetchAll()
        setCategory( JSON.parse(dataFetched? dataFetched: "{}") )
         

    }, [dataFetched]);

  

  return (
    <div className="container flex justify-center  px-4 m-auto">

{/* https://nextjs.org/docs/pages/building-your-application/optimizing/images
https://nextjs.org/docs/pages/api-reference/components/image
*/}
<div className="pr-2" style={{ display: 'flex', flexDirection: 'column' }}>
      <Image
        alt="Mountains"
        // Importing an image will
        // automatically set the width and height
        src={mountains}
        sizes="100vw"
        // Make the image display full width
        style={{
          width: '100%',
          height: 'auto',
        }}
      />
    </div>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        
      <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter title"
                  className="h-1 resize-y border-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> other users and organizations.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
    
          
    {categorydata?.rows? (
                                       
                                            <FormField
                                                control={form.control}
                                                name="category_id"
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
                                                        {categorydata?.rows?.map((school, index) => (
                                                            <SelectItem key={index} value={school.id.toString()}>{school.Name}</SelectItem>
                                                        ))}
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                    </FormItem>
                                                )}

                                                />
                                      ) : (
                                        <b>No data available.</b>
                                      )}

                    <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Post Content</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="Enter and type your post"
                            className="resize-none border-none"
                            {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            You can <span>@mention</span> other users and organizations.
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />


                            {!isVisible &&  <FormField
                                  control={form.control}
                                  name="author_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder="Author" {...field} />
                                      </FormControl>
                                      
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />}

                        {!isVisible &&  <FormField
                                  control={form.control}
                                  name="currentDate"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder="Date" {...field} />
                                      </FormControl>
                                      
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />}

                            {datapost && (
                                <div style={{ textAlign: 'center' }}>
                                  <pre>{JSON.stringify(datapost)}</pre>
                                  
                                </div>
                              )}

            <Button type="submit">Submit</Button>
      </form>
    </Form>
    </div>
  )
}
export default PostBlog;

function sharp(arg0: any) {
    throw new Error("Function not implemented.");
}
