'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getRoleIcon } from '@/components/ui/role-icons'
import { UserRole } from '@/types'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

const ROLE_OPTIONS: { value: UserRole; label: string; description: string }[] = [
  { value: 'creator', label: '🎤 Artiste / Créateur', description: 'Chanteur, rappeur, musicien' },
  { value: 'beatmaker', label: '🥁 Beatmaker', description: 'Création d\'instrumentales' },
  { value: 'engineer', label: '🎧 Ingénieur Son', description: 'Mix, mastering, enregistrement' },
  { value: 'videographer', label: '🎬 Vidéaste', description: 'Clips, montage, réalisation' },
  { value: 'fan', label: '❤️ Fan / Supporter', description: 'Découvrir et soutenir des talents' },
  { value: 'investor', label: '💰 Investisseur', description: 'Financer des projets musicaux' },
  { value: 'business', label: '🏢 Entreprise', description: 'Label, studio, agence' },
]

const getRoleName = (role: UserRole): string => {
  const roleOption = ROLE_OPTIONS.find(option => option.value === role)
  return roleOption?.label || 'Utilisateur Demo'
}

export function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole>('creator')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Simulation d'authentification pour tester l'interface
    setTimeout(() => {
      const mockUser = {
        id: 'demo-user-' + Date.now(),
        email: email || 'demo@bpmconnect.com',
        role: selectedRole,
        name: getRoleName(selectedRole),
        avatar: null,
        isAuthenticated: true,
        createdAt: new Date().toISOString()
      }

      // Sauvegarder dans localStorage
      localStorage.setItem('bpm_user', JSON.stringify(mockUser))
      
      // Redirection selon le mode
      if (mode === 'signup') {
        window.location.href = '/onboarding'
      } else {
        window.location.href = '/home'
      }
      
      setLoading(false)
    }, 800)
  }

  const handleSocialAuth = async (provider: 'google' | 'apple') => {
    setLoading(true)
    
    // Simulation d'authentification sociale
    setTimeout(() => {
      const mockUser = {
        id: 'demo-user-' + Date.now(),
        email: `demo.${provider}@bpmconnect.com`,
        role: selectedRole,
        name: getRoleName(selectedRole),
        avatar: null,
        isAuthenticated: true,
        provider: provider,
        createdAt: new Date().toISOString()
      }

      // Sauvegarder dans localStorage
      localStorage.setItem('bpm_user', JSON.stringify(mockUser))
      
      // Redirection selon le mode
      if (mode === 'signup') {
        window.location.href = '/onboarding'
      } else {
        window.location.href = '/home'
      }
      
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">
          {mode === 'signup' ? 'Rejoindre BPM Connect' : 'Se connecter'}
        </CardTitle>
        <CardDescription>
          {mode === 'signup' 
            ? 'Créez votre compte pour commencer votre aventure musicale'
            : 'Accédez à votre espace créateur'
          }
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {error}
          </div>
        )}

        {/* Social Auth Buttons */}
        <div className="space-y-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleSocialAuth('google')}
            disabled={loading}
          >
            🔍 Continuer avec Google
          </Button>
          <Button
            type="button"
            variant="outline"  
            className="w-full"
            onClick={() => handleSocialAuth('apple')}
            disabled={loading}
          >
            🍎 Continuer avec Apple
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Ou</span>
          </div>
        </div>

        {/* Role Selection for Signup */}
        {mode === 'signup' && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Je suis un(e)...</Label>
            <div className="grid grid-cols-1 gap-2">
              {ROLE_OPTIONS.map((role) => (
                <div
                  key={role.value}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedRole === role.value
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20 ring-1 ring-blue-500'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                  onClick={() => setSelectedRole(role.value)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        {getRoleIcon(role.value, { size: 16, className: "text-muted-foreground" })}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{role.label}</div>
                        <div className="text-xs text-muted-foreground">{role.description}</div>
                      </div>
                    </div>
                    {selectedRole === role.value && (
                      <Badge variant="secondary" className="text-xs">Sélectionné</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Email/Password Form */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Chargement...' : (
              mode === 'signup' ? 'Créer mon compte' : 'Se connecter'
            )}
          </Button>
        </form>

        {/* Toggle Mode */}
        <div className="text-center text-sm">
          {mode === 'signup' ? (
            <span>
              Déjà membre ?{' '}
              <a href="/signin" className="text-blue-600 hover:underline">
                Se connecter
              </a>
            </span>
          ) : (
            <span>
              Nouveau sur BPM Connect ?{' '}
              <a href="/signup" className="text-blue-600 hover:underline">
                Créer un compte
              </a>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
