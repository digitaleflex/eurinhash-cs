import type { ReactNode } from 'react';
import { DashboardSidebar } from '@/components/dashboard/sidebar';

export const metadata = {
  title: 'Tableau de bord',
  robots: { index: false, follow: false },
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />
      <main className="flex-1 p-6 pb-24 lg:p-8">{children}</main>
    </div>
  );
}
