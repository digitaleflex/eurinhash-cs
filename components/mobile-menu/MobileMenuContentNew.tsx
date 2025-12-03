'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { User, Briefcase, Code, Eye, Mail, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMobileMenu } from './MobileMenuProvider'

const navigationItems = [
  { href: '/about', label: 'À propos', icon: User },
  { href: '/projects', label: 'Projets', icon: Briefcase },
  { href: '/skills', label: 'Compétences', icon: Code },
  { href: '/vision', label: 'Vision', icon: Eye },
  { href: '/contact', label: 'Contact', icon: Mail },
]

export function MobileMenuContentNew() {
  const { isOpen, closeMenu } = useMobileMenu()
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed right-0 top-0 h-full w-80 max-w-[85vw] z-50 bg-background border-l border-border shadow-2xl"
        >
          <div className="flex flex-col h-full">
            {/* Header du menu */}
            <div className="flex items-center justify-between p-6 border-b border-border bg-foreground/5">
              <h2 className="text-lg font-semibold text-foreground">Menu</h2>
              <button
                onClick={closeMenu}
                className="p-2 rounded-lg hover:bg-foreground/10 transition-colors"
                aria-label="Fermer le menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-2 bg-background">
              {navigationItems.map((item, index) => {
                const isActive = pathname === item.href
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={cn(
                        "group flex items-center gap-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                        isActive 
                          ? "bg-accent/15 text-accent border border-accent/30 shadow-sm" 
                          : "text-foreground hover:bg-foreground/10 hover:text-foreground border border-transparent"
                      )}
                    >
                      <item.icon className={cn(
                        "w-6 h-6 transition-colors duration-200",
                        isActive ? "text-accent" : "text-foreground/70 group-hover:text-foreground"
                      )} />
                      <span>{item.label}</span>
                      {isActive && (
                        <div className="ml-auto w-2 h-2 bg-accent rounded-full" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}
            </nav>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
