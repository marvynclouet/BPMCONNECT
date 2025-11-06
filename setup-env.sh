#!/bin/bash

# Script de configuration des variables d'environnement pour BPM Connect

echo "🚀 Configuration des variables d'environnement BPM Connect"
echo ""

# Vérifier si .env.local existe déjà
if [ -f .env.local ]; then
    echo "⚠️  Le fichier .env.local existe déjà."
    read -p "Voulez-vous le remplacer ? (o/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Oo]$ ]]; then
        echo "❌ Configuration annulée."
        exit 1
    fi
fi

# Créer le fichier .env.local
cat > .env.local << EOF
# Supabase Configuration
# Project URL: https://dtrwtooiuxjmidzyvqm.supabase.co
NEXT_PUBLIC_SUPABASE_URL=https://dtrwtooiuxjmidzyvqm.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0cnd0b29pdXhqbWlnZHp5dnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MjU2NzcsImV4cCI6MjA3ODAwMTY3N30.GszAa-WDJ159739Y80HzisBt_lcUCjqCRnJKe_bnKSc

# Service Role Key (à obtenir depuis Supabase Dashboard > Settings > API)
# ⚠️ Ne jamais exposer cette clé côté client !
# SUPABASE_SERVICE_ROLE_KEY=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=BPM Connect

# Stripe Configuration (optionnel pour l'instant)
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_SECRET_KEY=
EOF

echo "✅ Fichier .env.local créé avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Exécutez le schéma SQL dans Supabase : supabase/schema.sql"
echo "2. Créez les buckets de storage (voir BACKEND_SETUP.md)"
echo "3. Configurez l'authentification dans Supabase Dashboard"
echo "4. Lancez le serveur : npm run dev"
echo ""

