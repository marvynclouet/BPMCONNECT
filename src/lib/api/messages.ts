import { createClient } from '@/lib/supabase/server'
import type { Conversation, Message } from '@/types/messaging'

export async function getConversations(userId: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .select(`
      *,
      user1:user_profiles!conversations_user1_id_fkey(*),
      user2:user_profiles!conversations_user2_id_fkey(*)
    `)
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
    .order('last_message_at', { ascending: false, nullsFirst: false })
  
  if (error) return []
  
  return data as Conversation[]
}

export async function getOrCreateConversation(user1Id: string, user2Id: string): Promise<Conversation | null> {
  const supabase = await createClient()
  
  // Try to find existing conversation
  const { data: existing } = await supabase
    .from('conversations')
    .select('*')
    .or(`and(user1_id.eq.${user1Id},user2_id.eq.${user2Id}),and(user1_id.eq.${user2Id},user2_id.eq.${user1Id})`)
    .single()
  
  if (existing) {
    return existing as Conversation
  }
  
  // Create new conversation (always store smaller ID first for consistency)
  const [id1, id2] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id]
  
  const { data, error } = await supabase
    .from('conversations')
    .insert({
      user1_id: id1,
      user2_id: id2
    })
    .select(`
      *,
      user1:user_profiles!conversations_user1_id_fkey(*),
      user2:user_profiles!conversations_user2_id_fkey(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as Conversation
}

export async function getMessages(conversationId: string, limit = 50) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:user_profiles(*)
    `)
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) return []
  
  return (data as Message[]).reverse() // Reverse to show oldest first
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  messageData: {
    content?: string
    message_type?: 'text' | 'image' | 'audio' | 'video' | 'file'
    file_url?: string
    file_name?: string
    file_size?: number
  }
): Promise<Message | null> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('messages')
    .insert({
      conversation_id: conversationId,
      sender_id: senderId,
      content: messageData.content || null,
      message_type: messageData.message_type || 'text',
      file_url: messageData.file_url || null,
      file_name: messageData.file_name || null,
      file_size: messageData.file_size || null
    })
    .select(`
      *,
      sender:user_profiles(*)
    `)
    .single()
  
  if (error || !data) return null
  
  return data as Message
}

export async function markMessagesAsRead(conversationId: string, userId: string) {
  const supabase = await createClient()
  
  // Get conversation to determine which user's unread count to reset
  const { data: conversation } = await supabase
    .from('conversations')
    .select('user1_id, user2_id')
    .eq('id', conversationId)
    .single()
  
  if (!conversation) return false
  
  // Mark messages as read
  const { error: messagesError } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('conversation_id', conversationId)
    .neq('sender_id', userId)
    .eq('is_read', false)
  
  // Reset unread count
  const unreadField = conversation.user1_id === userId ? 'unread_count_user1' : 'unread_count_user2'
  const { error: conversationError } = await supabase
    .from('conversations')
    .update({ [unreadField]: 0 })
    .eq('id', conversationId)
  
  return !messagesError && !conversationError
}

export async function getUnreadCount(userId: string): Promise<number> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('conversations')
    .select('unread_count_user1, unread_count_user2, user1_id, user2_id')
    .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
  
  if (error || !data) return 0
  
  return data.reduce((total, conv) => {
    if (conv.user1_id === userId) {
      return total + (conv.unread_count_user1 || 0)
    } else {
      return total + (conv.unread_count_user2 || 0)
    }
  }, 0)
}

