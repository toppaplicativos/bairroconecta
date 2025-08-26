
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Menu,
  FileBarChart,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import AuthButton from '../components/auth-button';
import Image from 'next/image';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/transparency', label: 'Transparência', icon: FileBarChart },
];

function MobileSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);
    
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Abrir menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 flex flex-col">
                 <div className="flex h-16 items-center border-b px-6">
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center gap-2 text-lg font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <Image src="https://i.postimg.cc/N0w7jhCT/Untitled-design.png" width={32} height={32} alt="Meu Bairro Logo" />
                      <span className="font-headline">Admin</span>
                    </Link>
                </div>
                <nav className="grid gap-6 text-lg font-medium p-6">
                    {navItems.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={label}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                          pathname === href && 'text-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        {label}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto p-4 border-t">
                    <AuthButton />
                  </div>
            </SheetContent>
        </Sheet>
    );
}

function DesktopSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:flex-col md:w-64 border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
          <Image src="https://i.postimg.cc/N0w7jhCT/Untitled-design.png" width={32} height={32} alt="Meu Bairro Logo" />
          <span className="font-headline text-lg">Admin</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-4 text-sm font-medium">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                pathname === href && 'bg-muted text-primary'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </div>
       <div className="mt-auto p-4 border-t">
          <AuthButton />
        </div>
    </aside>
  );
}

function MobileHeader({ title }: { title: string }) {
    return (
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:hidden">
            <MobileSidebar />
            <div className="flex-1 text-center">
                 <h1 className="text-xl font-semibold font-headline">{title}</h1>
            </div>
            <div className="w-12" />
        </header>
    );
}

export default function AdminLayout({ children, title }: { children: React.ReactNode; title: string; }) {
  const currentNavItem = navItems.find(item => item.href === usePathname());
  const pageTitle = title || currentNavItem?.label || 'Painel de Gestão';
  
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <DesktopSidebar />
      <div className="flex flex-col flex-1">
        <MobileHeader title={pageTitle} />
        <main className="flex flex-1 flex-col bg-muted/40">
          {children}
        </main>
      </div>
    </div>
  );
}
