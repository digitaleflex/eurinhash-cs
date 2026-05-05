import prismaApi from '@/lib/prisma-api';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

const prisma = prismaApi;

export const metadata = {
  title: 'Blog Tech | Eurin Hash CS',
  description: 'Exploration approfondie de l\'architecture logicielle, du cloud et de la cybersécurité.',
};

export default async function BlogPage() {
  const posts = await (prisma as any).post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { category: true },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <header className="mb-20 text-center">
        <h1 className="text-6xl font-black uppercase tracking-tighter mb-4">
          Insights <span className="text-accent">Techniques</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Analyses, tutoriels et réflexions sur les infrastructures de demain.
        </p>
      </header>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: any) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="group">
            <Card className="border-none bg-transparent overflow-hidden h-full">
              <div className="aspect-video relative overflow-hidden rounded-2xl mb-6 bg-muted">
                {post.thumbnail ? (
                  <img 
                    src={post.thumbnail} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Eurin Hash Insights
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-background/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-border/50">
                    {post.category?.name || 'Tech'}
                  </span>
                </div>
              </div>
              <CardContent className="p-0">
                <h2 className="text-2xl font-bold mb-3 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                  <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                  <span>•</span>
                  <span>{post.readingTime} min lecture</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-40 border-2 border-dashed border-border rounded-3xl">
          <p className="text-muted-foreground italic">En cours de rédaction...</p>
        </div>
      )}
    </div>
  );
}
