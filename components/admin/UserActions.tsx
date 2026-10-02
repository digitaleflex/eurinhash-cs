'use client';

import * as React from 'react';
import {
  ShieldAlert,
  UserMinus,
  Shield,
  Loader2,
  CheckCircle,
  XCircle,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateUserRole, banUser, unbanUser } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

interface UserActionsProps {
  userId: string;
  userName: string | null;
  currentRole: string | null;
  isBanned: boolean;
}

export function UserActions({
  userId,
  userName,
  currentRole,
  isBanned,
}: UserActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<string | null>(null);
  const [banReason, setBanReason] = React.useState('');
  const [banOpen, setBanOpen] = React.useState(false);
  const { toast } = useToast();

  const handleRoleChange = async (newRole: 'user' | 'admin') => {
    if (loading) return;
    setLoading('role');

    const result = await updateUserRole(userId, newRole);

    if (result.success) {
      toast({
        title: 'Rôle mis à jour',
        description: `Le rôle de ${userName || 'cet utilisateur'} a été changé en ${newRole === 'admin' ? 'administrateur' : 'utilisateur'}`,
      });
      router.refresh();
    } else {
      toast({
        title: 'Erreur',
        description: result.error || 'Erreur lors du changement de rôle',
      });
    }
    setLoading(null);
  };

  const handleBan = async () => {
    if (loading) return;
    if (!banReason.trim()) return;

    setLoading('ban');
    const result = await banUser(userId, banReason);

    if (result.success) {
      toast({
        title: 'Utilisateur banni',
        description: `${userName || 'Cet utilisateur'} a été banni avec succès`,
      });
      setBanOpen(false);
      setBanReason('');
      router.refresh();
    } else {
      toast({
        title: 'Erreur',
        description: result.error || 'Erreur lors du bannissement',
      });
    }
    setLoading(null);
  };

  const handleUnban = async () => {
    if (loading) return;
    setLoading('unban');
    const result = await unbanUser(userId);

    if (result.success) {
      toast({
        title: 'Bannissement levé',
        description: `${userName || 'Cet utilisateur'} peut à nouveau se connecter`,
      });
      router.refresh();
    } else {
      toast({
        title: 'Erreur',
        description: result.error || 'Erreur lors de la levée du bannissement',
      });
    }
    setLoading(null);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 text-muted-foreground hover:text-accent"
            disabled={loading !== null}
          >
            {loading === 'role' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShieldAlert className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 border-border/40 bg-card/95 backdrop-blur-md">
          <DropdownMenuItem
            onClick={() => handleRoleChange('admin')}
            disabled={currentRole === 'admin'}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Shield className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-tight">Promouvoir admin</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleRoleChange('user')}
            disabled={currentRole === 'user'}
            className="flex items-center gap-2 cursor-pointer"
          >
            <XCircle className="w-4 h-4" />
            <span className="font-bold text-xs uppercase tracking-tight">Rétrograder user</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isBanned ? (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-500/10"
          onClick={handleUnban}
          disabled={loading !== null}
          title="Réactiver le compte"
        >
          {loading === 'unban' ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <UserCheck className="h-4 w-4" />
          )}
        </Button>
      ) : (
        <Sheet open={banOpen} onOpenChange={setBanOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              disabled={loading !== null}
              title="Bannir l'utilisateur"
            >
              <UserMinus className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-md border-l border-border/40 bg-card/95 backdrop-blur-md">
            <SheetHeader className="space-y-1">
              <SheetTitle className="text-xl font-black uppercase tracking-tight italic">
                Bannir l'<span className="text-destructive">Utilisateur</span>
              </SheetTitle>
              <SheetDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
                Déconnexion immédiate et blocage de l'accès.
              </SheetDescription>
            </SheetHeader>
            <div className="mt-8 space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                  Motif du bannissement
                </label>
                <textarea
                  className="w-full min-h-[150px] bg-background border border-border/40 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-destructive/20 transition-all resize-none"
                  placeholder="Ex: Violation des conditions d'utilisation, Spam..."
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                />
              </div>
              <Button 
                variant="destructive"
                className="w-full font-bold uppercase tracking-widest py-6 shadow-lg shadow-destructive/20"
                onClick={handleBan}
                disabled={loading === 'ban' || !banReason.trim()}
              >
                {loading === 'ban' ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <ShieldAlert className="h-4 w-4 mr-2" />
                )}
                Confirmer le bannissement
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}
