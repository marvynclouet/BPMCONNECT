import { createClient } from '@/lib/supabase/server'
import type { ServiceListing, ServiceCategory, ServiceSearchFilters, ServiceExtra } from '@/types'

export async function getServices(filters?: ServiceSearchFilters) {
  const supabase = await createClient()
  
  let query = supabase
    .from('service_listings')
    .select(`
      *,
      seller:user_profiles(*)
    `)
    .eq('is_active', true)
  
  // Apply filters
  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  
  if (filters?.min_price) {
    query = query.gte('price', filters.min_price)
  }
  
  if (filters?.max_price) {
    query = query.lte('price', filters.max_price)
  }
  
  if (filters?.max_delivery_days) {
    query = query.lte('delivery_days', filters.max_delivery_days)
  }
  
  if (filters?.min_rating) {
    query = query.gte('average_rating', filters.min_rating)
  }
  
  if (filters?.has_rush_delivery) {
    query = query.eq('rush_delivery_available', true)
  }
  
  // Sorting
  const sortBy = filters?.sort_by || 'relevance'
  switch (sortBy) {
    case 'price_low':
      query = query.order('price', { ascending: true })
      break
    case 'price_high':
      query = query.order('price', { ascending: false })
      break
    case 'delivery_fast':
      query = query.order('delivery_days', { ascending: true })
      break
    case 'rating':
      query = query.order('average_rating', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    default:
      query = query.order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })
  }
  
  // Pagination
  const page = filters?.page || 1
  const limit = filters?.limit || 20
  const from = (page - 1) * limit
  const to = from + limit - 1
  
  query = query.range(from, to)
  
  const { data, error } = await query
  
  if (error) return []
  
  return data as ServiceListing[]
}

export async function getServiceBySlug(slug: string): Promise<ServiceListing | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_listings')
    .select(`
      *,
      seller:user_profiles(*),
      extras:service_extras(*)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()
  
  if (error || !data) return null
  
  return data as ServiceListing
}

export async function getServiceById(id: string): Promise<ServiceListing | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_listings')
    .select(`
      *,
      seller:user_profiles(*),
      extras:service_extras(*)
    `)
    .eq('id', id)
    .single()
  
  if (error || !data) return null
  
  return data as ServiceListing
}

export async function createService(
  sellerId: string,
  serviceData: {
    title: string
    slug: string
    description: string
    category: ServiceCategory
    price: number
    delivery_days: number
    revisions_included?: number
    max_revisions?: number
    commercial_use?: boolean
    source_files?: boolean
    rush_delivery_available?: boolean
    rush_delivery_days?: number
    rush_delivery_extra_cost?: number
    requirements?: string
    preview_urls?: string[]
    cover_image_url?: string
    audio_preview_url?: string
    video_preview_url?: string
  }
): Promise<ServiceListing | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_listings')
    .insert({
      seller_id: sellerId,
      ...serviceData
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  return data as ServiceListing
}

export async function updateService(
  serviceId: string,
  sellerId: string,
  updates: Partial<ServiceListing>
): Promise<ServiceListing | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_listings')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', serviceId)
    .eq('seller_id', sellerId)
    .select()
    .single()
  
  if (error || !data) return null
  
  return data as ServiceListing
}

export async function deleteService(serviceId: string, sellerId: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('service_listings')
    .update({ is_active: false })
    .eq('id', serviceId)
    .eq('seller_id', sellerId)
  
  return !error
}

export async function getServicesBySeller(sellerId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_listings')
    .select('*')
    .eq('seller_id', sellerId)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (error) return []
  
  return data as ServiceListing[]
}

export async function createServiceExtra(
  serviceId: string,
  extraData: {
    title: string
    description?: string
    price: number
    delivery_days_added?: number
  }
): Promise<ServiceExtra | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_extras')
    .insert({
      service_id: serviceId,
      ...extraData
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  return data as ServiceExtra
}

export async function searchServices(query: string, limit = 20) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('service_listings')
    .select(`
      *,
      seller:user_profiles(*)
    `)
    .eq('is_active', true)
    .textSearch('title,description', query, {
      type: 'websearch',
      config: 'french'
    })
    .limit(limit)
  
  if (error) return []
  
  return data as ServiceListing[]
}

