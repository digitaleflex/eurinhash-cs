import { Metadata } from 'next';
import prismaApi from '@/lib/prisma-api';
import { notFound } from 'next/navigation';

const prisma = prismaApi;

// Génération dynamique des métadonnées pour le SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await (prisma as any).post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return { title: 'Article non trouvé' };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await (prisma as any).post.findUnique({
    where: { slug: params.slug },
    include: {
      author: true,
      category: true,
    },
  });

  if (!post || !post.published) {
    notFound();
  }

  // JSON-LD pour les données structurées (Google adore ça)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    datePublished: post.publishedAt?.toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <article className="prose prose-invert lg:prose-xl max-w-none">
        <header className="mb-12 not-prose">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-accent font-bold uppercase tracking-widest text-xs">
              {post.category?.name || 'Technologie'}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground text-xs">
              {post.readingTime} min de lecture
            </span>
          </div>
          <h1 className="text-5xl font-black mb-6 leading-tight">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-accent pl-6">
            {post.excerpt}
          </p>
        </header>

        {post.thumbnail && (
          <img 
            src={post.thumbnail} 
            alt={post.title} 
            className="w-full aspect-video object-cover rounded-2xl mb-12 shadow-2xl"
          />
        )}

        <div 
          className="content-area"
          dangerouslySetInnerHTML={{ __html: post.content }} 
        />
      </article>
    </div>
  );
}
