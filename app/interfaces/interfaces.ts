// interfaces.ts
export interface StudentData {
    firstname: string;
    lastname: string;
    schoolname: string;
    book_type: string;
    venue_name: string;
    id:number;
    book_id:number;
    student_id: number;
    name: string;
    email: string;
    school_location: string;
    gender: string;
    cellphone: string;
  }
  
  export interface GroupedData {
    [schoolname: string]: StudentData[];
  }
  