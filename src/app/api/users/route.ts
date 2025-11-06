import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as usersApi from '@/lib/api/users'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get('id')
    const handle = searchParams.get('handle')
    const role = searchParams.get('role')
    const query = searchParams.get('query')
    
    if (userId) {
      const profile = await usersApi.getUserProfile(userId)
      return NextResponse.json(profile)
    }
    
    if (handle) {
      const profile = await usersApi.getUserProfileByHandle(handle)
      return NextResponse.json(profile)
    }
    
    if (role) {
      const profiles = await usersApi.getUsersByRole(role as any)
      return NextResponse.json(profiles)
    }
    
    if (query) {
      const profiles = await usersApi.searchUsers(query)
      return NextResponse.json(profiles)
    }
    
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  } catch (error) {
    console.error('Error in GET /api/users:', error)
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
    const { email, role, displayName, handle } = body
    
    const profile = await usersApi.createUserProfile(
      user.id,
      email || user.email || '',
      role,
      displayName,
      handle
    )
    
    if (!profile) {
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 400 })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error in POST /api/users:', error)
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
    const profile = await usersApi.updateUserProfile(user.id, body)
    
    if (!profile) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 400 })
    }
    
    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error in PATCH /api/users:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

