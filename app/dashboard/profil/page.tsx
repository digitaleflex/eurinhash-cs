import * as React from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { ProfileForm } from './profile-form';

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in');
  }

  const user = session.user;

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground text-sm">
          Gérez vos informations personnelles et la sécurité de votre compte.
        </p>
      </div>

      <ProfileForm 
        user={JSON.parse(JSON.stringify(user))} 
        sessionCreatedAt={session.session?.createdAt}
      />
    </div>
  );
}
