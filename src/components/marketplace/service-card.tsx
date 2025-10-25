import { ServiceListing, SERVICE_CATEGORIES } from '@/types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star, Clock, User, MessageCircle, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import { AvatarGenerator, ServicePlaceholder } from '@/components/ui/avatar-generator'
import { Button } from '@/components/ui/button'

interface ServiceCardProps {
  service: ServiceListing
}

export function ServiceCard({ service }: ServiceCardProps) {
  const categoryInfo = SERVICE_CATEGORIES[service.category]
  
  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/messages?to=${service.seller_id}`
  }

  const handleOrderClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/services/${service.slug}?action=order`
  }
  
  return (
    <Link href={`/services/${service.slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <CardHeader className="p-0">
          {/* Cover Image */}
          <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg overflow-hidden">
            {service.cover_image_url ? (
              <img 
                src={service.cover_image_url} 
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <ServicePlaceholder 
                  category={service.category} 
                  size={120}
                  className="text-muted-foreground"
                />
              </div>
            )}
            
            {/* Category Badge */}
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {categoryInfo.label}
              </Badge>
            </div>
            
            {/* Featured Badge */}
            {service.is_featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-yellow-500 text-white">
                  ⭐ Mis en avant
                </Badge>
              </div>
            )}

            {/* Pro/Boss Badge */}
            {(service.seller?.subscription_plan === 'pro' || service.seller?.subscription_plan === 'boss') && (
              <div className="absolute bottom-3 left-3">
                <Badge className={`${
                  service.seller.subscription_plan === 'boss' ? 'bg-purple-600' : 'bg-blue-600'
                } text-white`}>
                  {service.seller.subscription_plan === 'boss' ? '👑 Boss' : '⭐ Pro'}
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          {/* Seller Info */}
          <div className="flex items-center gap-2 mb-3">
            <AvatarGenerator 
              name={service.seller?.display_name || 'Créateur'}
              role={service.seller?.role || 'creator'}
              size={24}
            />
            <span className="text-sm text-muted-foreground">
              {service.seller?.display_name || 'Créateur'}
            </span>
            {service.seller?.bmp_certified && (
              <Badge variant="outline" className="text-xs px-1 py-0">
                🎓 BPM
              </Badge>
            )}
          </div>
          
          {/* Service Title */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {service.title}
          </h3>
          
          {/* Service Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">
                {service.average_rating > 0 ? service.average_rating.toFixed(1) : 'Nouveau'}
              </span>
              {service.reviews_count > 0 && (
                <span>({service.reviews_count})</span>
              )}
            </div>
            
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span>{service.orders_count} commandes</span>
            </div>
          </div>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              {service.revisions_included} révisions
            </Badge>
            {service.commercial_use && (
              <Badge variant="outline" className="text-xs">
                Usage commercial
              </Badge>
            )}
            {service.source_files && (
              <Badge variant="outline" className="text-xs">
                Fichiers sources
              </Badge>
            )}
            {service.rush_delivery_available && (
              <Badge variant="outline" className="text-xs text-orange-600">
                ⚡ Livraison express
              </Badge>
            )}
          </div>
          
          {/* Price and Delivery */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Clock className="h-4 w-4" />
              <span>{service.delivery_days} jours</span>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-bold text-gray-900">
                {service.price}€
              </div>
              <div className="text-xs text-gray-500">
                À partir de
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex-1"
              onClick={handleContactClick}
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              Contacter
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-green-600 hover:bg-green-700"
              onClick={handleOrderClick}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Commander
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
