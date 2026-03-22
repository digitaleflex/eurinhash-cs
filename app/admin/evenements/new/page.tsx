import * as React from 'react';
import { EventForm } from '@/components/events/EventForm';

export default function NewEventPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight uppercase">Nouvel Événement</h1>
        <p className="text-muted-foreground">Remplissez les détails pour publier un nouvel événement.</p>
      </div>

      <EventForm />
    </div>
  );
}
