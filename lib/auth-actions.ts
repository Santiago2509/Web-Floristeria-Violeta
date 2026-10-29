'use server'

import { redirect } from 'next/navigation'
import { checkPassword, clearSessionCookie, createSessionToken, setSessionCookie } from './auth'

export type LoginState = { error?: string }

export async function adminLogin(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get('password') ?? '')
  const token = createSessionToken()

  if (!token || !process.env.ADMIN_PASSWORD) {
    return { error: 'El acceso al panel no está configurado (faltan variables de entorno).' }
  }
  if (!checkPassword(password)) {
    return { error: 'Contraseña incorrecta.' }
  }

  await setSessionCookie(token)
  redirect('/admin')
}

export async function adminLogout() {
  await clearSessionCookie()
  redirect('/admin/login')
}
