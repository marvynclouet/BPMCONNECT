'use client'

import { useState, useEffect } from 'react'
import { getMockUser, type MockUser } from '@/lib/mock-auth'
import { ConversationWithOtherUser, Message } from '@/types/messaging'
import { ConversationList } from '@/components/messaging/conversation-list'
import { ChatWindow } from '@/components/messaging/chat-window'
import { MessageInput } from '@/components/messaging/message-input'
import { MainNavbar } from '@/components/navigation/main-navbar'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Phone, VideoIcon, MoreVertical, MessageCircle, Plus, Search, X } from 'lucide-react'
import Link from 'next/link'

// Mock data for development
const MOCK_CONVERSATIONS: ConversationWithOtherUser[] = [
  {
    id: '1',
    participant_1_id: 'current-user',
    participant_2_id: 'user-2',
    other_user: {
      id: 'user-2',
      display_name: 'DJ Producer',
      avatar_url: '',
      role: 'beatmaker',
      is_online: true
    },
    service_id: 'service-1',
    service: {
      id: 'service-1',
      title: 'Beat Trap professionnel avec mix inclus',
      category: 'beats'
    },
    last_message: {
      id: 'msg-1',
      conversation_id: '1',
      sender_id: 'user-2',
      content: 'Salut ! J\'ai bien reçu ta commande, je commence le beat maintenant 🎵',
      message_type: 'text',
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30min ago
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    },
    last_message_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unread_count: 2,
    unread_count_user_1: 2,
    unread_count_user_2: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
  },
  {
    id: '2',
    participant_1_id: 'current-user',
    participant_2_id: 'user-3',
    other_user: {
      id: 'user-3',
      display_name: 'Alex Mix Master',
      avatar_url: '',
      role: 'engineer',
      is_online: false,
      last_seen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2h ago
    },
    last_message: {
      id: 'msg-2',
      conversation_id: '2',
      sender_id: 'current-user',
      content: 'Merci beaucoup pour le mixage ! Le résultat est parfait 👍',
      message_type: 'text',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3h ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    },
    last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    unread_count: 0,
    unread_count_user_1: 0,
    unread_count_user_2: 0,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
  }
]

const MOCK_MESSAGES: { [conversationId: string]: Message[] } = {
  '1': [
    {
      id: 'msg-1-1',
      conversation_id: '1',
      sender_id: 'current-user',
      content: 'Salut ! Je viens de commander ton service de beat trap. J\'aimerais quelque chose dans le style de Travis Scott si possible.',
      message_type: 'text',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    },
    {
      id: 'msg-1-2',
      conversation_id: '1',
      sender_id: 'user-2',
      sender: {
        id: 'user-2',
        display_name: 'DJ Producer',
        avatar_url: ''
      },
      content: 'Salut ! J\'ai bien reçu ta commande, je commence le beat maintenant 🎵\n\nTu as des références précises de Travis Scott en tête ? Genre "SICKO MODE" ou plutôt quelque chose de plus mélodique ?',
      message_type: 'text',
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5h ago
      updated_at: new Date(Date.now() - 1000 * 60 * 90).toISOString()
    },
    {
      id: 'msg-1-3',
      conversation_id: '1',
      sender_id: 'user-2',
      sender: {
        id: 'user-2',
        display_name: 'DJ Producer',
        avatar_url: ''
      },
      content: 'Aussi, est-ce que tu as une préférence pour le BPM ? D\'habitude je fais du 140-150 BPM pour ce style.',
      message_type: 'text',
      is_read: false,
      created_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30min ago
      updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString()
    }
  ],
  '2': [
    {
      id: 'msg-2-1',
      conversation_id: '2',
      sender_id: 'user-3',
      sender: {
        id: 'user-3',
        display_name: 'Alex Mix Master',
        avatar_url: ''
      },
      content: 'Salut ! Ton track est maintenant mixé. J\'ai fait quelques ajustements sur les graves et ajouté un peu de compression pour que ça sonne bien sur toutes les plateformes.',
      message_type: 'text',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4h ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString()
    },
    {
      id: 'msg-2-2',
      conversation_id: '2',
      sender_id: 'current-user',
      content: 'Merci beaucoup pour le mixage ! Le résultat est parfait 👍',
      message_type: 'text',
      is_read: true,
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3h ago
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
    }
  ]
}

export default function MessagesPage() {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [conversations, setConversations] = useState<ConversationWithOtherUser[]>([])
  const [selectedConversationId, setSelectedConversationId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'orders'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Utiliser le mock auth ou créer un utilisateur démo pour la messagerie
    const mockUser = getMockUser()
    
    if (mockUser) {
      setUser(mockUser)
    } else {
      // Créer un utilisateur démo pour les messages
      const demoUser: MockUser = {
        id: 'demo-user',
        email: 'demo@bpmconnect.fr',
        role: 'creator',
        name: 'Utilisateur Démo',
        avatar: null,
        isAuthenticated: false, // Marquer comme démo
        createdAt: new Date().toISOString()
      }
      setUser(demoUser)
    }
    
    // Charger les conversations fictives
    setConversations(MOCK_CONVERSATIONS)
    setLoading(false)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (selectedConversationId) {
      // Load messages for selected conversation
      const conversationMessages = MOCK_MESSAGES[selectedConversationId] || []
      setMessages(conversationMessages)
      
      // Mark messages as read (in real app, this would be an API call)
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversationId 
            ? { ...conv, unread_count: 0 }
            : conv
        )
      )
    }
  }, [selectedConversationId])

  const handleSendMessage = async (content: string, type: 'text' | 'file' | 'image' | 'audio' = 'text') => {
    if (!selectedConversationId || !user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      conversation_id: selectedConversationId,
      sender_id: user.id,
      content,
      message_type: type,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    // Add message to current conversation
    setMessages(prev => [...prev, newMessage])

    // Update last message in conversation list
    setConversations(prev =>
      prev.map(conv =>
        conv.id === selectedConversationId
          ? {
              ...conv,
              last_message: newMessage,
              last_message_at: newMessage.created_at
            }
          : conv
      )
    )

    // TODO: Send message via Supabase
    console.log('Sending message:', newMessage)
  }

  const selectedConversation = conversations.find(c => c.id === selectedConversationId)

  // Filter conversations based on selected filter and search query
  const filteredConversations = conversations.filter(conv => {
    // Apply filter
    let matchesFilter = true
    switch (filter) {
      case 'unread':
        matchesFilter = conv.unread_count > 0
        break
      case 'orders':
        matchesFilter = conv.service_id !== undefined
        break
      default:
        matchesFilter = true
    }

    // Apply search query
    const matchesSearch = !searchQuery || 
      conv.other_user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.last_message?.content.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement de vos messages...</p>
        </div>
      </div>
    )
  }

  // Mobile: Show conversation list or chat
  if (isMobile) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation Unifiée */}
        <MainNavbar />
        
        {/* Header Messages Mobile */}
        <div className="bg-card border-b">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {selectedConversationId ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedConversationId(undefined)}
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                ) : (
                  <MessageCircle className="h-5 w-5 text-muted-foreground" />
                )}
                <h1 className="text-lg font-semibold text-foreground">
                  {selectedConversation ? selectedConversation.other_user.display_name : 'Messages'}
                </h1>
              </div>
              
              {selectedConversation && (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <VideoIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="h-[calc(100vh-80px)]">
          {selectedConversationId && selectedConversation ? (
            <div className="h-full flex flex-col">
              <ChatWindow
                messages={messages}
                currentUserId={user?.id || 'demo-user'}
                otherUser={selectedConversation.other_user}
              />
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
          ) : (
            <>
              {/* Filters Mobile */}
              <div className="p-4 border-b flex gap-2">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setFilter('all')}
                >
                  Tous
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setFilter('unread')}
                >
                  Non lus
                </Button>
                <Button
                  variant={filter === 'orders' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => setFilter('orders')}
                >
                  Commandes
                </Button>
              </div>

              {/* Create New Conversation Button */}
              <div className="p-4 border-b">
                <Button className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle conversation
                </Button>
              </div>

              <ConversationList
                conversations={filteredConversations}
                selectedConversationId={selectedConversationId}
                onSelectConversation={setSelectedConversationId}
              />
            </>
          )}
        </div>
      </div>
    )
  }

  // Desktop: Show both conversation list and chat
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Unifiée */}
      <MainNavbar />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              {/* Create New Conversation */}
              <div className="p-4 border-b">
                <Button className="w-full" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Nouvelle conversation
                </Button>
              </div>

              {/* Filters */}
              <div className="p-4 border-b">
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                    className="text-xs"
                  >
                    Tous
                  </Button>
                  <Button
                    variant={filter === 'unread' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('unread')}
                    className="text-xs"
                  >
                    <span className="truncate">Non lus</span>
                    {conversations.filter(c => c.unread_count > 0).length > 0 && (
                      <Badge variant="destructive" className="ml-1 text-[10px] px-1 h-4">
                        {conversations.filter(c => c.unread_count > 0).length}
                      </Badge>
                    )}
                  </Button>
                  <Button
                    variant={filter === 'orders' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('orders')}
                    className="text-xs"
                  >
                    <span className="truncate">Commandes</span>
                  </Button>
                </div>
              </div>

              {/* Search */}
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-9 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-auto">
                <ConversationList
                  conversations={filteredConversations}
                  selectedConversationId={selectedConversationId}
                  onSelectConversation={setSelectedConversationId}
                />
              </div>
            </Card>
          </div>

          {/* Chat Window */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="border-b p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <AvatarGenerator 
                          name={selectedConversation.other_user.display_name}
                          role={selectedConversation.other_user.role}
                          size={44}
                          showRoleIcon={true}
                          showOnlineStatus={selectedConversation.other_user.is_online}
                          style="realistic"
                          imageUrl={selectedConversation.other_user.avatar_url}
                          className="shrink-0"
                        />
                        <div className="min-w-0">
                          <h3 className="font-semibold text-foreground text-sm">
                            {selectedConversation.other_user.display_name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="capitalize font-medium">{selectedConversation.other_user.role}</span>
                            <span>•</span>
                            <span className="text-xs">
                              {selectedConversation.other_user.is_online 
                                ? '🟢 En ligne' 
                                : '🔴 Hors ligne'
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {selectedConversation.service && (
                          <Badge variant="outline" className="text-xs">
                            📦 {selectedConversation.service.title}
                          </Badge>
                        )}
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <VideoIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ChatWindow
                    messages={messages}
                    currentUserId={user?.id || 'demo-user'}
                    otherUser={selectedConversation.other_user}
                  />

                  {/* Message Input */}
                  <MessageInput onSendMessage={handleSendMessage} />
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
                  <div className="text-center p-8">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-xl"></div>
                      <MessageCircle className="h-20 w-20 text-blue-500 dark:text-blue-400 mx-auto relative" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Aucune conversation sélectionnée
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                      Choisissez une conversation dans la liste pour commencer à échanger avec un créateur
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                      <Button asChild className="shadow-lg">
                        <Link href="/services">
                          <Plus className="h-4 w-4 mr-2" />
                          Découvrir les créateurs
                        </Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/creators">
                          Explorer le marketplace
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Note: metadata export doesn't work in 'use client' components
// SEO will be handled by the layout or a parent server component
