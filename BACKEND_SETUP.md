# 🚀 Guide de Configuration du Backend - BPM Connect

Ce guide vous explique comment configurer le backend complet de BPM Connect avec Supabase.

## 📋 Prérequis

1. Un compte Supabase : [https://supabase.com](https://supabase.com)
2. Node.js 18+ installé
3. Les variables d'environnement configurées

## 🔧 Étape 1 : Configuration Supabase

### 1.1 Créer un projet Supabase

1. Allez sur [https://supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre **Project URL** et votre **anon key** (disponibles dans Settings > API)

### 1.2 Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=votre_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_anon_key
SUPABASE_SERVICE_ROLE_KEY=votre_service_role_key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=BPM Connect

# Stripe (optionnel pour l'instant)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

### 1.3 Exécuter le schéma SQL

1. Ouvrez votre projet Supabase
2. Allez dans **SQL Editor**
3. Copiez le contenu de `supabase/schema.sql`
4. Exécutez le script SQL

Ce script va créer :
- ✅ Toutes les tables nécessaires
- ✅ Les types ENUM
- ✅ Les index pour les performances
- ✅ Les politiques RLS (Row Level Security)
- ✅ Les triggers et fonctions

### 1.4 Configurer le Storage

Dans Supabase Dashboard > Storage, créez les buckets suivants :

1. **avatars** (public)
   - Public bucket : Oui
   - File size limit : 5MB
   - Allowed MIME types : image/jpeg, image/png, image/webp

2. **banners** (public)
   - Public bucket : Oui
   - File size limit : 10MB
   - Allowed MIME types : image/jpeg, image/png, image/webp

3. **service-images** (public)
   - Public bucket : Oui
   - File size limit : 10MB
   - Allowed MIME types : image/jpeg, image/png, image/webp

4. **service-audio** (public)
   - Public bucket : Oui
   - File size limit : 50MB
   - Allowed MIME types : audio/mpeg, audio/wav, audio/flac

5. **service-videos** (public)
   - Public bucket : Oui
   - File size limit : 100MB
   - Allowed MIME types : video/mp4, video/webm

6. **order-files** (private)
   - Public bucket : Non
   - File size limit : 200MB
   - Allowed MIME types : */*

7. **campaign-images** (public)
   - Public bucket : Oui
   - File size limit : 10MB
   - Allowed MIME types : image/jpeg, image/png, image/webp

8. **campaign-videos** (public)
   - Public bucket : Oui
   - File size limit : 100MB
   - Allowed MIME types : video/mp4, video/webm

9. **post-media** (public)
   - Public bucket : Oui
   - File size limit : 50MB
   - Allowed MIME types : image/*, video/*, audio/*

### 1.5 Configurer l'authentification

Dans Supabase Dashboard > Authentication > Settings :

1. **Enable Email Auth** : Activé
2. **Enable Google OAuth** (optionnel) :
   - Créez un projet Google Cloud
   - Configurez OAuth 2.0
   - Ajoutez les credentials dans Supabase
3. **Enable Apple OAuth** (optionnel) :
   - Configurez Apple Sign In
   - Ajoutez les credentials dans Supabase

## 🔌 Étape 2 : API Routes

Les API routes sont déjà créées dans `/src/app/api/` :

- ✅ `/api/users` - Gestion des utilisateurs
- ✅ `/api/services` - Gestion des services
- ✅ `/api/orders` - Gestion des commandes
- ✅ `/api/messages` - Messagerie
- ✅ `/api/posts` - Posts du feed
- ✅ `/api/funding` - Financement participatif

### Utilisation des API Routes

#### Exemple : Récupérer un utilisateur

```typescript
const response = await fetch('/api/users?id=user-id')
const user = await response.json()
```

#### Exemple : Créer un service

```typescript
const response = await fetch('/api/services', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'Mixage Professionnel',
    slug: 'mixage-professionnel',
    description: '...',
    category: 'mix',
    price: 50,
    delivery_days: 3
  })
})
const service = await response.json()
```

## 📚 Étape 3 : Services Backend

Les services backend sont dans `/src/lib/api/` :

- ✅ `users.ts` - Gestion des profils utilisateurs
- ✅ `services.ts` - Gestion des services
- ✅ `orders.ts` - Gestion des commandes
- ✅ `messages.ts` - Messagerie
- ✅ `posts.ts` - Posts du feed
- ✅ `funding.ts` - Financement participatif
- ✅ `auth.ts` - Authentification

### Utilisation des services

```typescript
import * as usersApi from '@/lib/api/users'

// Récupérer un profil
const profile = await usersApi.getUserProfile(userId)

// Créer un profil
const newProfile = await usersApi.createUserProfile(
  userId,
  email,
  role,
  displayName,
  handle
)
```

## 🔐 Étape 4 : Remplacer l'authentification mockée

### 4.1 Mettre à jour les pages d'authentification

Remplacez `lib/mock-auth.ts` par les appels réels à Supabase :

```typescript
// Avant (mock)
import { getMockUser } from '@/lib/mock-auth'

// Après (Supabase)
import { getCurrentUser } from '@/lib/api/auth'
const { user, profile } = await getCurrentUser()
```

### 4.2 Mettre à jour les pages protégées

Dans chaque page protégée, remplacez :

```typescript
// Avant
const mockUser = getMockUser()
if (!mockUser || !mockUser.isAuthenticated) {
  window.location.href = '/signin'
}

// Après
const { createClient } = await import('@/lib/supabase/server')
const supabase = await createClient()
const { data: { user } } = await supabase.auth.getUser()

if (!user) {
  redirect('/signin')
}
```

## 📊 Étape 5 : Remplacer les données mockées

### 5.1 Services

Dans `src/app/services/page.tsx`, remplacez :

```typescript
// Avant
const MOCK_SERVICES = [...]

// Après
const response = await fetch('/api/services')
const services = await response.json()
```

### 5.2 Feed

Dans `src/app/home/page.tsx`, remplacez :

```typescript
// Avant
const MOCK_POSTS = [...]

// Après
const response = await fetch('/api/posts')
const posts = await response.json()
```

### 5.3 Messages

Dans `src/app/messages/page.tsx`, remplacez :

```typescript
// Avant
const MOCK_CONVERSATIONS = [...]

// Après
const response = await fetch('/api/messages')
const conversations = await response.json()
```

## 🧪 Étape 6 : Tester le backend

### 6.1 Tester l'authentification

```bash
# Démarrer le serveur
npm run dev

# Tester la création de compte
# Aller sur /signup et créer un compte
```

### 6.2 Tester les API Routes

Utilisez Postman ou curl pour tester les endpoints :

```bash
# Récupérer les services
curl http://localhost:3000/api/services

# Créer un service (nécessite auth)
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{"title": "Test", ...}'
```

## 🐛 Dépannage

### Erreur : "relation does not exist"

➡️ Le schéma SQL n'a pas été exécuté. Exécutez `supabase/schema.sql` dans Supabase SQL Editor.

### Erreur : "permission denied"

➡️ Vérifiez les politiques RLS dans Supabase. Les politiques sont définies dans le schéma SQL.

### Erreur : "invalid API key"

➡️ Vérifiez vos variables d'environnement dans `.env.local`.

### Erreur : "storage bucket does not exist"

➡️ Créez les buckets de storage dans Supabase Dashboard > Storage.

## 📝 Prochaines Étapes

1. ✅ **Intégrer Stripe** pour les paiements
2. ✅ **Implémenter l'upload de fichiers** avec Supabase Storage
3. ✅ **Ajouter les webhooks** pour les événements Stripe
4. ✅ **Configurer les emails** avec Supabase Auth
5. ✅ **Ajouter les notifications** en temps réel avec Supabase Realtime

## 🔗 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Documentation Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Schéma SQL complet](./supabase/schema.sql)

---

**Note** : Ce backend est prêt pour la production une fois que vous avez :
1. ✅ Exécuté le schéma SQL
2. ✅ Configuré les buckets de storage
3. ✅ Configuré l'authentification
4. ✅ Remplacé les données mockées par les appels API réels

