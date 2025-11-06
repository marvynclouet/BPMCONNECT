-- ============================================
-- BPM Connect - Database Schema
-- ============================================
-- This file contains the complete database schema for BPM Connect
-- Execute this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- ============================================
-- ENUMS
-- ============================================

-- User Roles
CREATE TYPE user_role AS ENUM (
  'creator',
  'beatmaker',
  'engineer',
  'videographer',
  'fan',
  'investor',
  'business'
);

-- Subscription Plans
CREATE TYPE subscription_plan AS ENUM ('free', 'pro', 'boss');

-- Seller Levels
CREATE TYPE seller_level AS ENUM ('new', 'rising', 'pro', 'top');

-- Availability Status
CREATE TYPE availability_status AS ENUM ('available', 'in_studio', 'busy');

-- Service Categories
CREATE TYPE service_category AS ENUM (
  'beats',
  'mix',
  'mastering',
  'video_clip',
  'artistic_direction',
  'coaching',
  'photography'
);

-- Order Status
CREATE TYPE order_status AS ENUM (
  'pending',
  'accepted',
  'in_progress',
  'delivered',
  'in_revision',
  'completed',
  'cancelled',
  'disputed'
);

-- Funding Campaign Status
CREATE TYPE funding_status AS ENUM ('draft', 'active', 'funded', 'failed', 'completed');

-- Point Transaction Type
CREATE TYPE point_transaction_type AS ENUM ('earned', 'spent');

-- ============================================
-- TABLES
-- ============================================

-- User Profiles
CREATE TABLE user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  role user_role NOT NULL,
  subscription_plan subscription_plan NOT NULL DEFAULT 'free',
  handle TEXT UNIQUE,
  display_name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  banner_url TEXT,
  location TEXT,
  
  -- Social Links
  spotify_url TEXT,
  youtube_url TEXT,
  instagram_url TEXT,
  tiktok_url TEXT,
  website_url TEXT,
  
  -- BPM Ecosystem
  bmp_formation_connected BOOLEAN DEFAULT false,
  bmp_certified BOOLEAN DEFAULT false,
  
  -- Seller Stats
  seller_level seller_level DEFAULT 'new',
  seller_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (seller_rating >= 0 AND seller_rating <= 5),
  total_orders INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  response_time_hours DECIMAL(5,2) DEFAULT 0.00,
  completion_rate DECIMAL(5,2) DEFAULT 0.00,
  availability_status availability_status,
  
  -- General Stats
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_plays INTEGER DEFAULT 0,
  
  -- Stripe Connect
  stripe_account_id TEXT,
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  payout_enabled BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Service Listings
CREATE TABLE service_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  category service_category NOT NULL,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  delivery_days INTEGER NOT NULL CHECK (delivery_days > 0),
  
  -- Features
  revisions_included INTEGER DEFAULT 0,
  max_revisions INTEGER DEFAULT 0,
  commercial_use BOOLEAN DEFAULT false,
  source_files BOOLEAN DEFAULT false,
  rush_delivery_available BOOLEAN DEFAULT false,
  rush_delivery_days INTEGER,
  rush_delivery_extra_cost DECIMAL(10,2),
  
  -- Requirements
  requirements TEXT,
  
  -- Media
  preview_urls TEXT[] DEFAULT '{}',
  cover_image_url TEXT,
  audio_preview_url TEXT,
  video_preview_url TEXT,
  
  -- Stats
  orders_count INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.00 CHECK (average_rating >= 0 AND average_rating <= 5),
  reviews_count INTEGER DEFAULT 0,
  total_revenue DECIMAL(10,2) DEFAULT 0.00,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Service Extras
CREATE TABLE service_extras (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID REFERENCES service_listings(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  delivery_days_added INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES service_listings(id) ON DELETE CASCADE NOT NULL,
  
  -- Order Details
  selected_extras UUID[] DEFAULT '{}',
  rush_delivery BOOLEAN DEFAULT false,
  requirements TEXT,
  brief TEXT,
  
  -- Pricing
  service_price DECIMAL(10,2) NOT NULL,
  extras_price DECIMAL(10,2) DEFAULT 0.00,
  rush_delivery_price DECIMAL(10,2) DEFAULT 0.00,
  subtotal DECIMAL(10,2) NOT NULL,
  platform_fee DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  seller_earnings DECIMAL(10,2) NOT NULL,
  
  -- Status
  status order_status DEFAULT 'pending',
  
  -- Delivery
  expected_delivery_date TIMESTAMPTZ,
  revisions_used INTEGER DEFAULT 0,
  
  -- Stripe
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  
  -- Timestamps
  ordered_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  accepted_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  last_activity_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Order Files
CREATE TABLE order_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  file_type TEXT NOT NULL,
  uploaded_by TEXT CHECK (uploaded_by IN ('buyer', 'seller')) NOT NULL,
  uploaded_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Order Revisions
CREATE TABLE order_revisions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  revision_number INTEGER NOT NULL,
  feedback TEXT NOT NULL,
  requested_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ,
  files_before_revision TEXT[] DEFAULT '{}',
  files_after_revision TEXT[] DEFAULT '{}'
);

-- Reviews
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  reviewed_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES service_listings(id) ON DELETE CASCADE NOT NULL,
  
  -- Review Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  -- Categories
  communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
  quality_rating INTEGER CHECK (quality_rating >= 1 AND quality_rating <= 5),
  delivery_rating INTEGER CHECK (delivery_rating >= 1 AND delivery_rating <= 5),
  
  -- Status
  is_public BOOLEAN DEFAULT true,
  is_verified BOOLEAN DEFAULT false,
  
  -- Seller Response
  seller_response TEXT,
  seller_response_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Constraints
  UNIQUE(order_id, reviewer_id)
);

-- Funding Campaigns
CREATE TABLE funding_campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  goal_amount DECIMAL(10,2) NOT NULL CHECK (goal_amount > 0),
  current_amount DECIMAL(10,2) DEFAULT 0.00 CHECK (current_amount >= 0),
  end_date TIMESTAMPTZ NOT NULL,
  
  -- Media
  pitch_video_url TEXT,
  cover_image_url TEXT,
  
  -- Status
  status funding_status DEFAULT 'draft',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Funding Contributions
CREATE TABLE funding_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES funding_campaigns(id) ON DELETE CASCADE NOT NULL,
  contributor_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  reward_id UUID, -- Reference to reward if applicable
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Funding Rewards
CREATE TABLE funding_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES funding_campaigns(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  description TEXT NOT NULL,
  delivery_date TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- BPM Points
CREATE TABLE bpm_points (
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE PRIMARY KEY,
  total_points INTEGER DEFAULT 0 CHECK (total_points >= 0),
  lifetime_points_earned INTEGER DEFAULT 0,
  lifetime_points_spent INTEGER DEFAULT 0,
  current_level INTEGER DEFAULT 1,
  points_to_next_level INTEGER DEFAULT 100,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Point Transactions
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  type point_transaction_type NOT NULL,
  reason TEXT NOT NULL,
  related_order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  related_investment_id UUID REFERENCES funding_contributions(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Posts (Feed)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'video', 'audio', 'collaboration', 'product', 'opportunity', 'milestone', 'survey')),
  media_urls TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  
  -- Survey specific
  survey_question TEXT,
  survey_options JSONB, -- {option: string, votes: number}[]
  
  -- Opportunity specific
  budget TEXT,
  
  -- Stats
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  shares_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Post Reactions
CREATE TABLE post_reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(post_id, user_id, emoji)
);

-- Post Comments
CREATE TABLE post_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Conversations
CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  last_message_at TIMESTAMPTZ,
  last_message_text TEXT,
  last_message_sender_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
  unread_count_user1 INTEGER DEFAULT 0,
  unread_count_user2 INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(user1_id, user2_id)
);

-- Messages
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID REFERENCES conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'audio', 'video', 'file')),
  file_url TEXT,
  file_name TEXT,
  file_size BIGINT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Follows
CREATE TABLE follows (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  follower_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Certifications (BMP Formation)
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  course_name TEXT NOT NULL,
  course_category TEXT NOT NULL,
  completion_date TIMESTAMPTZ,
  certificate_url TEXT,
  is_completed BOOLEAN DEFAULT false,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ============================================
-- INDEXES
-- ============================================

-- User Profiles
CREATE INDEX idx_user_profiles_handle ON user_profiles(handle);
CREATE INDEX idx_user_profiles_role ON user_profiles(role);
CREATE INDEX idx_user_profiles_subscription_plan ON user_profiles(subscription_plan);
CREATE INDEX idx_user_profiles_location ON user_profiles(location);

-- Service Listings
CREATE INDEX idx_service_listings_seller_id ON service_listings(seller_id);
CREATE INDEX idx_service_listings_category ON service_listings(category);
CREATE INDEX idx_service_listings_slug ON service_listings(slug);
CREATE INDEX idx_service_listings_is_active ON service_listings(is_active);
CREATE INDEX idx_service_listings_is_featured ON service_listings(is_featured);
CREATE INDEX idx_service_listings_price ON service_listings(price);
CREATE INDEX idx_service_listings_created_at ON service_listings(created_at DESC);

-- Full text search on services
CREATE INDEX idx_service_listings_search ON service_listings USING gin(to_tsvector('french', title || ' ' || description));

-- Orders
CREATE INDEX idx_orders_buyer_id ON orders(buyer_id);
CREATE INDEX idx_orders_seller_id ON orders(seller_id);
CREATE INDEX idx_orders_service_id ON orders(service_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Reviews
CREATE INDEX idx_reviews_reviewed_id ON reviews(reviewed_id);
CREATE INDEX idx_reviews_service_id ON reviews(service_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Funding Campaigns
CREATE INDEX idx_funding_campaigns_creator_id ON funding_campaigns(creator_id);
CREATE INDEX idx_funding_campaigns_status ON funding_campaigns(status);
CREATE INDEX idx_funding_campaigns_end_date ON funding_campaigns(end_date);

-- Posts
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_type ON posts(type);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_tags ON posts USING gin(tags);

-- Messages
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_created_at ON messages(created_at DESC);

-- Conversations
CREATE INDEX idx_conversations_user1_id ON conversations(user1_id);
CREATE INDEX idx_conversations_user2_id ON conversations(user2_id);
CREATE INDEX idx_conversations_last_message_at ON conversations(last_message_at DESC);

-- Follows
CREATE INDEX idx_follows_follower_id ON follows(follower_id);
CREATE INDEX idx_follows_following_id ON follows(following_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_extras ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE funding_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE bpm_points ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON user_profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = id);

-- Service Listings Policies
CREATE POLICY "Services are viewable by everyone"
  ON service_listings FOR SELECT
  USING (is_active = true);

CREATE POLICY "Sellers can create their own services"
  ON service_listings FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

CREATE POLICY "Sellers can update their own services"
  ON service_listings FOR UPDATE
  USING (auth.uid() = seller_id);

-- Orders Policies
CREATE POLICY "Users can view their own orders"
  ON orders FOR SELECT
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = buyer_id);

CREATE POLICY "Sellers can update their orders"
  ON orders FOR UPDATE
  USING (auth.uid() = seller_id);

-- Messages Policies
CREATE POLICY "Users can view their own conversations"
  ON conversations FOR SELECT
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  WITH CHECK (auth.uid() = user1_id OR auth.uid() = user2_id);

CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.user1_id = auth.uid() OR conversations.user2_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their conversations"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND (conversations.user1_id = auth.uid() OR conversations.user2_id = auth.uid())
    )
  );

-- Posts Policies
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (is_active = true);

CREATE POLICY "Users can create their own posts"
  ON posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Follows Policies
CREATE POLICY "Follows are viewable by everyone"
  ON follows FOR SELECT
  USING (true);

CREATE POLICY "Users can follow others"
  ON follows FOR INSERT
  WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Users can unfollow"
  ON follows FOR DELETE
  USING (auth.uid() = follower_id);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_listings_updated_at BEFORE UPDATE ON service_listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funding_campaigns_updated_at BEFORE UPDATE ON funding_campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update followers_count
CREATE OR REPLACE FUNCTION update_followers_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE user_profiles
    SET followers_count = followers_count + 1
    WHERE id = NEW.following_id;
    
    UPDATE user_profiles
    SET following_count = following_count + 1
    WHERE id = NEW.follower_id;
    
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE user_profiles
    SET followers_count = followers_count - 1
    WHERE id = OLD.following_id;
    
    UPDATE user_profiles
    SET following_count = following_count - 1
    WHERE id = OLD.follower_id;
    
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_followers_count_trigger
  AFTER INSERT OR DELETE ON follows
  FOR EACH ROW EXECUTE FUNCTION update_followers_count();

-- Function to update service stats when order is completed
CREATE OR REPLACE FUNCTION update_service_stats_on_order_complete()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE service_listings
    SET 
      orders_count = orders_count + 1,
      total_revenue = total_revenue + NEW.seller_earnings
    WHERE id = NEW.service_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_service_stats_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_service_stats_on_order_complete();

-- Function to update user profile stats when order is completed
CREATE OR REPLACE FUNCTION update_user_stats_on_order_complete()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE user_profiles
    SET 
      total_orders = total_orders + 1,
      total_revenue = total_revenue + NEW.seller_earnings
    WHERE id = NEW.seller_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_stats_trigger
  AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_user_stats_on_order_complete();

-- Function to update conversation last message
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE conversations
  SET 
    last_message_at = NEW.created_at,
    last_message_text = NEW.content,
    last_message_sender_id = NEW.sender_id,
    updated_at = NOW()
  WHERE id = NEW.conversation_id;
  
  -- Update unread counts
  UPDATE conversations
  SET unread_count_user1 = unread_count_user1 + 1
  WHERE id = NEW.conversation_id 
    AND user1_id != NEW.sender_id;
    
  UPDATE conversations
  SET unread_count_user2 = unread_count_user2 + 1
  WHERE id = NEW.conversation_id 
    AND user2_id != NEW.sender_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_last_message_trigger
  AFTER INSERT ON messages
  FOR EACH ROW EXECUTE FUNCTION update_conversation_last_message();

-- Function to update post reactions count
CREATE OR REPLACE FUNCTION update_post_reactions_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = GREATEST(likes_count - 1, 0) WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_post_reactions_count_trigger
  AFTER INSERT OR DELETE ON post_reactions
  FOR EACH ROW EXECUTE FUNCTION update_post_reactions_count();

-- Function to update funding campaign amount
CREATE OR REPLACE FUNCTION update_funding_campaign_amount()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE funding_campaigns
    SET current_amount = current_amount + NEW.amount
    WHERE id = NEW.campaign_id;
    
    -- Update status if goal reached
    UPDATE funding_campaigns
    SET status = 'funded'
    WHERE id = NEW.campaign_id
      AND current_amount >= goal_amount
      AND status = 'active';
    
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_funding_campaign_amount_trigger
  AFTER INSERT ON funding_contributions
  FOR EACH ROW EXECUTE FUNCTION update_funding_campaign_amount();

-- ============================================
-- STORAGE BUCKETS (to be created in Supabase Dashboard)
-- ============================================
-- Create these buckets in Supabase Dashboard > Storage:
-- - avatars (public)
-- - banners (public)
-- - service-images (public)
-- - service-audio (public)
-- - service-videos (public)
-- - order-files (private)
-- - campaign-images (public)
-- - campaign-videos (public)
-- - post-media (public)

