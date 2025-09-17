# Système de Newsletter EurinHash

## Vue d'ensemble

Ce système complet de gestion des newsletters permet aux utilisateurs de s'inscrire à différents types de contenus et offre une gestion avancée des abonnements.

## Types de Newsletters

- **GENERAL** : Newsletter générale avec les actualités EurinHash
- **FORMATION** : Formations et certifications disponibles
- **CYBERSECURITY** : Actualités et conseils en cybersécurité
- **CLOUD** : Technologies et solutions cloud
- **EARLY_ACCESS** : Accès anticipé aux nouveautés
- **ENTERPRISE** : Solutions dédiées aux entreprises
- **DEVELOPER** : Ressources et outils pour développeurs

## Composants

### NewsletterForm
Formulaire complet d'inscription avec :
- Sélection multiple des newsletters
- Informations personnelles optionnelles
- Consentements RGPD
- Validation côté client et serveur

```tsx
<NewsletterForm
  source={SubscriptionSource.ABOUT_PAGE}
  defaultNewsletters={[NewsletterType.EARLY_ACCESS]}
  showPersonalInfo={true}
/>
```

### QuickNewsletterSignup
Formulaire d'inscription rapide pour footer/popup :
- Inscription simple avec email
- Abonnement automatique aux newsletters principales
- Interface minimaliste

```tsx
<QuickNewsletterSignup
  source={SubscriptionSource.FOOTER}
  placeholder="Votre email"
  buttonText="S'inscrire"
/>
```

## API Endpoints

### POST /api/newsletter/subscribe
Inscription à une ou plusieurs newsletters
```json
{
  "email": "user@example.com",
  "firstName": "John",
  "newsletters": ["GENERAL", "EARLY_ACCESS"],
  "gdprConsent": true,
  "source": "ABOUT_PAGE"
}
```

### POST /api/newsletter/unsubscribe
Désabonnement d'une newsletter spécifique ou total
```json
{
  "email": "user@example.com",
  "newsletterType": "GENERAL" // optionnel
}
```

### GET /api/newsletter/verify?token=xxx
Vérification d'email avec token

## Base de Données

### Modèles Principaux

1. **Subscriber** : Informations de l'abonné
2. **NewsletterSubscription** : Abonnements aux différentes newsletters
3. **SubscriberInteraction** : Tracking des interactions
4. **EmailCampaign** : Campagnes d'emailing
5. **EmailTemplate** : Templates d'emails

### Relations
- Un Subscriber peut avoir plusieurs NewsletterSubscription
- Un Subscriber peut avoir plusieurs SubscriberInteraction
- Cascade delete pour maintenir l'intégrité

## Fonctionnalités

### ✅ Implémentées
- Inscription multiple aux newsletters
- Validation des données
- Consentements RGPD
- Tracking des sources d'inscription
- Désabonnement sélectif
- Vérification d'email
- Pages de confirmation

### 🚧 À Développer
- Envoi d'emails de confirmation
- Interface d'administration
- Statistiques avancées
- Segmentation des audiences
- A/B testing des campagnes
- Templates d'emails personnalisés

## Utilisation

### 1. Migration de la base
```bash
npx prisma migrate dev
npx prisma generate
```

### 2. Intégration dans une page
```tsx
import NewsletterForm from '@/app/components/NewsletterForm';
import { NewsletterType, SubscriptionSource } from '@prisma/client';

// Dans votre composant
<NewsletterForm
  source={SubscriptionSource.HOMEPAGE}
  defaultNewsletters={[NewsletterType.GENERAL]}
/>
```

### 3. Configuration des variables d'environnement
```env
MONGODB_URI=your_mongodb_connection_string
```

## Sécurité

- Validation stricte des emails
- Protection contre le spam
- Consentements RGPD obligatoires
- Tokens de vérification sécurisés
- Sanitisation des données

## Performance

- Index sur les champs fréquemment recherchés
- Pagination pour les listes importantes
- Cache des statistiques
- Optimisation des requêtes

## Conformité RGPD

- Consentement explicite requis
- Droit à l'oubli (suppression des données)
- Portabilité des données
- Transparence sur l'utilisation des données