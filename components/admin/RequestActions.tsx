'use client';

import * as React from 'react';
import {
  CheckCircle2,
  Loader2,
  FileText,
  ArrowRight,
  XCircle,
  Archive,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  updateProjectRequestStatus,
  deleteProjectRequest,
} from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface RequestActionsProps {
  requestId: string;
  currentStatus: string;
}

const statusFlow = ['new', 'analyzing', 'qualified', 'rejected', 'archived'];

export function RequestActions({
  requestId,
  currentStatus,
}: RequestActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = React.useState<string | null>(null);

  const handleStatusChange = async (status: string) => {
    if (loading) return;
    if (status === currentStatus) return;

    setLoading(status);
    const result = await updateProjectRequestStatus(requestId, status as any);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la mise à jour');
    }
    setLoading(null);
  };

  const handleDelete = async () => {
    if (loading) return;
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) {
      return;
    }

    setLoading('delete');
    const result = await deleteProjectRequest(requestId);

    if (result.success) {
      router.refresh();
    } else {
      alert(result.error || 'Erreur lors de la suppression');
    }
    setLoading(null);
  };

  const currentIndex = statusFlow.indexOf(currentStatus);

  return (
    <div className="flex shrink-0 gap-3 border-t lg:border-t-0 lg:border-l border-border/40 pt-4 lg:pt-0 lg:pl-6">
      <Button
        variant="outline"
        size="sm"
        className="h-9 px-4 font-bold border-accent/20 hover:bg-accent/5 hover:text-accent"
        asChild
      >
        <Link href={`/admin/demandes/${requestId}`}>
          Détails <ArrowRight className="w-3 h-3 ml-1" />
        </Link>
      </Button>

      {currentStatus === 'new' && (
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 text-muted-foreground hover:text-accent"
          onClick={() => handleStatusChange('analyzing')}
          disabled={loading !== null}
          title="Passer en analyse"
        >
          {loading === 'analyzing' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="h-5 w-5" />
          )}
        </Button>
      )}

      {currentStatus === 'analyzing' && (
        <>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 text-green-500 hover:text-green-600"
            onClick={() => handleStatusChange('qualified')}
            disabled={loading !== null}
            title="Qualifier"
          >
            {loading === 'qualified' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 text-red-500 hover:text-red-600"
            onClick={() => handleStatusChange('rejected')}
            disabled={loading !== null}
            title="Rejeter"
          >
            {loading === 'rejected' ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <XCircle className="h-5 w-5" />
            )}
          </Button>
        </>
      )}

      {currentStatus === 'qualified' && (
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
          <FileText className="h-5 w-5" />
        )}
      </Button>
    </div>
  );
}
