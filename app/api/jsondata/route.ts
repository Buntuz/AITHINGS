

//import { NextApiRequest, Response } from 'next';
//https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest, res: NextResponse) {
  
    const school = { id: 1, name: 'Apple'}; 

    return NextResponse.json( {school} , {status: 200});
}

