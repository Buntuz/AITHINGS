import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  alert("Midleware")
  const user = false

  if(!user){
    return  NextResponse.redirect(
      new URL('/login', request.url)
    )
    
  }
  console.log("running")
  return NextResponse.next();
  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/about','/studentdetails/readstudents']
}