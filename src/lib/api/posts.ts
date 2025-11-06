import { createClient } from '@/lib/supabase/server'

export type PostType = 'text' | 'image' | 'video' | 'audio' | 'collaboration' | 'product' | 'opportunity' | 'milestone' | 'survey'

export interface Post {
  id: string
  user_id: string
  content: string
  type: PostType
  media_urls?: string[]
  tags?: string[]
  survey_question?: string
  survey_options?: { option: string; votes: number }[]
  budget?: string
  likes_count: number
  comments_count: number
  shares_count: number
  is_active: boolean
  created_at: string
  updated_at: string
  user?: any
}

export async function getPosts(filters?: {
  type?: PostType
  userId?: string
  limit?: number
  offset?: number
}) {
  const supabase = await createClient()
  
  let query = supabase
    .from('posts')
    .select(`
      *,
      user:user_profiles(*)
    `)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
  
  if (filters?.type) {
    query = query.eq('type', filters.type)
  }
  
  if (filters?.userId) {
    query = query.eq('user_id', filters.userId)
  }
  
  const limit = filters?.limit || 20
  const offset = filters?.offset || 0
  
  query = query.range(offset, offset + limit - 1)
  
  const { data, error } = await query
  
  if (error) return []
  
  return data as Post[]
}

export async function createPost(
  userId: string,
  postData: {
    content: string
    type: PostType
    media_urls?: string[]
    tags?: string[]
    survey_question?: string
    survey_options?: { option: string; votes: number }[]
    budget?: string
  }
): Promise<Post | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('posts')
    .insert({
      user_id: userId,
      ...postData
    })
    .select(`
      *,
      user:user_profiles(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as Post
}

export async function reactToPost(postId: string, userId: string, emoji: string) {
  const supabase = await createClient()
  
  // Check if reaction already exists
  const { data: existing } = await supabase
    .from('post_reactions')
    .select('id')
    .eq('post_id', postId)
    .eq('user_id', userId)
    .eq('emoji', emoji)
    .single()
  
  if (existing) {
    // Remove reaction
    const { error } = await supabase
      .from('post_reactions')
      .delete()
      .eq('id', existing.id)
    
    return !error
  } else {
    // Add reaction
    const { error } = await supabase
      .from('post_reactions')
      .insert({
        post_id: postId,
        user_id: userId,
        emoji
      })
    
    return !error
  }
}

export async function getPostReactions(postId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('post_reactions')
    .select(`
      *,
      user:user_profiles(*)
    `)
    .eq('post_id', postId)
  
  if (error) return []
  
  return data
}

export async function voteOnSurvey(postId: string, userId: string, optionIndex: number) {
  const supabase = await createClient()
  
  // Get post
  const { data: post } = await supabase
    .from('posts')
    .select('survey_options, user_id')
    .eq('id', postId)
    .single()
  
  if (!post || !post.survey_options) return null
  
  // Check if user already voted (we can store this in a separate table or in the post)
  // For now, we'll update the survey_options directly
  const options = post.survey_options as { option: string; votes: number }[]
  
  if (optionIndex >= 0 && optionIndex < options.length) {
    options[optionIndex].votes = (options[optionIndex].votes || 0) + 1
    
    const { data, error } = await supabase
      .from('posts')
      .update({
        survey_options: options
      })
      .eq('id', postId)
      .select()
      .single()
    
    if (error || !data) return null
    
    return data
  }
  
  return null
}

export async function commentOnPost(postId: string, userId: string, content: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('post_comments')
    .insert({
      post_id: postId,
      user_id: userId,
      content
    })
    .select(`
      *,
      user:user_profiles(*)
    `)
    .single()
  
  if (error || !data) return null
  
  // Update comments count
  await supabase.rpc('increment', {
    table_name: 'posts',
    column_name: 'comments_count',
    row_id: postId
  })
  
  return data
}

export async function getPostComments(postId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('post_comments')
    .select(`
      *,
      user:user_profiles(*)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: true })
  
  if (error) return []
  
  return data
}

