import { NextRequest, NextResponse } from 'next/server'
import { geolocation } from '@vercel/functions'

// List of blocked countries
const BLOCKED_COUNTRIES = [
  'CA', // Canada
  'CU', // Cuba
  'IR', // Iran
  'KP', // North Korea
  'RU', // Russia
  'SY', // Syria
  'VE', // Venezuela
]

export function middleware(request: NextRequest) {
  // Get the country from Vercel's IP geolocation using the official helper
  const { country } = geolocation(request)

  // If we can't determine the country, allow access (fail open)
  if (!country) {
    return NextResponse.next()
  }

  // Check if the country is in the blocked list
  if (BLOCKED_COUNTRIES.includes(country)) {
    // Redirect to a blocked page
    return NextResponse.rewrite(new URL('/blocked', request.url))
  }

  // Allow access for all other countries
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - blocked (our blocked page to avoid infinite redirects)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|blocked).*)',
  ],
}
