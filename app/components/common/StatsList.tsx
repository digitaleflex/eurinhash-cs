import Grid from '../ui/Grid';
import StatCard from '../StatCard';

interface Stat {
  value: string;
  label: string;
  color?: 'blue' | 'green' | 'purple';
  trend?: string;
}

interface StatsListProps {
  stats: Stat[];
  columns?: 2 | 3 | 4 | 6;
  className?: string;
}

export default function StatsList({ 
  stats, 
  columns = 4,
  className = ''
}: StatsListProps) {
  return (
    <Grid cols={columns} className={className}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          value={stat.value}
          label={stat.label}
          color={stat.color}
          trend={stat.trend}
        />
      ))}
    </Grid>
  );
}