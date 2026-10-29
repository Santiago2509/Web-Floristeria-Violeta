import { NextRequest, NextResponse } from 'next/server'
import { SESSION_COOKIE, isValidSessionToken } from '@/lib/auth'

// Protege todas las rutas del panel /admin (excepto la página de login).
// Es una comprobación optimista: las Server Actions vuelven a verificar la sesión.
export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (pathname === '/admin/login') return NextResponse.next()

  const token = req.cookies.get(SESSION_COOKIE)?.value
  if (!isValidSessionToken(token)) {
    return NextResponse.redirect(new URL('/admin/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
