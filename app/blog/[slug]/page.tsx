import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import Link from "next/link";

// Cette fonction sera utilisée pour générer les pages statiques
export async function generateStaticParams() {
  // Tu pourras remplacer ceci par une vraie base de données ou CMS
  return [
    { slug: 'securiser-infrastructure-cloud' },
    { slug: 'docker-traefik-deploiements' },
    { slug: 'nextjs-15-nouveautes' },
  ];
}

// Données d'exemple - tu pourras les remplacer par une vraie source de données
const getArticle = (slug: string) => {
  const articles = {
    'securiser-infrastructure-cloud': {
      title: "Les meilleures pratiques pour sécuriser une infrastructure cloud",
      date: "2024-12-15",
      readTime: "8 min",
      category: "Cloud & Sécurité",
      content: `
# Introduction

La sécurité dans le cloud est un enjeu majeur pour toute organisation moderne. Dans cet article, nous explorerons les meilleures pratiques pour protéger efficacement votre infrastructure cloud.

## 1. Principe de moindre privilège

Le principe de moindre privilège consiste à accorder uniquement les permissions minimales nécessaires à chaque utilisateur ou service.

### Configuration des rôles IAM

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:GetObject"
      ],
      "Resource": "arn:aws:s3:::mon-bucket/*"
    }
  ]
}
\`\`\`

## 2. Chiffrement des données

### En transit
- Utilisation systématique de HTTPS/TLS
- Configuration de certificats SSL valides
- Mise en place de HSTS

### Au repos
- Chiffrement des bases de données
- Chiffrement des volumes de stockage
- Gestion sécurisée des clés

## 3. Monitoring et alertes

La surveillance continue est essentielle pour détecter rapidement les anomalies.

## Conclusion

La sécurité cloud nécessite une approche multicouche et une vigilance constante. Ces pratiques constituent une base solide pour protéger vos infrastructures.
      `
    },
    'docker-traefik-deploiements': {
      title: "Docker et Traefik : Le duo parfait pour vos déploiements",
      date: "2024-12-10",
      readTime: "12 min",
      category: "DevOps",
      content: `
# Docker et Traefik : Une combinaison puissante

Dans cet article, nous allons voir comment utiliser Docker avec Traefik pour créer une infrastructure de déploiement robuste et scalable.

## Pourquoi Traefik ?

Traefik est un reverse proxy moderne qui s'intègre parfaitement avec Docker. Il offre :

- Auto-découverte des services
- Gestion automatique des certificats SSL
- Load balancing intégré
- Interface web intuitive

## Configuration de base

### docker-compose.yml

\`\`\`yaml
version: '3.8'

services:
  traefik:
    image: traefik:v3.0
    command:
      - "--api.insecure=true"
      - "--providers.docker=true"
      - "--entrypoints.web.address=:80"
    ports:
      - "80:80"
      - "8080:8080"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
\`\`\`

## Déploiement d'une application

\`\`\`yaml
  app:
    image: nginx:alpine
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.app.rule=Host(\`monapp.local\`)"
\`\`\`

## Conclusion

Cette configuration vous permet de déployer facilement vos applications avec un routage automatique et sécurisé.
      `
    },
    'nextjs-15-nouveautes': {
      title: "Next.js 15 : Les nouveautés qui changent la donne",
      date: "2024-12-05",
      readTime: "6 min",
      category: "Développement",
      content: `
# Next.js 15 : Révolution ou évolution ?

Next.js 15 apporte son lot de nouveautés intéressantes. Analysons ensemble les changements les plus significatifs.

## 1. Turbopack en stable

Turbopack, le successeur de Webpack, est maintenant stable et offre :

- Compilation jusqu'à 10x plus rapide
- Hot reload quasi-instantané
- Meilleure gestion des dépendances

## 2. App Router amélioré

### Nouvelles fonctionnalités

- Streaming amélioré
- Meilleur support des layouts
- Optimisations de performance

### Exemple d'utilisation

\`\`\`tsx
// app/dashboard/page.tsx
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<Loading />}>
        <DataComponent />
      </Suspense>
    </div>
  );
}
\`\`\`

## 3. Optimisations d'images

Le composant Image a été amélioré avec :

- Lazy loading plus intelligent
- Formats WebP et AVIF par défaut
- Meilleure gestion des placeholders

## Conclusion

Next.js 15 confirme sa position de leader dans l'écosystème React avec des améliorations significatives de performance et d'expérience développeur.
      `
    }
  };

  return articles[slug as keyof typeof articles] || null;
};

export default function BlogArticle({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);

  if (!article) {
    return (
      <main className="relative isolate">
        <section className="mx-auto max-w-4xl px-6 md:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl font-bold mb-6">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            L'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-6 py-3 text-sm font-medium transition hover:shadow-[0_10px_40px_-10px] hover:shadow-foreground/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="relative isolate">
      <article className="mx-auto max-w-4xl px-6 md:px-8 py-24 md:py-32">
        {/* Navigation de retour */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
        </div>

        {/* En-tête de l'article */}
        <header className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full font-medium">
              {article.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(article.date).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </header>

        {/* Image de couverture */}
        <div className="h-64 md:h-96 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 mb-12 flex items-center justify-center">
          <Tag className="h-16 w-16 text-accent/40" />
        </div>

        {/* Contenu de l'article */}
        <div className="prose prose-lg max-w-none">
          <div 
            className="text-foreground"
            dangerouslySetInnerHTML={{ 
              __html: article.content
                .split('\n')
                .map(line => {
                  if (line.startsWith('# ')) {
                    return `<h1 class="text-3xl font-bold mt-12 mb-6">${line.slice(2)}</h1>`;
                  }
                  if (line.startsWith('## ')) {
                    return `<h2 class="text-2xl font-semibold mt-10 mb-4">${line.slice(3)}</h2>`;
                  }
                  if (line.startsWith('### ')) {
                    return `<h3 class="text-xl font-semibold mt-8 mb-3">${line.slice(4)}</h3>`;
                  }
                  if (line.startsWith('```')) {
                    return line.includes('```') && !line.startsWith('```') ? '</code></pre>' : '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-6"><code>';
                  }
                  if (line.trim() === '') {
                    return '<br>';
                  }
                  return `<p class="mb-4 leading-relaxed">${line}</p>`;
                })
                .join('')
            }}
          />
        </div>

        {/* Navigation vers d'autres articles */}
        <div className="mt-16 pt-8 border-t border-foreground/10">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Vous avez aimé cet article ?</h3>
            <p className="text-muted-foreground mb-6">
              Découvrez d'autres articles sur des sujets similaires.
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-medium text-foreground transition hover:border-accent hover:text-accent"
            >
              Voir tous les articles
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}