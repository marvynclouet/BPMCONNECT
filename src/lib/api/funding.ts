import { createClient } from '@/lib/supabase/server'
import type { ProjectFunding } from '@/types'

export async function getFundingCampaigns(status?: 'draft' | 'active' | 'funded' | 'failed' | 'completed') {
  const supabase = await createClient()
  
  let query = supabase
    .from('funding_campaigns')
    .select(`
      *,
      creator:user_profiles(*),
      rewards:funding_rewards(*)
    `)
    .order('created_at', { ascending: false })
  
  if (status) {
    query = query.eq('status', status)
  }
  
  const { data, error } = await query
  
  if (error) return []
  
  // Calculate backers count for each campaign
  const campaignsWithBackers = await Promise.all(
    (data || []).map(async (campaign) => {
      const { count } = await supabase
        .from('funding_contributions')
        .select('*', { count: 'exact', head: true })
        .eq('campaign_id', campaign.id)
      
      return {
        ...campaign,
        backers: count || 0
      }
    })
  )
  
  return campaignsWithBackers as (ProjectFunding & { backers: number })[]
}

export async function getFundingCampaignById(campaignId: string): Promise<ProjectFunding | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('funding_campaigns')
    .select(`
      *,
      creator:user_profiles(*),
      rewards:funding_rewards(*),
      contributions:funding_contributions(*)
    `)
    .eq('id', campaignId)
    .single()
  
  if (error || !data) return null
  
  return data as ProjectFunding
}

export async function createFundingCampaign(
  creatorId: string,
  campaignData: {
    title: string
    description: string
    goal_amount: number
    end_date: string
    pitch_video_url?: string
    cover_image_url?: string
  }
): Promise<ProjectFunding | null> {
  const supabase = await createClient()
  
  // Check if user has Pro or Boss plan
  const { data: user } = await supabase
    .from('user_profiles')
    .select('subscription_plan')
    .eq('id', creatorId)
    .single()
  
  if (!user || (user.subscription_plan !== 'pro' && user.subscription_plan !== 'boss')) {
    return null // Only Pro and Boss can create campaigns
  }
  
  const { data, error } = await supabase
    .from('funding_campaigns')
    .insert({
      creator_id: creatorId,
      ...campaignData,
      status: 'draft'
    })
    .select(`
      *,
      creator:user_profiles(*),
      rewards:funding_rewards(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as ProjectFunding
}

export async function updateFundingCampaign(
  campaignId: string,
  creatorId: string,
  updates: Partial<ProjectFunding>
): Promise<ProjectFunding | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('funding_campaigns')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', campaignId)
    .eq('creator_id', creatorId)
    .select(`
      *,
      creator:user_profiles(*),
      rewards:funding_rewards(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as ProjectFunding
}

export async function launchFundingCampaign(campaignId: string, creatorId: string): Promise<boolean> {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('funding_campaigns')
    .update({
      status: 'active',
      updated_at: new Date().toISOString()
    })
    .eq('id', campaignId)
    .eq('creator_id', creatorId)
    .eq('status', 'draft')
  
  return !error
}

export async function addFundingReward(
  campaignId: string,
  rewardData: {
    amount: number
    description: string
    delivery_date?: string
  }
) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('funding_rewards')
    .insert({
      campaign_id: campaignId,
      ...rewardData
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  return data
}

export async function contributeToCampaign(
  campaignId: string,
  contributorId: string,
  amount: number,
  rewardId?: string
) {
  const supabase = await createClient()
  
  // Verify campaign is active
  const { data: campaign } = await supabase
    .from('funding_campaigns')
    .select('status, end_date')
    .eq('id', campaignId)
    .single()
  
  if (!campaign || campaign.status !== 'active') {
    return null // Campaign not active
  }
  
  // Check if campaign has ended
  if (new Date(campaign.end_date) < new Date()) {
    return null // Campaign ended
  }
  
  // Create contribution
  const { data, error } = await supabase
    .from('funding_contributions')
    .insert({
      campaign_id: campaignId,
      contributor_id: contributorId,
      amount,
      reward_id: rewardId || null
    })
    .select()
    .single()
  
  if (error || !data) return null
  
  // Update campaign amount (trigger will handle this, but we can also do it here)
  // The trigger should handle this automatically
  
  return data
}

export async function getCampaignContributions(campaignId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('funding_contributions')
    .select(`
      *,
      contributor:user_profiles(*)
    `)
    .eq('campaign_id', campaignId)
    .order('created_at', { ascending: false })
  
  if (error) return []
  
  return data
}

