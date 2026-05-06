import * as React from 'react';
import {
  Users,
  Shield,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Search,
  UserMinus,
  ShieldAlert,
  Key,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardSearch } from '@/components/dashboard/search';
import { UserActions } from '@/components/admin/UserActions';
import prismaApi from '@/lib/prisma-api';
const prisma = prismaApi;

interface AdminUsersPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function AdminUsersPage({
  searchParams,
}: AdminUsersPageProps) {
  const { q } = await searchParams;

  const users = await prisma.user.findMany({
    where: {
      ...(q
        ? {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { email: { contains: q, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground mt-1 text-xs font-bold tracking-widest flex items-center gap-2 uppercase">
            <Users className="w-4 h-4 text-accent" />
            {users.length} compte{users.length !== 1 ? 's' : ''} actif
            {users.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      <DashboardSearch placeholder="Chercher un utilisateur par nom ou email..." />

      <Card className="border-border/60 bg-card/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-5">Utilisateur</th>
                <th className="px-6 py-5">Rôle</th>
                <th className="px-6 py-5">Vérification</th>
                <th className="px-6 py-5">Inscription</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {users.map(user => (
                <tr
                  key={user.id}
                  className="group hover:bg-accent/[0.02] transition-colors duration-200"
                >
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-secondary/50 border border-border flex items-center justify-center overflow-hidden shrink-0 group-hover:scale-105 transition-transform">
                        {user.image ? (
                          <img
                            src={user.image}
                            alt={user.name || ''}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="w-5 h-5 text-muted-foreground/50" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-bold text-base tracking-tight">
                          {user.name || 'Non renseigné'}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <Badge
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className={`text-[9px] font-black uppercase tracking-widest px-2.5 ${user.role === 'admin' ? 'bg-accent/10 text-accent border-accent/20' : 'bg-muted/50'}`}
                    >
                      {user.role === 'admin' ? (
                        <span className="flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Admin
                        </span>
                      ) : (
                        'User'
                      )}
                    </Badge>
                    {user.banned && (
                      <Badge
                        variant="destructive"
                        className="text-[9px] font-black uppercase tracking-widest px-2.5 ml-2"
                        title={user.banReason || 'Aucun motif renseigné'}
                      >
                        Banni
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-2">
                      {user.emailVerified ? (
                        <Badge
                          variant="outline"
                          className="text-[9px] font-bold border-green-500/20 text-green-500 bg-green-500/5 px-2"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" /> Vérifié
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="text-[9px] font-bold border-yellow-500/20 text-yellow-500 bg-yellow-500/5 px-2"
                        >
                          <XCircle className="w-3 h-3 mr-1" /> Non vérifié
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-6 font-mono text-[10px] text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <UserActions
                      userId={user.id}
                      userName={user.name}
                      currentRole={user.role}
                      isBanned={!!user.banned}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
