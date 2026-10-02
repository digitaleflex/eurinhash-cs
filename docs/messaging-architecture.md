# Eurin Hash — Messaging Architecture v1.0

## Purpose

This document translates the verbal brand system into a page-level messaging system.

**Message → Explanation → Proof → Action**

Every meaningful screen has one dominant idea. Supporting information reinforces it rather than competing with it.

## Global hierarchy

### Primary message

**Eurin Hash is a software architect and digital entrepreneur who designs, builds and secures reliable digital systems.**

### Secondary message

The work sits at the intersection of software architecture, applied AI, cybersecurity, cloud infrastructure and digital product engineering.

### Method

**Understand → Simplify → Architect → Build → Secure → Validate**

### Proof

Use real projects, documented decisions, public repositories or demos when appropriate, measured results when available, technical writing, and verifiable experience or credentials.

## Page architecture

### Homepage `/`

**Dominant idea:** who Eurin is, what he builds, and why the work is credible.

Order: Identity + value → Proof → Expertise → Selected realizations → Professional approach → Insights → Final CTA.

Primary CTA: **Voir les réalisations**

Secondary CTA: **Discuter d’un projet**

Questions to answer: Who is Eurin? What has he built? Does he understand product and business constraints? Can the work be inspected?

### Services `/services`

**Dominant idea:** Eurin helps solve concrete technical and product problems.

Order: Problem → Intervention → Deliverables → Value → Proof → Engagement.

Primary CTA: **Discuter d’un besoin**

Secondary CTA: **Voir une réalisation**

Services must be organized around problems and outcomes, not technology catalogs.

### Work index `/realisations`

**Dominant idea:** the portfolio is evidence of how Eurin thinks and builds.

Each project exposes problem, role, intervention, and result/status.

Primary CTA: **Lire l’étude de cas**

Secondary CTA: **Voir le projet**

### Case study `/realisations/[slug]`

**Dominant idea:** this is how Eurin approaches a real technical problem.

Order: Context → Problem → Objective → Constraints → Decisions → Architecture → Implementation → Result → Learning → Evidence → Next action.

Primary CTA depends on context: **Voir le projet**, **Voir le dépôt**, or **Discuter d’un problème similaire**.

Claims must remain close to the evidence that supports them.

### About `/about`

**Dominant idea:** understand the person behind the work and the way he approaches engineering.

Order: Current identity → Problems he likes solving → Working principles → Relevant background → Evidence → Current direction → Contact.

Primary CTA: **Discuter d’un projet**

Secondary CTA: **Voir les réalisations**

Avoid a complete life story and exhaustive technology lists.

### Insights `/blog`

**Dominant idea:** Eurin explains how he thinks about technology and engineering.

Order: Editorial positioning → Featured insight → Themes → Recent articles → Related work.

Primary CTA: **Lire l’article**

### Article `/blog/[slug]`

**Dominant idea:** one article answers one meaningful question.

Order: Title → Why it matters → Context → Analysis → Evidence → Conclusion → Related reading.

### Contact `/contact`

**Dominant idea:** starting a conversation is simple and predictable.

Order: Who should contact Eurin → Useful information → What happens next → Form → Privacy.

Primary CTA: **Envoyer le message**

Avoid unnecessary fields and unsupported response-time promises.

### Events and resources

Keep `/evenements` and `/ressources` only if they are actively maintained and contain useful content. An empty destination should not remain public merely to complete navigation.

### Legal

`/legal/*` is transparency and legal information. No marketing language.

## Homepage section jobs

### Hero

Identity + value. The visitor should understand who Eurin is, what he does, and his professional territory within approximately five seconds.

Copy direction: **Je conçois, construis et sécurise des systèmes numériques fiables.**

Supporting line: **Software Architect · Digital Entrepreneur · AI & Cybersecurity**

Exact final copy belongs to #58.

### Proof / Results

Answer: **Qu’est-ce qui permet de croire cette promesse ?**

### Expertise

Hierarchy: **Problem → capability → domain → technology**.

Never turn the stack into the primary value proposition.

### Selected Work

Show **context → intervention → result/status**.

### Professional Approach

Show: **Comprendre → Simplifier → Concevoir → Construire → Sécuriser → Valider**.

### Insights

Answer: **Comment Eurin raisonne-t-il sur les problèmes techniques ?**

### Final CTA

Convert an informed visitor after identity, work, and credibility are understood.

## Repetition rules

Repeat consistently: core identity, architecture-centered positioning, reliable/maintainable/secure systems, evidence-driven engineering.

Do not repeat verbatim: the hero promise, the same CTA, the same adjectives, or the same project description.

**Same idea, different job:** Hero = what Eurin does. Case study = how he does it. Proof = evidence. About = why he works this way. Services = where the capability is useful.

## Proof proximity

High-risk claims such as quantified results, client outcomes, security claims, performance claims, and scale claims require nearby contextual proof.

Never use a proof section to retroactively justify an exaggerated hero claim.

## Objection architecture

Homepage: Who are you? What have you built? What makes the approach credible? Can I inspect evidence?

Services: What exactly do you do? Is it relevant? What do I receive? What happens next?

Case study: Is this real? What was your role? What constraints existed? What changed? What evidence exists?

About: What is your current focus? Why trust the approach? What experience supports it?

Contact: Is my request appropriate? What should I provide? What happens after submission?

## CTA hierarchy

| Context | Primary | Secondary |
|---|---|---|
| Homepage | Voir les réalisations | Discuter d’un projet |
| Services | Discuter d’un besoin | Voir une réalisation |
| Work index | Lire l’étude de cas | Voir le projet |
| Case study | Voir le projet / dépôt | Discuter d’un problème similaire |
| About | Discuter d’un projet | Voir les réalisations |
| Blog | Lire l’article | — |
| Contact | Envoyer le message | — |

CTA labels must describe the actual destination or action.

## Cognitive-load rules

One dominant idea per screen. Use progressive disclosure: essential meaning → useful explanation → technical depth → evidence.

Prefer concrete architecture, decisions, constraints, results, and artifacts over adjectives such as revolutionary, limitless, or world-class.

## Audience layers

Decision-maker: problem, outcome, credibility, risk reduction, next action.

Technical peer: architecture, trade-offs, implementation, evidence, repository/demo.

Recruiter or collaborator: identity, scope, experience, projects, contact.

Student or learner: explanations, technical writing, reasoning, resources.

The first layer remains understandable to non-specialists; deeper pages provide technical depth.

## Navigation

Preferred labels: **Réalisations, Services, À propos, Insights, Contact**.

Avoid marketing labels such as Expertise, Solutions, Innovation, Vision, or Ecosystem unless they correspond to real destinations.

## Anti-patterns

Do not allow multiple hero messages, mechanically repeated CTAs, proof separated from claims, metrics without context, technology lists replacing value propositions, fake urgency, fake scarcity, fake social proof, exaggerated security claims, invented outcomes, empty destinations, or sections added only because competitors have them.

## Relationship to the copy issues

#56 defines how Eurin speaks.

#57 defines what each page communicates and in what order.

#58 applies this to the homepage.
#59 applies it to services.
#60 applies it to case studies.
#61 applies it to About.
#62 defines the proof system.
#63 applies the system to CTAs and microcopy.
#64 checks cognitive load and ethical persuasion.
#65 aligns content with search intent.
#66 applies the system to editorial content.
#67 performs final cross-site QA.

## Definition of Done

- Every public page has one dominant message.
- Supporting messages have explicit roles.
- Claims are mapped to proof.
- Relevant objections are identified.
- Primary and secondary CTAs are defined.
- Homepage sections have distinct communication jobs.
- Repetition is intentional.
- Technical depth is progressively disclosed.
- Navigation labels describe destinations.
- Empty or speculative pages can be removed.
- #58–#67 can be executed without inventing a new messaging direction.
