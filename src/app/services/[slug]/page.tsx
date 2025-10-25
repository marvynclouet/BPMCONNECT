'use client'

import { useState, useEffect } from 'react'
import { ServiceListing, SERVICE_CATEGORIES } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Star, Clock, User, Shield, Package, Zap, MessageCircle, Heart, Share2, Play, Download } from 'lucide-react'
import Link from 'next/link'

// Mock data
const MOCK_SERVICE: ServiceListing = {
  id: '1',
  seller_id: '1',
  seller: {
    id: '1',
    email: 'beatmaker@example.com',
    role: 'beatmaker',
    subscription_plan: 'pro',
    display_name: 'DJ Producer',
    bio: 'Beatmaker professionnel depuis 5 ans, spécialisé dans le Trap et l\'Afrobeat. Plus de 200 beats vendus et collaborations avec des artistes reconnus.',
    location: 'Paris, France',
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
  description: `Je crée pour vous un beat trap sur mesure selon vos références musicales. 

🎵 **Ce que vous recevez :**
- Beat original exclusif de 2-4 minutes
- Mixage professionnel inclus
- Fichier WAV haute qualité + MP3
- 2 révisions gratuites incluses

🎧 **Mon processus :**
1. Vous partagez vos références et idées
2. Je compose votre beat unique
3. Mixage professionnel pour un son radio-ready
4. Livraison + révisions si nécessaire

✨ **Pourquoi me choisir :**
- 5 ans d'expérience en production
- Plus de 127 beats vendus avec satisfaction
- Délai respecté à 98%
- Réponse rapide (moins de 2h)

N'hésitez pas à me contacter avant commande pour discuter de votre projet !`,
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
  requirements: 'Références musicales souhaitées (liens YouTube/Spotify), BPM préféré si vous en avez un, tonalité/gamme particulière',
  preview_urls: [],
  cover_image_url: '',
  audio_preview_url: '',
  video_preview_url: '',
  extras: [
    {
      id: '1',
      service_id: '1',
      title: 'Stems séparés (8 pistes)',
      description: 'Recevez les pistes séparées pour remix ou modification',
      price: 15,
      delivery_days_added: 0,
      is_active: true
    },
    {
      id: '2',
      service_id: '1',
      title: 'Beat supplémentaire',
      description: 'Un deuxième beat dans le même style',
      price: 35,
      delivery_days_added: 2,
      is_active: true
    }
  ],
  orders_count: 89,
  average_rating: 4.8,
  reviews_count: 67,
  total_revenue: 4005,
  is_active: true,
  is_featured: true,
  created_at: '2024-09-01T00:00:00Z',
  updated_at: '2024-10-25T00:00:00Z'
}

interface ServiceDetailPageProps {
  params: {
    slug: string
  }
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const [service, setService] = useState<ServiceListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedExtras, setSelectedExtras] = useState<string[]>([])
  const [rushDelivery, setRushDelivery] = useState(false)
  const [requirements, setRequirements] = useState('')

  useEffect(() => {
    // TODO: Fetch service by slug from API
    // For now, using mock data
    setService(MOCK_SERVICE)
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement du service...</p>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Service introuvable</h2>
          <p className="text-gray-600 mb-6">Ce service n'existe pas ou a été supprimé.</p>
          <Link href="/services">
            <Button>Retour aux services</Button>
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = SERVICE_CATEGORIES[service.category]
  
  const toggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    )
  }

  const calculateTotal = () => {
    let total = service.price
    
    selectedExtras.forEach(extraId => {
      const extra = service.extras.find(e => e.id === extraId)
      if (extra) total += extra.price
    })
    
    if (rushDelivery) {
      total += service.rush_delivery_extra_cost || 0
    }
    
    return total
  }

  const calculateDeliveryTime = () => {
    let days = service.delivery_days
    
    if (rushDelivery && service.rush_delivery_days) {
      days = service.rush_delivery_days
    } else {
      selectedExtras.forEach(extraId => {
        const extra = service.extras.find(e => e.id === extraId)
        if (extra) days += extra.delivery_days_added
      })
    }
    
    return days
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              BPM Connect
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="/services" className="text-blue-600 font-medium">
                Services
              </Link>
              <Link href="/creators" className="text-gray-600 hover:text-gray-900">
                Créateurs
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/services" className="hover:text-gray-900">Services</Link>
          <span className="mx-2">›</span>
          <Link href={`/services?category=${service.category}`} className="hover:text-gray-900">
            {categoryInfo.label}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{service.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary">
                  {categoryInfo.label}
                </Badge>
                {service.is_featured && (
                  <Badge className="bg-yellow-500">⭐ Mis en avant</Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {service.title}
              </h1>

              {/* Seller Info */}
              <div className="flex items-center gap-4 mb-6">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={service.seller?.avatar_url} />
                  <AvatarFallback>
                    {service.seller?.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <Link 
                      href={`/creators/${service.seller?.handle}`}
                      className="font-semibold text-gray-900 hover:text-blue-600"
                    >
                      {service.seller?.display_name}
                    </Link>
                    {service.seller?.bmp_certified && (
                      <Badge variant="outline" className="text-xs">
                        🎓 BPM Certified
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.seller?.seller_rating}</span>
                      <span>({service.reviews_count} avis)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{service.orders_count} commandes</span>
                    </div>
                    {service.seller?.location && (
                      <span>📍 {service.seller.location}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Media Preview */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg h-64 flex items-center justify-center mb-6">
                {service.audio_preview_url ? (
                  <div className="text-center">
                    <Play className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Aperçu audio disponible</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-6xl mb-4">{categoryInfo.emoji}</div>
                    <p className="text-gray-600">Aperçu visuel du service</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>À propos de ce service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  {service.description.split('\n').map((line, index) => (
                    <p key={index} className="mb-3 whitespace-pre-line">
                      {line}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>Ce qui est inclus</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Livraison en {service.delivery_days} jours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-blue-600" />
                    <span>{service.revisions_included} révisions incluses</span>
                  </div>
                  {service.commercial_use && (
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span>Usage commercial autorisé</span>
                    </div>
                  )}
                  {service.source_files && (
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-blue-600" />
                      <span>Fichiers sources inclus</span>
                    </div>
                  )}
                  {service.rush_delivery_available && (
                    <div className="flex items-center gap-3">
                      <Zap className="h-5 w-5 text-orange-500" />
                      <span>Livraison express disponible</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {service.requirements && (
              <Card>
                <CardHeader>
                  <CardTitle>Prérequis du vendeur</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{service.requirements}</p>
                </CardContent>
              </Card>
            )}

            {/* FAQ Section (placeholder) */}
            <Card>
              <CardHeader>
                <CardTitle>Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Puis-je demander des modifications ?</h4>
                    <p className="text-gray-600">Oui, {service.revisions_included} révisions sont incluses dans le prix. Des révisions supplémentaires peuvent être demandées moyennant un coût additionnel.</p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Le beat sera-t-il exclusif ?</h4>
                    <p className="text-gray-600">Oui, chaque beat est créé sur mesure pour vous et ne sera pas revendu à d'autres clients.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Order Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900">
                        {calculateTotal()}€
                      </div>
                      <div className="text-sm text-gray-600">
                        Livraison en {calculateDeliveryTime()} jour{calculateDeliveryTime() > 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Rush Delivery */}
                  {service.rush_delivery_available && (
                    <div className="border rounded-lg p-3">
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rushDelivery}
                          onChange={(e) => setRushDelivery(e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Zap className="h-4 w-4 text-orange-500" />
                            <span className="font-medium">Livraison express</span>
                          </div>
                          <div className="text-sm text-gray-600">
                            {service.rush_delivery_days} jour - +{service.rush_delivery_extra_cost}€
                          </div>
                        </div>
                      </label>
                    </div>
                  )}

                  {/* Extras */}
                  {service.extras.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-3">Options supplémentaires</h4>
                      <div className="space-y-2">
                        {service.extras.map((extra) => (
                          <div key={extra.id} className="border rounded-lg p-3">
                            <label className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedExtras.includes(extra.id)}
                                onChange={() => toggleExtra(extra.id)}
                                className="rounded border-gray-300 mt-0.5"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <span className="font-medium">{extra.title}</span>
                                  <span className="font-bold">+{extra.price}€</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                  {extra.description}
                                </p>
                                {extra.delivery_days_added > 0 && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    +{extra.delivery_days_added} jour{extra.delivery_days_added > 1 ? 's' : ''} de délai
                                  </p>
                                )}
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Requirements */}
                  <div>
                    <Label className="font-medium mb-2 block">
                      Décrivez votre projet *
                    </Label>
                    <Textarea
                      placeholder="Partagez vos références, vos attentes, le style souhaité..."
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Order Button */}
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={!requirements.trim()}
                  >
                    Commander maintenant ({calculateTotal()}€)
                  </Button>

                  {/* Contact Seller */}
                  <Button variant="outline" size="lg" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contacter le vendeur
                  </Button>

                  {/* Trust Indicators */}
                  <div className="pt-4 border-t text-center">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="font-medium">{service.seller?.response_time_hours}h</div>
                        <div className="text-gray-600">Temps de réponse</div>
                      </div>
                      <div>
                        <div className="font-medium">{service.seller?.completion_rate}%</div>
                        <div className="text-gray-600">Commandes livrées</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
