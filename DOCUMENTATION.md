# 📚 Documentation Complète - BPM Connect

## 🎯 Vue d'ensemble du projet

**BPM Connect** est une plateforme complète pour les créateurs musicaux francophones, permettant de vendre des services, collaborer, financer des projets et monétiser son talent. Le projet est développé avec Next.js 14, TypeScript, Tailwind CSS, Shadcn/UI, et utilise Supabase pour le backend.

**Version actuelle :** MVP Phase 1 - Fonctionnalités principales implémentées  
**Statut :** ✅ Prêt pour production (avec données mockées)  
**Déploiement :** Vercel (automatique via GitHub)

---

## 📁 Structure du Projet

### `/src/app/` - Pages de l'application (Next.js App Router)

#### Pages Publiques

**`page.tsx`** - Landing Page
- **Rôle** : Page d'accueil publique avec présentation de la plateforme
- **Fonctionnalités** :
  - Hero section avec vinyl interactif
  - Section "Pourquoi BPM Connect ?"
  - Section des plans tarifaires (Free/Pro/Boss)
  - Section statistiques
  - Footer avec liens
  - Bouton "Voir les tarifs" avec scroll smooth vers la section tarifs
- **Composants utilisés** : `InteractiveVinyl`, `AuthNav`, `Logo`, `Footer`
- **Note** : Utilise `'use client'` pour le scroll smooth

**`pricing/page.tsx`** - Page des Tarifs
- **Rôle** : Affichage détaillé des plans d'abonnement
- **Fonctionnalités** :
  - Comparaison des 3 plans (Free, Pro, Boss)
  - Liste des fonctionnalités par plan
  - Boutons d'abonnement
- **Plans** :
  - **Free** : Gratuit, 3 services max, commission 8%
  - **Pro** : 29€/mois, services illimités, commission 5%
  - **Boss** : 99€/mois, tout Pro + avantages VIP, commission 3%

**`services/page.tsx`** - Marketplace des Services
- **Rôle** : Liste et recherche de services proposés par les créateurs
- **Fonctionnalités** :
  - Filtres par catégorie, prix, délai, rating
  - Tri par pertinence, prix, délai, rating
  - Cartes de services avec preview
  - Recherche textuelle
- **Catégories** : Beats, Mixage, Mastering, Clips vidéo, Direction artistique, Coaching, Photographie

**`services/[slug]/page.tsx`** - Détail d'un Service
- **Rôle** : Page de détail d'un service avec options de commande
- **Fonctionnalités** :
  - Description complète
  - Options et extras
  - Avis et ratings
  - Bouton de commande
  - Profil du vendeur

**`services/create/page.tsx`** - Création de Service
- **Rôle** : Formulaire en plusieurs étapes pour créer un service
- **Fonctionnalités** :
  - Étape 1 : Catégorie et titre
  - Étape 2 : Description et prix
  - Étape 3 : Options et extras
  - Étape 4 : Media (images, audio, vidéo)
  - Validation et publication

**`creators/page.tsx`** - Liste des Créateurs
- **Rôle** : Découverte des créateurs de la plateforme
- **Fonctionnalités** :
  - Filtres par rôle, localisation, disponibilité
  - Cartes de créateurs avec avatar, banner, stats
  - Badge "BPM Certified" pour les créateurs certifiés
  - Bouton "Suivre"
- **Améliorations récentes** :
  - Dark mode complet
  - Banners qui remplissent toute la largeur
  - Avatars sans double bordure
  - Bouton "Suivre" visible en dark mode

**`creators/[handle]/page.tsx`** - Profil d'un Créateur
- **Rôle** : Profil public d'un créateur
- **Fonctionnalités** :
  - Informations du profil
  - Portfolio audio/vidéo
  - Services proposés
  - Avis et ratings
  - Statistiques (commandes, revenus, etc.)

**`signin/page.tsx`** - Connexion
- **Rôle** : Page de connexion
- **Fonctionnalités** :
  - Connexion par email/mot de passe
  - OAuth Google/Apple (préparé)
  - Redirection après connexion

**`signup/page.tsx`** - Inscription
- **Rôle** : Page d'inscription
- **Fonctionnalités** :
  - Choix du rôle (7 types d'utilisateurs)
  - Formulaire d'inscription
  - Redirection vers onboarding

#### Pages Privées (Authentification requise)

**`home/page.tsx`** - Feed Principal ⭐
- **Rôle** : Fil d'actualité de la communauté (équivalent à un réseau social)
- **Fonctionnalités principales** :
  - **Widget de publication** :
    - Textarea pour écrire un post
    - Boutons d'actions intégrés dans le champ (Image, Vidéo, Audio, Offre, Demande, Sondage)
    - Bouton "Publier" avec icône Send
  - **Filtres de posts** :
    - Tous, Collaborations, Opportunités, Nouveaux sons
  - **Stories** : Section stories horizontale avec bulles
  - **Posts du feed** :
    - Types : collaboration, product, opportunity, milestone, survey
    - Réactions emoji (👍 ❤️ 🔥 👏) avec animation confetti
    - Commentaires et partages
    - Badges de type de post
  - **Sondages interactifs** :
    - Vote avec résultats en temps réel
    - Barres de progression
    - Animation confetti au vote
  - **Modales de publication** :
    - Offre de service (avec liste complète de services audio/audiovisuel)
    - Demande (même liste de services)
    - Sondage (question + options)
  - **Sidebar gauche** :
    - Profil utilisateur
    - Statistiques (abonnés, collaborations, projets)
    - Suggestions d'utilisateurs
  - **Sidebar droite** :
    - Stats communauté
    - Opportunités tendances
    - Hashtags populaires
  - **Bouton flottant "Publier"** : Scroll vers le haut et focus sur le textarea
- **Composants utilisés** : `MainNavbar`, `Stories`, `CommunityStats`, `EmojiConfetti`, `AvatarGenerator`
- **Améliorations récentes** :
  - Responsive design complet
  - Boutons d'actions dans le champ de texte
  - Animation confetti pour les réactions
  - Sondages interactifs fonctionnels
  - Modales pour chaque type de publication

**`dashboard/page.tsx`** - Tableau de Bord Utilisateur
- **Rôle** : Espace personnel de l'utilisateur
- **Fonctionnalités** :
  - Statistiques personnelles
  - Commandes récentes
  - Services actifs
  - Prochaines étapes
  - Liens rapides

**`onboarding/page.tsx`** - Onboarding
- **Rôle** : Configuration du profil en 3 étapes
- **Fonctionnalités** :
  - Étape 1 : Informations de base
  - Étape 2 : Portfolio et médias
  - Étape 3 : Préférences et finalisation

**`messages/page.tsx`** - Messagerie ⭐
- **Rôle** : Système de messagerie temps réel
- **Fonctionnalités** :
  - Liste des conversations
  - Fenêtre de chat
  - Input de message avec support fichiers
  - Indicateur de frappe
  - Filtres (Tous, Non lus, Commandes)
  - Recherche de conversations
  - Badges de statut (non lu, commande liée)
- **Composants** : `ConversationList`, `ChatWindow`, `MessageInput`
- **Améliorations récentes** :
  - Dark mode complet
  - Recherche consolidée (une seule barre de recherche)
  - Filtres responsive (grid 3 colonnes)
  - Empty state amélioré

**`admin/page.tsx`** - Dashboard Administrateur ⭐
- **Rôle** : Interface d'administration de la plateforme
- **Fonctionnalités** :
  - **Onglet "Vue d'ensemble"** :
    - KPIs (utilisateurs, commandes, revenus, litiges)
    - Graphiques de croissance
    - Actions rapides
  - **Onglet "Utilisateurs"** :
    - Liste des utilisateurs
    - Recherche et filtres
    - Actions : voir, éditer, valider, suspendre
    - Export des données
  - **Onglet "Commandes"** :
    - Liste des commandes
    - Badges "À valider"
    - Boutons validation/rejet
    - Hover effects
  - **Onglet "Paiements"** :
    - Gestion des payouts
    - Remboursements
    - Transactions
  - **Onglet "Contenu"** :
    - Validation des services (approuver/rejeter)
    - Gestion des signalements
  - **Onglet "Paramètres"** :
    - Configuration des commissions par plan
    - Historique des logs d'activité
- **Améliorations récentes** :
  - Intégration `MainNavbar`
  - Dark mode complet
  - Boutons de validation/rejet dans les commandes
  - Interface de modération du contenu

**`funding/page.tsx`** - Financement Participatif ⭐
- **Rôle** : Page de crowdfunding pour financer des projets musicaux
- **Fonctionnalités** :
  - **Onglets** : En cours, Réussies, Terminées (avec compteurs)
  - **Cartes de campagnes** :
    - Barre de progression (pourcentage, montant collecté/objectif)
    - Statistiques (contributeurs, jours restants, nombre de récompenses)
    - Aperçu des récompenses populaires
    - Avatar de l'organisateur avec `AvatarGenerator`
  - **Formulaire de création de campagne** :
    - Titre, description
    - Objectif (€) et durée (jours)
    - Upload image de couverture et vidéo pitch
    - Gestion des récompenses (montant + description)
  - **Bouton "Créer une campagne"**
- **Composants utilisés** : `MainNavbar`, `AvatarGenerator`, `Progress`
- **Note** : Disponible uniquement pour les plans Pro et Boss

**`bmp-formation/page.tsx`** - Page Formation BPM ⭐
- **Rôle** : Page de présentation de BMP Formation (école de formation)
- **Fonctionnalités** :
  - **Section "Vos certifications"** :
    - Affichage des certifications obtenues
    - Certifications en cours avec progression
    - Badge "BPM Certified" automatique sur les profils
  - **Statistiques** : Étudiants formés, cours disponibles, taux de satisfaction, créateurs certifiés
  - **Intégration BPM Connect** : Parcours Formation → Certification → Monétisation
  - **Masterclasses** : Liste des formations avec réductions pour membres BPM Connect
  - **Programme de certification** : Processus en 3 étapes
  - **Créateurs certifiés** : Liste des créateurs avec badge BMP Certified
  - **Bouton "Voir les formations"**
- **Composants utilisés** : `MainNavbar`
- **Améliorations récentes** :
  - Section certifications complète
  - Dark mode compatible
  - Intégration `MainNavbar`

**`subscribe/[plan]/page.tsx`** - Processus d'Abonnement
- **Rôle** : Page de souscription à un plan
- **Fonctionnalités** :
  - Récapitulatif du plan
  - Intégration Stripe (préparée)
  - Confirmation

#### Fichiers de Configuration

**`layout.tsx`** - Layout Principal
- **Rôle** : Layout racine de l'application
- **Fonctionnalités** :
  - Configuration des polices (Geist Sans, Geist Mono)
  - `ThemeProvider` pour le dark mode
  - Metadata globale

**`globals.css`** - Styles Globaux
- **Rôle** : Styles CSS globaux et variables Tailwind
- **Fonctionnalités** :
  - Variables de couleurs (light/dark)
  - Classes utilitaires (`.scrollbar-hide`)
  - Animations personnalisées

**`loading.tsx`** - État de Chargement
- **Rôle** : Composant de chargement global

**`not-found.tsx`** - Page 404
- **Rôle** : Page d'erreur 404

**`robots.ts`** - Configuration Robots.txt
- **Rôle** : Configuration pour les robots de recherche

**`sitemap.ts`** - Sitemap XML
- **Rôle** : Génération automatique du sitemap

**`manifest.ts`** - Web App Manifest
- **Rôle** : Configuration PWA

---

### `/src/components/` - Composants React

#### Navigation

**`navigation/main-navbar.tsx`** - Barre de Navigation Principale ⭐
- **Rôle** : Navigation unifiée pour toute l'application
- **Fonctionnalités** :
  - Logo avec lien vers home
  - Navigation adaptative (liens différents pour connecté/non connecté)
  - Badges contextuels (FEED, ADMIN)
  - Avatar utilisateur avec `AvatarGenerator`
  - Bouton "Vendre" (créer un service)
  - Toggle dark mode
  - Menu mobile responsive
  - Liens actifs avec highlight
- **Liens pour utilisateurs connectés** : Feed, Services, Créateurs, Messages, Mon Espace
- **Liens pour visiteurs** : Services, Créateurs, Tarifs, Formation
- **Améliorations récentes** :
  - Responsive design optimisé
  - Compact et moderne
  - Dark mode complet

#### UI Components (Shadcn/UI)

**`ui/avatar-generator.tsx`** - Générateur d'Avatars ⭐
- **Rôle** : Génération d'avatars dynamiques avec icônes de rôle
- **Fonctionnalités** :
  - Génération d'avatar basée sur le nom (couleurs cohérentes)
  - Icônes de rôle (7 types d'utilisateurs)
  - Badge de statut en ligne
  - Styles : "realistic", "minimal", "gradient"
  - Support des images personnalisées
  - Placeholder pour les services
- **Utilisé partout** : Feed, Messages, Créateurs, Admin, etc.

**`ui/logo.tsx`** - Composant Logo
- **Rôle** : Logo de l'application
- **Fonctionnalités** :
  - Logo adaptatif (light/dark mode)
  - Variantes : `Logo`, `LogoMini`, `LogoLarge`
  - Support des images `logo-blanc.png` et `logo-noir.png`

**`ui/emoji-confetti.tsx`** - Animation Confetti d'Emojis ⭐
- **Rôle** : Animation de confetti avec emojis
- **Fonctionnalités** :
  - Animation déclenchée par prop `trigger`
  - Emojis personnalisables
  - Particules animées (position, rotation, scale)
  - Couvre tout l'écran
  - Durée : 2 secondes
- **Utilisé dans** : Feed (réactions emoji)

**`ui/interactive-vinyl.tsx`** - Vinyl Interactif
- **Rôle** : Animation de disque vinyle interactif
- **Fonctionnalités** :
  - Rotation au clic/glisser
  - Effet de scratch
  - Animation fluide
- **Utilisé dans** : Landing page

**`ui/button.tsx`** - Bouton
- **Rôle** : Composant bouton réutilisable (Shadcn/UI)
- **Variantes** : default, outline, ghost, destructive, secondary

**`ui/card.tsx`** - Carte
- **Rôle** : Composant carte (Shadcn/UI)
- **Composants** : `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

**`ui/dialog.tsx`** - Modale
- **Rôle** : Composant modale (Shadcn/UI)
- **Utilisé dans** : Feed (modales de publication), Admin, etc.

**`ui/input.tsx`** - Input
- **Rôle** : Champ de saisie (Shadcn/UI)

**`ui/textarea.tsx`** - Textarea
- **Rôle** : Zone de texte multiligne (Shadcn/UI)

**`ui/select.tsx`** - Select
- **Rôle** : Liste déroulante (Shadcn/UI)

**`ui/badge.tsx`** - Badge
- **Rôle** : Badge/étiquette (Shadcn/UI)

**`ui/tabs.tsx`** - Onglets
- **Rôle** : Système d'onglets (Shadcn/UI)

**`ui/progress.tsx`** - Barre de Progression
- **Rôle** : Barre de progression (Shadcn/UI)
- **Utilisé dans** : Financement (barre de progression des campagnes)

**`ui/avatar.tsx`** - Avatar
- **Rôle** : Avatar simple (Shadcn/UI)
- **Note** : Préférer `AvatarGenerator` pour plus de fonctionnalités

**`ui/dropdown-menu.tsx`** - Menu Déroulant
- **Rôle** : Menu déroulant (Shadcn/UI)

**`ui/label.tsx`** - Label
- **Rôle** : Label pour les formulaires (Shadcn/UI)

**`ui/empty-state.tsx`** - État Vide
- **Rôle** : Composant pour les états vides

**`ui/footer.tsx`** - Footer
- **Rôle** : Pied de page de l'application
- **Fonctionnalités** :
  - Liens vers les pages principales
  - Liens sociaux
  - Copyright

**`ui/auth-nav.tsx`** - Navigation d'Authentification
- **Rôle** : Navigation pour les pages publiques (landing)
- **Fonctionnalités** :
  - Liens : Services, Tarifs, Connexion, Inscription
  - Bouton "Tarifs" caché sur mobile
- **Utilisé dans** : Landing page

**`ui/role-icons.tsx`** - Icônes de Rôles
- **Rôle** : Fonction pour obtenir l'icône d'un rôle
- **Rôles** : creator, beatmaker, engineer, videographer, fan, investor, business

**`ui/illustrations.tsx`** - Illustrations
- **Rôle** : Composants d'illustrations SVG
- **Composants** : `HeroMusicIllustration`, `CommunityIllustration`, `EmptyStateIllustration`

**`ui/social-networks.tsx`** - Réseaux Sociaux
- **Rôle** : Section des réseaux sociaux
- **Fonctionnalités** :
  - Liens vers les réseaux sociaux
  - Icônes (à migrer vers Font Awesome selon demande)
- **Note** : Migration vers Font Awesome prévue

**`ui/bpm-formation-section.tsx`** - Section BPM Formation
- **Rôle** : Section d'intégration BPM Formation
- **Utilisé dans** : Feed, Landing

**`ui/studio-animations.tsx`** - Animations Studio
- **Rôle** : Animations pour les studios
- **Composants** : `StudioAnimations`, `StudioVisualization`

**`ui/vinyl-effects.tsx`** - Effets Vinyle
- **Rôle** : Effets visuels pour les vinyles

**`ui/logo-perfect-round.tsx`** - Logo Rond Parfait
- **Rôle** : Variante du logo en forme ronde

#### Feed Components

**`feed/stories.tsx`** - Stories
- **Rôle** : Composant stories (style Instagram)
- **Fonctionnalités** :
  - Bulles horizontales scrollables
  - Images dans les bulles
  - Badge "Nouveau" pour les nouvelles stories
- **Améliorations récentes** :
  - Bulles centrées et bien dimensionnées
  - Images chargées correctement
  - Espacement entre pseudos et bulles

**`feed/community-stats.tsx`** - Statistiques Communauté
- **Rôle** : Affichage des statistiques de la communauté
- **Fonctionnalités** :
  - Nombre d'utilisateurs
  - Nombre de services
  - Nombre de collaborations
  - Tendance

**`feed/emoji-reactions.tsx`** - Réactions Emoji
- **Rôle** : Composant de réactions emoji (déprécié, intégré dans `home/page.tsx`)

#### Messaging Components

**`messaging/conversation-list.tsx`** - Liste des Conversations
- **Rôle** : Liste des conversations dans la messagerie
- **Fonctionnalités** :
  - Liste des conversations
  - Badges de statut (non lu, commande)
  - Sélection de conversation
  - Empty state
- **Améliorations récentes** :
  - Recherche supprimée (déplacée dans `messages/page.tsx`)
  - Dark mode complet
  - Utilisation de `AvatarGenerator`

**`messaging/chat-window.tsx`** - Fenêtre de Chat
- **Rôle** : Fenêtre de conversation
- **Fonctionnalités** :
  - Affichage des messages
  - Bulles de messages (envoyé/reçu)
  - Séparateurs de date
  - Scroll automatique
- **Améliorations récentes** :
  - Dark mode complet

**`messaging/message-input.tsx`** - Input de Message
- **Rôle** : Zone de saisie de message
- **Fonctionnalités** :
  - Textarea pour le message
  - Boutons d'actions (fichier, image, audio)
  - Indicateur de frappe
  - Bouton d'envoi
- **Améliorations récentes** :
  - Dark mode complet

#### Marketplace Components

**`marketplace/service-card.tsx`** - Carte de Service
- **Rôle** : Carte d'affichage d'un service
- **Fonctionnalités** :
  - Image de couverture
  - Titre et description
  - Prix et délai
  - Rating
  - Badge de catégorie

**`marketplace/service-filters.tsx`** - Filtres de Services
- **Rôle** : Composant de filtres pour la marketplace
- **Fonctionnalités** :
  - Filtres par catégorie, prix, délai, rating
  - Tri
  - Recherche

#### Auth Components

**`auth/auth-form.tsx`** - Formulaire d'Authentification
- **Rôle** : Formulaire réutilisable pour connexion/inscription
- **Fonctionnalités** :
  - Champs email et mot de passe
  - Validation
  - Gestion des erreurs

#### Theme Components

**`theme/theme-provider.tsx`** - Provider de Thème
- **Rôle** : Provider pour le dark mode (next-themes)
- **Fonctionnalités** :
  - Gestion du thème (light/dark/system)
  - Persistance dans localStorage

**`theme/theme-toggle.tsx`** - Toggle de Thème
- **Rôle** : Bouton pour changer de thème
- **Variantes** : `ThemeToggle`, `MiniThemeToggle`

#### SEO Components

**`seo/metadata.tsx`** - Metadata SEO
- **Rôle** : Configuration des metadata pour le SEO
- **Fonctionnalités** :
  - Metadata par page
  - Open Graph
  - Twitter Cards

---

### `/src/lib/` - Utilitaires et Services

**`mock-auth.ts`** - Authentification Mockée
- **Rôle** : Système d'authentification mocké pour le développement
- **Fonctionnalités** :
  - `getMockUser()` : Récupère l'utilisateur mocké
  - `logout()` : Déconnexion
  - Types : `MockUser`
- **Note** : À remplacer par Supabase Auth en production

**`constants.ts`** - Constantes de l'Application
- **Rôle** : Toutes les constantes de l'application
- **Contenu** :
  - Configuration de l'app
  - Configuration business (commissions, prix)
  - Features par plan
  - Catégories de services
  - Rôles utilisateurs
  - Liens sociaux
  - Limites d'upload
  - Statuts de commande
  - Système de points BPM

**`utils.ts`** - Utilitaires
- **Rôle** : Fonctions utilitaires
- **Fonctionnalités** :
  - `cn()` : Merge des classes Tailwind (clsx + tailwind-merge)

**`supabase/client.ts`** - Client Supabase (Client-side)
- **Rôle** : Client Supabase pour le navigateur
- **Fonctionnalités** :
  - Création du client Supabase
  - Configuration SSR

**`supabase/server.ts`** - Client Supabase (Server-side)
- **Rôle** : Client Supabase pour le serveur
- **Fonctionnalités** :
  - Création du client Supabase côté serveur
  - Gestion des cookies

**`stripe/client.ts`** - Client Stripe (Client-side)
- **Rôle** : Client Stripe pour le navigateur
- **Fonctionnalités** :
  - Initialisation de Stripe.js

**`stripe/server.ts`** - Client Stripe (Server-side)
- **Rôle** : Client Stripe pour le serveur
- **Fonctionnalités** :
  - Initialisation de Stripe côté serveur

**`avatar-service.ts`** - Service d'Avatars
- **Rôle** : Service pour la génération d'avatars
- **Fonctionnalités** :
  - Génération de couleurs basées sur le nom
  - Génération d'initiales

---

### `/src/types/` - Types TypeScript

**`index.ts`** - Types Principaux
- **Rôle** : Définition de tous les types TypeScript
- **Types principaux** :
  - `UserRole` : 7 types de rôles
  - `SubscriptionPlan` : Free, Pro, Boss
  - `UserProfile` : Profil utilisateur complet
  - `ServiceCategory` : Catégories de services
  - `ServiceListing` : Service de la marketplace
  - `Order` : Commande
  - `Review` : Avis
  - `ProjectFunding` : Campagne de financement
  - `BPMPoints` : Système de points
  - Et plus...

**`messaging.ts`** - Types de Messagerie
- **Rôle** : Types spécifiques à la messagerie
- **Types** :
  - `Message`
  - `Conversation`
  - `MessageType`

---

## 🎨 Design System

### Couleurs

Le projet utilise un système de couleurs basé sur les variables CSS de Tailwind :

- **Light Mode** : Couleurs claires avec `bg-background`, `text-foreground`
- **Dark Mode** : Couleurs sombres avec `dark:bg-background`, `dark:text-foreground`
- **Couleurs sémantiques** : `blue-500`, `purple-500`, `green-500`, `red-500`, etc.

### Composants Shadcn/UI

Tous les composants UI de base proviennent de Shadcn/UI :
- Button, Card, Input, Textarea, Select, Dialog, Badge, Tabs, Progress, Avatar, etc.

### Responsive Design

Le projet utilise les breakpoints Tailwind :
- `sm:` : 640px
- `md:` : 768px
- `lg:` : 1024px
- `xl:` : 1280px

**Stratégie** : Mobile-first avec adaptation progressive pour les écrans plus grands.

---

## 🔧 Configuration

### Fichiers de Configuration

**`package.json`** - Dépendances
- **Framework** : Next.js 16.0.0
- **React** : 19.2.0
- **TypeScript** : 5.x
- **Tailwind CSS** : 4.x
- **Shadcn/UI** : Composants Radix UI
- **Supabase** : 2.76.1
- **Stripe** : 19.1.0
- **Lucide React** : Icônes

**`tsconfig.json`** - Configuration TypeScript
- **Strict mode** : Activé
- **Paths** : `@/` alias pour `/src/`

**`tailwind.config.ts`** - Configuration Tailwind
- **Theme** : Personnalisé avec variables CSS
- **Dark mode** : `class`

**`next.config.ts`** - Configuration Next.js
- **App Router** : Activé
- **TypeScript** : Activé

**`components.json`** - Configuration Shadcn/UI
- **Style** : default
- **Tailwind** : configuré

---

## 🚀 Fonctionnalités Principales Implémentées

### ✅ Authentification & Profils
- [x] Système d'authentification (mocké, prêt pour Supabase)
- [x] 7 types de rôles utilisateurs
- [x] Onboarding en 3 étapes
- [x] Dashboard utilisateur
- [x] Profils publics de créateurs

### ✅ Marketplace
- [x] Création de services (4 étapes)
- [x] Liste des services avec filtres
- [x] Page de détail de service
- [x] Système d'avis et ratings
- [x] 7 catégories de services

### ✅ Abonnements
- [x] 3 plans tarifaires (Free, Pro, Boss)
- [x] Page de pricing
- [x] Processus d'abonnement (préparé pour Stripe)
- [x] Gestion des commissions par plan

### ✅ Feed Social
- [x] Publication de posts (texte, image, vidéo, audio)
- [x] Offres de service et demandes
- [x] Sondages interactifs
- [x] Réactions emoji avec animation confetti
- [x] Stories
- [x] Filtres de posts
- [x] Suggestions d'utilisateurs

### ✅ Messagerie
- [x] Conversations privées
- [x] Interface de chat
- [x] Support fichiers multimédias
- [x] Filtres et recherche
- [x] Indicateur de frappe

### ✅ Financement Participatif
- [x] Liste des campagnes
- [x] Onglets (En cours, Réussies, Terminées)
- [x] Barre de progression
- [x] Formulaire de création de campagne
- [x] Système de récompenses

### ✅ Formation BPM
- [x] Page de présentation
- [x] Section certifications
- [x] Masterclasses
- [x] Programme de certification
- [x] Badge "BPM Certified"

### ✅ Admin Dashboard
- [x] Vue d'ensemble avec KPIs
- [x] Gestion des utilisateurs
- [x] Gestion des commandes
- [x] Modération du contenu
- [x] Configuration des commissions
- [x] Historique des logs

### ✅ UI/UX
- [x] Dark mode complet
- [x] Responsive design
- [x] Navigation unifiée
- [x] Animations et transitions
- [x] Empty states
- [x] Loading states

---

## 🔄 Améliorations Récentes (Session Actuelle)

### Feed (`/home`)
1. ✅ Widget de publication amélioré
   - Boutons d'actions intégrés dans le champ de texte
   - Modales pour chaque type de publication
   - Liste complète de services audio/audiovisuel

2. ✅ Sondages interactifs
   - Vote avec résultats en temps réel
   - Barres de progression
   - Animation confetti au vote

3. ✅ Réactions emoji
   - Animation confetti à l'écran complet
   - Emojis plus gros et visibles

4. ✅ Responsive design
   - Adaptation mobile/tablette/desktop
   - Sidebars cachées sur mobile
   - Boutons et textes adaptatifs

### Messages (`/messages`)
1. ✅ Recherche consolidée
   - Une seule barre de recherche
   - Suppression de la duplication

2. ✅ Filtres responsive
   - Grid 3 colonnes
   - Textes et badges compacts

3. ✅ Dark mode complet
   - Tous les éléments adaptés

### Créateurs (`/creators`)
1. ✅ Banners
   - Remplissent toute la largeur
   - Images chargées correctement

2. ✅ Avatars
   - Suppression de la double bordure
   - Affichage correct

3. ✅ Dark mode
   - Tous les éléments visibles
   - Bouton "Suivre" visible

### Admin (`/admin`)
1. ✅ Intégration `MainNavbar`
2. ✅ Dark mode complet
3. ✅ Boutons de validation/rejet dans les commandes
4. ✅ Interface de modération du contenu

### Formation BPM (`/bmp-formation`)
1. ✅ Section certifications complète
2. ✅ Dark mode compatible
3. ✅ Intégration `MainNavbar`

### Financement (`/funding`)
1. ✅ Page complète avec onglets
2. ✅ Barres de progression
3. ✅ Formulaire de création
4. ✅ Statistiques des campagnes

### Landing Page (`/`)
1. ✅ Bouton "Voir les tarifs" avec scroll smooth
2. ✅ Emoji 💰 ajouté
3. ✅ Visible sur mobile

### Navigation
1. ✅ `MainNavbar` responsive et compacte
2. ✅ Dark mode complet
3. ✅ Menu mobile fonctionnel

---

## 📝 Notes pour les Développeurs

### Architecture

Le projet suit l'architecture Next.js 14 App Router :
- **Pages** : `/src/app/*/page.tsx`
- **Layouts** : `/src/app/layout.tsx`
- **Composants** : `/src/components/`
- **Utilitaires** : `/src/lib/`
- **Types** : `/src/types/`

### Authentification

Actuellement, l'authentification est **mockée** via `lib/mock-auth.ts`. Pour la production :
1. Configurer Supabase Auth
2. Remplacer `getMockUser()` par `supabase.auth.getUser()`
3. Mettre à jour les pages protégées

### Données

Les données sont actuellement **mockées** dans les composants. Pour la production :
1. Créer les tables Supabase (voir `README.md`)
2. Remplacer les données mockées par des appels API
3. Implémenter les mutations (create, update, delete)

### Paiements

Stripe est préparé mais pas encore intégré :
1. Configurer les clés Stripe
2. Implémenter les webhooks
3. Créer les Payment Intents
4. Gérer les abonnements récurrents

### Dark Mode

Le dark mode utilise `next-themes` :
- Thème stocké dans `localStorage`
- Support du thème système
- Variables CSS adaptatives

### Responsive Design

Stratégie mobile-first :
- Composants adaptatifs avec Tailwind
- Sidebars cachées sur mobile
- Navigation mobile avec menu hamburger
- Textes et boutons adaptatifs

### Performance

- **Images** : Utiliser `next/image` pour l'optimisation
- **Code splitting** : Automatique avec Next.js
- **Lazy loading** : Composants chargés à la demande

### SEO

- Metadata par page
- Sitemap automatique
- Robots.txt configuré
- Open Graph et Twitter Cards

---

## 🐛 Problèmes Connus

1. **Authentification** : Système mocké, à remplacer par Supabase
2. **Données** : Toutes les données sont mockées
3. **Paiements** : Stripe préparé mais pas intégré
4. **Upload de fichiers** : Non implémenté (préparé dans les formulaires)
5. **Messagerie temps réel** : Interface prête, WebSockets à implémenter
6. **Recherche** : Recherche textuelle basique, à améliorer avec Algolia/Meilisearch

---

## 🚀 Prochaines Étapes

### Phase 1 : Finalisation MVP
1. Intégrer Supabase Auth
2. Créer les tables Supabase
3. Implémenter les API routes
4. Intégrer Stripe Connect
5. Système d'upload de fichiers

### Phase 2 : Fonctionnalités Avancées
1. Recherche avancée (Algolia/Meilisearch)
2. Système de suivi (follow/unfollow)
3. Notifications en temps réel
4. Analytics avancées
5. Intégration BPM Formation (SSO)

### Phase 3 : Croissance
1. Application mobile (React Native)
2. API publique
3. Partenariats
4. Marketing automation

---

## 📞 Support

Pour toute question technique :
- 📧 Contact : [À définir]
- 🐛 Issues : GitHub Issues
- 💬 Discord : [À créer]

---

## 📄 License

Propriétaire BPM - Tous droits réservés

---

**Dernière mise à jour** : 25 Octobre 2024  
**Version** : 1.0.0-beta  
**Statut** : ✅ MVP Complet - Prêt pour production (avec données mockées)

