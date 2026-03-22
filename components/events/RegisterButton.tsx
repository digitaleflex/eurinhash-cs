'use client';

import * as React from 'react';
import { registerForEvent } from '@/lib/actions/events';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RegisterButtonProps {
  eventId: string;
  isRegisteredInitial?: boolean;
  isLoggedIn: boolean;
  className?: string;
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function RegisterButton({ 
  eventId, 
  isRegisteredInitial = false, 
  isLoggedIn,
  className,
  variant = 'default',
  size = 'default'
}: RegisterButtonProps) {
  const [loading, setLoading] = React.useState(false);
  const [isRegistered, setIsRegistered] = React.useState(isRegisteredInitial);
  const router = useRouter();

  const handleRegister = async () => {
    if (!isLoggedIn) {
      router.push('/sign-in');
      return;
    }

    setLoading(true);
    try {
      const result = await registerForEvent(eventId);
      if (result.success) {
        setIsRegistered(true);
      } else {
        alert(result.message || "Erreur d'inscription");
      }
    } catch (error) {
      console.error('Error registering:', error);
      alert("Une erreur est survenue lors de l'inscription.");
    } finally {
      setLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <Button 
        disabled 
        className={`${className} bg-green-500/10 text-green-500 border border-green-500/20 font-bold opacity-100`}
        size={size}
      >
        <CheckCircle2 className="w-4 h-4 mr-2" />
        Inscrit
      </Button>
    );
  }

  return (
    <Button
      onClick={handleRegister}
      disabled={loading}
      variant={variant}
      size={size}
      className={className}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          S'inscrire
          <ArrowRight className="w-4 h-4 ml-2" />
        </>
      )}
    </Button>
  );
}
