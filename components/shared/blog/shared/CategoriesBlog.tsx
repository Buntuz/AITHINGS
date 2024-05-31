import { FC } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Label } from "../../../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";

import { z } from "zod"
import { BASE_URL } from "@/config/config";
import axios from "axios";
import useApiPost from "@/components/hooks/useApiPost";
import useApiFetch from '@/components/hooks/useApiFetch'

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

const CategoriesBlog: FC<StudyGuideProps> = ({ studyguide }): JSX.Element => {

  //const [subjectdata, setSubject] = useState<StudyGuide>();
  const [subjectdata, setSubject] = useState<StudyGuide | undefined>(studyguide);
  const [isOpen, setIsOpen] = useState(false)
  const [studentdata, setCategories] = useState<Student | null>();
  const { datapost, isLoading, error, postData } = useApiPost();
  const { dataFetched: dataFetched, isLoading: isLoadingData, error: dataError, fetchData:fetchData} = useApiFetch();
      
  //const [messageSuccess, setMessageSuccess] = useState(datapost && (datapost.message));
  
  
  useEffect(() => {
   
    setSubject(studyguide);


        async function fetchAll() {

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

          const res = await fetchData(apiUrl, headers);
          
          console.log(dataFetched)
          //return response;
         // if(res){
          //  setCategories(res);
         // }
        
        }

        fetchAll();


  }, [studyguide]);

  return (
    <>
          <Select>

          <SelectTrigger>
            <SelectValue placeholder="study guide" />
          </SelectTrigger>

          <SelectContent>


            {studyguide ? (
              // Render your component content using subjectdata
              <>
                {/* Your component content */}
                {studyguide?.rows.map((study, index) => (
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
    </>
  )
}
export default CategoriesBlog
