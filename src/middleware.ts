import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({ name, value, ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          request.cookies.set({ name, value: '', ...options })
          response = NextResponse.next({ request: { headers: request.headers } })
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // CRITICAL: getUser() is the only secure way to check auth in middleware
  const { data: { user } } = await supabase.auth.getUser()

  console.log(`PATH: ${request.nextUrl.pathname} | USER_FOUND: ${!!user}`)

  // 1. If trying to access dashboard and NOT logged in -> REDIRECT TO AUTH
  if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
    console.log("!!! ACCESS DENIED: REDIRECTING TO /auth")
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // 2. If logged in and trying to access auth -> REDIRECT TO DASHBOARD
  if (request.nextUrl.pathname.startsWith('/auth') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth'],
}