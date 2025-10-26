'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AuthNav } from '@/components/ui/auth-nav'
import { Logo, LogoLarge } from '@/components/ui/logo'
import { HeroMusicIllustration } from '@/components/ui/illustrations'
import { getRoleIcon } from '@/components/ui/role-icons'
import { InteractiveVinyl } from '@/components/ui/interactive-vinyl'
import { Footer } from '@/components/ui/footer'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { ChevronDown } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
      {/* Sticky CTA Bar */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto px-4 py-3 flex justify-end">
          <Link href="/signup">
            <Button size="sm" variant="outline" className="border-blue-500 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950">
              ✨ Devenir Créateur
            </Button>
          </Link>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="container mx-auto px-4 pt-6">
        <div className="flex justify-between items-center">
          <Logo className="cursor-pointer" />
          <AuthNav />
        </div>
      </header>

      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-6 sm:pt-10 pb-16 sm:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          
          <div className="mb-8 sm:mb-12 flex justify-center">
            <InteractiveVinyl size={200} className="mx-auto sm:w-[280px] sm:h-[280px]" />
          </div>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-4 font-medium">
            La plateforme carrière des créateurs
          </p>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
            L'écosystème complet pour développer votre carrière musicale : 
            <strong className="text-foreground"> vendre vos services</strong>, <strong className="text-foreground">collaborer</strong>, 
            <strong className="text-foreground"> financer vos projets</strong> et <strong className="text-foreground">monétiser votre talent</strong>.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-3">
                🚀 Commencer maintenant
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-lg px-8 py-3"
              onClick={() => {
                document.getElementById('tarifs')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              💰 Voir les tarifs
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-sm text-muted-foreground mb-2">↓ Explorez la plateforme</p>
            <ChevronDown className="w-6 h-6 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Pourquoi BPM Connect Section */}
      <div className="container mx-auto px-4 py-8 sm:py-16 bg-background/50">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Pourquoi BPM Connect ?
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Trois raisons de rejoindre la plateforme qui révolutionne la carrière des créateurs musicaux
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Card 1: Vendez vos services */}
          <Card className="border-2 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Vendez vos services</CardTitle>
              <CardDescription className="text-base">
                Monétisez votre talent sans intermédiaires. Paiements sécurisés via Stripe, commission réduite.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Paiements directs et sécurisés
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Commission compétitive (5-0%)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">✓</span>
                  Statistiques en temps réel
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 2: Trouvez des collaborations */}
          <Card className="border-2 hover:border-purple-500 dark:hover:border-purple-500 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <CardTitle className="text-xl">Trouvez des collaborations</CardTitle>
              <CardDescription className="text-base">
                Connectez-vous avec des créateurs, studios et partenaires près de chez vous ou à l'international.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Recherche par style et localisation
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Portfolio audio/vidéo intégré
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">✓</span>
                  Messagerie instantanée sécurisée
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 3: Financer vos projets */}
          <Card className="border-2 hover:border-green-500 dark:hover:border-green-500 hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-16 h-16 mb-4 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <CardTitle className="text-xl">Financer vos projets</CardTitle>
              <CardDescription className="text-base">
                Lancez des campagnes de financement pour vos projets avec vos fans et des investisseurs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Crowdfunding intégré
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Système de récompenses
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Points BPM échangeables
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tout ce dont vous avez besoin en un seul endroit
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Fini le jonglage entre 10 plateformes différentes. BPM Connect centralise votre activité créative.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Marketplace */}
          <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                {getRoleIcon('beatmaker', { size: 24, className: "text-blue-600 dark:text-blue-400" })}
              </div>
              <CardTitle>Marketplace de services</CardTitle>
              <CardDescription>
                Vendez vos beats, mix, clips vidéo, coaching et prestations audio/vidéo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Beats & instrumentales</li>
                <li>• Mix & mastering</li>
                <li>• Clips & DA</li>
                <li>• Coaching & formation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Financement */}
          <Card className="border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                {getRoleIcon('investor', { size: 24, className: "text-purple-600 dark:text-purple-400" })}
              </div>
              <CardTitle>Financement participatif</CardTitle>
              <CardDescription>
                Vos fans et investisseurs financent vos projets musicaux
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Campagnes de financement</li>
                <li>• Système de récompenses</li>
                <li>• Points BPM échangeables</li>
                <li>• Investisseurs partenaires</li>
              </ul>
            </CardContent>
          </Card>

          {/* Réseau */}
          <Card className="border-2 hover:border-green-200 dark:hover:border-green-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                {getRoleIcon('creator', { size: 24, className: "text-green-600 dark:text-green-400" })}
              </div>
              <CardTitle>Réseau & collaborations</CardTitle>
              <CardDescription>
                Trouvez des collaborateurs, studios et partenaires près de chez vous
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Recherche par style/localisation</li>
                <li>• Messagerie instantanée</li>
                <li>• Portfolio audio/vidéo</li>
                <li>• Système de recommandations</li>
              </ul>
            </CardContent>
          </Card>

          {/* BPM Formation */}
          <Card className="border-2 hover:border-orange-200 dark:hover:border-orange-800 transition-colors">
            <CardHeader>
              <div className="w-12 h-12 mb-4 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                {getRoleIcon('engineer', { size: 24, className: "text-orange-600 dark:text-orange-400" })}
              </div>
              <CardTitle>Intégration BPM Formation</CardTitle>
              <CardDescription>
                Accès privilégié aux formations et badge "BPM Certified"
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Masterclass exclusives</li>
                <li>• Réductions sur formations</li>
                <li>• Badge de certification</li>
                <li>• Suivi de progression</li>
              </ul>
            </CardContent>
          </Card>

          {/* Gamification */}
          <Card className="border-2 hover:border-pink-200 transition-colors">
            <CardHeader>
              <div className="text-3xl mb-2">🏆</div>
              <CardTitle>Points & récompenses</CardTitle>
              <CardDescription>
                Gagnez des points BPM et débloquez des avantages exclusifs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Heures de studio gratuites</li>
                <li>• Réductions matériel</li>
                <li>• Cartes cadeaux</li>
                <li>• Accès VIP événements</li>
              </ul>
            </CardContent>
          </Card>

          {/* Outils Pro */}
          <Card className="border-2 hover:border-cyan-200 transition-colors">
            <CardHeader>
              <div className="text-3xl mb-2">📊</div>
              <CardTitle>Outils professionnels</CardTitle>
              <CardDescription>
                Statistiques, paiements sécurisés et support technique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Analytics & statistiques</li>
                <li>• Paiements Stripe sécurisés</li>
                <li>• Support prioritaire</li>
                <li>• Exports comptables</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Plans Section */}
      <div id="tarifs" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choisissez votre plan
          </h2>
          <p className="text-xl text-muted-foreground">
            Commencez gratuitement, évoluez selon vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Free Plan */}
          <Card className="border-2">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Free</CardTitle>
              <CardDescription className="text-xl font-bold text-foreground">
                Gratuit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ 3 uploads maximum</li>
                <li>✅ Profil public basique</li>
                <li>✅ Marketplace (commission 8%)</li>
                <li>❌ Pas de financement participatif</li>
                <li>❌ Pas de réductions partenaires</li>
              </ul>
              <Link href="/signup" className="block mt-6">
                <Button variant="outline" className="w-full">
                  Commencer gratuitement
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-blue-500">Populaire</Badge>
            </div>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Pro</CardTitle>
              <CardDescription className="text-xl font-bold text-foreground">
                25-30€/mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Uploads illimités</li>
                <li>✅ Financement participatif</li>
                <li>✅ Commission réduite (5%)</li>
                <li>✅ Réductions partenaires</li>
                <li>✅ Masterclass -20%</li>
                <li>✅ Badge Pro</li>
              </ul>
              <Link href="/signup" className="block mt-6">
                <Button className="w-full">
                  Choisir Pro
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Boss Plan */}
          <Card className="border-2 border-purple-500">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Boss</CardTitle>
              <CardDescription className="text-xl font-bold text-foreground">
                99€/mois
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>✅ Tout Pro inclus</li>
                <li>✅ Placement sponsorisé</li>
                <li>✅ 2h studio offertes/mois</li>
                <li>✅ Stats avancées</li>
                <li>✅ Support prioritaire</li>
                <li>✅ Invitations VIP</li>
              </ul>
              <Link href="/signup" className="block mt-6">
                <Button variant="outline" className="w-full border-purple-500 text-purple-700">
                  Choisir Boss
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Section Statistiques */}
      <div className="py-16 bg-gradient-to-r from-blue-50 via-background to-purple-50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚀 BPM Connect en Chiffres
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Rejoignez une communauté en pleine croissance de créateurs passionnés
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                25K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Créateurs Actifs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                150K+
              </div>
              <div className="text-sm text-muted-foreground font-medium">Services Vendus</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-red-500 bg-clip-text text-transparent mb-2">
                4.2M€
              </div>
              <div className="text-sm text-muted-foreground font-medium">Chiffre d'Affaires</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent mb-2">
                98%
              </div>
              <div className="text-sm text-muted-foreground font-medium">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Témoignages */}
      <div className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              💬 Ce que disent nos créateurs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des témoignages authentiques de notre communauté
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AvatarGenerator name="MC Fire" role="creator" size={48} />
                  <div>
                    <h4 className="font-semibold">MC Fire</h4>
                    <p className="text-sm text-muted-foreground">Rappeur • Paris</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "BPM Connect m'a permis de monétiser ma musique et de trouver des collaborateurs de qualité. 
                  J'ai gagné 3x plus qu'avant !"
                </p>
                <div className="mt-4 text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50/50 to-blue-50/50 dark:from-green-950/20 dark:to-blue-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AvatarGenerator name="BeatMaker Pro" role="beatmaker" size={48} />
                  <div>
                    <h4 className="font-semibold">BeatMaker Pro</h4>
                    <p className="text-sm text-muted-foreground">Producteur • Lyon</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Interface intuitive, clients sérieux, paiements sécurisés. 
                  Je recommande à tous les producteurs !"
                </p>
                <div className="mt-4 text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AvatarGenerator name="Studio Central" role="engineer" size={48} />
                  <div>
                    <h4 className="font-semibold">Studio Central</h4>
                    <p className="text-sm text-muted-foreground">Studio • Marseille</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "Grâce à BPM Connect, notre studio est réservé en permanence. 
                  La plateforme nous apporte une clientèle qualifiée."
                </p>
                <div className="mt-4 text-yellow-500">
                  ⭐⭐⭐⭐⭐
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Call to Action Final */}
      <div className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              🎵 Prêt à révolutionner votre carrière musicale ?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Rejoignez la première plateforme française dédiée aux créateurs musicaux. 
              <strong> Vendez, collaborez, apprenez et grandissez</strong> avec notre communauté.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4 font-semibold">
                  🚀 Commencer Gratuitement
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-4">
                  📊 Voir les Tarifs
                </Button>
              </Link>
            </div>
            
            <p className="text-sm text-blue-200">
              ✅ Inscription gratuite • ✅ Aucun engagement • ✅ Support 24/7
            </p>
          </div>
        </div>
      </div>

      {/* Footer Complet */}
      <Footer />
    </div>
  )
}