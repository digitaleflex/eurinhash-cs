# EurinHash - Hub Central de l'Innovation Digitale

Ce projet est la page "Coming Soon" du site [eurinhash.com](https://eurinhash.com), dédiée à l'innovation digitale : cybersécurité, cloud, IA, formation et architecture de solutions.

## Fonctionnalités principales
- Compte à rebours avant lancement
- Formulaire d'inscription à la newsletter (avec gestion des doublons)
- Popups stylisés de succès et d'erreur
- Design moderne, responsive, mode sombre
- Données stockées de façon sécurisée (MongoDB via Prisma)

## Technologies utilisées
- [Next.js 14](https://nextjs.org/)
- [React 18](https://react.dev/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Prisma ORM](https://www.prisma.io/)
- [MongoDB Atlas](https://www.mongodb.com/atlas)

## Installation locale

1. **Cloner le dépôt**
```bash
git clone <repo-url>
cd eurinhash-cs
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer l'environnement**
Créer un fichier `.env` à la racine avec :
```env
MONGODB_URI="mongodb+srv://<user>:<password>@cluster0.mongodb.net/eurinhash?retryWrites=true&w=majority"
NEXT_PUBLIC_SITE_URL="https://eurinhash.com"
NODE_ENV="production"
```

4. **Générer le client Prisma**
```bash
npx prisma generate
```

5. **Pousser le schéma Prisma**
```bash
npx prisma db push
```

6. **Lancer le serveur local**
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## Déploiement en production

- Le site est déployé sur [eurinhash.com](https://eurinhash.com)
- Utilisez un hébergeur compatible Next.js (Vercel, OVH, etc.)
- Configurez les variables d'environnement de production (notamment `MONGODB_URI`)
- Assurez-vous que le fichier `.env` n'est **jamais** commité (il est dans `.gitignore`)

## Sécurité & RGPD
- Les emails sont uniques et stockés chiffrés dans MongoDB
- Consentement explicite requis pour l'inscription
- Aucune donnée partagée avec des tiers
- Droit de suppression/modification sur demande

## Personnalisation
- Les couleurs, polices et textes sont facilement modifiables dans `tailwind.config.js` et `app/globals.css`
- Les popups sont dans `app/components/SuccessAlert.tsx` et `app/components/ErrorAlert.tsx`

## Contact
Pour toute question ou suggestion : contact@eurinhash.com

---

© 2024 EurinHash. Tous droits réservés.
