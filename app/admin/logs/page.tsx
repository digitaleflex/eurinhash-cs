import * as React from 'react';
import {
  Activity,
  AlertTriangle,
  Info,
  AlertCircle,
  Database,
  RefreshCw,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import prismaApi from '@/lib/prisma-api';

const prisma = prismaApi;

export default async function AdminLogsPage() {
  const logs = await (prisma as any).auditLog.findMany({
    take: 50,
    orderBy: { createdAt: 'desc' },
    include: {
      user: true,
    },
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight uppercase">
            Logs <span className="text-accent">Système</span>
          </h1>
          <p className="text-muted-foreground mt-1 text-xs font-bold tracking-widest flex items-center gap-2 uppercase">
            <Activity className="w-4 h-4 text-accent" />
            Suivi des activités et erreurs critiques
          </p>
        </div>
      </div>

      <Card className="border-border/60 bg-card/30 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-accent/5 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground border-b border-border/40">
              <tr>
                <th className="px-6 py-5">Niveau</th>
                <th className="px-6 py-5">Action</th>
                <th className="px-6 py-5">Message</th>
                <th className="px-6 py-5">Auteur</th>
                <th className="px-6 py-5">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {logs.map((log: any) => (
                <tr
                  key={log.id}
                  className="group hover:bg-accent/[0.02] transition-colors duration-200"
                >
                  <td className="px-6 py-4">
                    <LogBadge level={log.level} />
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-tighter bg-muted px-2 py-1 rounded">
                      {log.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <p className="text-xs font-medium leading-relaxed">
                      {log.message}
                    </p>
                    {log.metadata && Object.keys(log.metadata).length > 0 && (
                      <pre className="text-[9px] mt-2 p-2 bg-black/5 rounded font-mono overflow-hidden">
                        {JSON.stringify(log.metadata, null, 2)}
                      </pre>
                    )}
                  </td>
                  <td className="px-6 py-4 text-xs font-bold truncate">
                    {log.user?.name || 'Système'}
                  </td>
                  <td className="px-6 py-4 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </td>
                </tr>
              ))}
              {logs.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-20 text-center text-muted-foreground italic"
                  >
                    Aucun log pour le moment.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

function LogBadge({ level }: { level: string }) {
  switch (level) {
    case 'critical':
      return (
        <Badge variant="destructive" className="gap-1 animate-pulse">
          <AlertCircle className="w-3 h-3" /> Critical
        </Badge>
      );
    case 'error':
      return (
        <Badge variant="destructive" className="gap-1">
          <AlertTriangle className="w-3 h-3" /> Error
        </Badge>
      );
    case 'warn':
      return (
        <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 gap-1">
          <AlertTriangle className="w-3 h-3" /> Warning
        </Badge>
      );
    default:
      return (
        <Badge variant="secondary" className="gap-1">
          <Info className="w-3 h-3" /> Info
        </Badge>
      );
  }
}
