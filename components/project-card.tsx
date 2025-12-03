import { LucideIcon, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  title: string;
  type: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  gradientFrom: string;
  gradientTo: string;
  tags: string[];
  date: string;
  link?: {
    url: string;
    text: string;
  };
  activities?: string[];
  impact?: string;
}

export default function ProjectCard({
  title,
  type,
  description,
  icon: Icon,
  iconColor,
  gradientFrom,
  gradientTo,
  tags,
  date,
  link,
  activities,
  impact
}: ProjectCardProps) {
  return (
    <div className="group rounded-2xl border border-foreground/10 bg-background p-6 transition hover:shadow-lg hover:shadow-accent/10">
      <div className={`h-48 rounded-lg bg-gradient-to-br ${gradientFrom} ${gradientTo} mb-6 flex items-center justify-center`}>
        <Icon className={`h-16 w-16 ${iconColor}`} />
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm text-accent font-medium mb-2">{type}</p>
      
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {activities && activities.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-foreground">Activités :</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {activities.map((activity, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-accent mt-1">•</span>
                <span>{activity}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {impact && (
        <div className="mb-4">
          <h4 className="text-sm font-medium mb-2 text-foreground">Impact :</h4>
          <p className="text-sm text-muted-foreground">{impact}</p>
        </div>
      )}
      
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{date}</p>
        {link && (
          <a 
            href={link.url}
            className="text-sm text-accent hover:underline font-medium flex items-center gap-1"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {link.text}
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
