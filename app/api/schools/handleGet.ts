import { NextRequest, NextResponse } from 'next/server'
import { connect } from '../../../config/db';

export async function Get(req: NextRequest, res: NextResponse) {
    // Handle GET request
    try {
      // Perform operations
      const queryParamString = req.nextUrl.search;
      const urlSearchParams = new URLSearchParams(queryParamString);
      const id = urlSearchParams.get('id');
        
      //other way
      const{searchParams} = new URL(req.url)  //passed in url
      const query = searchParams.get("query");

      //const response = await fetch(`https://api.sdsds/search?query=${query}`)
      //const {results} = await response.json()

      const conn = await connect();
  
      var idValue;
      if (id) {
        idValue = parseInt(id, 10);
        //const [rows] = await conn.execute(`SELECT * FROM School where school_id = ${idValue}`);
        const [rows] = await conn.execute(`SELECT School.id, School.name, School.school_location
        FROM School
        INNER JOIN Student ON School.id = Student.school_id
        INNER JOIN Book ON Student.id = Book.student_id
        INNER JOIN CareerExpoVenue ON Book.venue_id = CareerExpoVenue.id
        WHERE CareerExpoVenue.id = ${idValue}
        GROUP BY School.id;`);
        return NextResponse.json( {rows} , {status: 200});
      }
      else{
            //const [rows] = await conn.execute(`SELECT * FROM School where school_id = ${idValue}`);
          const [rows] = await conn.execute(`SELECT * FROM School`);
          return NextResponse.json( {rows} , {status: 200});
      }

    } catch (error) {
      return NextResponse.json({ message: error }, {status: 500});
    }
  }
