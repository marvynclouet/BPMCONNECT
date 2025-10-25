'use client'

import { useEffect, useState } from 'react'
import { getMockUser, logout, type MockUser } from '@/lib/mock-auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Logo } from '@/components/ui/logo'
import { MainNavbar } from '@/components/navigation/main-navbar'
import Link from 'next/link'
import { Progress } from '@/components/ui/progress'
import { MessageCircle, Eye, TrendingUp, Clock } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const mockUser = getMockUser()
      
      if (!mockUser || !mockUser.isAuthenticated) {
        window.location.href = '/signin'
        return
      }

      setUser(mockUser)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const handleSignOut = () => {
    logout()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de votre dashboard...</p>
        </div>
      </div>
    )
  }

  const getRoleDisplayName = (role: string): string => {
    const roleMap = {
      creator: '🎤 Artiste / Créateur',
      beatmaker: '🥁 Beatmaker', 
      engineer: '🎧 Ingénieur Son',
      videographer: '🎬 Vidéaste',
      fan: '❤️ Fan / Supporter',
      investor: '💰 Investisseur',
      business: '🏢 Entreprise',
    }
    return roleMap[role as keyof typeof roleMap] || role
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard 🎵
          </h1>
          <p className="text-gray-600">
            Bienvenue dans votre espace créateur BPM Connect !
          </p>
        </div>

        {/* Profile Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center pb-2">
              <Avatar className="h-20 w-20 mx-auto mb-4">
                <AvatarFallback className="text-2xl">
                  {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl flex items-center justify-center gap-2">
                {user?.name || 'Votre nom'}
                <Badge variant="secondary">Free</Badge>
              </CardTitle>
              <CardDescription>
                {getRoleDisplayName(user?.role || 'creator')}
              </CardDescription>
              
              {/* Profile Completion Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>Profil complété</span>
                  <span className="font-medium">25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </CardHeader>
            <CardContent className="text-center">
              <div className="flex justify-center gap-4 text-sm text-gray-600">
                <div>
                  <div className="font-semibold">0</div>
                  <div>Abonnés</div>
                </div>
                <div>
                  <div className="font-semibold">0</div>
                  <div>Ventes</div>
                </div>
                <div>
                  <div className="font-semibold">0€</div>
                  <div>Revenus</div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button className="flex-1" asChild>
                  <Link href="/profile/edit">
                    Compléter
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" asChild>
                  <Link href="/pricing">
                    Passer à Pro
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Statistics */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Statistiques en direct
                <Badge variant="outline" className="text-xs">Live</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <Eye className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Vues du profil</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Ventes totales</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Messages non lus</div>
                    <div className="text-2xl font-bold">0</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-muted-foreground">Revenus estimés</div>
                    <div className="text-2xl font-bold">0€</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Prochaines étapes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <Link href="/profile/edit" className="flex items-start gap-2 hover:bg-accent p-2 rounded-md transition-colors -mx-2 block">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0"></div>
                  <span className="flex-1">Complétez votre profil</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </Link>
                <Link href="/services/create" className="flex items-start gap-2 hover:bg-accent p-2 rounded-md transition-colors -mx-2 block">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <span className="flex-1 text-green-700">Créez votre premier service</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </Link>
                <div className="flex items-start gap-2 opacity-50 cursor-not-allowed">
                  <div className="w-2 h-2 rounded-full bg-gray-300 mt-2 shrink-0"></div>
                  <span className="flex-1">Uploadez vos créations</span>
                  <span className="text-xs text-muted-foreground">Bientôt</span>
                </div>
                <Link href="/services" className="flex items-start gap-2 hover:bg-accent p-2 rounded-md transition-colors -mx-2 block">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 shrink-0"></div>
                  <span className="flex-1 text-green-700">Explorez la marketplace</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

          {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:border-blue-200 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🛒</div>
              <CardTitle className="text-lg">Marketplace</CardTitle>
              <CardDescription>Vendez vos services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" asChild>
                <Link href="/services/create">
                  Créer un service
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/services">
                  Parcourir
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-purple-200 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">💰</div>
              <CardTitle className="text-lg">Financement</CardTitle>
              <CardDescription>Lancez vos projets</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" disabled>
                Pro uniquement
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-green-200 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">💬</div>
              <CardTitle className="text-lg">Messages</CardTitle>
              <CardDescription>Échangez avec la communauté</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/messages">
                  Voir mes messages
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:border-orange-200 transition-colors cursor-pointer">
            <CardHeader className="text-center">
              <div className="text-4xl mb-2">🎓</div>
              <CardTitle className="text-lg">Formation BPM</CardTitle>
              <CardDescription>Accès aux masterclass</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/bmp-formation">
                  Découvrir BMP Formation
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Development Notice */}
        <Card className="mt-8 border-yellow-200 bg-yellow-50">
          <CardContent className="text-center py-8">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-xl font-bold text-yellow-800 mb-2">
              Plateforme en développement
            </h3>
            <p className="text-yellow-700 mb-4">
              BPM Connect est actuellement en phase de développement. Les fonctionnalités seront ajoutées progressivement.
            </p>
            <p className="text-sm text-yellow-600">
              Restez connecté pour découvrir les nouvelles features ! 🎵
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
