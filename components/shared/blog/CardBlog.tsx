//https://www.material-tailwind.com/docs/html/guide/flask
import * as React from "react"
import { FC } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import Image from 'next/image'

  export type StudyGuide = {
    rows: [{
      id: string;
      Name: string;
      SubjectName: string;
    }]
  }
  
  export type Student = {
    id: number;
    book_id: number;
    student_id: number;
    name: string;
    email: string;
    school_location: string;
    schoolname: string;
    firstname: string;
    venue_name: string;
    lastname: string;
    gender: string;
    book_type: string;
    cellphone: string;
  }
  
 
  // Define the blog post data array using the BlogPost interface
const blogPostData = [
    {
      id: 1,
      title: 'How to Build a Blog with React and Tailwind CSS',
      author: 'John Doe',
      date: 'July 12, 2023',
      image: '/path/to/image1.jpg',
      description:
        'This is post details. jdhfjdhf jfdhfjhdf jfdjhfjd',
    },
    {
      id: 2,
      title: '10 Tips for Effective Time Management',
      author: 'Jane Smith',
      date: 'August 5, 2023',
      image: '/path/to/image2.jpg',
      description:
        'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
    },
    // Add more blog post objects as needed
  ];


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

const CardBlogBar: FC<CardProps> = ({ blogpost }): JSX.Element => {
    
    return (
        <>
            {blogpost.map((post) => (
                    <Card key={post.title} className="w-[350px] border border-gray-300 hover:border-orange-200 transition duration-300 ease-in-out flex flex-col items-center">
                    <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>
                    <div className="flex justify-center">
                        <Image src={post.image} alt="Project Image" 
                         className="h-60 w-60 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105" />
                    </div>
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                    <div className="flex items-center space-x-4 mb-4">
                       {/*} <img
                            src={post.image}
                            alt="Project Image"
                            className="h-24 w-24 object-cover rounded-full"
            /> */}
                        <div>
                            <p className="font-bold">Project Name</p>
                            <p className="text-gray-500">Author: John Doe</p>
                            <p className="text-gray-500">Date: July 12, 2023</p>
                        </div>
                        </div>
                        <p className="text-gray-700">
                            {post.description}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    
                    <Button>More..</Button>
                    </CardFooter>
                </Card>

            ))}
      </>
    )
}

export default CardBlogBar;