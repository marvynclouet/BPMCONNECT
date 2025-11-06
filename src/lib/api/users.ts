import { createClient } from '@/lib/supabase/server'
import type { UserProfile, UserRole, SubscriptionPlan } from '@/types'

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error || !data) return null
  
  return data as UserProfile
}

export async function getUserProfileByHandle(handle: string): Promise<UserProfile | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('handle', handle)
    .single()
  
  if (error || !data) return null
  
  return data as UserProfile
}

export async function createUserProfile(
  userId: string,
  email: string,
  role: UserRole,
  displayName: string,
  handle?: string
): Promise<UserProfile | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .insert({
      id: userId,
      email,
      role,
      display_name: displayName,
      handle: handle || null,
      subscription_plan: 'free'
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  return data as UserProfile
}

export async function updateUserProfile(
  userId: string,
  updates: Partial<UserProfile>
): Promise<UserProfile | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()
  
  if (error || !data) return null
  
  return data as UserProfile
}

export async function searchUsers(query: string, limit = 20) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .or(`display_name.ilike.%${query}%,handle.ilike.%${query}%,bio.ilike.%${query}%`)
    .limit(limit)
  
  if (error) return []
  
  return data as UserProfile[]
}

export async function getUsersByRole(role: UserRole, limit = 50) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('role', role)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) return []
  
  return data as UserProfile[]
}

export async function updateSubscriptionPlan(
  userId: string,
  plan: SubscriptionPlan
): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('user_profiles')
    .update({ subscription_plan: plan })
    .eq('id', userId)
  
  return !error
}

export async function checkHandleAvailability(handle: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('handle', handle)
    .single()
  
  // If error or no data, handle is available
  return !!error || !data
}

