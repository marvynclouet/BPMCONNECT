import { createClient } from '@/lib/supabase/server'
import type { Order, OrderStatus } from '@/types'
import { SUBSCRIPTION_FEATURES } from '@/types'

export async function createOrder(
  buyerId: string,
  orderData: {
    seller_id: string
    service_id: string
    selected_extras?: string[]
    rush_delivery?: boolean
    requirements?: string
    brief?: string
  }
): Promise<Order | null> {
  const supabase = await createClient()
  
  // Get service details
  const { data: service, error: serviceError } = await supabase
    .from('service_listings')
    .select('*')
    .eq('id', orderData.service_id)
    .single()
  
  if (serviceError || !service) return null
  
  // Get seller subscription plan for commission calculation
  const { data: seller, error: sellerError } = await supabase
    .from('user_profiles')
    .select('subscription_plan')
    .eq('id', orderData.seller_id)
    .single()
  
  if (sellerError || !seller) return null
  
  // Calculate pricing
  const servicePrice = service.price
  let extrasPrice = 0
  let rushDeliveryPrice = 0
  
  // Calculate extras price
  if (orderData.selected_extras && orderData.selected_extras.length > 0) {
    const { data: extras } = await supabase
      .from('service_extras')
      .select('price')
      .in('id', orderData.selected_extras)
      .eq('is_active', true)
    
    if (extras) {
      extrasPrice = extras.reduce((sum, extra) => sum + Number(extra.price), 0)
    }
  }
  
  // Calculate rush delivery price
  if (orderData.rush_delivery && service.rush_delivery_available) {
    rushDeliveryPrice = Number(service.rush_delivery_extra_cost || 0)
  }
  
  const subtotal = servicePrice + extrasPrice + rushDeliveryPrice
  
  // Calculate commission based on subscription plan
  const commissionRate = SUBSCRIPTION_FEATURES[seller.subscription_plan as keyof typeof SUBSCRIPTION_FEATURES].commission_rate
  const platformFee = subtotal * commissionRate
  const sellerEarnings = subtotal - platformFee
  const totalAmount = subtotal
  
  // Calculate expected delivery date
  let deliveryDays = service.delivery_days
  if (orderData.rush_delivery && service.rush_delivery_days) {
    deliveryDays = service.rush_delivery_days
  }
  if (orderData.selected_extras && orderData.selected_extras.length > 0) {
    const { data: extras } = await supabase
      .from('service_extras')
      .select('delivery_days_added')
      .in('id', orderData.selected_extras)
    
    if (extras) {
      const extraDays = extras.reduce((sum, extra) => sum + (extra.delivery_days_added || 0), 0)
      deliveryDays += extraDays
    }
  }
  
  const expectedDeliveryDate = new Date()
  expectedDeliveryDate.setDate(expectedDeliveryDate.getDate() + deliveryDays)
  
  // Create order
  const { data, error } = await supabase
    .from('orders')
    .insert({
      buyer_id: buyerId,
      seller_id: orderData.seller_id,
      service_id: orderData.service_id,
      selected_extras: orderData.selected_extras || [],
      rush_delivery: orderData.rush_delivery || false,
      requirements: orderData.requirements || null,
      brief: orderData.brief || null,
      service_price: servicePrice,
      extras_price: extrasPrice,
      rush_delivery_price: rushDeliveryPrice,
      subtotal,
      platform_fee: platformFee,
      total_amount: totalAmount,
      seller_earnings: sellerEarnings,
      expected_delivery_date: expectedDeliveryDate.toISOString(),
      status: 'pending'
    })
    .select(`
      *,
      buyer:user_profiles(*),
      seller:user_profiles(*),
      service:service_listings(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as Order
}

export async function getOrder(orderId: string, userId: string): Promise<Order | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      buyer:user_profiles(*),
      seller:user_profiles(*),
      service:service_listings(*),
      files:order_files(*),
      revisions:order_revisions(*)
    `)
    .eq('id', orderId)
    .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
    .single()
  
  if (error || !data) return null
  
  return data as Order
}

export async function getOrdersByUser(userId: string, role: 'buyer' | 'seller') {
  const supabase = await createClient()
  
  const column = role === 'buyer' ? 'buyer_id' : 'seller_id'
  
  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      buyer:user_profiles(*),
      seller:user_profiles(*),
      service:service_listings(*)
    `)
    .eq(column, userId)
    .order('created_at', { ascending: false })
  
  if (error) return []
  
  return data as Order[]
}

export async function updateOrderStatus(
  orderId: string,
  userId: string,
  status: OrderStatus,
  role: 'buyer' | 'seller'
): Promise<Order | null> {
  const supabase = await createClient()
  
  // Verify user has permission (must be seller for most status updates)
  const { data: order } = await supabase
    .from('orders')
    .select('seller_id, buyer_id')
    .eq('id', orderId)
    .single()
  
  if (!order) return null
  
  if (role === 'seller' && order.seller_id !== userId) return null
  if (role === 'buyer' && order.buyer_id !== userId && status !== 'cancelled') return null
  
  const updateData: any = { status }
  
  // Set timestamps based on status
  if (status === 'accepted') {
    updateData.accepted_at = new Date().toISOString()
  } else if (status === 'delivered') {
    updateData.delivered_at = new Date().toISOString()
  } else if (status === 'completed') {
    updateData.completed_at = new Date().toISOString()
  }
  
  updateData.last_activity_at = new Date().toISOString()
  
  const { data, error } = await supabase
    .from('orders')
    .update(updateData)
    .eq('id', orderId)
    .select(`
      *,
      buyer:user_profiles(*),
      seller:user_profiles(*),
      service:service_listings(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as Order
}

export async function uploadOrderFile(
  orderId: string,
  userId: string,
  fileData: {
    filename: string
    file_url: string
    file_size: number
    file_type: string
    uploaded_by: 'buyer' | 'seller'
  }
) {
  const supabase = await createClient()
  
  // Verify user has permission
  const { data: order } = await supabase
    .from('orders')
    .select('buyer_id, seller_id')
    .eq('id', orderId)
    .single()
  
  if (!order) return null
  
  if (fileData.uploaded_by === 'buyer' && order.buyer_id !== userId) return null
  if (fileData.uploaded_by === 'seller' && order.seller_id !== userId) return null
  
  const { data, error } = await supabase
    .from('order_files')
    .insert({
      order_id: orderId,
      ...fileData
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  return data
}

export async function requestRevision(
  orderId: string,
  buyerId: string,
  feedback: string
) {
  const supabase = await createClient()
  
  // Verify buyer has permission
  const { data: order } = await supabase
    .from('orders')
    .select('buyer_id, revisions_used, service:service_listings(max_revisions)')
    .eq('id', orderId)
    .single()
  
  if (!order || order.buyer_id !== buyerId) return null
  
  // Check revision limit
  const service = order.service as any
  if (service && service.max_revisions && order.revisions_used >= service.max_revisions) {
    return null // Max revisions reached
  }
  
  // Get current files
  const { data: files } = await supabase
    .from('order_files')
    .select('file_url')
    .eq('order_id', orderId)
    .eq('uploaded_by', 'seller')
  
  const filesBefore = files?.map(f => f.file_url) || []
  
  // Create revision request
  const revisionNumber = (order.revisions_used || 0) + 1
  
  const { data, error } = await supabase
    .from('order_revisions')
    .insert({
      order_id: orderId,
      revision_number: revisionNumber,
      feedback,
      files_before_revision: filesBefore
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  // Update order status and revision count
  await supabase
    .from('orders')
    .update({
      status: 'in_revision',
      revisions_used: revisionNumber,
      last_activity_at: new Date().toISOString()
    })
    .eq('id', orderId)
  
  return data
}

