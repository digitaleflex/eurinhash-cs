'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  status: string;
  createdAt: string;
}

export function MessageItem({ msg }: { msg: Message }) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <Card
      className={`cursor-pointer transition-colors ${
        isExpanded ? 'border-accent' : ''
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-base font-semibold">
              {msg.subject || 'Sans objet'}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              De: {msg.name} ({msg.email})
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={msg.status === 'new' ? 'default' : 'secondary'}
            >
              {msg.status === 'new' ? 'Nouveau' : 'Lu'}
            </Badge>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          {new Date(msg.createdAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
