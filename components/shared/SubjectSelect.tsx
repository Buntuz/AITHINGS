
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormControl } from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BASE_URL } from "@/config/config";
import axios from "axios";
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from "lucide-react";

//<PaginationCards data={searchResults}
export type StudyGuide1 = {
  rows: [{
    id: string,
    Name: string,
    SubjectName: string,
  }]
};

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

interface StudyGuideProps {
  studyguide: StudyGuide,
  student: Student,
}

export type Message = {
  message: string;
}
/*const formSchema2 = z.object({
  student_id: z.string(),
  book_type: z.string(),
})*/

const SubjectSelect: FC<StudyGuideProps> = ({ studyguide, student }): JSX.Element => {

  //const [subjectdata, setSubject] = useState<StudyGuide>();
  const [subjectdata, setSubject] = useState<StudyGuide | undefined>(studyguide);
  const [isOpen, setIsOpen] = useState(false)
  const [studentdata, setStudent] = useState<Student | null>();
  const [response, setResponse] = useState<Message | null>();
  const [showAlert, setShowAlert] = useState(false);

  // alert(JSON.stringify(studyguide));
  const { toast } = useToast()

  useEffect(() => {
    // setSubject(prevState=> {
    //  return {...prevState,  ...studyguide };
    // })

    // alert(JSON.stringify(student));


    setSubject(studyguide);

    setStudent(prevState => {
      return { ...prevState, ...student };
    })

  }, [studyguide, student]);

  // Function to handle the action that triggers showing the alert
  const handleShowAlert = () => {
    setShowAlert(true);
    // You can perform other actions here
  };

  // Function to handle hiding the alert
  const handleCloseAlert = () => {
    setShowAlert(false);
  };


  const handleConfirmAction = () => {
    // Perform the action you want to confirm
    alert('Thank you!'); // Replace with your actual action
  };

  return (
    <>
      <div className="flex flex-col w-full ">

        <div>

          {showAlert && (
            <Alert className="border pb-1 pt-1 mb-2">
              <AlertTitle></AlertTitle>
              <AlertDescription className="text-xs">
                {response?.message}
              </AlertDescription>
            </Alert>)}
        </div>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="border pb-1 pt-1 mb-2" variant="outline">More</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                Student ID: {studentdata?.student_id}
                <Collapsible
                  open={isOpen}
                  onOpenChange={setIsOpen}
                  className="w-[350px] space-y-2"
                >
                  <div className="flex items-center justify-between space-x-4 px-4">
                    <h4 className="text-sm font-semibold">
                      Click to view Subjects
                    </h4>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="w-9 p-0">
                        <ChevronsUpDown className="h-4 w-4" />
                        <span className="sr-only">Toggle</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent className="space-y-2">
                    {subjectdata ? (
                      // Render your component content using subjectdata
                      <>
                        {/* Your component content */}
                        {subjectdata?.rows.map((study, index) => (
                          <div key={index} >

                            <div className="rounded-md border px-4 py-3 font-mono text-sm">
                              {study.Name} {study.SubjectName}
                            </div>
                          </div>
                        ))}

                      </>
                    ) : (
                      // Placeholder or loading state
                      <div>Loading...</div>
                    )}
                  </CollapsibleContent>
                </Collapsible>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmAction}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>


        <Select
          onValueChange={async (selectedValue) => {
            // Check if selectedValue is an object and destructure it if needed

            if (selectedValue && typeof selectedValue === 'object') {
              const { value } = selectedValue;
            } else {

              await axios.post(`${BASE_URL}/api/savebook`,
                {
                  values: {
                    "book_id": studentdata?.book_id,
                    "book_type": selectedValue,
                    "student_id": studentdata?.student_id
                  }
                })

                .then(response => {
                  setResponse(response.data);
                  setShowAlert(true);
                })
                .catch(error => {
                  // Handle error
                  if (error.response) {
                    setResponse(error.response.data);
                    setShowAlert(true);
                  } else if (error.request) {
                    // The request was made but no response was received
                    //console.log('Request:', error.request);
                    setResponse(error.response.data);
                    setShowAlert(true);
                  } else {
                    // Something happened in setting up the request that triggered an error
                    // console.log('Error:', error.message);
                    setResponse(error.response.data);
                    setShowAlert(true);
                  }
                  //console.error('Error occurred:', error);
                  setResponse(error.response.data);
                  setShowAlert(true);
                });
            }
          }}
        >

          <SelectTrigger>
            <SelectValue placeholder="study guide" />
          </SelectTrigger>

          <SelectContent>


            {subjectdata ? (
              // Render your component content using subjectdata
              <>
                {/* Your component content */}
                {subjectdata?.rows.map((study, index) => (
                  <SelectItem key={index} value={study.SubjectName.toString()}>
                    {study.Name} {study.SubjectName}
                  </SelectItem>
                ))}

              </>
            ) : (
              // Placeholder or loading state
              <div>Loading...</div>
            )}
          </SelectContent>
        </Select>

      </div>

    </>
  )
}
export default SubjectSelect
