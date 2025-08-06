# Composants Réutilisables EurinHash

Ce dossier contient tous les composants réutilisables pour éviter la duplication de code et maintenir une cohérence visuelle.

## Structure

```
components/
├── ui/                 # Composants de base (Button, Card, etc.)
├── layout/            # Composants de mise en page
├── common/            # Composants métier réutilisables
└── examples/          # Exemples d'utilisation
```

## Composants UI de Base

### Button
```tsx
import { Button } from './ui';

<Button variant="primary" size="lg" icon={<span>🚀</span>}>
  Cliquez ici
</Button>
```

### Card
```tsx
import { Card } from './ui';

<Card variant="primary" hover glow>
  Contenu de la carte
</Card>
```

### Grid & Flex
```tsx
import { Grid, Flex } from './ui';

<Grid cols={3} gap="lg">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Grid>

<Flex justify="center" align="center" gap="md">
  <div>Item 1</div>
  <div>Item 2</div>
</Flex>
```

### Typography
```tsx
import { Heading, Text } from './ui';

<Heading level={1} gradient centered>
  Titre Principal
</Heading>

<Text size="lg" color="muted" centered>
  Description du contenu
</Text>
```

## Composants de Layout

### PageLayout
```tsx
import { PageLayout } from './layout';

<PageLayout containerSize="lg">
  <div>Contenu de la page</div>
</PageLayout>
```

### PageHeader
```tsx
import { PageHeader } from './layout';

<PageHeader
  title="Titre de la page"
  subtitle="Sous-titre descriptif"
  badges={[
    { text: "Nouveau", variant: "success" },
    { text: "Populaire", variant: "info" }
  ]}
/>
```

### ContentSection
```tsx
import { ContentSection } from './layout';

<ContentSection 
  title="Section Title"
  subtitle="Description de la section"
  background="gradient"
  centered
>
  <div>Contenu de la section</div>
</ContentSection>
```

## Composants Métier

### FeatureList
```tsx
import { FeatureList } from './common';

const features = [
  {
    icon: "🚀",
    title: "Performance",
    description: "Solutions ultra-rapides",
    badge: "Nouveau"
  }
];

<FeatureList features={features} columns={3} />
```

### StatsList
```tsx
import { StatsList } from './common';

const stats = [
  {
    value: "99%",
    label: "Satisfaction",
    color: "green",
    trend: "+5% ce mois"
  }
];

<StatsList stats={stats} columns={4} />
```

### CTASection
```tsx
import { CTASection } from './common';

<CTASection
  title="Prêt à commencer ?"
  description="Découvrez nos solutions"
  primaryButton={{
    text: "Démarrer",
    onClick: () => console.log("CTA clicked!")
  }}
  variant="gradient"
/>
```

## Formulaires

### Input
```tsx
import { Input } from './ui';

<Input
  type="email"
  placeholder="Votre email"
  size="lg"
  variant="primary"
  icon={<span>📧</span>}
/>
```

### Form
```tsx
import { Form } from './ui';

const fields = [
  {
    name: "email",
    type: "email",
    placeholder: "Votre email",
    required: true,
    icon: <span>📧</span>
  }
];

<Form
  fields={fields}
  onSubmit={(formData) => console.log(formData)}
  submitButton={{
    text: "Envoyer",
    icon: <span>🚀</span>
  }}
/>
```

### Modal
```tsx
import { Modal } from './ui';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Titre du modal"
  size="lg"
>
  <div>Contenu du modal</div>
</Modal>
```

## Avantages

1. **Réutilisabilité** : Évite la duplication de code
2. **Cohérence** : Design uniforme sur toute l'application
3. **Maintenabilité** : Modifications centralisées
4. **Performance** : Composants optimisés
5. **Accessibilité** : Standards respectés
6. **Flexibilité** : Props configurables

## Bonnes Pratiques

1. Utilisez les composants de base plutôt que du CSS custom
2. Préférez les props aux classes CSS directes
3. Composez les composants complexes avec les composants simples
4. Documentez les nouvelles props ajoutées
5. Testez la responsivité sur tous les écrans

## Import Simplifié

```tsx
// Au lieu de multiples imports
import Button from './ui/Button';
import Card from './ui/Card';
import Grid from './ui/Grid';

// Utilisez l'import groupé
import { Button, Card, Grid } from './ui';
```