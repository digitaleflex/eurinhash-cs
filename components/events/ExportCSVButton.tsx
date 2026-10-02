'use client';

import type { Prisma } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

type RegistrationRow = Prisma.EventRegistrationGetPayload<{
  select: { createdAt: true; user: { select: { name: true; email: true } } };
}>;

interface ExportCSVButtonProps {
  data: RegistrationRow[];
  filename: string;
}

// Un nom ou un email contenant une virgule, un guillemet ou un retour à la ligne
// casserait le fichier exporté.
const escapeCell = (value: string) => `"${value.replace(/"/g, '""')}"`;

export function ExportCSVButton({ data, filename }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    // Headers
    const headers = ['Nom', 'Email', 'Date d\'inscription', 'Statut'];
    
    // Rows
    const rows = data.map(reg => [
      reg.user.name || 'Anonyme',
      reg.user.email ?? '',
      new Date(reg.createdAt).toLocaleDateString('fr-FR'),
      'Confirmé'
    ]);

    // CSV content
    const csvContent = [
      headers.map(escapeCell).join(','),
      ...rows.map(row => row.map(escapeCell).join(','))
    ].join('\n');

    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="gap-2 font-bold uppercase tracking-widest text-[10px] h-9"
      onClick={handleExport}
      disabled={data.length === 0}
    >
      <Download className="w-3.5 h-3.5" />
      Exporter CSV
    </Button>
  );
}
