'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LogoMini } from '@/components/ui/logo'
import { MiniThemeToggle } from '@/components/theme/theme-toggle'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { getMockUser, logout, type MockUser } from '@/lib/mock-auth'
import { Menu, X, MessageCircle, Users, Briefcase, Home, Settings, Plus } from 'lucide-react'

export const MainNavbar = () => {
  const [user, setUser] = useState<MockUser | null>(null)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setUser(getMockUser())
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // éviter l'hydration mismatch
  }

  const isAuthenticated = user?.isAuthenticated

  // Navigation pour utilisateurs connectés
  const authenticatedNavLinks = [
    { 
      name: 'Feed', 
      href: '/home', 
      icon: Home,
      description: 'Fil d\'actualité communauté'
    },
    { 
      name: 'Services', 
      href: '/services', 
      icon: Briefcase,
      description: 'Marketplace des services'
    },
    { 
      name: 'Créateurs', 
      href: '/creators', 
      icon: Users,
      description: 'Découvrir les talents'
    },
    { 
      name: 'Messages', 
      href: '/messages', 
      icon: MessageCircle,
      description: 'Conversations privées'
    },
    { 
      name: 'Mon Espace', 
      href: '/dashboard', 
      icon: Settings,
      description: 'Tableau de bord personnel'
    }
  ]

  // Navigation pour visiteurs
  const publicNavLinks = [
    { name: 'Services', href: '/services', icon: Briefcase, description: 'Marketplace des services' },
    { name: 'Créateurs', href: '/creators', icon: Users, description: 'Découvrir les talents' },
    { name: 'Tarifs', href: '/pricing', icon: Settings, description: 'Plans et abonnements' },
    { name: 'Formation', href: '/bmp-formation', icon: Users, description: 'Cours et masterclasses' }
  ]

  const navLinks = isAuthenticated ? authenticatedNavLinks : publicNavLinks

  const isActivePath = (href: string) => {
    if (href === '/home' && pathname === '/') return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="bg-card/95 backdrop-blur-sm border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href={isAuthenticated ? "/home" : "/"} className="flex items-center shrink-0">
              <LogoMini className="hover:scale-105 transition-transform duration-200" />
            </Link>
            {pathname === '/home' && (
              <Badge variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                FEED
              </Badge>
            )}
            {pathname.startsWith('/admin') && (
              <Badge variant="destructive" className="text-xs">
                ADMIN
              </Badge>
            )}
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon
              const isActive = isActivePath(link.href)
              
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent/50 ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-semibold' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <IconComponent size={16} />
                  {link.name}
                </Link>
              )
            })}
          </nav>

          {/* Actions Droite */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle */}
            <MiniThemeToggle />
            
            {/* Utilisateur Connecté */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Créer Service (si pas sur la page de création) */}
                {!pathname.includes('/create') && (
                  <Link href="/services/create">
                    <Button size="sm" className="hidden md:flex items-center gap-2">
                      <Plus size={14} />
                      <span className="hidden lg:inline">Vendre</span>
                    </Button>
                  </Link>
                )}
                
                {/* Profil Utilisateur */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <AvatarGenerator 
                    name={user.name || 'User'} 
                    role={user.role} 
                    size={32}
                    showRoleIcon={true}
                    showOnlineStatus={true}
                    style="realistic"
                    className="ring-2 ring-border"
                  />
                  <div className="hidden lg:block">
                    <p className="font-semibold text-sm text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground capitalize font-medium">{user.role}</p>
                  </div>
                </div>
                
                {/* Déconnexion */}
                <Button variant="ghost" size="sm" onClick={logout} className="text-muted-foreground hover:text-foreground hidden sm:inline-flex">
                  Déconnexion
                </Button>
              </div>
            ) : (
              /* Visiteur Non Connecté */
              <div className="flex items-center gap-2">
                <Link href="/pricing" className="hidden sm:block">
                  <Button variant="ghost" size="sm">
                    Tarifs
                  </Button>
                </Link>
                <Link href="/signin">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/signup" className="hidden sm:block">
                  <Button size="sm" className="text-xs sm:text-sm">
                    S'inscrire
                  </Button>
                </Link>
              </div>
            )}

            {/* Menu Mobile */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile Déroulant */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-card/95 backdrop-blur-sm">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const IconComponent = link.icon
                const isActive = isActivePath(link.href)
                
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }`}
                  >
                    <IconComponent size={18} />
                    <div>
                      <div>{link.name}</div>
                      {link.description && (
                        <div className="text-xs text-muted-foreground">{link.description}</div>
                      )}
                    </div>
                  </Link>
                )
              })}
              
              {/* Actions Mobile */}
              {isAuthenticated && (
                <div className="pt-4 border-t">
                  <Link href="/services/create" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full justify-start gap-2">
                      <Plus size={16} />
                      Créer un Service
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
