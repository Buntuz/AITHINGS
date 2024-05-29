"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import React, { ChangeEvent } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { Suspense } from 'react'
import { BASE_URL } from '@/config/config';

import SubjectSelect from "@/components/shared/SubjectSelect"
import ProtectedRoute from '@/components/shared/ProtectedRoute';
import TopBar from '@/components/shared/TopBar'
import HeroBar from '@/components/shared/HeroBar'
import BannerBar from '@/components/shared/BannerBar';
import FeatureBar from '@/components/shared/FeatureBar';
import PostBlog from '@/components/shared/blog/PostBlog';

import { withAuth } from '@/hoc/withAuth';

export type Student = {
  rows:[{
  id: number;
  name: string;
  email: string;
  school_location: string;
  firstname: string;
  lastname: string;
  gender: string;
  cellphone: string; 
  book_id: number;  
  student_id: number; 
  schoolname: string; 
  venue_name: string; 
  book_type: string; 
}]
}


export type StudyGuide = {
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

const ReadStudentsWithSchoolIDPage = () => {
  const pathname = usePathname();
  const [file, setFile] = useState(null);

  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap with SuspenseBoundary */}
      <StudentAdminPage />
    </Suspense>
  );
};

const StudentAdminPage = () => {

  const [studentdata, setStudentDetails] = useState<Student | null>();
  const [schoolnamedata, setSchoolName] = useState<string>('');
  const [studyguidedata, setStudyGuide] = useState<StudyGuide | typeof defaultStudyGuide>();
  
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
       // const decodedString = decodeURIComponent(params.schoolname as string);
        //const response = await axios.get(`/api/studentdetails/${params.id}/read`);
        const schoolid = searchParams.get('schoolid');
        const schoolname = searchParams.get('schoolname');
        if(schoolname){
          setSchoolName(schoolname);
        }
       // const response = await axios.get(`/api/students?id=${schoolid}`);\
        const response = await axios.get(`${BASE_URL}/api/studentbyschoolID?id=${schoolid}`);
        const jsonData = JSON.parse(response.data); // Convert string to JSON object
        setStudentDetails(prevState=> {
          return {...prevState,  ...jsonData };
        })
        
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchStudyGuides = async () => {
      try {
        
        //const response = await axios.get(`/api/studyguides`);
        const response = await axios.get<string>(`${BASE_URL}/api/studyguides`);
        //const jsonData = JSON.parse(response.data); // Convert string to JSON object
        
        const jsonData: StudyGuide = JSON.parse(response.data); // Assuming JSON data is of type StudyGuide
        setStudyGuide(jsonData)
        //setStudyGuide(prevState=> {
        //  return {...prevState,  ... jsonData};
       // })
       
       
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
    fetchStudyGuides();

  }, []);
  
  
  function handleFileChange(event: ChangeEvent<HTMLInputElement>): void {
    
      //const selectedFile = event.target.files[0];
   //const name = (1 > 3) ? 7 : 8;

   

    //throw new Error('Function not implemented.');
  }

 

  return (
    <>
    <TopBar />
    <br /> <br /> <br />
   {/*} <BannerBar/>
     */}


  <PostBlog /> 

  <Input
      type="file"
      onChange={handleFileChange}
      color="secondary"
    />
  
  <Button className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4'>
    Student
    </Button>

    </>
  )}

export default withAuth(ReadStudentsWithSchoolIDPage, 'admin');

//export default ProtectedRoute(ReadStudentsWithSchoolIDPage)
