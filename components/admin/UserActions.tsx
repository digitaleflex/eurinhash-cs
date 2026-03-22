'use client';

import * as React from 'react';
import {
  ShieldAlert,
  UserMinus,
  Shield,
  Loader2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { updateUserRole, banUser } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/toast';

interface UserActionsProps {
  userId: string;
  userName: string | null;
  currentRole: string | null;
}

export function UserActions({
  userId,
  userName,
  currentRole,
}: UserActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<string | null>(null);
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
    if (
      !confirm(
        `Êtes-vous sûr de vouloir bannir ${userName || 'cet utilisateur'} ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    setLoading('ban');
    const result = await banUser(userId);

    if (result.success) {
      toast({
        title: 'Utilisateur banni',
        description: `${userName || 'Cet utilisateur'} a été banni avec succès`,
      });
      router.refresh();
    } else {
      toast({
        title: 'Erreur',
        description: result.error || 'Erreur lors du bannissement',
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
            disabled={loading === 'role' || loading === 'ban'}
          >
            {loading === 'role' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ShieldAlert className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem
            onClick={() => handleRoleChange('admin')}
            disabled={currentRole === 'admin'}
            className="flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            <span>Promouvoir admin</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleRoleChange('user')}
            disabled={currentRole === 'user'}
            className="flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" />
            <span>Rétrograder user</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 text-muted-foreground hover:text-destructive"
        onClick={handleBan}
        disabled={loading === 'ban'}
        title="Bannir l'utilisateur"
      >
        {loading === 'ban' ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <UserMinus className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
