'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/types/messaging'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink } from 'lucide-react'

interface ChatWindowProps {
  messages: Message[]
  currentUserId: string
  otherUser: {
    id: string
    display_name: string
    avatar_url?: string
    role: string
  }
}

export function ChatWindow({ messages, currentUserId, otherUser }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const groupMessagesByDate = (messages: Message[]) => {
    const groups: { [date: string]: Message[] } = {}
    
    messages.forEach(message => {
      const date = new Date(message.created_at).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(message)
    })
    
    return groups
  }

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)
    
    if (date.toDateString() === today.toDateString()) {
      return 'Aujourd\'hui'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Hier'
    } else {
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      })
    }
  }

  const messageGroups = groupMessagesByDate(messages)

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {Object.keys(messageGroups).length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="font-medium text-gray-900 mb-2">
            Démarrez la conversation
          </h3>
          <p className="text-gray-600">
            Envoyez votre premier message à {otherUser.display_name}
          </p>
        </div>
      ) : (
        Object.entries(messageGroups).map(([date, dateMessages]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex items-center justify-center my-6">
              <div className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-400">
                {formatDateHeader(date)}
              </div>
            </div>

            {/* Messages for this date */}
            <div className="space-y-4">
              {dateMessages.map((message, index) => {
                const isOwnMessage = message.sender_id === currentUserId
                const showAvatar = !isOwnMessage && (
                  index === 0 || 
                  dateMessages[index - 1]?.sender_id !== message.sender_id
                )

                return (
                  <div
                    key={message.id}
                    className={`flex items-end gap-2 ${
                      isOwnMessage ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {/* Avatar for other user */}
                    {!isOwnMessage && (
                      <div className="w-8 h-8 flex-shrink-0">
                        {showAvatar ? (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={otherUser.avatar_url} />
                            <AvatarFallback className="text-xs">
                              {otherUser.display_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <div className="w-8 h-8" />
                        )}
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        isOwnMessage
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm'
                      }`}
                    >
                      {message.message_type === 'text' && (
                        <p className="whitespace-pre-wrap break-words">
                          {message.content}
                        </p>
                      )}

                      {message.message_type === 'file' && (
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded">
                            📎
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">
                              {message.file_name}
                            </div>
                            {message.file_size && (
                              <div className="text-xs opacity-75">
                                {formatFileSize(message.file_size)}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-8 w-8 p-0 ${
                              isOwnMessage 
                                ? 'text-white hover:bg-white/20' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      )}

                      {message.message_type === 'image' && (
                        <div>
                          {message.file_url && (
                            <img
                              src={message.file_url}
                              alt={message.file_name || 'Image'}
                              className="max-w-full rounded-lg mb-2"
                            />
                          )}
                          {message.content && (
                            <p className="text-sm">{message.content}</p>
                          )}
                        </div>
                      )}

                      {message.message_type === 'audio' && (
                        <div className="flex items-center gap-3">
                          <div className="bg-white/20 p-2 rounded">
                            🎵
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">
                              {message.file_name || 'Fichier audio'}
                            </div>
                            {message.file_size && (
                              <div className="text-xs opacity-75">
                                {formatFileSize(message.file_size)}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className={`h-8 w-8 p-0 ${
                              isOwnMessage 
                                ? 'text-white hover:bg-white/20' 
                                : 'text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            ▶️
                          </Button>
                        </div>
                      )}

                      {/* Message time */}
                      <div
                        className={`text-xs mt-1 ${
                          isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.created_at)}
                        {isOwnMessage && (
                          <span className="ml-2">
                            {message.is_read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))
      )}
      
      <div ref={messagesEndRef} />
    </div>
  )
}
