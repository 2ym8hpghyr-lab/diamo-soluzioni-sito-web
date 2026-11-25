import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { business } from '@/config/business'

// File di verifica Search Console: deve restare leggibile anche sull'host Vercel
// per poter chiedere a Google la rimozione di quegli URL.
const GOOGLE_VERIFICATION_PATH = '/googlec974361f3a8a9a89.html'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') ?? ''
  if (!host.endsWith('.vercel.app')) return NextResponse.next()

  // Produzione: un solo indirizzo pubblico, il dominio ufficiale
  const { pathname, search } = request.nextUrl
  if (process.env.VERCEL_ENV === 'production' && pathname !== GOOGLE_VERIFICATION_PATH) {
    return NextResponse.redirect(new URL(pathname + search, business.siteUrl), 308)
  }

  // Anteprime: restano visitabili ma mai indicizzate
  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
}
