'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Paperclip, Mic, Image } from 'lucide-react'

interface MessageInputProps {
  onSendMessage: (content: string, type?: 'text' | 'file' | 'image' | 'audio') => void
  disabled?: boolean
  placeholder?: string
}

export function MessageInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder = "Tapez votre message..." 
}: MessageInputProps) {
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim(), 'text')
      setMessage('')
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleFileUpload = (type: 'file' | 'image' | 'audio') => {
    // TODO: Implement file upload
    console.log('File upload:', type)
    alert(`Upload ${type} - À implémenter`)
  }

  return (
    <div className="border-t bg-white p-4">
      {/* File upload buttons */}
      <div className="flex items-center gap-2 mb-3">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFileUpload('file')}
          disabled={disabled}
          className="text-gray-500 hover:text-gray-700"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFileUpload('image')}
          disabled={disabled}
          className="text-gray-500 hover:text-gray-700"
        >
          <Image className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFileUpload('audio')}
          disabled={disabled}
          className="text-gray-500 hover:text-gray-700"
        >
          <Mic className="h-4 w-4" />
        </Button>
      </div>

      {/* Message input */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <Textarea
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              setIsTyping(e.target.value.length > 0)
            }}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="resize-none min-h-[40px] max-h-[120px]"
            style={{
              height: 'auto',
              minHeight: '40px'
            }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement
              target.style.height = 'auto'
              target.style.height = Math.min(target.scrollHeight, 120) + 'px'
            }}
          />
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          size="sm"
          className="h-10 w-10 p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Typing indicator */}
      {isTyping && (
        <div className="text-xs text-gray-500 mt-2">
          Appuyez sur Entrée pour envoyer, Shift+Entrée pour une nouvelle ligne
        </div>
      )}
    </div>
  )
}
