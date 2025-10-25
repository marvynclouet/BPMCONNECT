'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'

interface EmojiReactionsProps {
  postId: number
  initialReactions?: { [key: string]: number }
}

const AVAILABLE_REACTIONS = [
  { emoji: '🔥', label: 'Fire' },
  { emoji: '💯', label: '100' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '👏', label: 'Applause' },
  { emoji: '❤️', label: 'Love' },
  { emoji: '😍', label: 'Love Eyes' }
]

export function EmojiReactions({ postId, initialReactions = {} }: EmojiReactionsProps) {
  const [reactions, setReactions] = useState(initialReactions)
  const [showAll, setShowAll] = useState(false)

  const handleReaction = (emoji: string) => {
    setReactions(prev => ({
      ...prev,
      [emoji]: (prev[emoji] || 0) + 1
    }))
  }

  const topReactions = Object.entries(reactions)
    .sort(([,a], [,b]) => b - a)
    .slice(0, showAll ? 6 : 3)

  return (
    <div className="flex items-center gap-2 mt-2">
      {/* Quick reactions */}
      <div className="flex gap-1">
        {AVAILABLE_REACTIONS.slice(0, 4).map((reaction) => (
          <Button
            key={reaction.emoji}
            variant="ghost"
            size="sm"
            className="h-8 px-2 hover:bg-gray-100"
            onClick={() => handleReaction(reaction.emoji)}
          >
            <span className="text-sm">{reaction.emoji}</span>
          </Button>
        ))}
      </div>

      {/* Reaction counts */}
      {topReactions.length > 0 && (
        <div className="flex gap-1 ml-2">
          {topReactions.map(([emoji, count]) => (
            <div
              key={emoji}
              className="flex items-center gap-1 bg-gray-100 rounded-full px-2 py-1 text-xs cursor-pointer hover:bg-gray-200"
              onClick={() => handleReaction(emoji)}
            >
              <span>{emoji}</span>
              <span className="font-medium">{count}</span>
            </div>
          ))}
        </div>
      )}

      {/* Show more reactions */}
      {Object.keys(reactions).length > 3 && !showAll && (
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-xs text-gray-500"
          onClick={() => setShowAll(true)}
        >
          +{Object.keys(reactions).length - 3}
        </Button>
      )}
    </div>
  )
}
