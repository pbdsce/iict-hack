import { NextResponse } from 'next/server'

export function middleware() {
  // Registration is now open for development
  // Removed redirect from /register to allow access
  
  // If you need to restrict registration in the future, uncomment the lines below:
  // if (request.nextUrl.pathname === '/register') {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/register'
}
