/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useHoverPrefetch } from '@/hooks/use-smart-prefetch'
import { ArrowRight, User, Briefcase, Code, Eye, Mail } from 'lucide-react'

const navigationItems = [
  { href: '/about', label: 'À propos', icon: User },
  { href: '/projects', label: 'Projets', icon: Briefcase },
  { href: '/skills', label: 'Compétences', icon: Code },
  { href: '/vision', label: 'Vision', icon: Eye },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-1 text-sm">
      {navigationItems.map((item) => {
        const hoverProps = useHoverPrefetch(item.href);
        const isActive = pathname === item.href;
        
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false}
            {...hoverProps}
            className={cn(
              "group relative flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200",
              isActive 
                ? "bg-accent/10 text-accent font-medium shadow-sm" 
                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            )}
          >
            <item.icon className={cn(
              "w-4 h-4 transition-all duration-200",
              isActive ? "text-accent" : "text-foreground/60 group-hover:text-foreground"
            )} />
            <span className="font-medium">{item.label}</span>
            
            {/* Indicateur actif */}
            {isActive && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full" />
            )}
            
            {/* Effet hover */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          </Link>
        );
      })}
      
      {/* CTA spécial */}
      <div className="ml-2 pl-2 border-l border-foreground/10">
        <Link
          href="/start-project"
          className="group flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-lg font-medium transition-all duration-200 hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
        >
          <span>Démarrer un projet</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>
    </nav>
  )
}