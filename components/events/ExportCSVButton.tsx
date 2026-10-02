'use client';

import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExportCSVButtonProps {
  data: any[];
  filename: string;
}

export function ExportCSVButton({ data, filename }: ExportCSVButtonProps) {
  const handleExport = () => {
    if (data.length === 0) return;

    // Headers
    const headers = ['Nom', 'Email', 'Date d\'inscription', 'Statut'];
    
    // Rows
    const rows = data.map(reg => [
      reg.user.name || 'Anonyme',
      reg.user.email,
      new Date(reg.createdAt).toLocaleDateString('fr-FR'),
      'Confirmé'
    ]);

    // CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
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
