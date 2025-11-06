export interface Message {
  id: string
  conversation_id: string
  sender_id: string
  sender?: {
    id: string
    display_name: string
    avatar_url?: string
  }
  content: string
  message_type: 'text' | 'file' | 'image' | 'audio' | 'video'
  file_url?: string
  file_name?: string
  file_size?: number
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  user1_id: string
  user2_id: string
  user1?: {
    id: string
    display_name: string
    avatar_url?: string
    role: string
  }
  user2?: {
    id: string
    display_name: string
    avatar_url?: string
    role: string
  }
  
  // Last message for preview
  last_message_text?: string
  last_message_at?: string
  last_message_sender_id?: string
  
  // Read status
  unread_count_user1: number
  unread_count_user2: number
  
  created_at: string
  updated_at: string
}

export interface ConversationWithOtherUser extends Omit<Conversation, 'user1' | 'user2'> {
  other_user: {
    id: string
    display_name: string
    avatar_url?: string
    role: string
    is_online?: boolean
    last_seen?: string
  }
  unread_count: number
}
