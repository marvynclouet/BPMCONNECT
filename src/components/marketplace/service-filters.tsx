'use client'

import { useState } from 'react'
import { ServiceCategory, ServiceSearchFilters, SERVICE_CATEGORIES } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
// import { Slider } from '@/components/ui/slider' // Component will be added later
import { Filter, X } from 'lucide-react'

interface ServiceFiltersProps {
  filters: ServiceSearchFilters
  onFiltersChange: (filters: ServiceSearchFilters) => void
  onReset: () => void
}

export function ServiceFilters({ filters, onFiltersChange, onReset }: ServiceFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  const updateFilter = (key: keyof ServiceSearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const removeFilter = (key: keyof ServiceSearchFilters) => {
    const newFilters = { ...filters }
    delete newFilters[key]
    onFiltersChange(newFilters)
  }

  const hasActiveFilters = Object.keys(filters).length > 0

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button 
          variant="outline" 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtres {hasActiveFilters && `(${Object.keys(filters).length})`}
        </Button>
      </div>

      {/* Active Filters Bar */}
      {hasActiveFilters && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-blue-900">Filtres actifs :</span>
            <Button variant="ghost" size="sm" onClick={onReset}>
              <X className="h-4 w-4 mr-1" />
              Tout effacer
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <Badge variant="secondary" className="flex items-center gap-1">
                {SERVICE_CATEGORIES[filters.category].label}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('category')}
                />
              </Badge>
            )}
            {filters.min_price && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Min {filters.min_price}€
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('min_price')}
                />
              </Badge>
            )}
            {filters.max_price && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max {filters.max_price}€
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('max_price')}
                />
              </Badge>
            )}
            {filters.max_delivery_days && (
              <Badge variant="secondary" className="flex items-center gap-1">
                Max {filters.max_delivery_days} jours
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter('max_delivery_days')}
                />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Filters Panel */}
      <Card className={`${isOpen || !hasActiveFilters ? 'block' : 'hidden'} lg:block`}>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Catégorie</Label>
            <Select
              value={filters.category || ''}
              onValueChange={(value) => updateFilter('category', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Toutes les catégories</SelectItem>
                {Object.entries(SERVICE_CATEGORIES).map(([key, info]) => (
                  <SelectItem key={key} value={key}>
                    {info.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Fourchette de prix</Label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs text-gray-500">Min (€)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={filters.min_price || ''}
                  onChange={(e) => updateFilter('min_price', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
              <div>
                <Label className="text-xs text-gray-500">Max (€)</Label>
                <Input
                  type="number"
                  placeholder="1000"
                  value={filters.max_price || ''}
                  onChange={(e) => updateFilter('max_price', e.target.value ? Number(e.target.value) : undefined)}
                />
              </div>
            </div>
          </div>

          {/* Delivery Time */}
          <div>
            <Label className="text-sm font-medium mb-3 block">
              Délai de livraison max
            </Label>
            <Input
              type="range"
              min="1"
              max="30"
              value={filters.max_delivery_days || 30}
              onChange={(e) => updateFilter('max_delivery_days', Number(e.target.value))}
              className="w-full"
            />
            <div className="text-xs text-gray-500 mt-1">
              {filters.max_delivery_days || 30} jours maximum
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Note minimum</Label>
            <Select
              value={filters.min_rating?.toString() || ''}
              onValueChange={(value) => updateFilter('min_rating', value ? Number(value) : undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les notes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Toutes les notes</SelectItem>
                <SelectItem value="4">⭐ 4+ étoiles</SelectItem>
                <SelectItem value="4.5">⭐ 4.5+ étoiles</SelectItem>
                <SelectItem value="4.8">⭐ 4.8+ étoiles</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Seller Level */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Niveau du vendeur</Label>
            <Select
              value={filters.seller_level || ''}
              onValueChange={(value) => updateFilter('seller_level', value || undefined)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les niveaux" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">Tous les niveaux</SelectItem>
                <SelectItem value="new">🆕 Nouveaux</SelectItem>
                <SelectItem value="pro">💎 Pro</SelectItem>
                <SelectItem value="boss">👑 Boss</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Features */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Fonctionnalités</Label>
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={filters.has_rush_delivery || false}
                  onChange={(e) => updateFilter('has_rush_delivery', e.target.checked || undefined)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">⚡ Livraison express disponible</span>
              </label>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
