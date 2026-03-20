'use client';

import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import type { TimelinePhase } from '@/lib/data/timeline';

interface TimelineItemProps {
  phase: TimelinePhase;
  isExpanded: boolean;
  onToggle: (id: string) => void;
}

export function TimelineItem({ phase, isExpanded, onToggle }: TimelineItemProps) {
  return (
    <div className="relative pl-10 sm:pl-14">
      {/* Marqueur */}
      <div
        className={`absolute left-[-5px] top-7 w-2.5 h-2.5 border-2 border-background transition-all duration-500 ${
          phase.status === 'current' ? 'bg-accent scale-110' : 'bg-foreground/20'
        }`}
      />

      <div
        onClick={() => onToggle(phase.id)}
        className={`group cursor-pointer px-6 sm:px-10 py-7 transition-all duration-500 border-l-2 ${
          isExpanded
            ? 'bg-foreground/[0.025] border-accent'
            : 'border-transparent hover:bg-foreground/[0.01] hover:border-foreground/10'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-0">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-accent font-medium tracking-tight">
                {phase.year}
              </span>
              {phase.status === 'current' && (
                <span className="animate-pulse flex h-1.5 w-1.5 bg-accent rounded-full" />
              )}
            </div>
            <h3 className="text-lg font-bold tracking-tight">{phase.title}</h3>
            <p className="font-mono text-[10px] text-foreground/30 tracking-tight">{phase.subtitle}</p>
          </div>
          <div className="shrink-0">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-foreground/30" />
            ) : (
              <ChevronDown className="w-4 h-4 text-foreground/20" />
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="mt-6 grid md:grid-cols-2 gap-8 items-start animate-in fade-in slide-in-from-left-4 duration-500">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {phase.description}
            </p>
            <ul className="space-y-3">
              {phase.objectives.map((objective, i) => (
                <li key={i} className="flex items-center gap-3 group/item">
                  <Check className="w-3 h-3 text-accent/40 group-hover/item:text-accent transition-colors shrink-0" />
                  <span className="text-sm text-foreground/65">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
