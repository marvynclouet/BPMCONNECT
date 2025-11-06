# 🚀 Quick Start - Configuration Rapide BPM Connect

## ✅ Étape 1 : Variables d'environnement

Votre clé Supabase est déjà configurée ! Le fichier `.env.local` a été créé avec :

- ✅ **URL Supabase** : `https://dtrwtooiuxjmidzyvqm.supabase.co`
- ✅ **Anon Key** : Configurée

## 📋 Étape 2 : Exécuter le schéma SQL

1. **Ouvrez votre projet Supabase** : [https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm](https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm)

2. **Allez dans SQL Editor** (menu de gauche)

3. **Copiez le contenu** de `supabase/schema.sql`

4. **Collez et exécutez** le script SQL

   ⚠️ **Important** : Cela va créer toutes les tables, index, RLS policies, et triggers nécessaires.

## 🗂️ Étape 3 : Créer les buckets de storage

Dans Supabase Dashboard > **Storage**, créez ces buckets :

### Buckets publics :
1. **avatars** - Images de profil (5MB max)
2. **banners** - Bannières de profil (10MB max)
3. **service-images** - Images de services (10MB max)
4. **service-audio** - Fichiers audio (50MB max)
5. **service-videos** - Vidéos (100MB max)
6. **campaign-images** - Images de campagnes (10MB max)
7. **campaign-videos** - Vidéos de campagnes (100MB max)
8. **post-media** - Médias des posts (50MB max)

### Bucket privé :
9. **order-files** - Fichiers de commandes (200MB max, **privé**)

Pour chaque bucket :
- Cliquez sur "New bucket"
- Donnez le nom
- Cochez "Public bucket" (sauf pour `order-files`)
- Définissez la taille max et les types MIME autorisés

## 🔐 Étape 4 : Configurer l'authentification

Dans Supabase Dashboard > **Authentication** > **Providers** :

1. **Email** : Déjà activé par défaut
2. **Google** (optionnel) : Configurez OAuth
3. **Apple** (optionnel) : Configurez OAuth

## 🧪 Étape 5 : Tester la connexion

```bash
# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) et vérifiez que tout fonctionne.

## 📝 Étape 6 : Créer votre premier utilisateur

1. Allez sur `/signup`
2. Créez un compte
3. Complétez l'onboarding
4. Vérifiez dans Supabase Dashboard > **Table Editor** > `user_profiles` que votre profil a été créé

## 🔗 Liens utiles

- **Supabase Dashboard** : [https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm](https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm)
- **SQL Editor** : [https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm/sql](https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm/sql)
- **Storage** : [https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm/storage/buckets](https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm/storage/buckets)
- **Authentication** : [https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm/auth/providers](https://supabase.com/dashboard/project/dtrwtooiuxjmidzyvqm/auth/providers)

## ⚠️ Important

- Le fichier `.env.local` contient vos clés secrètes - **ne le commitez jamais** sur Git
- La **Service Role Key** est nécessaire pour certaines opérations admin (à ajouter dans `.env.local` si besoin)
- Pour la production, configurez les variables d'environnement dans Vercel

## 🐛 Problèmes courants

### "relation does not exist"
➡️ Le schéma SQL n'a pas été exécuté. Exécutez `supabase/schema.sql` dans SQL Editor.

### "permission denied"
➡️ Vérifiez que les politiques RLS sont bien créées (elles sont dans le schéma SQL).

### "invalid API key"
➡️ Vérifiez que `.env.local` contient bien les bonnes valeurs.

---

**Prêt !** 🎉 Votre backend est maintenant configuré. Consultez `BACKEND_SETUP.md` pour plus de détails.

