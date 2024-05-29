"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
//import { useRouter } from 'next/router';

export type Student = {
  rows:[{
  id: number;
  name: string;
  email: string;
  school_location: string;
  firstname: string;
  lastname: string;
  gender: string;
  cellphone: string; }]
}
const ReadStudentsWithSchoolIDPage = ({ params }: { params: { id: string,schoolname: string} }) => {

  const [studentdata, setStudentDetails] = useState<Student | null>();
  
  //const router = useRouter();
  //const { venueid, venuname } = router.query;
  
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
       // const decodedString = decodeURIComponent(params.schoolname as string);
        
        //const response = await axios.get(`/api/studentdetails/${params.id}/read`);
        const response = await axios.get(`/api/students?id=${params.id}`);
        
        const { teachers } = response.data;

        setStudentDetails(prevState=> {
          return {...prevState,  ...response.data };
        })
        
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, []);
  
  return (
    <>
      <section className='flex justify-center shadow-lg min-h-screen'>
          <div className='w-11/12 m-4 rounded-sm bg-white'>
              <h1 className='text-center mt-3 font-bold text-3xl'>
                Students: {decodeURIComponent(params.schoolname as string)}
              </h1>
              <div className='flex items-center flex-wrap mt-20 justify-center gap-4'>
              {studentdata?.rows.map((student, index) => (
                <>
                
                <Link href={`/studentdetails/${student.id}/read`}>
                
                <Card className="w-[350px]">
                      <CardHeader>
                        <CardTitle>{student.firstname} {student.lastname}</CardTitle>
                        <CardDescription>{decodeURIComponent(params.schoolname as string)}</CardDescription>
                      </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                {student.gender}  
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              <Button variant="outline">Cancel</Button>
                              <Button type="submit">Submit</Button>
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

export default ReadStudentsWithSchoolIDPage
