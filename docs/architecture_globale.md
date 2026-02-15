# A. Schéma d’Architecture Textuel

```
Next.js Application (App Router)
├── UI Layer (Client & Server Components)
│   ├── app/ (Pages, Layouts - Server Components by default)
│   │   ├── (root)/page.tsx (Homepage - Static Content)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── legal/.../page.tsx
│   │   ├── projects/page.tsx
│   │   ├── skills/page.tsx
│   │   ├── start-project/page.tsx
│   │   └── vision/page.tsx
│   ├── components/ (Reusable UI - Mix of Client & Server Components)
│   │   ├── ui/ (Shadcn-like base components)
│   │   └── Specific components (Navigation, Footer, ContactForm, ProjectCard etc.)
│   └── public/ (Static assets: images, favicons, service worker)
│
├── API Layer (Next.js Route Handlers)
│   ├── app/api/contact/route.ts (Handles contact form submissions)
│   └── app/api/project-request/route.ts (Handles project requests, includes admin GET endpoint)
│
├── Data Access Layer
│   ├── lib/prisma-api.ts (Prisma Client singleton with Accelerate extension)
│   └── prisma/ (Prisma Schema, Migrations)
│       └── schema.prisma (MongoDB schema definition for ContactMessage, ProjectRequest)
│
├── Business Logic / Utilities
│   ├── lib/config.ts (Centralized configuration: image, rate limit, cache, form validation)
│   ├── lib/utils.ts (Utility functions: cn for Tailwind)
│   ├── lib/cache.ts (Cache implementation)
│   ├── lib/metadata.ts (Metadata generation)
│   ├── lib/countries.ts (Phone number validation)
│   └── hooks/ (Client-side logic: use-smart-prefetch, use-progressive-loading)
│
├── Infrastructure / DevOps
│   ├── Vercel (Deployment platform, CI/CD, Analytics, Speed Insights)
│   ├── Environment Variables (Secrets management: MONGODB_URI, ADMIN_TOKEN, RATE_LIMIT_...)
│   └── npm Scripts (Testing, Linting, Formatting, Security Audit, DB operations)
│
└── Testing
    └── __tests__/ (Jest unit/integration tests for API routes and components)
```

# Description de l’architecture globale

Le projet est une application web moderne construite avec **Next.js (App Router)**, exploitant pleinement ses capacités de rendu côté serveur (Server Components) par défaut. L'architecture est clairement stratifiée, favorisant la séparation des préoccupations :

*   **Couche UI (Frontend) :** Principalement des composants React, répartis entre des **Server Components** pour le rendu initial et des **Client Components** (`'use client'`) là où l'interactivité est nécessaire (formulaires, navigation dynamique). L'interface utilisateur est stylisée avec **Tailwind CSS** et des composants **Radix UI**, assurant un design réactif, accessible et moderne.
*   **Couche API (Backend for Frontend - BFF) :** Implémentée via les **Next.js Route Handlers** (`app/api/.../route.ts`), qui agissent comme des endpoints API sans serveur. Ces routes gèrent les soumissions de formulaires et les requêtes de données, intégrant des mécanismes de **rate limiting** et de validation robuste.
*   **Couche d'Accès aux Données :** Gérée par **Prisma ORM**, avec une configuration spécifique pour **MongoDB** comme base de données. L'intégration de **Prisma Accelerate** est notable, car elle optimise les performances des requêtes de base de données en offrant une couche de cache et de proxy globale.
*   **Couche de Logique Métier / Utilitaires :** Le répertoire `lib/` regroupe la logique transversale et les configurations (validation, cache, métadonnées). Des hooks personnalisés dans `hooks/` gèrent des optimisations de performance côté client (pré-chargement intelligent).
*   **Infrastructure & DevOps :** Le déploiement est fortement intégré avec **Vercel**, qui fournit le **CI/CD** automatique, l'hébergement sans serveur et des outils de monitoring (Analytics, Speed Insights). La gestion des secrets se fait via des variables d'environnement.
*   **Qualité & Tests :** Le projet est configuré avec **TypeScript** pour la sécurité des types, **ESLint** et **Prettier** pour la qualité du code, et **Jest** pour les tests unitaires et d'intégration. Un audit de sécurité des dépendances (`audit-ci`) est également en place.

# Identification du type de rendu (SSR, SSG, ISR, RSC)

*   **RSC (React Server Components) :** C'est le type de rendu prédominant et par défaut grâce à l'utilisation de l'App Router de Next.js. Toutes les pages dans `app/` (comme `app/page.tsx`) sont des Server Components par défaut, ce qui signifie que le rendu HTML est généré sur le serveur et envoyé au client avec un minimum de JavaScript.
*   **SSR (Server-Side Rendering) :** Peut être utilisé pour les pages qui nécessitent des données dynamiques à chaque requête. Sans `revalidate` ou `generateStaticParams`, les pages sont générées à la demande sur le serveur. Les API Route Handlers (`app/api/`) sont des fonctions sans serveur qui exécutent du code côté serveur.
*   **SSG (Static Site Generation) :** Peut être implicite si des pages Server Components ne sont pas rendues dynamiquement et n'ont pas de données changeantes, elles seront statiquement optimisées au build. Les chemins `/legal` pourraient être des exemples de pages SSG.
*   **ISR (Incremental Static Regeneration) :** La configuration `revalidate` dans `layout.tsx` ou `page.tsx` permettrait d'activer l'ISR, mais n'est pas visible dans les fichiers principaux analysés. Cela pourrait être configuré au niveau des pages individuelles.

# Vérification de la cohérence App Router

L'adoption de l'App Router est très cohérente et bien exécutée :
*   Utilisation de `app/layout.tsx` pour le layout racine partagé et `app/page.tsx` pour les pages de route.
*   Les **Server Components** sont la norme, avec l'utilisation explicite de `'use client'` pour les composants interactifs.
*   Les **Route Handlers** (`app/api/route.ts`) sont correctement utilisés pour les endpoints API.
*   Les métadonnées sont gérées via l'API de métadonnées basée sur le fichier.
*   L'intégration de `next/image`, `next/font`, et des outils de performance Vercel s'aligne parfaitement avec les recommandations de l'App Router.
