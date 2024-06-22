//https://github.com/adrianhajdin/ai_saas_app/blob/main/middleware.ts
//https://www.youtube.com/watch?v=Ahwoks_dawU

import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/', '/api/webhooks/clerk', '/api/webhooks/stripe']
});
 
/*export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/notblog')) {
    return NextResponse.rewrite(new URL('/', request.url))
  }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}*/
  
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};