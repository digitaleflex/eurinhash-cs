import {
  LayoutDashboard,
  Users,
  Mail,
  Settings,
  ShieldCheck,
  Calendar,
  FileText,
  Activity,
} from 'lucide-react';
import type { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/authorization';
import Link from 'next/link';
import { AdminMobileNav } from '@/components/admin/MobileNav';
import { AdminNavItem } from '@/components/admin/AdminNavItem';
import { ToastProvider, ToastViewport } from '@/components/ui/toast';

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  let session;
  try {
    session = await requireAdmin();
  } catch {
    redirect('/dashboard');
  }

  return (
    <ToastProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        {/* Admin Sidebar - Desktop only */}
        <DesktopSidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Header session={session} />
          <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-secondary/5">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </div>
      <ToastViewport />
    </ToastProvider>
  );
}

function DesktopSidebar() {
  return (
    <aside className="w-64 border-r border-border bg-card hidden lg:flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-border flex items-center gap-2">
        <ShieldCheck className="w-6 h-6 text-accent" />
        <span className="font-bold tracking-tight text-lg uppercase">
          Portal Admin
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-4">
          Management
        </p>

        <AdminNavItem
          href="/admin"
          icon={<LayoutDashboard />}
          label="Vue d'ensemble"
        />
        <AdminNavItem
          href="/admin/users"
          icon={<Users />}
          label="Utilisateurs"
        />
        <AdminNavItem href="/admin/messages" icon={<Mail />} label="Messages" />
        <AdminNavItem
          href="/admin/evenements"
          icon={<Calendar />}
          label="Événements"
        />
        <AdminNavItem
          href="/admin/blog"
          icon={<FileText />}
          label="Blog"
        />

        <div className="pt-8">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-4">
            Système
          </p>
          <AdminNavItem
            href="/admin/settings"
            icon={<Settings />}
            label="Configuration"
          />
          <AdminNavItem
            href="/admin/logs"
            icon={<Activity />}
            label="Logs Système"
          />
        </div>
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Retour Client
        </Link>
      </div>
    </aside>
  );
}

function Header({ session }: { session: any }) {
  return (
    <header className="h-16 border-b border-border bg-background/50 backdrop-blur-md sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AdminMobileNav />
        <Link href="/admin" className="hidden md:flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-accent" />
          <span className="font-bold hidden sm:inline">Admin Panel</span>
        </Link>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <div className="text-right hidden xs:block">
          <p className="text-xs font-bold leading-none">{session.user.name}</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">
            Admin
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-accent/5 flex items-center justify-center border border-accent/20">
          {session.user.image ? (
            <img
              src={session.user.image}
              alt=""
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <Users className="w-4 h-4 text-accent" />
          )}
        </div>
      </div>
    </header>
  );
}
