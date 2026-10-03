'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Loader2, ArrowRight, ShieldCheck, KeyRound } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  AuthCard,
  AuthDivider,
  AuthSocialButton,
  FormField,
} from '@/components/auth/auth-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authClient } from '@/lib/auth-clients';

const EmailSchema = z.object({
  email: z.string().email('Adresse email invalide'),
});

const OTPSchema = z.object({
  otp: z.string().min(6, 'Le code doit contenir 6 chiffres').max(6),
});

type EmailFormData = z.infer<typeof EmailSchema>;
type OTPFormData = z.infer<typeof OTPSchema>;

export default function SignInPage() {
  const router = useRouter();

  // Le middleware redirige vers /sign-in?callbackUrl=... : on ne suit que des
  // chemins internes, sinon on retombe sur le tableau de bord.
  const [callbackUrl, setCallbackUrl] = React.useState('/dashboard');

  React.useEffect(() => {
    const requestedUrl = new URLSearchParams(window.location.search).get('callbackUrl');
    if (requestedUrl?.startsWith('/') && !requestedUrl.startsWith('//')) {
      setCallbackUrl(requestedUrl);
    }
  }, []);
  const [step, setStep] = React.useState<'email' | 'otp'>('email');
  const [emailValue, setEmailValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = React.useState(false);

  const emailForm = useForm<EmailFormData>({
    resolver: zodResolver(EmailSchema),
    defaultValues: { email: '' },
  });

  const otpForm = useForm<OTPFormData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: { otp: '' },
  });

  const onSendOTP = async (data: EmailFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: otpError } = await authClient.emailOtp.sendVerificationOtp({
        email: data.email,
        type: 'sign-in',
      });

      if (otpError) {
        setError(otpError.message || 'Erreur lors de l\'envoi du code');
      } else {
        setEmailValue(data.email);
        setStep('otp');
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifyOTP = async (data: OTPFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signInError } = await authClient.signIn.emailOtp({
        email: emailValue,
        otp: data.otp,
      });

      if (signInError) {
        setError(signInError.message || 'Code incorrect ou expiré');
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Une erreur est survenue lors de la vérification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError(null);

    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: callbackUrl,
      });
    } catch (err) {
      setError('Erreur lors de la connexion Google');
      setGoogleLoading(false);
    }
  };

  return (
    <main>
    <AuthCard
      title={step === 'email' ? "Se connecter à Eurin Hash" : "Vérifiez votre email"}
      description={step === 'email' ? "Entrez votre email pour continuer" : `Nous avons envoyé un code à ${emailValue}`}
    >
      <div className="space-y-6">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-start gap-2">
            <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {step === 'email' ? (
          <form onSubmit={emailForm.handleSubmit(onSendOTP)} className="space-y-4">
            <FormField label="Adresse Email" error={emailForm.formState.errors.email?.message} required>
              <Input
                type="email"
                placeholder="nom@exemple.com"
                autoComplete="email"
                className="h-12 bg-background/50 border-foreground/10 focus:border-accent transition-all duration-200"
                icon={<Mail className="w-5 h-5 text-muted-foreground" />}
                {...emailForm.register('email')}
              />
            </FormField>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  Continuer avec Email
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>
        ) : (
          <form onSubmit={otpForm.handleSubmit(onVerifyOTP)} className="space-y-4">
            <FormField label="Code de vérification" error={otpForm.formState.errors.otp?.message} required>
              <Input
                type="text"
                placeholder="000000"
                autoComplete="one-time-code"
                className="h-12 text-center text-2xl tracking-[0.5em] font-mono bg-background/50 border-foreground/10 focus:border-accent"
                icon={<KeyRound className="w-5 h-5 text-muted-foreground" />}
                {...otpForm.register('otp')}
              />
            </FormField>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Vérification...
                </>
              ) : (
                'Vérifier le code'
              )}
            </Button>
            
            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Modifier l'adresse email
            </button>
          </form>
        )}

        <AuthDivider label="ou continuer avec" />

        <div className="space-y-3">
          <AuthSocialButton
            provider="google"
            onClick={handleGoogleSignIn}
            disabled={googleLoading || isLoading}
          >
            {googleLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Redirection...
              </>
            ) : (
              'Continuer avec Google'
            )}
          </AuthSocialButton>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-accent/5 border border-accent/10">
          <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            Pour protéger votre compte, nous utilisons la vérification sans mot de passe. 
            C'est plus sûr et vous n'avez plus rien à mémoriser.
          </p>
        </div>
      </div>
    </AuthCard>
    </main>
  );
}
