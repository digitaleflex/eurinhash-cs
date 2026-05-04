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
      globalThis.location.reload();

    } catch (error) {
      console.error('Save error:', error);
      setSaveError('Une erreur est survenue lors de la sauvegarde.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid gap-12 animate-in fade-in duration-700">
      {/* Profile Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-4">
             <div className="w-1 h-6 bg-accent" />
             <h2 className="text-sm font-black uppercase text-foreground">Profil Utilisateur</h2>
          </div>
          <span className="font-mono text-[10px] text-muted-foreground/40 uppercase">ID :: {user.id.slice(0, 8)}...</span>
        </div>
        
        <Card className="border-border/60 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm relative overflow-hidden">
          {/* Architectural Background Grid */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-10" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          
          <CardContent className="p-8 sm:p-12 space-y-12">
            {/* Avatar & System Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10">
              <div className="relative group">
                <div className="w-32 h-32 rounded-none border border-accent/20 p-1 bg-background rotate-3 group-hover:rotate-0 transition-transform duration-500 relative">
                  <div className="w-full h-full bg-secondary flex items-center justify-center overflow-hidden border border-accent/10">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name || 'User'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-muted-foreground/40" />
                    )}
                  </div>
                  {/* Status Indicator */}
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-accent border-4 border-background flex items-center justify-center">
                     <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6 text-center sm:text-left">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                      <Badge variant="outline" className="rounded-none border-accent/30 text-accent font-mono text-[9px] uppercase font-black bg-accent/5">
                        Accès Autorisé
                      </Badge>
                      <Badge variant="outline" className="rounded-none border-foreground/10 text-muted-foreground font-mono text-[9px] uppercase font-black">
                        Région : EU West
                      </Badge>
                  </div>
                  <h3 className="font-black text-3xl sm:text-4xl tracking-tighter text-foreground">
                    {user.name || 'Utilisateur'}
                  </h3>
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    user.emailVerified ? "bg-accent" : "bg-yellow-500"
                  )} />
                  <span className="font-mono text-[10px] uppercase text-muted-foreground font-bold">
                    Statut Email : {user.emailVerified ? 'Vérifié' : 'Non vérifié'}
                  </span>
                </div>
              </div>
            </div>

            {/* Form Areas */}
            <div className="grid gap-10 pt-4">
              {saveError && (
                <div className="px-4 py-3 bg-accent/5 border-l-4 border-accent text-accent text-xs font-mono font-bold animate-in fade-in slide-in-from-top-1">
                  &gt;&gt; ERROR: {saveError}
                </div>
              )}
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <Label htmlFor="name" className="text-[10px] font-black uppercase text-muted-foreground/60 flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent" />
                    Nom Complet
                  </Label>
                  {isEditing ? (
                    <div className="relative group">
                       <Input
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Entrez votre nom"
                        className="bg-background border-foreground/10 focus-visible:ring-0 focus-visible:border-accent rounded-none h-12 font-medium"
                      />
                      <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent group-focus-within:w-full transition-all duration-300" />
                    </div>
                  ) : (
                    <div className="px-5 py-4 bg-foreground/5 border border-foreground/5 font-bold text-lg tracking-tight">
                      {user.name || 'Non défini'}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <Label className="text-[10px] font-black uppercase text-muted-foreground/60 flex items-center gap-2">
                    <div className="w-1 h-1 bg-accent" />
                    Contact & Communication
                  </Label>
                  <div className="px-5 py-4 bg-foreground/[0.02] border border-foreground/5 font-mono text-sm flex items-center gap-4 text-muted-foreground group">
                    <Mail className="w-4 h-4 text-accent/40 group-hover:text-accent transition-colors" />
                    <span className="truncate">{user.email}</span>
                    {user.emailVerified && (
                      <Badge className="ml-auto bg-accent/10 text-accent border-none text-[8px] font-black uppercase">Sécurisé</Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-8 border-t border-foreground/5">
              {isEditing ? (
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditing(false)}
                    className="text-muted-foreground hover:text-foreground font-mono text-[10px] uppercase font-black"
                  >
                    Annuler
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving} className="bg-accent hover:bg-foreground text-white rounded-none px-8 h-12 font-black text-xs uppercase transition-all hover:translate-x-1">
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-3" />
                        Synchronisation...
                      </>
                    ) : (
                      'Enregistrer'
                    )}
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="bg-foreground hover:bg-accent text-background rounded-none px-8 h-12 font-black text-xs uppercase transition-all">
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
          <div className="flex items-center gap-4">
             <div className="w-1 h-6 bg-accent/40" />
              <h2 className="text-sm font-black uppercase text-foreground/60">Sécurité</h2>
          </div>
          
          <Card className="border-border/60 shadow-none bg-card/30 backdrop-blur-sm rounded-none border-l-4 border-l-yellow-500/20">
            <CardContent className="p-8 space-y-4">
              <div className="flex items-center justify-between p-6 bg-foreground/5 border border-foreground/5 grayscale opacity-40">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-none bg-background flex items-center justify-center border border-foreground/10">
                    <Shield className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold tracking-tight">Multi-Factor Auth (MFA)</span>
                      <span className="text-[9px] font-mono uppercase">Statut : En attente</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-[8px] font-black uppercase px-2">Bientôt</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <div className="flex items-center gap-4">
             <div className="w-1 h-6 bg-accent/40" />
              <h2 className="text-sm font-black uppercase text-foreground/60">Détails du compte</h2>
          </div>

          <Card className="border-border/60 shadow-none bg-card/30 backdrop-blur-sm rounded-none">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <Calendar className="w-4 h-4 text-accent" />
                  <span className="text-xs font-bold uppercase text-muted-foreground/60">Date d'inscription</span>
                </div>
                <span className="font-mono text-xs font-black text-foreground">
                  {user.createdAt 
                    ? new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(user.createdAt))
                    : 'Aucune'}
                </span>
              </div>
              <div className="h-px bg-foreground/5" />
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span className="text-xs font-bold uppercase text-muted-foreground/60">Session actuelle</span>
                </div>
                <span className="font-mono text-xs font-black text-accent">
                  {sessionCreatedAt
                    ? new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date(sessionCreatedAt))
                    : 'Active'}
                </span>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
