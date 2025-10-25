import React from 'react'

interface IllustrationProps {
  className?: string
  size?: number
}

export const HeroMusicIllustration = ({ className = "", size = 300 }: IllustrationProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background Circle */}
    <circle cx="150" cy="150" r="140" fill="url(#heroGradient)" fillOpacity="0.1"/>
    
    {/* Musical Notes */}
    <g fill="currentColor" fillOpacity="0.3">
      <circle cx="80" cy="80" r="8"/>
      <rect x="88" y="50" width="3" height="30"/>
      <path d="M91 50 Q100 45 105 50 Q100 55 91 60 Z"/>
      
      <circle cx="220" cy="100" r="6"/>
      <rect x="226" y="80" width="2" height="20"/>
      <path d="M228 80 Q235 76 238 80 Q235 84 228 86 Z"/>
      
      <circle cx="70" cy="200" r="10"/>
      <rect x="80" y="170" width="4" height="30"/>
      <path d="M84 170 Q95 165 102 170 Q95 175 84 180 Z"/>
    </g>
    
    {/* Vinyl Record */}
    <g transform="translate(150, 150)">
      <circle cx="0" cy="0" r="60" fill="currentColor" fillOpacity="0.8"/>
      <circle cx="0" cy="0" r="45" fill="transparent" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="0" cy="0" r="30" fill="transparent" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="0" cy="0" r="15" fill="transparent" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      <circle cx="0" cy="0" r="6" fill="currentColor"/>
    </g>
    
    {/* Sound Waves */}
    <g stroke="currentColor" strokeWidth="2" fill="none" strokeOpacity="0.4">
      <path d="M50 120 Q80 100 50 80"/>
      <path d="M250 120 Q220 100 250 80"/>
      <path d="M50 180 Q80 200 50 220"/>
      <path d="M250 180 Q220 200 250 220"/>
    </g>
    
    <defs>
      <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6"/>
        <stop offset="100%" stopColor="#8B5CF6"/>
      </linearGradient>
    </defs>
  </svg>
)

export const EmptyStateIllustration = ({ className = "", size = 200 }: IllustrationProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="80" fill="currentColor" fillOpacity="0.05"/>
    <path d="M60 120 L80 100 L100 120 L120 100 L140 120" stroke="currentColor" strokeWidth="3" fill="none" strokeOpacity="0.3"/>
    <circle cx="100" cy="80" r="20" fill="currentColor" fillOpacity="0.1"/>
    <path d="M90 75 L95 80 L90 85 M110 75 L105 80 L110 85" stroke="currentColor" strokeWidth="2" strokeOpacity="0.4"/>
  </svg>
)

export const CommunityIllustration = ({ className = "", size = 250 }: IllustrationProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 250 250" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* People circles */}
    <circle cx="125" cy="80" r="25" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="80" cy="140" r="20" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="170" cy="140" r="20" fill="currentColor" fillOpacity="0.25"/>
    <circle cx="50" cy="190" r="15" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="200" cy="190" r="15" fill="currentColor" fillOpacity="0.2"/>
    
    {/* Connection lines */}
    <g stroke="currentColor" strokeWidth="2" strokeOpacity="0.2">
      <line x1="125" y1="80" x2="80" y2="140"/>
      <line x1="125" y1="80" x2="170" y2="140"/>
      <line x1="80" y1="140" x2="50" y2="190"/>
      <line x1="170" y1="140" x2="200" y2="190"/>
    </g>
    
    {/* Musical elements */}
    <g fill="currentColor" fillOpacity="0.4">
      <circle cx="30" cy="50" r="3"/>
      <circle cx="220" cy="60" r="3"/>
      <circle cx="210" cy="30" r="2"/>
      <path d="M28 47 Q22 45 20 47 Q22 49 28 50 Z"/>
      <path d="M218 57 Q212 55 210 57 Q212 59 218 60 Z"/>
    </g>
  </svg>
)

export const CollaborationIllustration = ({ className = "", size = 200 }: IllustrationProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="90" fill="currentColor" fillOpacity="0.05"/>
    
    {/* Handshake */}
    <g fill="currentColor" fillOpacity="0.3">
      <rect x="60" y="90" width="30" height="20" rx="10"/>
      <rect x="110" y="90" width="30" height="20" rx="10"/>
      <circle cx="100" cy="100" r="8" fill="currentColor" fillOpacity="0.6"/>
    </g>
    
    {/* Music notes around */}
    <g fill="currentColor" fillOpacity="0.2">
      <circle cx="70" cy="60" r="4"/>
      <circle cx="130" cy="65" r="3"/>
      <circle cx="75" cy="140" r="3"/>
      <circle cx="125" cy="135" r="4"/>
    </g>
  </svg>
)

export const MessagesIllustration = ({ className = "", size = 200 }: IllustrationProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Chat bubbles */}
    <rect x="40" y="60" width="80" height="40" rx="20" fill="currentColor" fillOpacity="0.2"/>
    <rect x="80" y="110" width="80" height="40" rx="20" fill="currentColor" fillOpacity="0.3"/>
    
    {/* Text lines */}
    <g fill="currentColor" fillOpacity="0.4">
      <rect x="55" y="72" width="40" height="3" rx="1"/>
      <rect x="55" y="82" width="25" height="3" rx="1"/>
      <rect x="95" y="122" width="35" height="3" rx="1"/>
      <rect x="95" y="132" width="45" height="3" rx="1"/>
    </g>
    
    {/* Hearts */}
    <g fill="currentColor" fillOpacity="0.5">
      <path d="M170 70 Q175 65 180 70 Q175 75 170 80 Q165 75 160 70 Q165 65 170 70 Z"/>
      <path d="M50 160 Q45 155 40 160 Q45 165 50 170 Q55 165 60 160 Q55 155 50 160 Z"/>
    </g>
  </svg>
)
