import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as ordersApi from '@/lib/api/orders'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('id')
    const role = searchParams.get('role') as 'buyer' | 'seller' | null
    
    if (orderId) {
      const order = await ordersApi.getOrder(orderId, user.id)
      return NextResponse.json(order)
    }
    
    if (role) {
      const orders = await ordersApi.getOrdersByUser(user.id, role)
      return NextResponse.json(orders)
    }
    
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    console.error('Error in GET /api/orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const order = await ordersApi.createOrder(user.id, body)
    
    if (!order) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 400 })
    }
    
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error in POST /api/orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { id, status, role } = body
    
    if (!id || !status) {
      return NextResponse.json({ error: 'Order ID and status are required' }, { status: 400 })
    }
    
    const order = await ordersApi.updateOrderStatus(id, user.id, status, role || 'seller')
    
    if (!order) {
      return NextResponse.json({ error: 'Failed to update order' }, { status: 400 })
    }
    
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error in PATCH /api/orders:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

