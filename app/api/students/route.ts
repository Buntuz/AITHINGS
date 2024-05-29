//import { NextApiRequest, Response } from 'next';
//https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextRequest, NextResponse } from 'next/server'

import { connect } from '../../../config/db';
import {ResultSetHeader} from 'mysql2/promise';
import { Button } from "@/components/ui/button";

interface Data {
  username: string;
  firstname: string;
  insertId: string;
}

export async function GET(req: NextRequest, res: NextResponse) {
  // Handle GET request
  try {
    // Perform operations
   // const { values } = await req.json();
    //const { lastname, firstname } = values;
    //const { id } = req.nextUrl.
    const queryParamString = req.nextUrl.search;
    const urlSearchParams = new URLSearchParams(queryParamString);
    const id = urlSearchParams.get('id');
    var idValue;
    if (id) {
      idValue = parseInt(id, 10);
    }
    
    const conn = await connect();
    const [rows] = await conn.execute(`SELECT * FROM Student where school_id = ${idValue}`);

    //return NextResponse.json({ message: rows}, {status: 200});
    return NextResponse.json( {rows} , {status: 200});

  } catch (error) {
    return NextResponse.json({ message: error }, {status: 500});
    console.error('Error handling GET request:', error);
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  
const { values } = await req.json();
const { lastname, firstname,school_id,studyguide, venue_id } = values;

  try {
    const conn = await connect();
    const [result, _] = await conn.execute<ResultSetHeader>('INSERT INTO Student(school_id, firstname,lastname) VALUES (?, ?, ?)', [school_id, firstname, lastname]);
    var student_id = 0;
    
    if ('insertId' in result) {
      student_id = result.insertId;
      const [results_books, __] = await conn.execute<ResultSetHeader>('INSERT INTO Book (venue_id, student_id,book_type) VALUES (?, ?, ?)', [venue_id, student_id, studyguide]);
      return NextResponse.json({ message: results_books }, {status: 201});
    }
    ///
     
    //const [insertId] = result
    
    //const student_Id = result.insertId;
   /*var book_Id = 0;
   if (student_Id > 0){
      //insert into 
      const [result, _] = await conn.execute<ResultSetHeader>('INSERT INTO Book (venue_id, student_id,book_type) VALUES (?, ?, ?)', [venue_id, student_Id, studyguide]);
      book_Id = result.insertId;
   }
   else{
      throw new Error('Error getting last inserted ID');
   }*/
   return NextResponse.json({ message: "Error getting last inserted ID" }, {status: 500});

  } catch (error) {
    return NextResponse.json({ message: error }, {status: 500});
    //return NextResponse.json({ message: error });
  }
}

