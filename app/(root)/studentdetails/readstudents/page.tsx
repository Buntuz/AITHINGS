//https://tailwindcss.com/docs/font-weight
//https://ui.shadcn.com/examples/cards

"use client"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { BASE_URL } from "../../../../config/config";
import { Suspense } from 'react'
import { StudentData, GroupedData } from '../../../interfaces/interfaces';
import {Accordion,AccordionContent,AccordionItem,AccordionTrigger,} from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';

import SubjectSelect from "../../../../components/shared/SubjectSelect"
import ProtectedRoute from '../../../../components/shared/ProtectedRoute';

export type Student = {
  rows:[{
  id: number;
  book_id: number;
  name: string;
  email: string;
  school_location: string;
  schoolname: string;
  firstname: string;
  venue_name: string;
  lastname: string;
  gender: string;
  book_type: string;
  cellphone: string; }]
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

// Now define the type for groupedData
//interface GroupedData {
//  [key: string]: Student[]; // Key is string, value is array of StudentData
//}

const ReadStudentsWithSchoolIDPage = () => {
  const pathname = usePathname();
  
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap with SuspenseBoundary */}
      <StudentAdminPage />
    </Suspense>
  );
};

const StudentAdminPage = () => {

  const [studyguidedata, setStudyGuide] = useState<StudyGuide | typeof defaultStudyGuide>();
  //const [tobeGroupData, setGroupedData] = useState<GroupedData | null>();
  const [tobeGroupData, setGroupedData] = useState<GroupedData>({});

  useEffect(() => {

    const fetchData = async () => {
      try {
       // const response = await axios.get<{ rows: StudentData[] }>(`${BASE_URL}/api/studentlist`);
        //const data = response.data;

        const response = await axios.get<string>(`${BASE_URL}/api/studentlist`);
        const data = JSON.parse(response.data);
       
        // Perform the grouping operation
        const groupedData: GroupedData = data?.rows?.reduce((groups: GroupedData, item: StudentData) => {
          const group = groups[item.schoolname] || [];
          group.push(item);
          groups[item.schoolname] = group;
          return groups;
        }, {}) || {};
        
        console.log(groupedData)
        setGroupedData(prevState=> {
          return {...prevState,  ...groupedData };
        })

       // console.log(tobeGroupData)
       // setGroupedData(groupedData);
      } catch (error) {
        console.error('Error fetching data:', error);
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

    fetchStudyGuides();
    fetchData();
    

  }, []);
  
  return (
    <>
        <section className='flex justify-center shadow-lg min-h-screen'>
          <div>
            
            

          </div>
        <div className='w-11/12 m-4 rounded-sm bg-white'>
          <Accordion type="single" collapsible>
            {Object.entries(tobeGroupData).map(([schoolname, students]) => (
              <AccordionItem key={schoolname} value={schoolname}
              className='capitalize first-letter:capitalize subpixel-antialiased font-sans text-xs'>
                <AccordionTrigger>
                  <p className='capitalize first-letter:capitalize subpixel-antialiased font-sans hover:font-bold text-lg px-8'>
                      {schoolname} 
                  </p>
                  </AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-wrap justify-center gap-3'>
                    {students?.map((student, index) => (
                      <>
                        <Card className="w-[250px] mb-4 hover:shadow-2xl">
                          <CardHeader>
                            <CardTitle>{student.firstname} {student.lastname}</CardTitle>
                            <CardDescription>{decodeURIComponent(student.schoolname as string)} To {student.venue_name}</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid w-full items-center gap-4">
                              {student.book_type}
                            </div>
                          </CardContent>
                          <CardFooter className="flex ">
                           { studyguidedata? (
                            <>
                                  <SubjectSelect studyguide={studyguidedata?? studyguidedata} student={student}  />
                            </>
                           ):(
                            <div>Loading</div>
                           )

                           }
                          </CardFooter>
                        </Card>
                      </>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
</section>

    </>
 )}

export default ProtectedRoute(ReadStudentsWithSchoolIDPage)
