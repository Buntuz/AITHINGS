"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
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

import { AuthProvider } from '@/context/authContext';
import { AppProps } from 'next/app';

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

const ReadStudentsWithSchoolIDPage = ({ Component, pageProps }: AppProps) => {
  const pathname = usePathname();
  
  return (
    <AuthProvider>
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap with SuspenseBoundary */}
      <StudentAdminPage />
    </Suspense>
    </AuthProvider>
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
  
  return (
    <>
    <TopBar />
    <br /> <br /> <br />
    <BannerBar/>
    <HeroBar/>
    <FeatureBar />
  
    </>
    
    
  )
}

export default ProtectedRoute(ReadStudentsWithSchoolIDPage)
