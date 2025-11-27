'use client'

import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

const navigationItems = [
  { href: '/about', label: 'À propos' },
  { href: '/projects', label: 'Projets' },
  { href: '/skills', label: 'Compétences' },
  { href: '/vision', label: 'Vision' },
  { href: '/contact', label: 'Contact' },
] as const

// Individual navigation item component to properly use hooks
function NavItem({
  href,
  label,
  isActive
}: {
  href: string
  label: string
  isActive: boolean
}) {
  const router = useRouter()
  const prefetchedRef = useRef(false)

  const handleMouseEnter = useCallback(() => {
    if (!prefetchedRef.current) {
      router.prefetch(href)
      prefetchedRef.current = true
    }
  }, [router, href])

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={handleMouseEnter}
      className={cn(
        "transition-colors hover:text-foreground/80 relative py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm",
        isActive
          ? "text-foreground font-medium"
          : "text-foreground/60"
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
      {isActive && (
        <span
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
          aria-hidden="true"
        />
      )}
    </Link>
  )
}

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav
      className="hidden md:flex items-center gap-6 text-sm"
      aria-label="Navigation principale"
    >
      {navigationItems.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          label={item.label}
          isActive={pathname === item.href}
        />
      ))}
    </nav>
  )
}