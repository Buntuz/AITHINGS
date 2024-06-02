//https://www.material-tailwind.com/docs/html/guide/flask
import * as React from "react"
import { FC } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from 'next/image'

import { CardProps } from '@/types/BlogType';

  export type StudyGuide = {
    rows: [{
      id: string;
      Name: string;
      SubjectName: string;
    }]
  }
  
const CardBlogBar: FC<CardProps> = ({ blogpost }): JSX.Element => {
    
    return (
        <>
              <Link href={`/blog/${blogpost.id}`}>
                    <Card key={blogpost.title} 
                    className="w-[250px] border border-gray-300 hover:border-orange-200 flex flex-col items-center transition duration-300 ease-in-out transform hover:scale-105">
                    <CardHeader>
                    <CardTitle className="font-bold text-sm text-slate-400">{blogpost.title}</CardTitle>
                    <CardDescription>
                    <div className="flex justify-center">
                        <Image src={blogpost.image} 
                        alt={blogpost.image} 
                        width={60} // specify the width
                        height={60} // specify the height
                        className="h-32 w-32 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105" />
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
                            <p className="font-bold text-sm">Project Name</p>
                            <p className="text-gray-500 text-xs">Author: John Doe</p>
                            <p className="text-gray-500 text-xs">Date: July 12, 2023</p>
                        </div>
                        </div>
                        <p className="text-gray-700">
                            {blogpost.description}
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                    
                    <Button>More..</Button>
                    </CardFooter>
                </Card>
                </Link>
      </>
    )
}

export default CardBlogBar;