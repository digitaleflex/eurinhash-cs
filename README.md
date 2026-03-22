# Portfolio Eurin Hash

Portfolio professionnel d'Eurin Hash - Développeur Full Stack & Expert Cloud.
Construit avec **Next.js 15**, **TypeScript**, **PostgreSQL** et **Tailwind CSS**.

![Aperçu](public/og-image.jpg)

## 🚀 Fonctionnalités

- **⚡ Performance** : App Router, Server Components, et optimisations d'images.
- **🎨 Design** : Interface moderne et responsive avec Tailwind CSS et Framer Motion.
- **🌙 Thème** : Support complet du mode sombre/clair.
- **🗄️ Base de données** : PostgreSQL (via Neon) avec Prisma ORM.
- **📧 Email** : Envoi d'emails transactionnels (Contact) via Resend.
- **🔍 SEO** : Optimisé pour le référencement (Sitemap, Robots.txt, JSON-LD, Metadata).
- **🔒 Type-Safe** : TypeScript strict pour une meilleure robustesse.

## 🛠️ Stack Technique

- **Framework** : [Next.js 15](https://nextjs.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Base de données** : [PostgreSQL](https://www.postgresql.org/) (hébergé sur [Neon](https://neon.tech/))
- **ORM** : [Prisma](https://www.prisma.io/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **Composants** : [Radix UI](https://www.radix-ui.com/)
- **Email** : [Resend](https://resend.com/)
- **Animations** : [Framer Motion](https://www.framer.com/motion/)

## 🏁 Démarrage rapide

### Prérequis

- Node.js 18+ (recommandé v20+)
- npm ou pnpm
- Une base de données PostgreSQL (locale ou cloud)
- Une clé API Resend

### Installation

1. **Cloner le projet**

```bash
git clone https://github.com/digitaleflex/eurinhash-cs.git
cd eurinhash-cs
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Configuration de l'environnement**

Copier le fichier `.env.example` (ou créer un `.env`) et remplir les variables :

```env
# Base de données (PostgreSQL/Neon)
DATABASE_URL="postgresql://user:password@host:port/dbname?sslmode=require"

# Configuration du site (même URL côté client et serveur en prod)
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
# Better Auth (sessions, OAuth) — aligner sur NEXT_PUBLIC_SITE_URL
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="$(openssl rand -base64 32)"

NEXT_PUBLIC_APP_NAME="EurinHash Portfolio"

# Google OAuth — redirect URI: {BETTER_AUTH_URL}/api/auth/callback/google
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

# Email (Resend)
RESEND_API_KEY="re_123456789"
RESEND_FROM_EMAIL="Eurin HASH <noreply@eurinhash.com>"

# Rate Limiting & Cache
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=5
CACHE_TTL_DEFAULT=300000
```

4. **Synchroniser la base de données**

```bash
# Générer le client Prisma
npm run db:generate

# Pousser le schéma vers la DB (développement)
npm run db:push
```

Si la base contenait déjà l’ancien schéma NextAuth-style (colonnes `provider`, `sessionToken`, etc.), il faut soit une migration SQL manuelle, soit repartir sur une base vide en dev (`db push` après sauvegarde).

5. **Démarrer le serveur**

```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000) (voir `package.json` pour le port).

## 📜 Scripts disponibles

- `npm run dev` : Démarre le serveur de développement (port 3000).
- `npm run build` : Compile l'application pour la production.
- `npm run start` : Démarre le serveur de production.
- `npm run lint` : Vérifie le code avec ESLint.
- `npm run db:studio` : Ouvre Prisma Studio pour visualiser les données.
- `npm run db:push` : Synchronise le schéma Prisma avec la base de données.

## 📁 Structure du projet

```
├── app/                    # Pages et routes (App Router)
│   ├── api/               # Routes API (ex: /api/contact)
│   ├── projects/          # Page Projets
│   ├── layout.tsx         # Layout principal (SEO, Fonts, Providers)
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── ui/                # Composants de base (boutons, inputs...)
│   └── ...                # Composants spécifiques (Hero, Footer...)
├── lib/                   # Utilitaires et configurations
│   ├── mail.ts            # Utilitaire d'envoi d'email (Resend)
│   ├── prisma.ts          # Client Prisma (Singleton)
│   └── ...
├── prisma/                # Schéma de base de données
│   └── schema.prisma      # Définition des modèles (ContactMessage, ProjectRequest)
└── public/                # Fichiers statiques (images, fonts)
```

## 🚀 Déploiement

Le projet est conçu pour être déployé sur **Vercel**.

1. Poussez votre code sur GitHub/GitLab.
2. Importez le projet sur Vercel.
3. Configurez les variables d'environnement (DATABASE_URL, RESEND_API_KEY, etc.).
4. Déployez !

## 👤 Auteur

**Eurin Hash**

- Website: [eurinhash.com](https://eurinhash.com)
- Email: [contact@eurinhash.com](mailto:contact@eurinhash.com)
- LinkedIn: [linkedin.com/in/eurinalmeida](https://linkedin.com/in/eurinalmeida)
- GitHub: [github.com/digitaleflex](https://github.com/digitaleflex)

---

Développé avec ❤️ et passion.
