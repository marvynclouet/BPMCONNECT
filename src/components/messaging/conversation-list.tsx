'use client'

import { ConversationWithOtherUser } from '@/types/messaging'
import { Card } from '@/components/ui/card'
import { AvatarGenerator } from '@/components/ui/avatar-generator'
import { Badge } from '@/components/ui/badge'
import { MessageCircle } from 'lucide-react'

interface ConversationListProps {
  conversations: ConversationWithOtherUser[]
  selectedConversationId?: string
  onSelectConversation: (conversationId: string) => void
}

export function ConversationList({ 
  conversations, 
  selectedConversationId, 
  onSelectConversation 
}: ConversationListProps) {

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'À l\'instant'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`
    } else if (diffInHours < 48) {
      return 'Hier'
    } else {
      return date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })
    }
  }

  return (
    <div className="h-full flex flex-col">
      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="text-center py-12 px-4">
            <MessageCircle className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
              Aucune conversation
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Commencez à échanger avec des créateurs !
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {conversations.map((conversation) => (
              <Card
                key={conversation.id}
                className={`p-3 cursor-pointer transition-all ${
                  selectedConversationId === conversation.id 
                    ? 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800' 
                    : 'border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                onClick={() => onSelectConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="shrink-0">
                    <AvatarGenerator 
                      name={conversation.other_user.display_name}
                      role={conversation.other_user.role}
                      size={48}
                      showRoleIcon={true}
                      showOnlineStatus={conversation.other_user.is_online}
                      style="realistic"
                      imageUrl={conversation.other_user.avatar_url}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-medium text-gray-900 dark:text-white truncate text-sm">
                          {conversation.other_user.display_name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        {conversation.unread_count > 0 && (
                          <Badge variant="destructive" className="h-5 w-5 p-0 text-xs flex items-center justify-center">
                            {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
                          </Badge>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                          {formatTime(conversation.last_message_at)}
                        </span>
                      </div>
                    </div>

                    {/* Last message */}
                    {conversation.last_message && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {conversation.last_message.message_type === 'file' ? (
                          <span className="flex items-center gap-1">
                            📎 {conversation.last_message.file_name}
                          </span>
                        ) : conversation.last_message.message_type === 'image' ? (
                          <span className="flex items-center gap-1">
                            🖼️ Image
                          </span>
                        ) : conversation.last_message.message_type === 'audio' ? (
                          <span className="flex items-center gap-1">
                            🎵 Audio
                          </span>
                        ) : (
                          conversation.last_message.content
                        )}
                      </p>
                    )}

                    {/* Service context */}
                    {conversation.service && (
                      <div className="mt-1.5">
                        <Badge variant="outline" className="text-xs bg-white/50 dark:bg-gray-800/50">
                          📦 {conversation.service.title.length > 25 
                            ? conversation.service.title.substring(0, 25) + '...' 
                            : conversation.service.title}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
