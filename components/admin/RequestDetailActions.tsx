'use client';

import * as React from 'react';
import { Loader2, CheckCircle, XCircle, Archive, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  updateProjectRequestStatus,
  deleteProjectRequest,
} from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';

interface RequestDetailActionsProps {
  requestId: string;
  currentStatus: string;
}

const statusOptions = [
  { value: 'new', label: 'Nouveau', color: 'text-blue-500' },
  { value: 'analyzing', label: 'En analyse', color: 'text-yellow-500' },
  { value: 'qualified', label: 'Qualifié', color: 'text-green-500' },
  { value: 'rejected', label: 'Rejeté', color: 'text-red-500' },
  { value: 'archived', label: 'Archivé', color: 'text-gray-500' },
];

export function RequestDetailActions({
  requestId,
  currentStatus,
}: RequestDetailActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleStatusChange = async (status: string) => {
    if (loading || status === currentStatus) return;

    setLoading(true);
    const result = await updateProjectRequestStatus(requestId, status as any);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la mise à jour');
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    if (loading) return;
    if (
      !confirm(
        'Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible.'
      )
    ) {
      return;
    }

    setLoading(true);
    const result = await deleteProjectRequest(requestId);

    if (result.success) {
      router.push('/admin/demandes');
    } else {
      alert(result.error || 'Erreur lors de la suppression');
    }
    setLoading(false);
  };

  const canDelete =
    currentStatus === 'archived' || currentStatus === 'rejected';

  return (
    <div className="flex items-center gap-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="h-11 font-bold border-accent/20 hover:bg-accent/5"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <>
                <span>Changer le statut</span>
                <span className="ml-2 px-2 py-0.5 bg-accent/10 rounded text-xs">
                  {statusOptions.find(s => s.value === currentStatus)?.label ||
                    currentStatus}
                </span>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {statusOptions.map(status => (
            <DropdownMenuItem
              key={status.value}
              onClick={() => handleStatusChange(status.value)}
              disabled={currentStatus === status.value}
              className={status.color}
            >
              {status.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        className="h-11 text-muted-foreground hover:text-destructive font-bold"
        onClick={handleDelete}
        disabled={loading || !canDelete}
        title={
          canDelete
            ? 'Supprimer la demande'
            : 'Archiver ou rejeter avant de supprimer'
        }
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Trash2 className="w-4 h-4" />
        )}
      </Button>
    </div>
  );
}
