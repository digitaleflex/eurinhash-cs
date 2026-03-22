'use client';

import * as React from 'react';
import { CheckCircle2, Trash2, Loader2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { updateMessageStatus, deleteMessage } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';

interface MessageActionsProps {
  messageId: string;
  currentStatus: string;
}

export function MessageActions({
  messageId,
  currentStatus,
}: MessageActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleStatusChange = async (status: 'new' | 'read' | 'archived') => {
    if (loading) return;
    if (status === currentStatus) return;

    setLoading(status);
    const result = await updateMessageStatus(messageId, status);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la mise à jour');
    }
    setLoading(null);
  };

  const handleDelete = async () => {
    if (loading) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce message ?')) {
      return;
    }

    setLoading('delete');
    const result = await deleteMessage(messageId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la suppression');
    }
    setLoading(null);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {currentStatus !== 'read' && currentStatus !== 'archived' && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 text-muted-foreground hover:text-accent"
          onClick={() => handleStatusChange('read')}
          disabled={loading !== null}
          title="Marquer comme lu"
        >
          {loading === 'read' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-5 w-5" />
          )}
        </Button>
      )}

      {currentStatus !== 'archived' && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 text-muted-foreground hover:text-yellow-500"
          onClick={() => handleStatusChange('archived')}
          disabled={loading !== null}
          title="Archiver"
        >
          {loading === 'archived' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Archive className="h-5 w-5" />
          )}
        </Button>
      )}

      <Button
        variant="ghost"
        size="sm"
        className="h-9 w-9 text-muted-foreground hover:text-destructive"
        onClick={handleDelete}
        disabled={loading === 'delete'}
        title="Supprimer"
      >
        {loading === 'delete' ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Trash2 className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
