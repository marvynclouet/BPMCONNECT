-- Script de vérification du schéma BPM Connect
-- Exécutez ce script pour vérifier que toutes les tables ont été créées

-- Vérifier les extensions
SELECT * FROM pg_extension WHERE extname IN ('uuid-ossp', 'pg_trgm');

-- Vérifier les types ENUM
SELECT typname FROM pg_type WHERE typname IN (
  'user_role',
  'subscription_plan',
  'seller_level',
  'availability_status',
  'service_category',
  'order_status',
  'funding_status',
  'point_transaction_type'
);

-- Vérifier les tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN (
    'user_profiles',
    'service_listings',
    'service_extras',
    'orders',
    'order_files',
    'order_revisions',
    'reviews',
    'funding_campaigns',
    'funding_contributions',
    'funding_rewards',
    'bpm_points',
    'point_transactions',
    'posts',
    'post_reactions',
    'post_comments',
    'conversations',
    'messages',
    'follows',
    'certifications'
  )
ORDER BY table_name;

-- Vérifier les index
SELECT COUNT(*) as total_indexes
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND indexname LIKE 'idx_%';

-- Vérifier les politiques RLS
SELECT tablename, policyname 
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- Vérifier les fonctions
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name LIKE '%update%'
ORDER BY routine_name;

-- Vérifier les triggers
SELECT trigger_name, event_object_table 
FROM information_schema.triggers 
WHERE trigger_schema = 'public'
ORDER BY event_object_table, trigger_name;

