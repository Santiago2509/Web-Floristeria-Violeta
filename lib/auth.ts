import { createHmac, timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'

// ============================================================================
// AUTENTICACIÓN DEL PANEL DE ADMINISTRADOR
// Sesión sin estado: cookie httpOnly firmada con HMAC.
// Variables de entorno requeridas:
//   ADMIN_PASSWORD        → contraseña para entrar al panel
//   ADMIN_SESSION_SECRET  → secreto largo y aleatorio para firmar la cookie
// Si falta alguna, el panel queda bloqueado (nadie puede entrar).
// ============================================================================

export const SESSION_COOKIE = 'violeta_admin'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 días

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET
  return secret && secret.length >= 16 ? secret : null
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('base64url')
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  return bufA.length === bufB.length && timingSafeEqual(bufA, bufB)
}

/** Crea el valor de la cookie: "<expiración>.<firma>" */
export function createSessionToken(): string | null {
  const secret = getSecret()
  if (!secret) return null
  const expiresAt = String(Date.now() + SESSION_DURATION_MS)
  return `${expiresAt}.${sign(expiresAt, secret)}`
}

/** Verifica firma y expiración de la cookie. */
export function isValidSessionToken(token: string | undefined): boolean {
  const secret = getSecret()
  if (!secret || !token) return false
  const [expiresAt, signature] = token.split('.')
  if (!expiresAt || !signature) return false
  if (!safeEqual(signature, sign(expiresAt, secret))) return false
  return Number(expiresAt) > Date.now()
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || !getSecret()) return false
  // Comparamos HMACs para que la comparación sea de longitud constante
  const key = 'violeta-password-check'
  return safeEqual(
    createHmac('sha256', key).update(password).digest('hex'),
    createHmac('sha256', key).update(expected).digest('hex')
  )
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(Date.now() + SESSION_DURATION_MS),
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies()
  return isValidSessionToken(cookieStore.get(SESSION_COOKIE)?.value)
}

/** Lanza un error si quien llama no tiene sesión de administrador. */
export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error('No autorizado')
  }
}
