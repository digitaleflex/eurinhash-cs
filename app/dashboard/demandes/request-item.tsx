'use client';

import * as React from 'react';
import { ChevronDown, ChevronUp, Clock, Building2, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProjectRequest {
  id: string;
  organization: string;
  role: string;
  email: string;
  initiativeType: string;
  initiativeName: string;
  vision: string;
  engagementLevel: string;
  priority: string;
  status: string;
  timeline: string;
  technologies: string[];
  createdAt: string;
  country: string;
}

const statusLabels: Record<
  string,
  { label: string; variant: 'default' | 'secondary' | 'outline' }
> = {
  new: { label: 'Nouveau', variant: 'default' },
  analyzing: { label: 'En analyse', variant: 'secondary' },
  qualified: { label: 'Qualifié', variant: 'outline' },
  rejected: { label: 'Rejeté', variant: 'secondary' },
  archived: { label: 'Archivé', variant: 'secondary' },
};

const priorityLabels: Record<string, string> = {
  low: 'Basse',
  medium: 'Moyenne',
  high: 'Haute',
  strategic: 'Stratégique',
};

const timelineLabels: Record<string, string> = {
  asap: 'Dès que possible',
  '1-month': '1 mois',
  '3-months': '3 mois',
  '6-months': '6 mois',
  flexible: 'Flexible',
};

export function RequestItem({ req }: { req: ProjectRequest }) {
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
              {req.initiativeName}
            </CardTitle>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Building2 className="w-3 h-3" />
                {req.organization}
              </span>
              <span className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {req.country}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={statusLabels[req.status]?.variant || 'secondary'}
            >
              {statusLabels[req.status]?.label || req.status}
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
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {timelineLabels[req.timeline] || req.timeline}
          </span>
          <span>•</span>
          <span>
            Priorité: {priorityLabels[req.priority] || req.priority}
          </span>
          <span>•</span>
          <span>Type: {req.initiativeType}</span>
          {req.technologies.length > 0 && (
            <>
              <span>•</span>
              <span>{req.technologies.slice(0, 3).join(', ')}</span>
            </>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Vision</h4>
              <p className="text-sm text-muted-foreground">
                {req.vision}
              </p>
            </div>
            {req.technologies.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {req.technologies.map(tech => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
