# Eurin Hash — Portfolio professionnel

Portfolio personnel d'Eurin Hash. Objectif : présenter son positionnement, ses compétences, ses réalisations et ses contenus techniques, puis faciliter la prise de contact.

## Principes de la nouvelle base

- Site public, sans comptes utilisateurs ni authentification.
- Pas de CMS personnalisé ni de tableau de bord dans la V1.
- Pas de base de données par défaut : projets et articles seront versionnés dans Git si cela suffit au rythme de publication.
- Next.js App Router, TypeScript et Tailwind CSS conservés comme socle, sous réserve de l'audit des dépendances.
- Priorité à la clarté du positionnement, aux preuves professionnelles, à l'accessibilité, au SEO et à la performance.
- Le formulaire de contact reste minimal et protégé s'il est conservé.

## Pages prévues

- Accueil
- À propos / parcours
- Projets et études de cas
- Articles techniques (facultatif)
- Contact
- Pages légales nécessaires
- Page 404

## Développement

Prérequis : Node.js LTS et pnpm.

```bash
pnpm install
pnpm dev
```

Les scripts exacts disponibles sont ceux du `package.json`. La configuration et les dépendances doivent être simplifiées au fil de l'audit ; ne pas supposer que les anciennes variables de base de données ou d'authentification sont encore nécessaires.

## Documentation de la remise à plat

- [Roadmap simplifiée](./ROADMAP.md)
- [Architecture simplifiée](./docs/ARCHITECTURE-SIMPLIFIEE.md)

## Règle de périmètre

Aucune fonctionnalité ne sera ajoutée uniquement parce qu'elle est techniquement possible. Elle doit servir directement la présentation du travail ou la prise de contact.
