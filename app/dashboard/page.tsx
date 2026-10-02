import { User, Mail, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = session.user;

  // Fetch real stats directly on server
  const messagesCount = await prisma.contactMessage.count({
    where: { email: user.email },
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue, {user.name || 'Utilisateur'}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">{messagesCount}</p>
              <p className="text-sm text-muted-foreground">Messages</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-accent/10 rounded-lg">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {user.emailVerified ? '1' : '0'}
              </p>
              <p className="text-sm text-muted-foreground">Comptes vérifiés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <User className="w-5 h-5" />
            Mon Profil
          </h2>
        </div>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center overflow-hidden">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || 'User'}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-accent" />
                )}
              </div>
              <Badge variant={user.emailVerified ? 'default' : 'secondary'}>
                {user.emailVerified ? 'Vérifié' : 'Non vérifié'}
              </Badge>
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">
                    Nom
                  </span>
                  <p className="font-medium">{user.name || 'Non renseigné'}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground block mb-1">
                    Email
                  </span>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="pt-4">
                <Button variant="outline" asChild>
                  <a href="/dashboard/profil">Modifier mon profil</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid gap-4 md:grid-cols-2">
        <a
          href="/dashboard/messages"
          className="p-6 bg-card border border-border rounded-xl hover:border-accent/50 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Mes Messages</h3>
                <p className="text-sm text-muted-foreground">
                  Voir l'historique de mes messages
                </p>
              </div>
            </div>
            <span className="text-accent">→</span>
          </div>
        </a>
      </div>
    </div>
  );
}
