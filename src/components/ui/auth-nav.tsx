'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getMockUser, logout, type MockUser } from '@/lib/mock-auth'
import { MiniThemeToggle } from '@/components/theme/theme-toggle'

export function AuthNav() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setUser(getMockUser())
  }, [])

  if (!mounted) {
    return null // éviter l'hydration mismatch
  }

  if (user?.isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Bonjour, <span className="font-medium">{user.name}</span>
        </div>
        <Link href="/home">
          <Button variant="outline" size="sm">
            Feed
          </Button>
        </Link>
        <MiniThemeToggle />
        <Button variant="ghost" size="sm" onClick={logout}>
          Déconnexion
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <MiniThemeToggle />
      <Link href="/pricing" className="hidden sm:block">
        <Button variant="outline" size="sm">
          Tarifs
        </Button>
      </Link>
      <Link href="/signin">
        <Button variant="ghost" size="sm">
          Se connecter
        </Button>
      </Link>
      <Link href="/signup">
        <Button size="sm">
          S'inscrire
        </Button>
      </Link>
    </div>
  )
}
