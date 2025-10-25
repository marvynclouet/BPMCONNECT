'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, Zap, Crown, CreditCard, Shield } from 'lucide-react'
import Link from 'next/link'

interface SubscribePageProps {
  params: {
    plan: string
  }
}

export default function SubscribePage({ params }: SubscribePageProps) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState(false)
  
  const supabase = createClient()
  
  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        // Redirect to login with return URL
        window.location.href = `/signin?return_to=${encodeURIComponent('/subscribe/' + params.plan)}`
        return
      }

      setUser(user)
      setLoading(false)
    }

    getUser()
  }, [supabase, params.plan])

  const planDetails = {
    pro: {
      name: 'Pro',
      price: 29,
      icon: Zap,
      color: 'blue',
      description: 'Pour les créateurs sérieux qui veulent développer leur activité',
      features: [
        'Services illimités',
        'Commission réduite 5%',
        'Financement participatif',
        'Livraison express',
        'Analytics détaillées',
        'Réductions partenaires',
        'Masterclass BPM -20%',
        'Badge Pro + mise en avant',
        'Paiement J+2',
        'Support prioritaire'
      ]
    },
    boss: {
      name: 'Boss',
      price: 99,
      icon: Crown,
      color: 'purple',
      description: 'Pour les entrepreneurs musicaux qui veulent dominer leur marché',
      features: [
        'Tout Pro inclus',
        'Commission ultra-réduite 3%',
        'Placement sponsorisé "À la une"',
        '2h studio BPM offertes/mois',
        'Statistics avancées + ROI',
        'Badge Boss exclusif',
        'Support VIP dédié',
        'Invitations événements VIP',
        'Paiement J+1',
        'API access (prochainement)'
      ]
    }
  }

  const selectedPlan = planDetails[params.plan as keyof typeof planDetails]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plan introuvable</h2>
          <p className="text-gray-600 mb-6">Ce plan d'abonnement n'existe pas.</p>
          <Link href="/pricing">
            <Button>Voir tous les plans</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleSubscribe = async () => {
    setSubscribing(true)
    
    try {
      // TODO: Create Stripe checkout session
      console.log('Creating subscription for plan:', params.plan)
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Redirect to success page
      window.location.href = '/dashboard?success=subscription_created'
      
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Erreur lors de la souscription. Veuillez réessayer.')
    } finally {
      setSubscribing(false)
    }
  }

  const Icon = selectedPlan.icon

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              BPM Connect
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/pricing">
                <Button variant="outline">
                  Retour aux plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Finaliser votre abonnement
          </h1>
          <p className="text-xl text-gray-600">
            Vous êtes sur le point de passer au plan {selectedPlan.name}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Plan Summary */}
          <div>
            <Card className={`border-2 border-${selectedPlan.color}-500`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full bg-${selectedPlan.color}-100`}>
                    <Icon className={`h-8 w-8 text-${selectedPlan.color}-600`} />
                  </div>
                </div>
                
                <CardTitle className="text-3xl mb-2">Plan {selectedPlan.name}</CardTitle>
                <CardDescription className="mb-6">{selectedPlan.description}</CardDescription>
                
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    {selectedPlan.price}€
                  </div>
                  <div className="text-gray-600">par mois</div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Paiement sécurisé
                </CardTitle>
                <CardDescription>
                  Vos données sont protégées par Stripe, leader mondial du paiement en ligne
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* User Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">Compte :</span>
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Plan actuel :</span>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-4">Récapitulatif de commande</h3>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Plan {selectedPlan.name} (mensuel)</span>
                      <span>{selectedPlan.price}€</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>TVA (20%)</span>
                      <span>{(selectedPlan.price * 0.2).toFixed(2)}€</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold">
                      <span>Total</span>
                      <span>{(selectedPlan.price * 1.2).toFixed(2)}€</span>
                    </div>
                  </div>
                </div>

                {/* Payment Button */}
                <Button 
                  size="lg" 
                  className="w-full"
                  onClick={handleSubscribe}
                  disabled={subscribing}
                >
                  {subscribing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Traitement...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Souscrire maintenant - {(selectedPlan.price * 1.2).toFixed(2)}€
                    </>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="flex items-start gap-3 text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-blue-900 mb-1">Paiement 100% sécurisé</div>
                    <div>
                      Vos informations de paiement sont chiffrées et sécurisées par Stripe. 
                      Nous ne stockons aucune donnée bancaire.
                    </div>
                  </div>
                </div>

                {/* Terms */}
                <div className="text-xs text-gray-500 space-y-2">
                  <p>
                    En cliquant sur "Souscrire maintenant", vous acceptez nos{' '}
                    <Link href="/terms" className="text-blue-600 hover:underline">
                      Conditions Générales
                    </Link>{' '}
                    et notre{' '}
                    <Link href="/privacy" className="text-blue-600 hover:underline">
                      Politique de confidentialité
                    </Link>.
                  </p>
                  <p>
                    Votre abonnement se renouvelle automatiquement chaque mois. 
                    Vous pouvez annuler à tout moment depuis votre dashboard.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Une question ? Notre équipe est là pour vous aider
              </p>
              <Button variant="outline" size="sm">
                Contacter le support
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Note: metadata export doesn't work in 'use client' components
// SEO will be handled by the layout or a parent server component
