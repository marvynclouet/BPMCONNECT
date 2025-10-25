// Système d'authentification simulée pour tester l'interface

import { UserRole } from '@/types'

export interface MockUser {
  id: string
  email: string
  role: UserRole
  name: string
  avatar: string | null
  isAuthenticated: boolean
  provider?: string
  createdAt: string
}

export const getMockUser = (): MockUser | null => {
  if (typeof window === 'undefined') return null
  
  try {
    const userData = localStorage.getItem('bpm_user')
    if (!userData) return null
    
    return JSON.parse(userData)
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  const user = getMockUser()
  return user?.isAuthenticated === true
}

export const logout = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('bpm_user')
    window.location.href = '/'
  }
}

export const requireAuth = (): MockUser => {
  const user = getMockUser()
  if (!user || !user.isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/signin'
    }
    throw new Error('Authentication required')
  }
  return user
}
