import '../../globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EurinHash — Bientôt disponible',
  description: 'Notre site arrive très bientôt. Restez connectés.',
};

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        {children}
      </body>
    </html>
  )
}


