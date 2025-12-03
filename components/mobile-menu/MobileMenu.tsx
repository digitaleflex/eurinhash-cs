'use client'

import { MobileMenuProvider } from './MobileMenuProvider'
import { MobileMenuButton } from './MobileMenuButton'
import { MobileMenuOverlay } from './MobileMenuOverlay'
import { MobileMenuContent } from './MobileMenuContent'

interface MobileMenuProps {
  className?: string
}

export function MobileMenu({ className = '' }: MobileMenuProps) {
  return (
    <MobileMenuProvider>
      <div className={`relative ${className}`}>
        <MobileMenuButton />
        <MobileMenuOverlay />
        <MobileMenuContent />
      </div>
    </MobileMenuProvider>
  )
}
