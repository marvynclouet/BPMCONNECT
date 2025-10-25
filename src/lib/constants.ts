// App Configuration Constants
export const APP_CONFIG = {
  name: 'BPM Connect',
  description: 'La plateforme carrière des créateurs',
  version: '1.0.0-beta',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  supportEmail: 'support@bpmconnect.com',
  contactEmail: 'contact@bpmconnect.com'
} as const

// Business Configuration
export const BUSINESS_CONFIG = {
  commissionRates: {
    free: 0.08,    // 8%
    pro: 0.05,     // 5%
    boss: 0.03     // 3%
  },
  subscriptionPrices: {
    pro: 29,       // €29/month
    boss: 99       // €99/month
  },
  maxServicesPerPlan: {
    free: 3,
    pro: 999,
    boss: 999
  },
  maxFilesPerOrder: {
    free: 5,
    pro: 25,
    boss: 100
  },
  payoutDelayDays: {
    free: 7,
    pro: 2,
    boss: 1
  }
} as const

// Features Configuration
export const FEATURES = {
  free: {
    services: 3,
    commission: 8,
    crowdfunding: false,
    rushDelivery: false,
    analytics: false,
    customBranding: false,
    support: 'standard',
    teamMembers: 1
  },
  pro: {
    services: 999,
    commission: 5,
    crowdfunding: true,
    rushDelivery: true,
    analytics: true,
    customBranding: true,
    support: 'priority',
    teamMembers: 1,
    masterclassDiscount: 20
  },
  boss: {
    services: 999,
    commission: 3,
    crowdfunding: true,
    rushDelivery: true,
    analytics: true,
    customBranding: true,
    support: 'vip',
    teamMembers: 5,
    masterclassDiscount: 20,
    featuredListings: true,
    monthlyStudioHours: 2,
    apiAccess: true
  }
} as const

// Service Categories
export const SERVICE_CATEGORIES = {
  beats: {
    label: '🥁 Beats & Instrumentales',
    description: 'Compositions originales, beats custom, remixes',
    emoji: '🥁'
  },
  mix: {
    label: '🎚️ Mixage',
    description: 'Mixage professionnel de vos titres',
    emoji: '🎚️'
  },
  mastering: {
    label: '🎧 Mastering',
    description: 'Mastering pour streaming et distribution',
    emoji: '🎧'
  },
  video_clip: {
    label: '🎬 Clips Vidéo',
    description: 'Réalisation, montage, motion design',
    emoji: '🎬'
  },
  artistic_direction: {
    label: '🎨 Direction Artistique',
    description: 'Stratégie, branding, identité visuelle',
    emoji: '🎨'
  },
  coaching: {
    label: '🎤 Coaching',
    description: 'Coaching vocal, scène, composition',
    emoji: '🎤'
  },
  photography: {
    label: '📸 Photographie',
    description: 'Shoots, covers, événements',
    emoji: '📸'
  }
} as const

// User Roles
export const USER_ROLES = {
  creator: {
    label: '🎤 Artiste / Créateur',
    description: 'Chanteur, rappeur, musicien'
  },
  beatmaker: {
    label: '🥁 Beatmaker',
    description: 'Création d\'instrumentales'
  },
  engineer: {
    label: '🎧 Ingénieur Son',
    description: 'Mix, mastering, enregistrement'
  },
  videographer: {
    label: '🎬 Vidéaste',
    description: 'Clips, montage, réalisation'
  },
  fan: {
    label: '❤️ Fan / Supporter',
    description: 'Découvrir et soutenir des talents'
  },
  investor: {
    label: '💰 Investisseur',
    description: 'Financer des projets musicaux'
  },
  business: {
    label: '🏢 Entreprise',
    description: 'Label, studio, agence'
  }
} as const

// Social Links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/bpmconnect',
  instagram: 'https://instagram.com/bpmconnect',
  youtube: 'https://youtube.com/@bpmconnect',
  tiktok: 'https://tiktok.com/@bpmconnect',
  linkedin: 'https://linkedin.com/company/bpmconnect',
  discord: 'https://discord.gg/bpmconnect'
} as const

// File Upload Limits
export const UPLOAD_LIMITS = {
  maxFileSize: 100 * 1024 * 1024, // 100MB
  maxFiles: 10,
  allowedAudioTypes: ['audio/mpeg', 'audio/wav', 'audio/flac', 'audio/aac'],
  allowedVideoTypes: ['video/mp4', 'video/webm', 'video/quicktime'],
  allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  allowedDocumentTypes: ['application/pdf', 'application/zip', 'application/x-rar-compressed']
} as const

// Order Status
export const ORDER_STATUS = {
  pending: { label: 'En attente', color: 'yellow' },
  accepted: { label: 'Acceptée', color: 'blue' },
  in_progress: { label: 'En cours', color: 'blue' },
  delivered: { label: 'Livrée', color: 'purple' },
  in_revision: { label: 'En révision', color: 'orange' },
  completed: { label: 'Terminée', color: 'green' },
  cancelled: { label: 'Annulée', color: 'red' },
  disputed: { label: 'Litige', color: 'red' }
} as const

// BPM Points System
export const BMP_POINTS = {
  earnRates: {
    investment: 1,        // 1 point per €1 invested
    referral: 100,        // 100 points per successful referral
    firstSale: 50,        // 50 points for first sale
    review: 10,           // 10 points per review received
    profileComplete: 25   // 25 points for complete profile
  },
  rewardCosts: {
    studioHour: 50,       // 50 points = 1h studio
    formation20: 100,     // 100 points = -20% formation
    giftCard10: 150,      // 150 points = 10€ gift card
    giftCard25: 350,      // 350 points = 25€ gift card
    vipEvent: 500         // 500 points = VIP event access
  }
} as const

// API Rate Limits
export const RATE_LIMITS = {
  general: 100,          // 100 requests per minute
  auth: 5,               // 5 auth attempts per minute
  upload: 10,            // 10 uploads per minute
  messaging: 50          // 50 messages per minute
} as const

// Environment Checks
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'
