import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as postsApi from '@/lib/api/posts'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const body = await request.json()
    const { emoji } = body
    
    if (!emoji) {
      return NextResponse.json({ error: 'Emoji is required' }, { status: 400 })
    }
    
    const success = await postsApi.reactToPost(params.id, user.id, emoji)
    
    return NextResponse.json({ success })
  } catch (error) {
    console.error('Error in POST /api/posts/[id]/react:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

