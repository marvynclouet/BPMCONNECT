import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, X, Zap, Star, Crown } from 'lucide-react'

export default function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      period: '',
      description: 'Pour découvrir la plateforme',
      icon: Star,
      color: 'border-gray-200',
      buttonStyle: 'outline',
      features: [
        { text: '3 services maximum', included: true },
        { text: 'Profil public basique', included: true },
        { text: 'Commission 8%', included: true },
        { text: 'Support standard', included: true },
        { text: 'Paiement J+7', included: true },
        { text: 'Financement participatif', included: false },
        { text: 'Livraison express', included: false },
        { text: 'Analytics avancées', included: false },
        { text: 'Réductions partenaires', included: false },
        { text: 'Masterclass BPM', included: false }
      ]
    },
    {
      name: 'Pro',
      price: 29,
      period: '/mois',
      description: 'Pour les créateurs sérieux',
      icon: Zap,
      color: 'border-blue-500',
      buttonStyle: 'default',
      popular: true,
      features: [
        { text: 'Services illimités', included: true },
        { text: 'Commission réduite 5%', included: true },
        { text: 'Financement participatif', included: true },
        { text: 'Livraison express', included: true },
        { text: 'Analytics détaillées', included: true },
        { text: 'Réductions partenaires', included: true },
        { text: 'Masterclass BPM -20%', included: true },
        { text: 'Badge Pro + mise en avant', included: true },
        { text: 'Paiement J+2', included: true },
        { text: 'Support prioritaire', included: true }
      ]
    },
    {
      name: 'Boss',
      price: 99,
      period: '/mois',
      description: 'Pour les entrepreneurs musicaux',
      icon: Crown,
      color: 'border-purple-500',
      buttonStyle: 'default',
      features: [
        { text: 'Tout Pro inclus', included: true },
        { text: 'Commission ultra-réduite 3%', included: true },
        { text: 'Placement sponsorisé "À la une"', included: true },
        { text: '2h studio BPM offertes/mois', included: true },
        { text: 'Statistics avancées + ROI', included: true },
        { text: 'Badge Boss exclusif', included: true },
        { text: 'Support VIP dédié', included: true },
        { text: 'Invitations événements VIP', included: true },
        { text: 'Paiement J+1', included: true },
        { text: 'API access (prochainement)', included: true }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-foreground">
              BPM Connect
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/services" className="text-muted-foreground hover:text-foreground">
                Services
              </Link>
              <Link href="/pricing" className="text-blue-600 font-medium">
                Tarifs
              </Link>
              <Link href="/signin" className="text-muted-foreground hover:text-foreground">
                Se connecter
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choisissez votre plan 💎
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Commencez gratuitement et évoluez selon vos besoins. 
            Tous les plans incluent l'accès à la marketplace et au réseau de créateurs.
          </p>
          
          {/* Toggle (Annual/Monthly) */}
          <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
            <button className="px-4 py-2 rounded-md bg-white text-foreground font-medium shadow-sm">
              Mensuel
            </button>
            <button className="px-4 py-2 rounded-md text-muted-foreground hover:text-foreground">
              Annuel
              <Badge className="ml-2 bg-green-100 text-green-800 text-xs">-20%</Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon
            return (
              <Card 
                key={plan.name} 
                className={`relative ${plan.color} ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-500 text-white px-4 py-1">
                      ⭐ Plus populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${
                      plan.name === 'Free' ? 'bg-gray-100' :
                      plan.name === 'Pro' ? 'bg-blue-100' : 'bg-purple-100'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        plan.name === 'Free' ? 'text-muted-foreground' :
                        plan.name === 'Pro' ? 'text-blue-600' : 'text-purple-600'
                      }`} />
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">{plan.description}</CardDescription>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-foreground">
                        {plan.price === 0 ? 'Gratuit' : `${plan.price}€`}
                      </span>
                      {plan.period && (
                        <span className="text-muted-foreground ml-1">{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full"
                    variant={plan.buttonStyle as any}
                    asChild
                  >
                    <Link href={plan.name === 'Free' ? '/signup' : `/subscribe/${plan.name.toLowerCase()}`}>
                      {plan.name === 'Free' ? 'Commencer gratuitement' : `Choisir ${plan.name}`}
                    </Link>
                  </Button>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${
                          feature.included ? 'text-foreground' : 'text-gray-500'
                        }`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Comparison Button */}
        <div className="text-center mb-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/pricing/compare">
              📊 Comparer les plans en détail
            </Link>
          </Button>
        </div>

        {/* Legal Notice */}
        <div className="max-w-3xl mx-auto mb-12 text-center p-6 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">
            ✅ Annulation à tout moment — Paiement sécurisé via Stripe — Aucun engagement
          </p>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Questions fréquentes
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Puis-je changer de plan à tout moment ?
              </h3>
              <p className="text-muted-foreground">
                Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. 
                Les changements prennent effet immédiatement avec un calcul au prorata.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Que se passe-t-il si j'annule mon abonnement ?
              </h3>
              <p className="text-muted-foreground">
                Vous conservez l'accès aux fonctionnalités Premium jusqu'à la fin de votre période de facturation, 
                puis votre compte revient automatiquement au plan Free.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Les commissions sont-elles prélevées automatiquement ?
              </h3>
              <p className="text-muted-foreground">
                Oui, la commission de la plateforme est automatiquement déduite de vos revenus avant le paiement. 
                Vous recevez toujours le montant net affiché.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Comment fonctionnent les heures de studio offertes ?
              </h3>
              <p className="text-muted-foreground">
                Les abonnés Boss reçoivent 2h de studio BPM gratuites chaque mois, 
                utilisables dans nos studios partenaires. Les heures non utilisées ne sont pas reportées.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Y a-t-il des frais cachés ?
              </h3>
              <p className="text-muted-foreground">
                Non, nos tarifs sont transparents. Seuls les frais de traitement Stripe (2,9% + 0,25€) 
                s'appliquent sur les paiements reçus, comme sur toutes les plateformes.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à développer votre carrière ? 🚀
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Rejoignez des milliers de créateurs qui font confiance à BPM Connect
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link href="/signup">
                  Commencer gratuitement
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                <Link href="/services">
                  Explorer la marketplace
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export const metadata = {
  title: 'Tarifs - BPM Connect',
  description: 'Découvrez nos plans Free, Pro et Boss. Commencez gratuitement et évoluez selon vos besoins.',
}
