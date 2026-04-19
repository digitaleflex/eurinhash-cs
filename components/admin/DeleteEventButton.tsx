'use client';

import * as React from 'react';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deleteEventAdmin } from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';

interface DeleteEventButtonProps {
  eventId: string;
  eventTitle: string;
}

export function DeleteEventButton({
  eventId,
  eventTitle,
}: DeleteEventButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleDelete = async () => {
    if (loading) return;
    if (
      !confirm(
        `Êtes-vous sûr de vouloir supprimer l'événement "${eventTitle}" ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    setLoading(true);
    const result = await deleteEventAdmin(eventId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la suppression');
    }
    setLoading(false);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-9 w-9 text-muted-foreground hover:text-destructive"
      onClick={handleDelete}
      disabled={loading}
      title="Supprimer l'événement"
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Trash2 className="h-4 w-4" />
      )}
    </Button>
  );
}
