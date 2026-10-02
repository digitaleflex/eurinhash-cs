# Eurin Hash — Architecture Reset

## Product boundary

This repository is the personal digital identity of Eurin Hash.

The website exists to:
1. communicate identity and positioning;
2. demonstrate credible work and engineering decisions;
3. publish a small body of first-hand writing;
4. provide a direct contact path;
5. provide a private administrative surface only where content operations genuinely require it.

It is not a SaaS product, social network, public CMS, LMS, CRM, community platform, API marketplace, or technology showcase.

## Public information architecture

- / — executive introduction and selected proof
- /services — concise capabilities
- /realisations — selected work and case studies
- /blog — first-hand writing
- /blog/[slug] — article
- /evenements — only for real, active events
- /ressources — only when there is a maintained resource collection
- /contact — direct contact
- /legal/* — legal and privacy information

## Private surface

- /admin/* — authenticated content operations
- /api/* — only endpoints required by real product behavior

Public user accounts, social interactions, generic dashboards and speculative CRUD must not be added.

## Data boundary

Keep a database model only when a demonstrated feature requires persistence.

Current candidates:
- User — admin authentication
- Post — editorial content
- Event — only while events are an active publishing need
- ContactMessage — contact workflow

Models for comments, public profiles, social reactions, generic analytics, or speculative platform features require an explicit product decision before being retained.

## Engineering rules

- Server Components by default.
- Client Components only for genuine browser interactivity.
- One canonical Prisma access path.
- One server-side authorization primitive.
- Zod validation at every mutation boundary.
- No unauthenticated mutation endpoint.
- No user-controlled storage paths.
- No global feature framework without a second concrete use case.
- No decorative complexity whose cost is not justified by user value.

## Execution order

1. Security boundaries.
2. Remove legacy/duplicate architecture.
3. Simplify domain and data model.
4. Normalize public information architecture.
5. Establish visual identity.
6. Improve accessibility, SEO and performance.
7. Add only content that strengthens positioning and proof.
