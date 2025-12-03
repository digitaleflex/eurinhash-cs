# Portfolio Eurin Hash

Portfolio professionnel d'Eurin Hash - Développeur Full Stack & Expert Cloud

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- Compte Supabase

### Installation

1. **Cloner le projet**

```bash
git clone https://github.com/digitaleflex/eurinhash-cs.git
cd eurinhas-cs
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration de la base de données**

Créer un fichier `.env.local` à la racine du projet :

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Database URL (if using Prisma with Supabase)
DATABASE_URL=your_database_url_here
```

4. **Configuration de la base de données Prisma**

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la base de données
npm run db:push
```

5. **Démarrer le serveur de développement**

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3001](http://localhost:3001)

## 🛠️ Scripts disponibles

- `npm run dev` - Serveur de développement (port 3001)
- `npm run dev:turbo` - Serveur avec Turbopack (port 8080)
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Linter ESLint
- `npm run db:generate` - Générer le client Prisma
- `npm run db:push` - Pousser le schéma vers la DB
- `npm run db:migrate` - Migrations Prisma
- `npm run db:studio` - Interface Prisma Studio

## 📁 Structure du projet

```
├── app/                    # Pages Next.js App Router
│   ├── contact/           # Page de contact
│   ├── api/               # API Routes
│   └── ...
├── components/            # Composants réutilisables
│   ├── contact-form.tsx   # Formulaire de contact
│   └── ...
├── lib/                   # Utilitaires
│   ├── supabase.ts        # Configuration Supabase
│   └── ...
├── prisma/                # Schéma de base de données
│   └── schema.prisma      # Modèle de données
└── public/                # Assets statiques
```

## 🗄️ Base de données

Le projet utilise Supabase avec Prisma ORM. Le schéma inclut :

- **ContactMessage** : Messages du formulaire de contact
  - id, name, email, subject, message, status, createdAt, updatedAt

## 🔧 Configuration Supabase

1. Créer un projet sur [supabase.com](https://supabase.com)
2. Récupérer l'URL et la clé de service
3. Créer la table `contact_messages` avec le schéma Prisma
4. Configurer les variables d'environnement

## 📧 Fonctionnalités

- ✅ Page d'accueil responsive
- ✅ Formulaire de contact fonctionnel
- ✅ Intégration Supabase
- ✅ Design moderne avec Tailwind CSS
- ✅ Animations Framer Motion
- ✅ Thème sombre/clair
- ✅ SEO optimisé

## 🚀 Déploiement

Le projet est optimisé pour le déploiement sur Vercel :

1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

## 📞 Contact

- **Email** : <contact@eurinhash.com>
- **WhatsApp** : +229 01 62 26 52 46
- **LinkedIn** : [eurinalmeida](https://linkedin.com/in/eurinalmeida)
- **GitHub** : [digitaleflex](https://github.com/digitaleflex)

---

Développé avec ❤️ par Eurin Hash
