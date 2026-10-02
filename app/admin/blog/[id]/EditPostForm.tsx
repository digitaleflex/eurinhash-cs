'use client';

import type { Prisma } from '@prisma/client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Save, ArrowLeft, Eye, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Editor from '@/components/blog/Editor';
import { updatePost, deletePost } from '../actions';

export type EditablePost = Prisma.PostGetPayload<{ include: { category: true } }>;

interface EditPostFormProps {
  post: EditablePost;
}

export default function EditPostForm({ post }: EditPostFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [content, setContent] = useState(post.content || '');
  const [title, setTitle] = useState(post.title || '');
  const [slug, setSlug] = useState(post.slug || '');
  const [thumbnail, setThumbnail] = useState(post.thumbnail || '');
  const [isUploading, setIsUploading] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    // Only auto-generate slug if it's a new post or if the user explicitly wants to (we keep it manual here to avoid breaking existing SEO)
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const response = await fetch(`/api/blog/upload?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      const blob = await response.json();
      setThumbnail(blob.url);
    } catch (error) {
      console.error('Thumbnail upload failed:', error);
      alert('Erreur lors de l\'upload de la miniature.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      formData.set('content', content);
      formData.set('thumbnail', thumbnail);
      await updatePost(post.id, formData);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      alert('Une erreur est survenue lors de la mise à jour de l\'article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ? Cette action est irréversible.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deletePost(post.id);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Une erreur est survenue lors de la suppression de l\'article.');
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase">
              Modifier l'Article
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Mise à jour de : <span className="text-accent font-bold">{post.title}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            className="gap-2 text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
            disabled={isDeleting || isSubmitting}
          >
            <Trash2 className="h-4 w-4" /> 
            {isDeleting ? 'Suppression...' : 'Supprimer'}
          </Button>
          <Link href={`/blog/${post.slug}`} target="_blank">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" /> Voir en ligne
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-3">
        {/* Main Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/60 bg-card/50 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Contenu de l'article
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de l'article</Label>
                <Input
                  id="title"
                  name="title"
                  required
                  value={title}
                  onChange={handleTitleChange}
                  className="text-lg font-bold py-6"
                />
              </div>

              <div className="space-y-2">
                <Label>Corps de l'article</Label>
                <Editor content={content} onChange={setContent} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card className="border-border/60 bg-card/50 shadow-sm sticky top-[calc(7rem+env(safe-area-inset-top))]">
            <CardHeader>
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Paramètres de publication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image de mise en avant */}
              <div className="space-y-2">
                <Label>Image de mise en avant</Label>
                <div className="aspect-video w-full rounded-md border-2 border-dashed border-border flex flex-col items-center justify-center overflow-hidden relative group">
                  {thumbnail ? (
                    <>
                      <img src={thumbnail} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button 
                          type="button" 
                          variant="ghost" 
                          className="text-white"
                          onClick={() => setThumbnail('')}
                        >
                          Changer
                        </Button>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center p-4">
                      <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                        <Plus className="h-5 w-5 text-accent" />
                      </div>
                      <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter">
                        {isUploading ? 'Chargement...' : 'Uploader une image'}
                      </span>
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*" 
                        onChange={handleThumbnailUpload}
                        disabled={isUploading}
                      />
                    </label>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="slug">Slug URL</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="url-de-l-article"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Extrait (Meta Description)</Label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  rows={4}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Bref résumé..."
                  defaultValue={post.excerpt}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Statut</Label>
                <select 
                  name="published" 
                  defaultValue={post.published ? 'true' : 'false'}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="false">Brouillon</option>
                  <option value="true">Publié</option>
                </select>
              </div>

              <Button 
                type="submit" 
                className="w-full gap-2 font-bold py-6" 
                disabled={isSubmitting || isDeleting}
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? 'Mise à jour...' : 'Enregistrer les modifications'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
