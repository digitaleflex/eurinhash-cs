'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  User,
  Mail,
  Shield,
  Calendar,
  Loader2,
  Check,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
} from '@/components/ui/card';

interface UserData {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified: boolean;
  createdAt?: string | Date;
}

export function ProfileForm({ user, sessionCreatedAt }: { user: UserData, sessionCreatedAt?: string | Date }) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);
  const [name, setName] = React.useState(user.name || '');
  const [saveError, setSaveError] = React.useState<string | null>(null);

  const handleSave = async () => {
    if (!name.trim() || name.trim() === user.name) {
      setIsEditing(false);
      return;
    }

    setIsSaving(true);
    setSaveError(null);
    try {
      const response = await fetch('/api/dashboard/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la sauvegarde');
      }

      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error('Save error:', error);
      setSaveError('Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-12">
      {/* Profile Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Profil</h2>
          <div className="h-px flex-1 bg-border/50 ml-2" />
        </div>
        
        <Card className="border-border/60 shadow-none bg-background">
          <CardContent className="p-8 space-y-8">
            {/* Avatar & Basic Info */}
            <div className="flex items-center gap-8">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden ring-4 ring-background shadow-sm transition-transform duration-300 group-hover:scale-105">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-muted-foreground" />
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-2xl tracking-tight">
                  {user.name || 'Non renseigné'}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={user.emailVerified ? 'default' : 'secondary'}
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                      user.emailVerified ? "bg-green-500/10 text-green-500 border-none" : "bg-yellow-500/10 text-yellow-500 border-none"
                    )}
                  >
                    {user.emailVerified ? 'Vérifié' : 'Non vérifié'}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Form Areas */}
            <div className="grid gap-8 pt-4">
              {saveError && (
                <div className="px-4 py-2 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs font-medium animate-in fade-in slide-in-from-top-1">
                  {saveError}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Nom complet</Label>
                  {isEditing ? (
                    <Input
                      id="name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Votre nom"
                      className="bg-secondary/30 border-border/50 focus-visible:ring-offset-0 focus-visible:ring-accent/30"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-secondary/20 rounded-lg border border-border/40 font-medium text-sm">
                      {user.name || 'Non renseigné'}
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground px-1">Adresse Email</Label>
                  <div className="px-4 py-3 bg-secondary/10 rounded-lg border border-border/30 font-mono text-sm flex items-center gap-3 text-muted-foreground/80">
                    <Mail className="w-4 h-4 opacity-50" />
                    {user.email}
                    {user.emailVerified && (
                      <Check className="w-4 h-4 text-green-500 ml-auto" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 border-t border-border/40">
              {isEditing ? (
                <div className="flex gap-3">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving} className="bg-primary hover:bg-primary/90 min-w-[120px]">
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Sauvegarde
                      </>
                    ) : (
                      'Enregistrer'
                    )}
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} variant="outline" className="border-border hover:bg-secondary/50">
                  Modifier le profil
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Security & System info */}
      <div className="grid md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Sécurité</h2>
            <div className="h-px flex-1 bg-border/50 ml-2" />
          </div>
          
          <Card className="border-border/60 shadow-none bg-background">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg border border-border/20 grayscale opacity-70 cursor-not-allowed">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-background flex items-center justify-center border border-border/50">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">Validation en deux étapes (2FA)</span>
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-tighter">Bientôt</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Détails du compte</h2>
            <div className="h-px flex-1 bg-border/50 ml-2" />
          </div>

          <Card className="border-border/60 shadow-none bg-background">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Membre depuis</span>
                </div>
                <span className="font-mono text-sm text-foreground/80">
                  {user.createdAt 
                    ? new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(user.createdAt))
                    : 'Non disponible'}
                </span>
              </div>
              <div className="h-px bg-border/40" />
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Session actuelle</span>
                </div>
                <span className="font-mono text-sm text-foreground/80">
                  {sessionCreatedAt
                    ? new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(sessionCreatedAt))
                    : 'En cours'}
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
