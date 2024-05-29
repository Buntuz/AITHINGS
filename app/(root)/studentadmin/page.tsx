//https://ui.shadcn.com/docs/components/accordion
//https://ui.shadcn.com/docs/components/form

"use client"
import React from 'react'
import { BellIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle} from "@/components/ui/card"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Label } from "@/components/ui/label"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import Link from 'next/link'

import { GetStaticProps, GetStaticPaths } from 'next';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Suspense } from 'react'
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

import {BsCloudDownload} from 'react-icons/bs'
import { BASE_URL } from '@/config/config'
import ProtectedRoute from '../../../components/shared/ProtectedRoute';
import LoggedData from '../../../components/shared/LoggedData'
/*
//https://www.youtube.com/watch?v=9goIlPIFNzE
https://www.youtube.com/watch?v=9goIlPIFNzE
*/

const formSchema2 = z.object({
  firstname: z.string().min(2, {
    message: "First must be at least 2 characters.",
 }),
  lastname: z.string().min(2, {
    message: "Surname must be at least 2 characters.",
  }),
  school_id: z.string(),
  studyguide: z.string(),
  venue_id: z.string(),
  
})

 
export type School = {
  rows:[{
  id: string;
  name: string;
  email: string;
  schoolname: string;
  lastname: string;
  school_id: string;
  venue_id: string;
  school_location:string;
  cellphone: string; }]
}

export type StudyGuide = {
  rows:[{
  id: string;
  Name: string;
  SubjectName: string;
   }]
}

export type Message = {
  message: string;
}


export type Venue = {
  id: string;
}

type CardProps = React.ComponentProps<typeof Card>

type SchoolProps = {
  school: School;
};

const AddStudent = ({ params }: { params: { id: string,venuename: string} }, ) => {
  const pathname = usePathname();
  
  return (
    <Suspense fallback={<div>Loading...</div>}> {/* Wrap with SuspenseBoundary */}
      <AddStudentSuspense />
    </Suspense>
  );
};

const AddStudentSuspense = ({ className, ...props }: CardProps) => {
  //holder teachers data
  const [schooldata, setSchools] = useState<School | null>();
  const [schooldatabyid, setSchoolsByID] = useState<School | null>();

  const [studyguidedata, setStudyGuide] = useState<StudyGuide | null>();
  const [showContent, setShowContent] = useState<boolean>(false); // State variable to control visibility
  const [venunamedata, setVenueName] = useState<string>('');
  const [venueid_para, setVenueID] = useState<string>('');

  const [response, setResponse] = useState<Message | null>();
  const [isVisible, setIsVisible] = useState(false);
  const [csvData, setCSVData] = useState<string>('');

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const userData = LoggedData();
  const { toast } = useToast()
  
  useEffect(() => {
    
          //const url = `${pathname}?${searchParams}`
          const venueid = searchParams.get('vanueid');
          const venuname = searchParams.get('venuname');
          
          if(venuname){
            setVenueName(venuname);
          }
          else{
            //setVenueName(venuname);
          }

          if(venueid){
            setVenueID(venueid);
          }
          else{
            //setVenueName(venuname);
          }
  
          const fetchSchoolByVenueID = async () => {
            try {

             // alert(JSON.stringify(userData?.schoolId))
              if (!userData) {
                // userData is not available or schoolId is empty, do nothing
                return;
              }
              var URL_LINK = null;
              if(userData?.roleType === 'teacher'){
                URL_LINK = `${BASE_URL}/api/schoolbyeventid?id=${venueid}&school_id=${userData?.schoolId}`;
              }
              else{
                URL_LINK = `${BASE_URL}/api/schoolbyeventid?id=${venueid}`
              }

              
              const response = await axios.get<string>(`${URL_LINK}`);
              const jsonData = JSON.parse(response.data); // Convert string to JSON object
              if (jsonData) {
                //setSchoolsByID(jsonData.rows);
                setSchoolsByID(prevState=> {
                  return {...prevState,  ...jsonData };
                })
              }
            } catch (error) {
              console.error('Error fetching schools:', error);
            }
          };

          const fetchSchools = async () => {
            try {
              
            // const response = await axios.get(`/api/schools`);
              //const response = await axios.get(`/api/studyguides`);
              //alert(userData?.roleType)
             //alert(userData?.schoolId)

              //const response = await axios.get<string>(`${BASE_URL}/api/schools?id=${userData?.schoolId}`);
             // const response = await axios.get<string>(`${BASE_URL}/api/schools`);

              // alert(JSON.stringify(userData?.schoolId))
              if (!userData) {
                // userData is not available or schoolId is empty, do nothing
                return;
              }
              var URL_LINK = null;
              if(userData?.roleType === 'teacher'){
                URL_LINK = `${BASE_URL}/api/schoolbyeventid?id=${venueid}&school_id=${userData?.schoolId}`;
              }
              else{
                URL_LINK = `${BASE_URL}/api/schools`
              }

              
              const response = await axios.get<string>(`${URL_LINK}`);

              const jsonData = JSON.parse(response.data); // Convert string to JSON object
              
              setSchools(prevState=> {
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
            
              const jsonData = JSON.parse(response.data); // Convert string to JSON object
            
              // console.log(response.data)
              
              setStudyGuide(prevState=> {
                return {...prevState,  ... jsonData};
              })
            } catch (error) {
              console.error('Error fetching teachers:', error);
            }
          };
    
          fetchSchools();
          fetchStudyGuides();
          fetchSchoolByVenueID();

  }, [pathname, searchParams, venueid_para, LoggedData, setSchoolsByID]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema2>>({
    resolver: zodResolver(formSchema2),
    defaultValues: {
      firstname: "",
      lastname: "",
      school_id: "",
      studyguide: "",
      venue_id: venueid_para.toString()
    }
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema2>) {
    
    //form.reset();
    form.resetField("firstname");
    form.resetField("lastname");
   // return false;
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    //const response = await axios.post('YOUR_API_ENDPOINT', {nae:"dsds"});
    values.venue_id = venueid_para.toString()
    toast({
      description: "Your message has been sent. ",
    })
    
    //const res = await axios.post('/api/students', { values});
    
    
    //const res = await axios.post('https://www.buntutechsolutions.co.za/api/savestudents', { values});
    
        await axios.post(`${BASE_URL}/api/savestudents`, { values})
        .then(response => {
          // Handle successful response
          //console.log('Response:', response.data);
          setResponse(response.data);

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

  const toggleContent = () => {
    setShowContent(!showContent); // Toggle the visibility state
  };

//select * from Book, Student, school where Book.student_id = Student.id and Student.school_id = school.id;
  async function downloadCSV () {

    const maxAttempts = 3; // Maximum number of attempts to fetch data
    let attempts = 0;

    const fetchData = async () => {
      try{
            const response = await axios.get<string>(`${BASE_URL}/download/report/csv`);
            return response;
            if(response){
              setCSVData(response.data);
              console.log(response.data)
            }
      }catch(error){
        console.error('Error fetching CSV data:', error);
        return null; // Return null if fetch fails
      }};

      const retryFetch = async () => {
        attempts++;
        const returnedCSV = await fetchData();
        if (returnedCSV || attempts >= maxAttempts) {
          // If data is fetched successfully or max attempts reached, update state
          if (returnedCSV) {
            setCSVData(returnedCSV.data);

            const blob = new Blob([returnedCSV.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);

            console.log(returnedCSV.data);
          } else {
            console.error(`Failed to fetch CSV data after ${maxAttempts} attempts.`);
          }
        } else {
          // Retry fetching data after a delay
          setTimeout(retryFetch, 1000); // Retry after 1 second
        }
      };

    //fetchData();
    retryFetch(); // Start the initial fetch

  };

  
  return (
   
  <section className='flex justify-center shadow-lg min-h-screen'>
     
      <div className='w-11/12 m-4 rounded-sm bg-white'>
            
              <h1 className='text-center mt-3 font-bold text-3xl'>
                {venunamedata}     {userData?.firstName}
             </h1>

             <div className="flex justify-center">
                  <div className="flex-none w-64 h-14" >
                    
                  <Button onClick={downloadCSV} className='bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4'>
                    <BsCloudDownload className='fill-current w-4 h-4 mr-2' />  Student</Button>
                  </div>
                  
                {/*  <div className="flex-initial w-32">
                  <Button  variant="outline">Add Student</Button>
                  </div> */}
            </div>


              <Dialog>
                  <DialogTrigger className='flex justify-center' asChild>
                    <Button  variant="outline">Add Student</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] overflow-auto touch-auto">
                    <DialogHeader>
                      <DialogTitle>Students</DialogTitle>
                      <DialogDescription>
                      <Alert>
                          <AlertTitle></AlertTitle>
                          <AlertDescription>
                            { JSON.stringify(response?.message)}
                          </AlertDescription>
                    </Alert>
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-0 items-center gap-4">
                                
                                <FormField
                                      control={form.control}
                                      name="firstname"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel className="text-right">First Name</FormLabel>
                                          <FormControl>
                                            <Input placeholder="Name" {...field} />
                                          </FormControl>
                                          <FormDescription>
                                            
                                          </FormDescription>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />

                                <FormField
                                    control={form.control}
                                    name="lastname"
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                          <Input placeholder="Surname" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                        
                                        </FormDescription>
                                        <FormMessage />
                                      </FormItem>
                                    )}
                                  />

                              {isVisible &&  <FormField
                                  control={form.control}
                                  name="venue_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder="Venue" {...field} />
                                      </FormControl>
                                      
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />}

                                {isVisible &&  <FormField
                                  control={form.control}
                                  name="school_id"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder="School Name" {...field} />
                                      </FormControl>
                                      
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                /> }

                               
                              {isVisible &&<FormField
                                  control={form.control}
                                  name="studyguide"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormControl>
                                        <Input placeholder="Study guide" {...field} />
                                      </FormControl>
                                      
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              }
                                <FormField
                                  control={form.control}
                                  name="school_id"
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
                                          {schooldata?.rows.map((school, index)=>(
                                            <SelectItem key={index} value={school.id.toString()}>{school.name}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                                <FormField
                                  control={form.control}
                                  name="studyguide"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Select study guide</FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="study guide" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {studyguidedata?.rows.map((study, index)=>(
                                            <SelectItem key={index} value={study.SubjectName.toString()}>{study.Name} {study.SubjectName}</SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />

                            </div>  

                            <DialogFooter>
                              <Button type="submit">Save changes</Button>
                            </DialogFooter>

                        </form>

                      </Form>
                    </div>
                  
                  </DialogContent>
             </Dialog>

          
              

              <div className='flex items-center flex-wrap mt-20 justify-center gap-4 hover:gap-6'>
              {schooldatabyid?.rows?.map((school, index) => (
                <> 
                <Link href={`/studentdetails?schoolname=${school.name}&schoolid=${school.id}`}>
                <Card className="w-[350px]">
                      <CardHeader>
                        <CardTitle>{school.name} {index}</CardTitle>
                        <CardDescription>Registered Student.</CardDescription>
                      </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                {school.school_location} 
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                              
                              <Button type="submit">More</Button>
                            </CardFooter>
                </Card>
                
                </Link>
                </>
              ))}
              </div>
              

      </div>
        
</section>

   
  )
}
export default ProtectedRoute(AddStudent)
//http://localhost:3000/studentadmin/AddStudent/1/ffdd

