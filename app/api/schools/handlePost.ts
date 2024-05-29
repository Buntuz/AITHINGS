import { NextRequest, NextResponse } from 'next/server'

import { connect } from '../../../config/db';

interface Data {
    username: string;
    firstname: string;
  }

async function handlePost(req: NextRequest, res: NextResponse) {
  
    const { values } = await req.json();
    //const { lastname, firstname, gender,school_id,studyguide_id, venue_id } = values;
    const { lastname, firstname } = values;
    
      try {
        const conn = await connect();
       // const [result, _] = await conn.execute('INSERT INTO students (firstname, lastname, gender) VALUES (?)', [firstname, lastname, gender]);
       // const [result, _] = await conn.execute('INSERT INTO CareerExpoYear (year, theme, date, time) VALUES (?, ?, ?, ?)', [2024, 'Informed','2024-04-29', '08:00']);
       //const [result, _] = await conn.execute('INSERT INTO CareerExpoVenue (career_expo_year_id, venue_name, date) VALUES (?, ?, ?)', [1, 'WSu Butterworth','2024-04-29']);
       //const [result, _] = await conn.execute('INSERT INTO School (name, school_location) VALUES (?, ?)', ['JS Skenjana', 'Idutywa']);
       const [result, _] = await conn.execute('INSERT INTO Teacher (school_id, name,email, cellphone) VALUES (?, ?, ?, ?)', [1, 'Buntu', 'buntu@gmail.com', '0730275319']);
       return NextResponse.json({ message: firstname }, {status: 201});
        
      } catch (error) {
        return NextResponse.json({ message: error });
      }
    }

    export default handlePost;