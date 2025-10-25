import React from 'react'

interface IconProps {
  className?: string
  size?: number
}

export const CreatorIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L13.09 8.26L20 9.27L13.09 10.28L12 16.54L10.91 10.28L4 9.27L10.91 8.26L12 2Z" fill="currentColor"/>
    <circle cx="12" cy="20" r="2" fill="currentColor"/>
  </svg>
)

export const BeatmakerIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" fillOpacity="0.2"/>
    <circle cx="7" cy="12" r="2" fill="currentColor"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
    <circle cx="17" cy="12" r="2" fill="currentColor"/>
    <rect x="6" y="2" width="2" height="4" fill="currentColor"/>
    <rect x="11" y="2" width="2" height="4" fill="currentColor"/>
    <rect x="16" y="2" width="2" height="4" fill="currentColor"/>
  </svg>
)

export const EngineerIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" fill="currentColor"/>
    <path d="M19 7L16.5 9.5C17.1 10.6 17.4 11.8 17.4 13C17.4 16.9 14.3 20 10.4 20S3.4 16.9 3.4 13C3.4 9.1 6.5 6 10.4 6C11.6 6 12.8 6.3 13.9 6.9L16.5 4.5C17.9 3.1 20.1 3.1 21.5 4.5C22.9 5.9 22.9 8.1 21.5 9.5L19 7Z" fill="currentColor" fillOpacity="0.3"/>
    <circle cx="10.4" cy="13" r="3" fill="currentColor"/>
  </svg>
)

export const VideographerIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="6" width="14" height="10" rx="2" fill="currentColor" fillOpacity="0.2"/>
    <path d="M16 8L22 4V16L16 12V8Z" fill="currentColor"/>
    <circle cx="6" cy="9" r="1" fill="currentColor"/>
    <path d="M5 13L8 10L11 13L14 10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
  </svg>
)

export const FanIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor"/>
  </svg>
)

export const InvestorIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.1"/>
    <path d="M12 2L15.09 8.26L22 9.27L15.09 10.28L12 16.54L8.91 10.28L2 9.27L8.91 8.26L12 2Z" fill="currentColor" fillOpacity="0.3"/>
    <text x="12" y="15" textAnchor="middle" fontSize="8" fill="currentColor" fontWeight="bold">€</text>
  </svg>
)

export const BusinessIcon = ({ className = "", size = 24 }: IconProps) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="6" width="18" height="12" rx="2" fill="currentColor" fillOpacity="0.2"/>
    <rect x="6" y="2" width="12" height="4" rx="1" fill="currentColor" fillOpacity="0.3"/>
    <rect x="7" y="9" width="2" height="6" fill="currentColor"/>
    <rect x="11" y="9" width="2" height="6" fill="currentColor"/>
    <rect x="15" y="9" width="2" height="6" fill="currentColor"/>
  </svg>
)

export const getRoleIcon = (role: string, props: IconProps = {}) => {
  switch (role) {
    case 'creator':
    case 'artiste':
      return <CreatorIcon {...props} />
    case 'beatmaker':
      return <BeatmakerIcon {...props} />
    case 'engineer':
    case 'ingé son':
      return <EngineerIcon {...props} />
    case 'videographer':
    case 'vidéaste':
      return <VideographerIcon {...props} />
    case 'fan':
      return <FanIcon {...props} />
    case 'investor':
    case 'investisseur':
      return <InvestorIcon {...props} />
    case 'business':
    case 'entreprise':
      return <BusinessIcon {...props} />
    default:
      return <CreatorIcon {...props} />
  }
}
