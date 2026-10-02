# ADR — Content Hub : domaine Project / Media / SEO

- **Statut :** Accepté
- **Date :** 2026-10-02
- **Contexte :** Le site EurinHash doit pouvoir publier et enrichir des réalisations professionnelles sans modifier le code source.
- **Décision :** Les réalisations deviennent un domaine éditorial PostgreSQL/Prisma explicite, composé de `Project`, `ProjectSection`, `Media`, `ProjectMedia` et `SeoMetadata`.
- **Workflow :** `DRAFT → REVIEW → PUBLISHED → ARCHIVED`.
- **Contenu :** Les sections sont typées pour conserver une structure de case study stable. Aucun page builder générique, champ JSON libre ou colonne par technologie n'est introduit.
- **Médias :** `ProjectMedia` est une relation explicite afin de conserver l'ordre et les légendes. Le média de couverture est une relation dédiée.
- **SEO :** `SeoMetadata` est optionnel et lié en 1:1 à un projet.
- **Catégorisation :** `category` reste une chaîne simple dans cette première version. Une taxonomie dédiée sera introduite uniquement si un second cas d'usage concret le justifie.
- **Compatibilité :** Cette décision respecte la frontière définie par l'architecture Git/MDX vs PostgreSQL documentée dans l'issue #41 : le contenu éditorial administrable et nécessitant des relations/publishing va dans PostgreSQL, tandis que les structures purement statiques restent dans le code ou le dépôt de contenu approprié.
- **Sécurité :** La migration est additive et ne modifie aucune donnée historique des modèles Better Auth, blog, événements ou contact.
