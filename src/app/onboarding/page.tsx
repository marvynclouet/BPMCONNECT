'use client'

import { useState, useEffect } from 'react'
import { getMockUser, type MockUser } from '@/lib/mock-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LogoLarge } from '@/components/ui/logo'
import { UserRole } from '@/types'

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<MockUser | null>(null)
  
  // Form data
  const [displayName, setDisplayName] = useState('')
  const [handle, setHandle] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [bmpFormationConnected, setBmpFormationConnected] = useState(false)
  
  useEffect(() => {
    const checkAuth = () => {
      const mockUser = getMockUser()
      
      if (!mockUser || !mockUser.isAuthenticated) {
        window.location.href = '/signin'
        return
      }

      setUser(mockUser)
      if (mockUser?.email) {
        setDisplayName(mockUser.name || '')
      }
    }
    checkAuth()
  }, [])

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setLoading(true)
    
    try {
      // Simuler la sauvegarde du profil utilisateur
      const updatedUser = {
        ...user,
        name: displayName,
        handle: handle,
        bio: bio,
        location: location,
        bmpFormationConnected: bmpFormationConnected,
        onboardingCompleted: true,
        subscriptionPlan: 'free'
      }
      
      // Sauvegarder dans localStorage
      localStorage.setItem('bpm_user', JSON.stringify(updatedUser))
      
      console.log('Profil sauvegardé:', updatedUser)
      
      // Rediriger vers le feed communautaire
      window.location.href = '/home'
      
    } catch (err: any) {
      console.error('Erreur onboarding:', err.message)
    } finally {
      setLoading(false)
    }
  }

  const getRoleDisplayName = (role: UserRole): string => {
    const roleMap = {
      creator: '🎤 Artiste / Créateur',
      beatmaker: '🥁 Beatmaker', 
      engineer: '🎧 Ingénieur Son',
      videographer: '🎬 Vidéaste',
      fan: '❤️ Fan / Supporter',
      investor: '💰 Investisseur',
      business: '🏢 Entreprise',
    }
    return roleMap[role] || role
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <LogoLarge />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Bienvenue ! 🎉</h1>
          <p className="text-muted-foreground">Finalisons votre profil en quelques étapes</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Étape {currentStep} sur 3</span>
            <span className="text-sm text-muted-foreground">{Math.round((currentStep / 3) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && 'Informations de base'}
              {currentStep === 2 && 'Votre identité créative'}
              {currentStep === 3 && 'Connexions & préférences'}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && 'Commençons par les informations essentielles'}
              {currentStep === 2 && 'Personnalisez votre présence sur la plateforme'}
              {currentStep === 3 && 'Connectez votre écosystème BPM'}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Step 1: Basic Info */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">Votre rôle</Badge>
                  </div>
                  <div className="font-medium text-blue-900">
                    {getRoleDisplayName(user?.role)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="displayName">Nom d'affichage *</Label>
                  <Input
                    id="displayName"
                    placeholder="Ex: DJ Producer, Marie Vocal, etc."
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="handle">Nom d'utilisateur unique *</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-r-0 border-gray-300 rounded-l-md">
                      @
                    </span>
                    <Input
                      id="handle"
                      className="rounded-l-none"
                      placeholder="monpseudo"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500">
                    Ce sera votre URL: bpmconnect.com/@{handle || 'monpseudo'}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Creative Identity */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bio">Présentez-vous (optionnel)</Label>
                  <textarea
                    id="bio"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Parlez de votre style, vos influences, vos objectifs..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500">{bio.length}/500 caractères</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Localisation (optionnel)</Label>
                  <Input
                    id="location"
                    placeholder="Paris, France"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Connections */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-medium text-yellow-900 mb-2">Connexion BMP Formation</h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    Connectez votre compte BMP Formation pour bénéficier de réductions exclusives et du badge "BMP Certified"
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bmpConnection"
                      checked={bmpFormationConnected}
                      onChange={(e) => setBmpFormationConnected(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="bmpConnection" className="text-sm">
                      J'ai un compte BMP Formation (à connecter plus tard)
                    </Label>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h3 className="font-medium text-green-900 mb-2">✅ Votre configuration</h3>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Plan: <strong>Free</strong> (3 uploads max)</li>
                    <li>• Profil: <strong>{getRoleDisplayName(user?.role)}</strong></li>
                    <li>• URL: <strong>@{handle || 'monpseudo'}</strong></li>
                    {bmpFormationConnected && <li>• 🎓 Connexion BMP Formation prévue</li>}
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
              >
                Précédent
              </Button>
              
              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  disabled={!displayName || !handle}
                >
                  Suivant
                </Button>
              ) : (
                <Button
                  onClick={handleComplete}
                  disabled={loading || !displayName || !handle}
                >
                  {loading ? 'Finalisation...' : 'Terminer'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
