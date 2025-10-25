'use client'

import { useState, useEffect } from 'react'
import { UserProfile } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { MainNavbar } from '@/components/navigation/main-navbar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Star, MapPin, Users, Calendar, Heart, MessageCircle, ExternalLink, Play, Award, Clock, CheckCircle } from 'lucide-react'
import Link from 'next/link'

// Mock creator data
const MOCK_CREATOR: UserProfile = {
  id: '1',
  email: 'djproducer@example.com',
  role: 'beatmaker',
  subscription_plan: 'pro',
  handle: 'djproducer',
  display_name: 'DJ Producer',
  bio: `Beatmaker professionnel spécialisé dans le Trap et l'Afrobeat depuis plus de 5 ans.

J'ai collaboré avec de nombreux artistes émergents et confirmés, créant des beats qui ont cumulé plus de 2 millions d'écoutes sur les plateformes de streaming.

Mon style unique mélange les sonorités modernes du trap avec des influences afrobeat authentiques, créant une signature sonore reconnaissable.

🎵 Spécialités :
• Trap moderne & Old School
• Afrobeat & Afro-fusion  
• R&B contemporain
• Drill & Jersey Club

🏆 Réalisations :
• +127 beats vendus sur BPM Connect
• +2M d'écoutes cumulées
• Collaborations avec 50+ artistes
• Certification BPM Formation`,
  avatar_url: '',
  banner_url: '',
  location: 'Paris, France',
  spotify_url: 'https://open.spotify.com/artist/djproducer',
  youtube_url: 'https://youtube.com/@djproducer',
  instagram_url: 'https://instagram.com/djproducer',
  tiktok_url: 'https://tiktok.com/@djproducer',
  website_url: 'https://djproducer.com',
  bmp_formation_connected: true,
  bmp_certified: true,
  seller_level: 'pro',
  seller_rating: 4.8,
  total_orders: 127,
  total_revenue: 8500,
  response_time_hours: 2,
  completion_rate: 98,
  followers_count: 456,
  following_count: 89,
  total_views: 12540,
  total_plays: 8930,
  stripe_account_id: 'acct_1234',
  stripe_onboarding_complete: true,
  payout_enabled: true,
  created_at: '2024-01-15T00:00:00Z',
  updated_at: '2024-10-25T00:00:00Z'
}

// Mock services
const MOCK_SERVICES = [
  {
    id: '1',
    title: 'Beat Trap professionnel avec mix inclus',
    price: 45,
    delivery_days: 3,
    orders_count: 89,
    average_rating: 4.8,
    cover_image_url: ''
  },
  {
    id: '2', 
    title: 'Beat Afrobeat exclusif + stems',
    price: 60,
    delivery_days: 4,
    orders_count: 38,
    average_rating: 4.9,
    cover_image_url: ''
  }
]

// Mock portfolio
const MOCK_PORTFOLIO = [
  {
    id: '1',
    title: 'Summer Vibes - Afrobeat',
    type: 'audio',
    duration: '3:24',
    plays: 1240,
    url: ''
  },
  {
    id: '2',
    title: 'Trap Banger - Behind the Scenes',
    type: 'video', 
    duration: '2:15',
    views: 890,
    url: ''
  }
]

interface CreatorPageProps {
  params: {
    handle: string
  }
}

export default function CreatorPage({ params }: CreatorPageProps) {
  const [creator, setCreator] = useState<UserProfile | null>(null)
  const [isFollowing, setIsFollowing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch creator by handle from API
    // For now, using mock data
    setCreator(MOCK_CREATOR)
    setLoading(false)
  }, [params.handle])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Créateur introuvable</h2>
          <p className="text-gray-600 mb-6">Ce profil n'existe pas ou a été supprimé.</p>
          <Link href="/creators">
            <Button>Retour aux créateurs</Button>
          </Link>
        </div>
      </div>
    )
  }

  const getRoleDisplayName = (role: string): string => {
    const roleMap = {
      creator: '🎤 Artiste',
      beatmaker: '🥁 Beatmaker',
      engineer: '🎧 Ingénieur Son',
      videographer: '🎬 Vidéaste',
      fan: '❤️ Fan',
      investor: '💰 Investisseur',
      business: '🏢 Entreprise',
    }
    return roleMap[role as keyof typeof roleMap] || role
  }

  const getLevelBadge = (level: string) => {
    switch (level) {
      case 'new': return { label: '🆕 Nouveau', class: 'bg-green-100 text-green-800' }
      case 'rising': return { label: '⭐ Rising', class: 'bg-yellow-100 text-yellow-800' }
      case 'pro': return { label: '💎 Pro', class: 'bg-blue-100 text-blue-800' }
      case 'top': return { label: '👑 Top', class: 'bg-purple-100 text-purple-800' }
      default: return { label: level, class: 'bg-gray-100 text-gray-800' }
    }
  }

  const levelBadge = getLevelBadge(creator.seller_level)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <div className="relative">
            {/* Banner */}
            <div className="h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg"></div>
            
            {/* Profile Info */}
            <div className="relative px-6 pb-6">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16">
                <div className="flex flex-col md:flex-row md:items-end gap-6">
                  {/* Avatar */}
                  <Avatar className="h-32 w-32 border-6 border-white shadow-lg">
                    <AvatarImage src={creator.avatar_url} />
                    <AvatarFallback className="text-4xl">
                      {creator.display_name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Basic Info */}
                  <div className="md:pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {creator.display_name}
                      </h1>
                      {creator.bmp_certified && (
                        <CheckCircle className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <p className="text-lg text-gray-600 mb-3">@{creator.handle}</p>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge variant="secondary" className="text-sm">
                        {getRoleDisplayName(creator.role)}
                      </Badge>
                      <Badge className={levelBadge.class}>
                        {levelBadge.label}
                      </Badge>
                      <Badge className={
                        creator.subscription_plan === 'pro' ? 'bg-blue-100 text-blue-800' :
                        creator.subscription_plan === 'boss' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {creator.subscription_plan.toUpperCase()}
                      </Badge>
                      {creator.bmp_certified && (
                        <Badge className="bg-orange-100 text-orange-800">
                          🎓 BPM Certified
                        </Badge>
                      )}
                    </div>

                    {/* Location & Join Date */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {creator.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          <span>{creator.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>Membre depuis {new Date(creator.created_at).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Répond en {creator.response_time_hours}h</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6 md:mt-0 md:pb-4">
                  <Button
                    variant={isFollowing ? "default" : "outline"}
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="flex items-center gap-2"
                  >
                    <Heart className={`h-4 w-4 ${isFollowing ? 'fill-current' : ''}`} />
                    {isFollowing ? 'Suivi' : 'Suivre'}
                  </Button>
                  <Button asChild>
                    <Link href={`/messages?user=${creator.id}`}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{creator.followers_count}</div>
            <div className="text-sm text-gray-600">Abonnés</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              {creator.seller_rating}
            </div>
            <div className="text-sm text-gray-600">Note moyenne</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{creator.total_orders}</div>
            <div className="text-sm text-gray-600">Commandes</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{creator.completion_rate}%</div>
            <div className="text-sm text-gray-600">Taux de réussite</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">{creator.total_plays.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Écoutes totales</div>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">À propos</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Biographie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {creator.bio?.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Liens & Réseaux</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {creator.spotify_url && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={creator.spotify_url} target="_blank" rel="noopener noreferrer">
                        🎵 Spotify
                      </a>
                    </Button>
                  )}
                  {creator.youtube_url && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={creator.youtube_url} target="_blank" rel="noopener noreferrer">
                        📺 YouTube
                      </a>
                    </Button>
                  )}
                  {creator.instagram_url && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={creator.instagram_url} target="_blank" rel="noopener noreferrer">
                        📷 Instagram
                      </a>
                    </Button>
                  )}
                  {creator.website_url && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={creator.website_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Site Web
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {MOCK_SERVICES.map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>
                          Livraison en {service.delivery_days} jours
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">
                          {service.price}€
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{service.average_rating}</span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {service.orders_count} commandes
                      </div>
                    </div>
                    <Button className="w-full" asChild>
                      <Link href={`/services/${service.id}`}>
                        Voir le service
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MOCK_PORTFOLIO.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {/* Preview */}
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                      {item.type === 'audio' ? (
                        <div className="text-center">
                          <Play className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                          <div className="text-sm text-gray-600">Audio Preview</div>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="text-4xl mb-2">🎬</div>
                          <div className="text-sm text-gray-600">Video Preview</div>
                        </div>
                      )}
                    </div>
                    
                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{item.duration}</span>
                        <span>
                          {item.type === 'audio' ? `${item.plays} écoutes` : `${item.views} vues`}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="space-y-6">
            <div className="text-center py-12">
              <Award className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Avis et témoignages
              </h3>
              <p className="text-gray-600">
                Les avis clients seront affichés ici après les premières commandes
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Note: metadata export doesn't work in 'use client' components
// SEO will be handled by the layout or a parent server component
