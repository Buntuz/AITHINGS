import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../config/db';

interface QueryResult {
  insertId: number;
  // Add other properties if they exist in the result object
  // For example, you might also have `affectedRows`, `changedRows`, etc.
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, age, schoolId } = req.body;
    const conn = await connect();
    const [result, _] = await conn.execute('INSERT INTO CareerExpoYear (year, theme, date, time) VALUES (?, ?, ?, ?)', [name, age, schoolId]);
    //const insertId = result.insertId;
    const insertId = 9;
    res.json({ success: true, id: insertId });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}


