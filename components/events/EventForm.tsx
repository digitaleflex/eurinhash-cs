'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { createEvent, updateEvent } from '@/lib/actions/events';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Save, X } from 'lucide-react';
import type { Event } from '@prisma/client';

interface EventFormProps {
  initialData?: Event;
}

export function EventForm({ initialData }: EventFormProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [thumbnailUrl, setThumbnailUrl] = React.useState(initialData?.thumbnail || '');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      date: new Date(formData.get('date') as string),
      type: formData.get('type') as string,
      platform: formData.get('platform') as string,
      eventUrl: formData.get('eventUrl') as string,
      registrationLink: formData.get('registrationLink') as string || undefined,
      thumbnail: formData.get('thumbnail') as string || undefined,
      isFeatured: formData.get('isFeatured') === 'on',
      status: (formData.get('status') || 'upcoming') as Event['status'],
    };

    try {
      if (initialData) {
        await updateEvent(initialData.id, data);
      } else {
        await createEvent(data);
      }
      router.push('/admin/evenements');
      router.refresh();
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border/60 bg-card/50 shadow-lg max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-black uppercase tracking-tight">
          {initialData ? 'Modifier l\'événement' : 'Nouvel Événement'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Titre</label>
              <input
                name="title"
                defaultValue={initialData?.title}
                required
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                placeholder="Ex: Live Architecture Microservices"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
              <textarea
                name="description"
                defaultValue={initialData?.description}
                required
                rows={4}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all resize-none"
                placeholder="Détails de l'événement..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Date & Heure</label>
                <input
                  name="date"
                  type="datetime-local"
                  defaultValue={initialData?.date ? new Date(initialData.date).toISOString().slice(0, 16) : ''}
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Type</label>
                <select
                  name="type"
                  defaultValue={initialData?.type || 'Live'}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                >
                  <option>Live</option>
                  <option>Webinar</option>
                  <option>Conférence</option>
                  <option>Atelier</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Plateforme</label>
                <select
                  name="platform"
                  defaultValue={initialData?.platform || 'YouTube'}
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                >
                  <option>YouTube</option>
                  <option>TikTok</option>
                  <option>Google Meet</option>
                  <option>Substack</option>
                  <option>Meetup</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">URL de l'événement</label>
                <input
                  name="eventUrl"
                  type="url"
                  defaultValue={initialData?.eventUrl}
                  required
                  className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                  placeholder="https://youtube.com/live/..."
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground transition-all">Image de couverture (URL)</label>
                <span className="text-[10px] text-accent font-bold uppercase tracking-tighter">Format recommandé : 1280x720 (16:9)</span>
              </div>
              <input
                name="thumbnail"
                defaultValue={initialData?.thumbnail ?? undefined}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
                placeholder="https://images.unsplash.com/photo-..."
              />
              {thumbnailUrl && (
                <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-border/40 bg-accent/5 mt-2 transition-all animate-in zoom-in-95 duration-300">
                  <img src={thumbnailUrl} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>

            <div className="space-y-2 pt-2">
              <label htmlFor="status" className="text-sm font-bold text-foreground">
                Statut de l'événement
              </label>
              <select
                id="status"
                name="status"
                defaultValue={initialData?.status ?? 'upcoming'}
                className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all"
              >
                <option value="upcoming">À venir</option>
                <option value="past">Passé</option>
                <option value="canceled">Annulé</option>
              </select>
              <p className="text-xs text-muted-foreground">
                Un événement « à venir » reste mis en avant sur la page publique et alimente le compte à rebours.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="isFeatured"
                name="isFeatured"
                defaultChecked={initialData?.isFeatured}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent bg-background"
              />
              <label htmlFor="isFeatured" className="text-sm font-bold text-foreground cursor-pointer">
                Mettre en avant cet événement
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-border/40">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
              className="text-muted-foreground hover:bg-muted font-bold"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent/90 text-white font-bold h-11 px-8 min-w-[120px]"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {initialData ? 'Mettre à jour' : 'Créer'}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
