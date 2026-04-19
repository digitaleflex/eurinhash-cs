'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { sendEventReminders } from '@/lib/actions/events';

interface RelaunchButtonProps {
  eventId: string;
  participantCount: number;
}

export function RelaunchButton({ eventId, participantCount }: RelaunchButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const handleRelaunch = async () => {
    if (participantCount === 0) return;
    
    setLoading(true);
    try {
      const result = await sendEventReminders(eventId);
      if (result.success) {
        setSent(true);
        setTimeout(() => setSent(false), 5000);
      }
    } catch (error) {
      console.error('Error sending reminders:', error);
      alert('Erreur lors de l\'envoi des rappels');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleRelaunch}
      disabled={loading || participantCount === 0 || sent}
      className={`${sent ? 'bg-green-500 hover:bg-green-600' : 'bg-accent hover:bg-accent/90'} text-white font-bold h-11 px-6 min-w-[180px] transition-all duration-300`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : sent ? (
        <CheckCircle2 className="w-4 h-4 mr-2" />
      ) : (
        <Send className="w-4 h-4 mr-2" />
      )}
      {sent ? 'Rappels Envoyés !' : 'Relancer les inscrits'}
    </Button>
  );
}
