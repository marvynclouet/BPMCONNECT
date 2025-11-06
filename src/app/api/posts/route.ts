import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as postsApi from '@/lib/api/posts'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get('type') as any
    const userId = searchParams.get('user_id')
    const limit = searchParams.get('limit') ? Number(searchParams.get('limit')) : 20
    const offset = searchParams.get('offset') ? Number(searchParams.get('offset')) : 0
    
    const posts = await postsApi.getPosts({
      type,
      userId: userId || undefined,
      limit,
      offset
    })
    
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error in GET /api/posts:', error)
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
    const post = await postsApi.createPost(user.id, body)
    
    if (!post) {
      return NextResponse.json({ error: 'Failed to create post' }, { status: 400 })
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error in POST /api/posts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

