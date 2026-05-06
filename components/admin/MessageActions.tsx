'use client';

import * as React from 'react';
import { 
  CheckCircle2, 
  Trash2, 
  Loader2, 
  Archive, 
  Reply,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  updateMessageStatus, 
  deleteMessage,
  replyToMessage 
} from '@/lib/actions/admin';
import { useRouter } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";

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
  const [replyOpen, setReplyOpen] = React.useState(false);
  const [replyContent, setReplyContent] = React.useState('');

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

  const handleReply = async () => {
    if (!replyContent.trim()) return;

    setLoading('reply');
    const result = await replyToMessage(messageId, replyContent);

    if (result.success) {
      setReplyOpen(false);
      setReplyContent('');
      router.refresh();
      alert('Réponse envoyée avec succès !');
    } else {
      alert(result.error || 'Erreur lors de l\'envoi de la réponse');
    }
    setLoading(null);
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Reply Action */}
      <Sheet open={replyOpen} onOpenChange={setReplyOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-9 w-9 text-muted-foreground hover:text-blue-500"
            title="Répondre"
          >
            <Reply className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent className="sm:max-w-md border-l border-border/40 bg-card/95 backdrop-blur-md">
          <SheetHeader className="space-y-1">
            <SheetTitle className="text-xl font-black uppercase tracking-tight italic">
              Répondre au <span className="text-accent">Message</span>
            </SheetTitle>
            <SheetDescription className="text-xs uppercase font-bold tracking-widest text-muted-foreground">
              Envoyez une réponse personnalisée via Resend.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-8 space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">
                Votre Message
              </label>
              <textarea
                className="w-full min-h-[300px] bg-background border border-border/40 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 transition-all resize-none"
                placeholder="Écrivez votre réponse ici..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
            </div>
            <Button 
              className="w-full bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-widest py-6 shadow-lg shadow-accent/20"
              onClick={handleReply}
              disabled={loading === 'reply' || !replyContent.trim()}
            >
              {loading === 'reply' ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}
              Envoyer la réponse
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {currentStatus !== 'read' && currentStatus !== 'archived' && currentStatus !== 'replied' && (
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
