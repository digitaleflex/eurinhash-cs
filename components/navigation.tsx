/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useHoverPrefetch } from '@/hooks/use-smart-prefetch'

const navigationItems = [
  { href: '/about', label: 'À propos' },
  { href: '/projects', label: 'Projets' },
  { href: '/skills', label: 'Compétences' },
  { href: '/vision', label: 'Vision' },
  { href: '/contact', label: 'Contact' },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="hidden md:flex items-center gap-6 text-sm">
      {navigationItems.map((item) => {
        const hoverProps = useHoverPrefetch(item.href);
        
        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false} // Désactivé car on utilise le hover prefetch
            {...hoverProps}
            className={cn(
              "transition-colors hover:text-foreground/80 relative py-2",
              pathname === item.href 
                ? "text-foreground font-medium" 
                : "text-foreground/60"
            )}
          >
            {item.label}
            {pathname === item.href && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
            )}
          </Link>
        );
      })}
    </nav>
  )
}