import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as fundingApi from '@/lib/api/funding'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const status = searchParams.get('status') as any
    
    if (id) {
      const campaign = await fundingApi.getFundingCampaignById(id)
      return NextResponse.json(campaign)
    }
    
    const campaigns = await fundingApi.getFundingCampaigns(status)
    return NextResponse.json(campaigns)
  } catch (error) {
    console.error('Error in GET /api/funding:', error)
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
    const { action, ...data } = body
    
    if (action === 'create') {
      const campaign = await fundingApi.createFundingCampaign(user.id, data)
      if (!campaign) {
        return NextResponse.json({ error: 'Failed to create campaign' }, { status: 400 })
      }
      return NextResponse.json(campaign)
    }
    
    if (action === 'launch') {
      const success = await fundingApi.launchFundingCampaign(data.campaign_id, user.id)
      return NextResponse.json({ success })
    }
    
    if (action === 'contribute') {
      const contribution = await fundingApi.contributeToCampaign(
        data.campaign_id,
        user.id,
        data.amount,
        data.reward_id
      )
      if (!contribution) {
        return NextResponse.json({ error: 'Failed to contribute' }, { status: 400 })
      }
      return NextResponse.json(contribution)
    }
    
    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    console.error('Error in POST /api/funding:', error)
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
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ error: 'Campaign ID is required' }, { status: 400 })
    }
    
    const campaign = await fundingApi.updateFundingCampaign(id, user.id, updates)
    
    if (!campaign) {
      return NextResponse.json({ error: 'Failed to update campaign' }, { status: 400 })
    }
    
    return NextResponse.json(campaign)
  } catch (error) {
    console.error('Error in PATCH /api/funding:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

