'use client';

import * as React from 'react';

interface CountdownProps {
  targetDate: Date | string;
}

export function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = React.useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });

  React.useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isExpired: false,
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  if (timeLeft.isExpired) {
    return (
      <div className="flex items-center gap-2 text-accent font-black uppercase tracking-widest text-xs animate-pulse">
        L'événement a commencé !
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <CountdownItem value={timeLeft.days} label="Jours" />
      <div className="text-2xl font-light text-muted-foreground/30 self-start mt-1">:</div>
      <CountdownItem value={timeLeft.hours} label="Heures" />
      <div className="text-2xl font-light text-muted-foreground/30 self-start mt-1">:</div>
      <CountdownItem value={timeLeft.minutes} label="Min" />
      <div className="text-2xl font-light text-muted-foreground/30 self-start mt-1">:</div>
      <CountdownItem value={timeLeft.seconds} label="Sec" />
    </div>
  );
}

function CountdownItem({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl sm:text-4xl font-black tracking-tighter tabular-nums leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mt-2">
        {label}
      </span>
    </div>
  );
}
