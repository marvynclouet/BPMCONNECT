'use client'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

const STORIES = [
  {
    id: 1,
    user: {
      name: "MC Dynamo",
      handle: "@mcdynamo",
      avatar: null
    },
    type: "live",
    preview: "🔴 En live studio",
    viewed: false
  },
  {
    id: 2,
    user: {
      name: "BeatMaker Alex",
      handle: "@alexbeats",
      avatar: null
    },
    type: "new",
    preview: "Nouveau beat 🔥",
    viewed: false
  },
  {
    id: 3,
    user: {
      name: "Studio Central",
      handle: "@studiocentral",
      avatar: null
    },
    type: "behind",
    preview: "Behind the scenes",
    viewed: true
  },
  {
    id: 4,
    user: {
      name: "Nina Melodic",
      handle: "@ninamelodic",
      avatar: null
    },
    type: "collab",
    preview: "Collaboration en cours",
    viewed: false
  },
  {
    id: 5,
    user: {
      name: "DJ Fire",
      handle: "@djfire",
      avatar: null
    },
    type: "event",
    preview: "Set ce weekend",
    viewed: true
  }
]

export function Stories() {
  const getStoryBorder = (type: string, viewed: boolean) => {
    if (viewed) return 'ring-2 ring-gray-300'
    
    switch (type) {
      case 'live': return 'ring-2 ring-red-500'
      case 'new': return 'ring-2 ring-blue-500'
      case 'behind': return 'ring-2 ring-purple-500'
      case 'collab': return 'ring-2 ring-green-500'
      case 'event': return 'ring-2 ring-orange-500'
      default: return 'ring-2 ring-gray-300'
    }
  }

  const getStoryEmoji = (type: string) => {
    switch (type) {
      case 'live': return '🔴'
      case 'new': return '🔥'
      case 'behind': return '🎬'
      case 'collab': return '🤝'
      case 'event': return '🎪'
      default: return '📸'
    }
  }

  // Images d'illustration pour les stories (URLs fixes)
  const storyImages = [
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=140&h=140&fit=crop', // Live
    'https://images.unsplash.com/photo-1571974599782-87624638275c?w=140&h=140&fit=crop', // Beat
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=140&h=140&fit=crop', // Studio
    'https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?w=140&h=140&fit=crop', // Collab
    'https://images.unsplash.com/photo-1526673849969-ef1d8d8e8c34?w=140&h=140&fit=crop'  // Event
  ]

  return (
    <div className="bg-card border rounded-lg px-4 py-6 mb-6">
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {STORIES.map((story, index) => (
          <div key={story.id} className="shrink-0 text-center cursor-pointer group" style={{ minWidth: '72px', paddingTop: '2px' }}>
            <div className="relative mx-auto">
              <div className={`${getStoryBorder(story.type, story.viewed)} rounded-full p-0.5 w-fit mx-auto`}>
                <div className="relative h-14 w-14 rounded-full overflow-hidden bg-muted">
                  {storyImages[index] && (
                    <img 
                      src={storyImages[index]} 
                      alt={story.user.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full" />
                </div>
              </div>
              {story.type === 'live' && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full whitespace-nowrap z-10 shadow-md">
                  LIVE
                </div>
              )}
              {!story.viewed && story.type !== 'live' && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-blue-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center shadow-md">
                    ✓
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs font-medium truncate max-w-[72px] mx-auto mt-3">
              {story.user.name.split(' ')[0]}
            </p>
          </div>
        ))}
        
        {/* Bouton pour voir plus */}
        <div className="shrink-0 text-center cursor-pointer group" style={{ minWidth: '72px', paddingTop: '2px' }}>
          <div className="border-2 border-dashed border-muted-foreground/30 rounded-full p-0.5 mx-auto w-fit group-hover:border-blue-500 mb-2">
            <div className="h-14 w-14 bg-muted/50 rounded-full flex items-center justify-center text-xl text-muted-foreground group-hover:text-blue-500">
              +
            </div>
          </div>
          <p className="text-xs font-medium text-muted-foreground truncate max-w-[72px] mx-auto">
            Voir plus
          </p>
        </div>
      </div>
    </div>
  )
}
