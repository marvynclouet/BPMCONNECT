'use client'

import { useState, useEffect } from 'react'
import { ServiceListing, ServiceSearchFilters, SERVICE_CATEGORIES } from '@/types'
import { ServiceCard } from '@/components/marketplace/service-card'
import { ServiceFilters } from '@/components/marketplace/service-filters'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Grid, List } from 'lucide-react'
import Link from 'next/link'
import { MiniThemeToggle } from '@/components/theme/theme-toggle'
import { Logo } from '@/components/ui/logo'
import { MainNavbar } from '@/components/navigation/main-navbar'

// Mock data for development
const MOCK_SERVICES: ServiceListing[] = [
  {
    id: '1',
    seller_id: '1',
    seller: {
      id: '1',
      email: 'beatmaker@example.com',
      role: 'beatmaker',
      subscription_plan: 'pro',
      display_name: 'DJ Producer',
      bio: 'Beatmaker professionnel depuis 5 ans',
      avatar_url: '',
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
      stripe_account_id: '',
      stripe_onboarding_complete: true,
      payout_enabled: true,
      created_at: '2024-01-15T00:00:00Z',
      updated_at: '2024-10-25T00:00:00Z'
    },
    title: 'Beat Trap professionnel avec mix inclus',
    slug: 'beat-trap-professionnel-mix-inclus',
    description: 'Je crée un beat trap sur mesure selon vos références avec mixage professionnel inclus.',
    category: 'beats',
    price: 45,
    delivery_days: 3,
    revisions_included: 2,
    max_revisions: 5,
    commercial_use: true,
    source_files: true,
    rush_delivery_available: true,
    rush_delivery_days: 1,
    rush_delivery_extra_cost: 20,
    requirements: 'Références musicales souhaitées, BPM préféré, tonalité',
    preview_urls: [],
    cover_image_url: '',
    audio_preview_url: '',
    video_preview_url: '',
    extras: [],
    orders_count: 89,
    average_rating: 4.8,
    reviews_count: 67,
    total_revenue: 4005,
    is_active: true,
    is_featured: true,
    created_at: '2024-09-01T00:00:00Z',
    updated_at: '2024-10-25T00:00:00Z'
  },
  {
    id: '2',
    seller_id: '2',
    seller: {
      id: '2',
      email: 'soundengineer@example.com',
      role: 'engineer',
      subscription_plan: 'boss',
      display_name: 'Alex Mix Master',
      bio: 'Ingénieur son spécialisé mix et mastering',
      avatar_url: '',
      bmp_formation_connected: false,
      bmp_certified: false,
      seller_level: 'top',
      seller_rating: 4.9,
      total_orders: 234,
      total_revenue: 15600,
      response_time_hours: 1,
      completion_rate: 99,
      followers_count: 789,
      following_count: 45,
      total_views: 23450,
      total_plays: 0,
      stripe_account_id: '',
      stripe_onboarding_complete: true,
      payout_enabled: true,
      created_at: '2023-12-01T00:00:00Z',
      updated_at: '2024-10-25T00:00:00Z'
    },
    title: 'Mixage professionnel de votre titre - Qualité studio',
    slug: 'mixage-professionnel-titre-qualite-studio',
    description: 'Mixage professionnel de votre morceau avec correction pitch, égalisation, compression et effets.',
    category: 'mix',
    price: 80,
    delivery_days: 5,
    revisions_included: 3,
    max_revisions: 6,
    commercial_use: true,
    source_files: false,
    rush_delivery_available: true,
    rush_delivery_days: 2,
    rush_delivery_extra_cost: 30,
    requirements: 'Fichiers séparés (stems) en WAV 24bit minimum',
    preview_urls: [],
    cover_image_url: '',
    audio_preview_url: '',
    video_preview_url: '',
    extras: [],
    orders_count: 156,
    average_rating: 4.9,
    reviews_count: 142,
    total_revenue: 12480,
    is_active: true,
    is_featured: false,
    created_at: '2024-08-15T00:00:00Z',
    updated_at: '2024-10-25T00:00:00Z'
  }
]

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<ServiceSearchFilters>({})
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [services, setServices] = useState<ServiceListing[]>(MOCK_SERVICES)
  const [loading, setLoading] = useState(false)

  // Apply filters (mock implementation)
  useEffect(() => {
    let filteredServices = [...MOCK_SERVICES]

    // Search filter
    if (searchQuery.trim()) {
      filteredServices = filteredServices.filter(service =>
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Category filter
    if (filters.category) {
      filteredServices = filteredServices.filter(service => service.category === filters.category)
    }

    // Price filters
    if (filters.min_price) {
      filteredServices = filteredServices.filter(service => service.price >= filters.min_price!)
    }
    if (filters.max_price) {
      filteredServices = filteredServices.filter(service => service.price <= filters.max_price!)
    }

    // Delivery time filter
    if (filters.max_delivery_days) {
      filteredServices = filteredServices.filter(service => service.delivery_days <= filters.max_delivery_days!)
    }

    // Rating filter
    if (filters.min_rating) {
      filteredServices = filteredServices.filter(service => service.average_rating >= filters.min_rating!)
    }

    // Sort
    if (filters.sort_by) {
      filteredServices.sort((a, b) => {
        switch (filters.sort_by) {
          case 'price_low':
            return a.price - b.price
          case 'price_high':
            return b.price - a.price
          case 'rating':
            return b.average_rating - a.average_rating
          case 'delivery_fast':
            return a.delivery_days - b.delivery_days
          case 'newest':
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          default:
            return 0
        }
      })
    }

    setServices(filteredServices)
  }, [searchQuery, filters])

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
            Marketplace des services 🛒
          </h1>
          <p className="text-muted-foreground">
            Découvrez les services proposés par notre communauté de créateurs
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-4">
            <Select
              value={filters.sort_by || ''}
              onValueChange={(value) => setFilters({ ...filters, sort_by: value as any })}
            >
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Trier par..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Pertinence</SelectItem>
                <SelectItem value="price_low">Prix croissant</SelectItem>
                <SelectItem value="price_high">Prix décroissant</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="delivery_fast">Livraison rapide</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex rounded-md overflow-hidden border">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ServiceFilters
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {services.length} service{services.length > 1 ? 's' : ''} trouvé{services.length > 1 ? 's' : ''}
              </p>
              
              {/* Category Pills */}
              <div className="hidden md:flex items-center gap-2">
                <Button
                  variant={!filters.category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilters({ ...filters, category: undefined })}
                >
                  Tous
                </Button>
                {Object.entries(SERVICE_CATEGORIES).map(([key, info]) => (
                  <Button
                    key={key}
                    variant={filters.category === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilters({ ...filters, category: key as any })}
                  >
                    {info.emoji} {info.label.replace(/🎵|🥁|🎧|🎬|🎨|🎤|📸/g, '').trim()}
                  </Button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Chargement des services...</p>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Aucun service trouvé
                </h3>
                <p className="text-muted-foreground mb-6">
                  Essayez de modifier vos critères de recherche
                </p>
                <Button onClick={resetFilters}>
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {services.length > 0 && services.length >= 12 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <Button variant="outline" size="sm" disabled>
                  ← Précédent
                </Button>
                <div className="flex items-center gap-1">
                  <Button variant="default" size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <span className="px-2">...</span>
                  <Button variant="outline" size="sm">10</Button>
                </div>
                <Button variant="outline" size="sm">
                  Suivant →
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
