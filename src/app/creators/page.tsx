'use client'

import { useState, useEffect } from 'react'
import { UserProfile, UserRole } from '@/types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { MainNavbar } from '@/components/navigation/main-navbar'
import { Search, MapPin, Star, Users, Play, Heart, MessageCircle, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// Mock data for development
const MOCK_CREATORS: UserProfile[] = [
  {
    id: '1',
    email: 'djproducer@example.com',
    role: 'beatmaker',
    subscription_plan: 'pro',
    handle: 'djproducer',
    display_name: 'DJ Producer',
    bio: 'Beatmaker professionnel spécialisé dans le Trap et l\'Afrobeat. Plus de 5 ans d\'expérience et collaborations avec des artistes reconnus.',
    avatar_url: '',
    banner_url: '',
    location: 'Paris, France',
    spotify_url: 'https://open.spotify.com/artist/example',
    youtube_url: 'https://youtube.com/@djproducer',
    instagram_url: 'https://instagram.com/djproducer',
    bmp_formation_connected: true,
    bmp_certified: true,
    seller_level: 'pro',
    seller_rating: 4.8,
    total_orders: 127,
    total_revenue: 8500,
    response_time_hours: 2,
    completion_rate: 98,
    availability_status: 'available',
    followers_count: 456,
    following_count: 89,
    total_views: 12540,
    total_plays: 8930,
    stripe_account_id: 'acct_1234',
    stripe_onboarding_complete: true,
    payout_enabled: true,
    created_at: '2024-01-15T00:00:00Z',
    updated_at: '2024-10-25T00:00:00Z'
  },
  {
    id: '2',
    email: 'alexmix@example.com',
    role: 'engineer',
    subscription_plan: 'boss',
    handle: 'alexmixmaster',
    display_name: 'Alex Mix Master',
    bio: 'Ingénieur son professionnel avec plus de 10 ans d\'expérience. Spécialiste du mixage et mastering pour tous styles musicaux.',
    avatar_url: '',
    location: 'Lyon, France',
    website_url: 'https://alexmixmaster.com',
    bmp_formation_connected: false,
    bmp_certified: false,
    seller_level: 'top',
    seller_rating: 4.9,
    total_orders: 234,
    total_revenue: 15600,
    response_time_hours: 1,
    completion_rate: 99,
    availability_status: 'in_studio',
    followers_count: 789,
    following_count: 45,
    total_views: 23450,
    total_plays: 0,
    stripe_account_id: 'acct_5678',
    stripe_onboarding_complete: true,
    payout_enabled: true,
    created_at: '2023-12-01T00:00:00Z',
    updated_at: '2024-10-25T00:00:00Z'
  },
  {
    id: '3',
    email: 'videocreator@example.com',
    role: 'videographer',
    subscription_plan: 'pro',
    handle: 'creativevision',
    display_name: 'Creative Vision',
    bio: 'Réalisateur et monteur vidéo passionné. Spécialisé dans les clips musicaux et content creation pour artistes émergents.',
    avatar_url: '',
    location: 'Marseille, France',
    youtube_url: 'https://youtube.com/@creativevision',
    instagram_url: 'https://instagram.com/creativevision',
    bmp_formation_connected: true,
    bmp_certified: true,
    seller_level: 'rising',
    seller_rating: 4.7,
    total_orders: 89,
    total_revenue: 6700,
    response_time_hours: 3,
    completion_rate: 95,
    availability_status: 'busy',
    followers_count: 234,
    following_count: 156,
    total_views: 8920,
    total_plays: 0,
    stripe_account_id: 'acct_9012',
    stripe_onboarding_complete: true,
    payout_enabled: true,
    created_at: '2024-03-10T00:00:00Z',
    updated_at: '2024-10-25T00:00:00Z'
  },
  {
    id: '4',
    email: 'vocalist@example.com',
    role: 'creator',
    subscription_plan: 'free',
    handle: 'melodicvoice',
    display_name: 'Melodic Voice',
    bio: 'Chanteuse R&B/Soul à la recherche de collaborations. Ouverte à tous styles musicaux pour featrings et projets créatifs.',
    avatar_url: '',
    location: 'Toulouse, France',
    spotify_url: 'https://open.spotify.com/artist/melodicvoice',
    instagram_url: 'https://instagram.com/melodicvoice',
    bmp_formation_connected: false,
    bmp_certified: false,
    seller_level: 'new',
    seller_rating: 4.5,
    total_orders: 23,
    total_revenue: 890,
    response_time_hours: 6,
    completion_rate: 92,
    followers_count: 89,
    following_count: 234,
    total_views: 2340,
    total_plays: 1560,
    stripe_account_id: '',
    stripe_onboarding_complete: false,
    payout_enabled: false,
    created_at: '2024-08-20T00:00:00Z',
    updated_at: '2024-10-25T00:00:00Z'
  }
]

interface CreatorFilters {
  role?: UserRole
  location?: string
  min_rating?: number
  seller_level?: 'all' | 'new' | 'rising' | 'pro' | 'top'
  subscription_plan?: 'all' | 'free' | 'pro' | 'boss'
  bmp_certified?: boolean
  sort_by?: 'relevance' | 'rating' | 'followers' | 'orders' | 'newest'
  availability_status?: 'all' | 'available' | 'in_studio' | 'busy'
}

export default function CreatorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<CreatorFilters>({})
  const [creators, setCreators] = useState<UserProfile[]>(MOCK_CREATORS)
  const [loading, setLoading] = useState(false)
  const [followedCreators, setFollowedCreators] = useState<Set<string>>(new Set())

  // Apply filters
  useEffect(() => {
    let filteredCreators = [...MOCK_CREATORS]

    // Search filter
    if (searchQuery.trim()) {
      filteredCreators = filteredCreators.filter(creator =>
        creator.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.bio?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.location?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Role filter
    if (filters.role) {
      filteredCreators = filteredCreators.filter(creator => creator.role === filters.role)
    }

    // Location filter
    if (filters.location) {
      filteredCreators = filteredCreators.filter(creator => 
        creator.location?.toLowerCase().includes(filters.location!.toLowerCase())
      )
    }

    // Rating filter
    if (filters.min_rating) {
      filteredCreators = filteredCreators.filter(creator => creator.seller_rating >= filters.min_rating!)
    }

    // Level filter
    if (filters.seller_level && filters.seller_level !== 'all') {
      filteredCreators = filteredCreators.filter(creator => creator.seller_level === filters.seller_level)
    }

    // Plan filter
    if (filters.subscription_plan && filters.subscription_plan !== 'all') {
      filteredCreators = filteredCreators.filter(creator => creator.subscription_plan === filters.subscription_plan)
    }

    // BMP Certified filter
    if (filters.bmp_certified) {
      filteredCreators = filteredCreators.filter(creator => creator.bmp_certified)
    }

    // Availability filter
    if (filters.availability_status && filters.availability_status !== 'all') {
      filteredCreators = filteredCreators.filter(creator => 
        creator.availability_status === filters.availability_status
      )
    }

    // Sort
    if (filters.sort_by) {
      filteredCreators.sort((a, b) => {
        switch (filters.sort_by) {
          case 'rating':
            return b.seller_rating - a.seller_rating
          case 'followers':
            return b.followers_count - a.followers_count
          case 'orders':
            return b.total_orders - a.total_orders
          case 'newest':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          default:
            return 0
        }
      })
    }

    setCreators(filteredCreators)
  }, [searchQuery, filters])

  const getRoleDisplayName = (role: UserRole): string => {
    const roleMap = {
      creator: '🎤 Artiste',
      beatmaker: '🥁 Beatmaker',
      engineer: '🎧 Ingénieur Son',
      videographer: '🎬 Vidéaste',
      fan: '❤️ Fan',
      investor: '💰 Investisseur',
      business: '🏢 Entreprise',
    }
    return roleMap[role] || role
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'free': return 'bg-gray-100 text-gray-800'
      case 'pro': return 'bg-blue-100 text-blue-800'
      case 'boss': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
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

  const toggleFollow = (creatorId: string) => {
    setFollowedCreators(prev => {
      const newSet = new Set(prev)
      if (newSet.has(creatorId)) {
        newSet.delete(creatorId)
      } else {
        newSet.add(creatorId)
      }
      return newSet
    })
  }

  const resetFilters = () => {
    setFilters({})
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Découvrez les créateurs 🎨
          </h1>
          <p className="text-muted-foreground">
            Connectez-vous avec des talents de toute la francophonie
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Rechercher un créateur, une spécialité, une ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-lg h-12"
            />
          </div>

          {/* Filters Row */}
          <div className="flex flex-wrap gap-4">
            <Select
              value={filters.role || ''}
              onValueChange={(value) => setFilters({ ...filters, role: value as UserRole || undefined })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Tous les rôles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tous les rôles</SelectItem>
                <SelectItem value="creator">🎤 Artistes</SelectItem>
                <SelectItem value="beatmaker">🥁 Beatmakers</SelectItem>
                <SelectItem value="engineer">🎧 Ingénieurs Son</SelectItem>
                <SelectItem value="videographer">🎬 Vidéastes</SelectItem>
              </SelectContent>
            </Select>

            <Input
              placeholder="Ville ou région..."
              value={filters.location || ''}
              onChange={(e) => setFilters({ ...filters, location: e.target.value || undefined })}
              className="w-48"
            />

            <Select
              value={filters.seller_level || ''}
              onValueChange={(value) => setFilters({ ...filters, seller_level: value as any || undefined })}
            >
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="new">🆕 Nouveaux</SelectItem>
                <SelectItem value="rising">⭐ Rising</SelectItem>
                <SelectItem value="pro">💎 Pro</SelectItem>
                <SelectItem value="top">👑 Top</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.availability_status || ''}
              onValueChange={(value) => setFilters({ ...filters, availability_status: (value as 'all' | 'available' | 'in_studio' | 'busy') || undefined })}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Disponibilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="available">🟢 Disponible</SelectItem>
                <SelectItem value="in_studio">🎙️ En studio</SelectItem>
                <SelectItem value="busy">🔴 Occupé</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.sort_by || ''}
              onValueChange={(value) => setFilters({ ...filters, sort_by: value as any || undefined })}
            >
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="followers">Plus suivis</SelectItem>
                <SelectItem value="orders">Plus vendus</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="bmp_certified"
                checked={filters.bmp_certified || false}
                onChange={(e) => setFilters({ ...filters, bmp_certified: e.target.checked || undefined })}
                className="rounded border-gray-300"
              />
              <label htmlFor="bmp_certified" className="text-sm font-medium">
                🎓 BPM Certified uniquement
              </label>
            </div>

            {Object.keys(filters).length > 0 && (
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser
              </Button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            {creators.length} créateur{creators.length > 1 ? 's' : ''} trouvé{creators.length > 1 ? 's' : ''}
          </p>
        </div>

        {/* Creators Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Chargement des créateurs...</p>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucun créateur trouvé
            </h3>
            <p className="text-gray-600 mb-6">
              Essayez de modifier vos critères de recherche
            </p>
            <Button onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creators.map((creator) => {
              const levelBadge = getLevelBadge(creator.seller_level)
              const isFollowed = followedCreators.has(creator.id)
              
              return (
                <Card key={creator.id} className="hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <CardHeader className="relative p-0 border-b border-gray-200 dark:border-gray-700">
                    {/* Banner */}
                    <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-blue-400 to-purple-500">
                      <img 
                        src={`https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=200&fit=crop&sig=${creator.id}`}
                        alt="Banner"
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center' }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    {/* Avatar */}
                    <div className="relative flex items-end justify-between pt-12 px-4">
                      <div className="flex items-end gap-3">
                        <AvatarGenerator 
                          name={creator.display_name}
                          role={creator.role}
                          size={64}
                          showRoleIcon={true}
                          showOnlineStatus={false}
                          style="realistic"
                          imageUrl={creator.avatar_url}
                        />
                        <div className="pb-2">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                              {creator.display_name}
                            </h3>
                            {(creator.subscription_plan === 'pro' || creator.subscription_plan === 'boss') && (
                              <Badge className={`text-xs ${getPlanColor(creator.subscription_plan)}`}>
                                {creator.subscription_plan.toUpperCase()}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            @{creator.handle}
                          </p>
                        </div>
                      </div>
                      
                      {/* Follow Button */}
                      <Button
                        size="sm"
                        variant={isFollowed ? "default" : "outline"}
                        onClick={() => toggleFollow(creator.id)}
                        className="mb-2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 border-gray-300 dark:border-gray-600"
                      >
                        {isFollowed ? (
                          <>
                            <Heart className="h-4 w-4 mr-1 fill-current" />
                            Suivi
                          </>
                        ) : (
                          <>
                            <Heart className="h-4 w-4 mr-1" />
                            Suivre
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Role and Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {getRoleDisplayName(creator.role)}
                      </Badge>
                      <Badge className={levelBadge.class}>
                        {levelBadge.label}
                      </Badge>
                      {creator.bmp_certified && (
                        <Badge className="bg-orange-100 text-orange-800">
                          🎓 BPM Certified
                        </Badge>
                      )}
                    </div>

                    {/* Bio */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                      {creator.bio}
                    </p>

                    {/* Location */}
                    {creator.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{creator.location}</span>
                      </div>
                    )}

                    {/* Availability Status */}
                    {creator.availability_status && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          creator.availability_status === 'available' 
                            ? 'border-green-500 text-green-700 bg-green-50 dark:bg-green-900/20 dark:text-green-400 dark:border-green-400' 
                            : creator.availability_status === 'in_studio'
                            ? 'border-blue-500 text-blue-700 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-400'
                            : 'border-red-500 text-red-700 bg-red-50 dark:bg-red-900/20 dark:text-red-400 dark:border-red-400'
                        }`}
                      >
                        {creator.availability_status === 'available' && '🟢 Disponible'}
                        {creator.availability_status === 'in_studio' && '🎙️ En studio'}
                        {creator.availability_status === 'busy' && '🔴 Occupé'}
                      </Badge>
                    )}

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {creator.followers_count}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Abonnés</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {creator.seller_rating.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Note</div>
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {creator.total_orders}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Commandes</div>
                      </div>
                    </div>

                    {/* Social Links */}
                    {(creator.spotify_url || creator.youtube_url || creator.instagram_url || creator.website_url) && (
                      <div className="flex justify-center gap-2">
                        {creator.spotify_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={creator.spotify_url} target="_blank" rel="noopener noreferrer">
                              🎵
                            </a>
                          </Button>
                        )}
                        {creator.youtube_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={creator.youtube_url} target="_blank" rel="noopener noreferrer">
                              📺
                            </a>
                          </Button>
                        )}
                        {creator.instagram_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={creator.instagram_url} target="_blank" rel="noopener noreferrer">
                              📷
                            </a>
                          </Button>
                        )}
                        {creator.website_url && (
                          <Button variant="ghost" size="sm" asChild>
                            <a href={creator.website_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        )}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1" asChild>
                        <Link href={`/creators/${creator.handle}`}>
                          Voir le profil
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <Link href={`/messages?user=${creator.id}`}>
                          <MessageCircle className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* Load More */}
        {creators.length > 0 && creators.length >= 12 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Charger plus de créateurs
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

// Note: metadata export doesn't work in 'use client' components
// SEO will be handled by the layout or a parent server component
