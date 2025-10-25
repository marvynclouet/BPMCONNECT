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
  message_type: 'text' | 'file' | 'image' | 'audio'
  file_url?: string
  file_name?: string
  file_size?: number
  is_read: boolean
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  participant_1_id: string
  participant_2_id: string
  participant_1?: {
    id: string
    display_name: string
    avatar_url?: string
    role: string
  }
  participant_2?: {
    id: string
    display_name: string
    avatar_url?: string
    role: string
  }
  
  // Related to a service/order
  service_id?: string
  order_id?: string
  service?: {
    id: string
    title: string
    category: string
  }
  
  // Last message for preview
  last_message?: Message
  last_message_at: string
  
  // Read status
  unread_count_user_1: number
  unread_count_user_2: number
  
  created_at: string
  updated_at: string
}

export interface ConversationWithOtherUser extends Omit<Conversation, 'participant_1' | 'participant_2'> {
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
