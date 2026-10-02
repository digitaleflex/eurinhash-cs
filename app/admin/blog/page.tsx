import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  FileText, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  ExternalLink 
} from 'lucide-react';
import Link from 'next/link';
import BlogActions from './BlogActions';

export default async function BlogListPage() {
  const posts = await (prisma as any).post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      category: true,
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Gestion du Blog
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Gérez vos articles, tutoriels et études de cas.
          </p>
        </div>
        <Link href="/admin/blog/new">
          <Button className="gap-2 font-bold uppercase tracking-wider">
            <Plus className="h-4 w-4" /> Nouvel Article
          </Button>
        </Link>
      </div>

      {/* Posts Table/List */}
      <Card className="border-border/60 bg-card/50 shadow-sm overflow-hidden">
        <CardHeader className="border-b border-border/40 bg-muted/30 py-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Tous les articles ({posts.length})
            </CardTitle>
            <div className="relative w-64 hidden sm:block">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="w-full bg-background border border-input rounded-md pl-8 pr-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border/40">
            {posts.map((post: any) => (
              <div
                key={post.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-accent/5 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded bg-accent/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold leading-none">
                        {post.title}
                      </h3>
                      {post.published ? (
                        <Badge variant="default" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20 px-1">
                          Publié
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-[10px] px-1">
                          Brouillon
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground font-mono">
                      /{post.slug}
                    </p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                      <span>{post.category?.name || 'Sans catégorie'}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>

                <BlogActions post={post} />
              </div>
            ))}

            {posts.length === 0 && (
              <div className="py-20 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                <h3 className="text-lg font-bold">Aucun article</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Commencez par rédiger votre premier article technique.
                </p>
                <Link href="/admin/blog/new">
                  <Button variant="outline" className="font-bold">
                    Créer mon premier post
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
