'use client'

import { useState } from 'react'
import { getMockUser } from '@/lib/mock-auth'
import { MainNavbar } from '@/components/navigation/main-navbar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { Progress } from '@/components/ui/progress'
import { 
  Plus, TrendingUp, Clock, Users, Target, CheckCircle, 
  AlertCircle, TrendingDown, DollarSign, Gift, Calendar,
  Image as ImageIcon, Video
} from 'lucide-react'
import Link from 'next/link'

// Mock data for campaigns
const MOCK_CAMPAIGNS = [
  {
    id: '1',
    creator: {
      name: 'MC Dynamo',
      avatar: null,
      role: 'artiste'
    },
    title: 'EP "Paris Drill" - Production Pro',
    description: 'Production d\'un EP 7 titres avec vidéos pro et clips. Déjà 3 titres terminés !',
    goal_amount: 5000,
    current_amount: 3200,
    end_date: '2024-12-31',
    status: 'active',
    backers: 45,
    rewards: [
      { id: '1', amount: 10, description: 'Avant-première digitale + shoutout' },
      { id: '2', amount: 30, description: 'EP physique signé + accès studio' },
      { id: '3', amount: 100, description: 'Prod exclusive + feat possible' }
    ]
  },
  {
    id: '2',
    creator: {
      name: 'Alex Mix Master',
      avatar: null,
      role: 'engineer'
    },
    title: 'Nouveau studio de mixage/mastering',
    description: 'Ouverture d\'un studio professionnel avec équipement haut de gamme',
    goal_amount: 15000,
    current_amount: 18500,
    end_date: '2024-11-30',
    status: 'funded',
    backers: 127,
    rewards: [
      { id: '1', amount: 50, description: 'Session mastering -20%' },
      { id: '2', amount: 200, description: 'Pack 5 mixes + onboarding' }
    ]
  },
  {
    id: '3',
    creator: {
      name: 'Creative Vision',
      avatar: null,
      role: 'videographer'
    },
    title: 'Equipment vidéo 4K pour clips pros',
    description: 'Caméra RED + Lumière + Steadycam pour la production de clips de qualité',
    goal_amount: 8000,
    current_amount: 1200,
    end_date: '2025-01-15',
    status: 'active',
    backers: 8,
    rewards: [
      { id: '1', amount: 25, description: 'Crédit au générique' },
      { id: '2', amount: 150, description: 'Clip shooting -30%' }
    ]
  }
]

export default function FundingPage() {
  const [user] = useState(getMockUser())
  const [activeTab, setActiveTab] = useState<'active' | 'completed' | 'successful'>('active')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(camp => {
    if (activeTab === 'active') return camp.status === 'active'
    if (activeTab === 'successful') return camp.status === 'funded'
    return camp.status === 'funded' || camp.status === 'completed'
  })

  const getDaysRemaining = (endDate: string) => {
    const now = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  const getPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            💰 Financement Participatif
          </h1>
          <p className="text-muted-foreground">
            Lancez vos projets musicaux et faites les financer par la communauté
          </p>
        </div>

        {/* Tabs & Create Button */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2 border-b">
            <Button
              variant={activeTab === 'active' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('active')}
              className="rounded-b-none"
            >
              En cours
              {MOCK_CAMPAIGNS.filter(c => c.status === 'active').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {MOCK_CAMPAIGNS.filter(c => c.status === 'active').length}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === 'successful' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('successful')}
              className="rounded-b-none"
            >
              Réussies
              {MOCK_CAMPAIGNS.filter(c => c.status === 'funded').length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {MOCK_CAMPAIGNS.filter(c => c.status === 'funded').length}
                </Badge>
              )}
            </Button>
            <Button
              variant={activeTab === 'completed' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('completed')}
              className="rounded-b-none"
            >
              Terminées
            </Button>
          </div>

          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Créer une campagne
          </Button>
        </div>

        {/* Campaigns Grid */}
        {filteredCampaigns.length === 0 ? (
          <Card className="p-12 text-center">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">
              Aucune campagne {activeTab === 'active' ? 'en cours' : activeTab === 'successful' ? 'réussie' : 'terminée'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {activeTab === 'active' && 'Soyez le premier à lancer une campagne !'}
              {activeTab === 'successful' && 'Aucune campagne n\'a encore atteint son objectif.'}
              {activeTab === 'completed' && 'Aucune campagne n\'est terminée pour le moment.'}
            </p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Créer la première campagne
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCampaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  {/* Creator Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <AvatarGenerator
                      name={campaign.creator.name}
                      role={campaign.creator.role}
                      size={44}
                      showRoleIcon={true}
                      style="realistic"
                      className="shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{campaign.creator.name}</p>
                      <p className="text-xs text-muted-foreground">Organisateur</p>
                    </div>
                  </div>

                  <h3 className="font-bold text-lg line-clamp-2 mb-2">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {campaign.description}
                  </p>
                </CardHeader>

                <CardContent>
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold">
                          {getPercentage(campaign.current_amount, campaign.goal_amount).toFixed(0)}%
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        {campaign.current_amount}€ / {campaign.goal_amount}€
                      </div>
                    </div>
                    <Progress 
                      value={getPercentage(campaign.current_amount, campaign.goal_amount)} 
                      className="h-2"
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-foreground">
                        {campaign.backers}
                      </div>
                      <div className="text-xs text-muted-foreground">Contributeurs</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-foreground flex items-center justify-center gap-1">
                        <Clock className="h-3 w-3" />
                        {getDaysRemaining(campaign.end_date)}
                      </div>
                      <div className="text-xs text-muted-foreground">Jours restants</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-green-600 flex items-center justify-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {campaign.rewards.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Récompenses</div>
                    </div>
                  </div>

                  {/* Rewards Preview */}
                  <div className="border-t pt-4 mb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2">Récompenses populaires :</p>
                    <div className="space-y-1">
                      {campaign.rewards.slice(0, 2).map((reward) => (
                        <div key={reward.id} className="flex items-center gap-2 text-sm">
                          <Gift className="h-3 w-3 text-purple-600" />
                          <span className="font-medium">{reward.amount}€</span>
                          <span className="text-muted-foreground truncate">- {reward.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  {campaign.status === 'active' ? (
                    <Button className="w-full">
                      <DollarSign className="h-4 w-4 mr-2" />
                      Contribuer
                    </Button>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Campagne réussie
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Campaign Form */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Créer une campagne</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowCreateForm(false)}>
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Titre de la campagne *</label>
                  <Input placeholder="Ex: EP 'Paris Drill' - Production Professionnelle" />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Description *</label>
                  <Textarea
                    placeholder="Décrivez votre projet en détail, vos objectifs, ce que vous allez produire..."
                    rows={5}
                  />
                </div>

                {/* Goal & Duration */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Objectif (€) *</label>
                    <Input type="number" placeholder="5000" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Durée (jours) *</label>
                    <Input type="number" placeholder="30" />
                  </div>
                </div>

                {/* Media */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Visuels</label>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" className="h-32">
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-xs">Image de couverture</span>
                      </div>
                    </Button>
                    <Button variant="outline" className="h-32">
                      <div className="text-center">
                        <Video className="h-8 w-8 mx-auto mb-2" />
                        <span className="text-xs">Vidéo pitch</span>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Rewards */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Récompenses</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Montant (€)" className="w-32" />
                      <Input placeholder="Description de la récompense" />
                      <Button variant="ghost" size="sm">+</Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      💡 Ajoutez des paliers attractifs pour encourager les contributions
                    </p>
                  </div>
                </div>

                {/* Submit */}
                <div className="flex gap-3">
                  <Button className="flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Lancer la campagne
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Annuler
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  ℹ️ Disponible uniquement pour les plans Pro et Boss. 
                  <Link href="/pricing" className="text-blue-600 underline ml-1">
                    Voir les plans
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
