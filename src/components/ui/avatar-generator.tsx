'use client'

import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getRoleIcon } from './role-icons'
import { getCachedAvatar } from '@/lib/avatar-service'

interface AvatarGeneratorProps {
  name?: string
  role?: string
  size?: number
  className?: string
  showRoleIcon?: boolean
  imageUrl?: string | null
  style?: 'realistic' | 'cartoon' | 'abstract' | 'initials'
  showOnlineStatus?: boolean
}

export const AvatarGenerator = ({ 
  name = "User", 
  role = "creator", 
  size = 40, 
  className = "",
  showRoleIcon = false,
  imageUrl,
  style = 'realistic',
  showOnlineStatus = false
}: AvatarGeneratorProps) => {
  const [imageError, setImageError] = useState(false)

  // Générer une couleur gradient basée sur le nom
  const getGradientFromName = (name: string) => {
    const gradients = [
      'bg-gradient-to-br from-red-500 to-pink-600',
      'bg-gradient-to-br from-blue-500 to-cyan-600', 
      'bg-gradient-to-br from-green-500 to-emerald-600',
      'bg-gradient-to-br from-yellow-500 to-orange-600', 
      'bg-gradient-to-br from-purple-500 to-violet-600',
      'bg-gradient-to-br from-pink-500 to-rose-600', 
      'bg-gradient-to-br from-indigo-500 to-blue-600',
      'bg-gradient-to-br from-teal-500 to-cyan-600', 
      'bg-gradient-to-br from-orange-500 to-red-600',
      'bg-gradient-to-br from-gray-600 to-slate-700'
    ]
    
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }
    return gradients[Math.abs(hash) % gradients.length]
  }

  const bgGradient = getGradientFromName(name)
  const initials = name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2)

  // Génération de l'avatar via API si pas d'image fournie
  const avatarUrl = imageUrl || (style !== 'initials' ? getCachedAvatar(name, role, size * 2) : null)

  const handleImageError = () => {
    setImageError(true)
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Avatar 
        className={`shadow-lg transition-all duration-200 hover:scale-105 ${className.includes('!ring-0') ? '' : 'ring-2 ring-white/20'}`}
        style={{ width: size, height: size }}
      >
        {avatarUrl && !imageError && style !== 'initials' && (
          <AvatarImage 
            src={avatarUrl} 
            alt={`Avatar de ${name}`}
            onError={handleImageError}
            className="object-cover"
          />
        )}
        <AvatarFallback className={`${bgGradient} text-white font-bold shadow-inner flex items-center justify-center`}>
          <span style={{ fontSize: size * 0.35, lineHeight: 1 }}>
            {initials}
          </span>
        </AvatarFallback>
      </Avatar>
      
      {/* Icône de rôle */}
      {showRoleIcon && role && (
        <div className="absolute -bottom-0.5 -right-0.5 bg-white dark:bg-gray-800 rounded-full p-1 border-2 border-white dark:border-gray-700 shadow-md">
          {getRoleIcon(role, { 
            size: Math.max(10, size * 0.25), 
            className: "text-gray-700 dark:text-gray-200" 
          })}
        </div>
      )}

      {/* Statut en ligne */}
      {showOnlineStatus && size >= 32 && (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full animate-pulse" />
      )}
    </div>
  )
}

export const ServicePlaceholder = ({ 
  category = "beats", 
  size = 200, 
  className = "" 
}: {
  category?: string
  size?: number
  className?: string
}) => {
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'beats':
        return (
          <g>
            <rect x="60" y="80" width="80" height="60" rx="8" fill="currentColor" fillOpacity="0.2"/>
            <circle cx="80" cy="110" r="8" fill="currentColor"/>
            <circle cx="100" cy="110" r="8" fill="currentColor"/>
            <circle cx="120" cy="110" r="8" fill="currentColor"/>
            <rect x="70" y="60" width="4" height="20" fill="currentColor"/>
            <rect x="90" y="50" width="4" height="30" fill="currentColor"/>
            <rect x="110" y="55" width="4" height="25" fill="currentColor"/>
          </g>
        )
      case 'mixing':
        return (
          <g>
            <rect x="40" y="70" width="120" height="80" rx="10" fill="currentColor" fillOpacity="0.15"/>
            <circle cx="70" cy="100" r="15" fill="currentColor" fillOpacity="0.3"/>
            <circle cx="100" cy="100" r="15" fill="currentColor" fillOpacity="0.3"/>
            <circle cx="130" cy="100" r="15" fill="currentColor" fillOpacity="0.3"/>
            <rect x="65" y="120" width="10" height="20" fill="currentColor"/>
            <rect x="95" y="125" width="10" height="15" fill="currentColor"/>
            <rect x="125" y="115" width="10" height="25" fill="currentColor"/>
          </g>
        )
      case 'video':
        return (
          <g>
            <rect x="50" y="70" width="100" height="70" rx="8" fill="currentColor" fillOpacity="0.2"/>
            <polygon points="90,95 90,115 110,105" fill="currentColor"/>
            <circle cx="70" cy="85" r="3" fill="currentColor" fillOpacity="0.6"/>
          </g>
        )
      default:
        return (
          <g>
            <circle cx="100" cy="100" r="30" fill="currentColor" fillOpacity="0.2"/>
            <path d="M85 95 L95 100 L85 105 Z" fill="currentColor"/>
          </g>
        )
    }
  }

  return (
    <svg 
      width={size} 
      height={size} 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="200" height="200" rx="12" fill="currentColor" fillOpacity="0.05"/>
      {getServiceIcon(category)}
      <g stroke="currentColor" strokeWidth="1" fill="none" strokeOpacity="0.2">
        <circle cx="40" cy="40" r="8"/>
        <circle cx="160" cy="160" r="6"/>
        <path d="M30 170 Q40 160 50 170"/>
        <path d="M150 30 Q160 20 170 30"/>
      </g>
    </svg>
  )
}
