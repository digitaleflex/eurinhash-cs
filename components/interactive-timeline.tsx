'use client';

import { useState } from 'react';
import { TIMELINE_PHASES } from '@/lib/data/timeline';
import { TimelineItem } from './home/timeline-item';

export function InteractiveTimeline() {
  const [expandedPhase, setExpandedPhase] = useState<string | null>('phase-0');

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
  };

  return (
    <div className="w-full">
      <div className="relative">
        {/* Ligne latérale */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/8" />

        <div className="space-y-2">
          {TIMELINE_PHASES.map(phase => (
            <TimelineItem
              key={phase.id}
              phase={phase}
              isExpanded={expandedPhase === phase.id}
              onToggle={togglePhase}
            />
          ))}
        </div>
      </div>

      {/* Légende */}
      <div className="mt-12 pt-8 border-t border-foreground/5 flex items-center gap-8 font-mono text-[10px] text-foreground/25 tracking-tight">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-accent" />
          <span>En cours</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-foreground/20" />
          <span>Planifié</span>
        </div>
      </div>
    </div>
  );
}
