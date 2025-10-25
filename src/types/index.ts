// User Roles as defined in specifications
export type UserRole = 
  | 'creator'      // Artiste/Creator general
  | 'beatmaker'    // Beatmaker specifically  
  | 'engineer'     // Ingénieur son
  | 'videographer' // Vidéaste
  | 'fan'          // Fan
  | 'investor'     // Investisseur
  | 'business'     // Entreprise

// Subscription Plans
export type SubscriptionPlan = 'free' | 'pro' | 'boss'

// Plan Features
export const SUBSCRIPTION_FEATURES = {
  free: {
    max_services: 3,
    max_files_per_order: 5,
    commission_rate: 0.08, // 8%
    has_crowdfunding: false,
    has_rush_delivery: false,
    has_analytics: false,
    has_custom_branding: false,
    support_priority: 'standard',
    payout_delay_days: 7
  },
  pro: {
    max_services: 999,
    max_files_per_order: 25,
    commission_rate: 0.05, // 5%
    has_crowdfunding: true,
    has_rush_delivery: true,
    has_analytics: true,
    has_custom_branding: true,
    support_priority: 'priority',
    payout_delay_days: 2
  },
  boss: {
    max_services: 999,
    max_files_per_order: 100,
    commission_rate: 0.03, // 3%
    has_crowdfunding: true,
    has_rush_delivery: true,
    has_analytics: true,
    has_custom_branding: true,
    support_priority: 'vip',
    payout_delay_days: 1,
    has_featured_listings: true,
    monthly_studio_hours: 2
  }
} as const

// User Profile Types
export interface UserProfile {
  id: string
  email: string
  role: UserRole
  subscription_plan: SubscriptionPlan
  handle?: string // @username
  display_name: string
  bio?: string
  avatar_url?: string
  banner_url?: string
  location?: string
  
  // Social Links
  spotify_url?: string
  youtube_url?: string
  instagram_url?: string
  tiktok_url?: string
  website_url?: string
  
  // BPM Ecosystem
  bmp_formation_connected: boolean
  bmp_certified: boolean
  
  // Seller Stats (for marketplace)
  seller_level: 'new' | 'rising' | 'pro' | 'top'
  seller_rating: number
  total_orders: number
  total_revenue: number
  response_time_hours: number
  completion_rate: number
  availability_status?: 'available' | 'in_studio' | 'busy'
  
  // General Stats
  followers_count: number
  following_count: number
  total_views: number
  total_plays: number
  
  // Stripe Connect
  stripe_account_id?: string
  stripe_onboarding_complete: boolean
  payout_enabled: boolean
  
  // Timestamps
  created_at: string
  updated_at: string
}

// Service Categories for Marketplace
export type ServiceCategory = 
  | 'beats'
  | 'mix'
  | 'mastering' 
  | 'video_clip'
  | 'artistic_direction'
  | 'coaching'
  | 'photography'

// Service Category Display Info
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

// Service Listing
export interface ServiceListing {
  id: string
  seller_id: string
  seller?: UserProfile // Populated when needed
  title: string
  slug: string
  description: string
  category: ServiceCategory
  price: number
  delivery_days: number
  
  // Features
  revisions_included: number
  max_revisions: number
  commercial_use: boolean
  source_files: boolean
  rush_delivery_available: boolean
  rush_delivery_days?: number
  rush_delivery_extra_cost?: number
  
  // Requirements
  requirements?: string
  
  // Media
  preview_urls: string[]
  cover_image_url?: string
  audio_preview_url?: string
  video_preview_url?: string
  
  // Extras/Add-ons
  extras: ServiceExtra[]
  
  // Stats
  orders_count: number
  average_rating: number
  reviews_count: number
  total_revenue: number
  
  // Status
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

// Service Extras/Add-ons
export interface ServiceExtra {
  id: string
  service_id: string
  title: string
  description: string
  price: number
  delivery_days_added: number
  is_active: boolean
}

// Order Management
export interface Order {
  id: string
  buyer_id: string
  seller_id: string
  service_id: string
  
  // Relations
  buyer?: UserProfile
  seller?: UserProfile
  service?: ServiceListing
  
  // Order Details
  selected_extras: string[] // IDs of selected extras
  rush_delivery: boolean
  requirements: string
  brief?: string
  
  // Pricing
  service_price: number
  extras_price: number
  rush_delivery_price: number
  subtotal: number
  platform_fee: number
  total_amount: number
  seller_earnings: number
  
  // Status
  status: 'pending' | 'accepted' | 'in_progress' | 'delivered' | 'in_revision' | 'completed' | 'cancelled' | 'disputed'
  
  // Delivery
  expected_delivery_date: string
  delivered_files: OrderFile[]
  revisions_used: number
  revisions_requested: OrderRevision[]
  
  // Stripe
  stripe_payment_intent_id?: string
  stripe_charge_id?: string
  
  // Timestamps
  ordered_at: string
  accepted_at?: string
  delivered_at?: string
  completed_at?: string
  last_activity_at: string
}

// Order Files
export interface OrderFile {
  id: string
  order_id: string
  filename: string
  file_url: string
  file_size: number
  file_type: string
  uploaded_by: 'buyer' | 'seller'
  uploaded_at: string
}

// Order Revisions
export interface OrderRevision {
  id: string
  order_id: string
  revision_number: number
  feedback: string
  requested_at: string
  completed_at?: string
  files_before_revision: string[]
  files_after_revision: string[]
}

// Investment/Crowdfunding
export interface ProjectFunding {
  id: string
  creator_id: string
  title: string
  description: string
  goal_amount: number
  current_amount: number
  end_date: string
  
  // Media
  pitch_video_url?: string
  cover_image_url?: string
  
  // Status
  status: 'draft' | 'active' | 'funded' | 'failed' | 'completed'
  
  created_at: string
  updated_at: string
}

// BPM Points System
export interface BPMPoints {
  user_id: string
  total_points: number
  lifetime_points_earned: number
  lifetime_points_spent: number
  
  // Current Level/Tier
  current_level: number
  points_to_next_level: number
  
  // History
  transactions: PointTransaction[]
  
  updated_at: string
}

// Search and Filters
export interface ServiceSearchFilters {
  category?: ServiceCategory
  min_price?: number
  max_price?: number
  max_delivery_days?: number
  min_rating?: number
  has_rush_delivery?: boolean
  seller_location?: string
  seller_level?: 'all' | 'new' | 'pro' | 'boss'
  sort_by?: 'relevance' | 'price_low' | 'price_high' | 'delivery_fast' | 'rating' | 'newest'
  page?: number
  limit?: number
}

export interface PointTransaction {
  id: string
  user_id: string
  amount: number
  type: 'earned' | 'spent'
  reason: string
  related_order_id?: string
  related_investment_id?: string
  created_at: string
}

// Review System
export interface Review {
  id: string
  order_id: string
  reviewer_id: string
  reviewed_id: string // The seller being reviewed
  service_id: string
  
  // Review Content
  rating: number // 1-5 stars
  comment?: string
  
  // Categories (optional detailed ratings)
  communication_rating?: number
  quality_rating?: number
  delivery_rating?: number
  
  // Status
  is_public: boolean
  is_verified: boolean // Only from completed orders
  
  // Seller Response
  seller_response?: string
  seller_response_at?: string
  
  created_at: string
  updated_at: string
}
