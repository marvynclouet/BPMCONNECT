import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import * as messagesApi from '@/lib/api/messages'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const searchParams = request.nextUrl.searchParams
    const conversationId = searchParams.get('conversation_id')
    const userId = searchParams.get('user_id')
    
    if (conversationId) {
      const messages = await messagesApi.getMessages(conversationId)
      return NextResponse.json(messages)
    }
    
    if (userId) {
      const conversation = await messagesApi.getOrCreateConversation(user.id, userId)
      return NextResponse.json(conversation)
    }
    
    // Get all conversations
    const conversations = await messagesApi.getConversations(user.id)
    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Error in GET /api/messages:', error)
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
    const { conversation_id, user_id, ...messageData } = body
    
    let conversationId = conversation_id
    
    // If user_id is provided, get or create conversation
    if (user_id && !conversationId) {
      const conversation = await messagesApi.getOrCreateConversation(user.id, user_id)
      if (!conversation) {
        return NextResponse.json({ error: 'Failed to create conversation' }, { status: 400 })
      }
      conversationId = conversation.id
    }
    
    if (!conversationId) {
      return NextResponse.json({ error: 'Conversation ID or user ID is required' }, { status: 400 })
    }
    
    const message = await messagesApi.sendMessage(conversationId, user.id, messageData)
    
    if (!message) {
      return NextResponse.json({ error: 'Failed to send message' }, { status: 400 })
    }
    
    return NextResponse.json(message)
  } catch (error) {
    console.error('Error in POST /api/messages:', error)
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
    const { conversation_id } = body
    
    if (!conversation_id) {
      return NextResponse.json({ error: 'Conversation ID is required' }, { status: 400 })
    }
    
    const success = await messagesApi.markMessagesAsRead(conversation_id, user.id)
    
    return NextResponse.json({ success })
  } catch (error) {
    console.error('Error in PATCH /api/messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

