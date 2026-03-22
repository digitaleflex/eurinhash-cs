import * as React from 'react';
import { EventForm } from '@/components/events/EventForm';
import prismaApi from '@/lib/prisma-api';
import type { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';

const prisma = prismaApi as PrismaClient;

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  
  const event = await prisma.event.findUnique({
    where: { id }
  });

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black tracking-tight uppercase">Modifier l'événement</h1>
        <p className="text-muted-foreground">Mettez à jour les informations de l'événement.</p>
      </div>

      <EventForm initialData={event} />
    </div>
  );
}
