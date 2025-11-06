import { NextRequest, NextResponse } from 'next/server'
import * as servicesApi from '@/lib/api/services'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const slug = searchParams.get('slug')
    const id = searchParams.get('id')
    const sellerId = searchParams.get('seller_id')
    const query = searchParams.get('query')
    
    if (slug) {
      const service = await servicesApi.getServiceBySlug(slug)
      return NextResponse.json(service)
    }
    
    if (id) {
      const service = await servicesApi.getServiceById(id)
      return NextResponse.json(service)
    }
    
    if (sellerId) {
      const services = await servicesApi.getServicesBySeller(sellerId)
      return NextResponse.json(services)
    }
    
    if (query) {
      const services = await servicesApi.searchServices(query)
      return NextResponse.json(services)
    }
    
    // Get all services with filters
    const filters = {
      category: searchParams.get('category') as any,
      min_price: searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined,
      max_price: searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined,
      max_delivery_days: searchParams.get('max_delivery_days') ? Number(searchParams.get('max_delivery_days')) : undefined,
      min_rating: searchParams.get('min_rating') ? Number(searchParams.get('min_rating')) : undefined,
      has_rush_delivery: searchParams.get('has_rush_delivery') === 'true',
      sort_by: searchParams.get('sort_by') as any,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 20
    }
    
    const services = await servicesApi.getServices(filters)
    return NextResponse.json(services)
  } catch (error) {
    console.error('Error in GET /api/services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const service = await servicesApi.createService(user.id, body)
    
    if (!service) {
      return NextResponse.json({ error: 'Failed to create service' }, { status: 400 })
    }
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('Error in POST /api/services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }
    
    const service = await servicesApi.updateService(id, user.id, updates)
    
    if (!service) {
      return NextResponse.json({ error: 'Failed to update service' }, { status: 400 })
    }
    
    return NextResponse.json(service)
  } catch (error) {
    console.error('Error in PATCH /api/services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { createClient } = await import('@/lib/supabase/server')
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 })
    }
    
    const success = await servicesApi.deleteService(id, user.id)
    
    if (!success) {
      return NextResponse.json({ error: 'Failed to delete service' }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/services:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

