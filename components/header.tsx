'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Agent IT
          </Link>
          <div className="flex gap-2">
            <Button
              variant={pathname === '/' ? 'default' : 'ghost'}
              asChild
            >
              <Link href="/">Accueil</Link>
            </Button>
            <Button
              variant={pathname === '/configure' ? 'default' : 'ghost'}
              asChild
            >
              <Link href="/configure">Configuration</Link>
            </Button>
            <Button
              variant={pathname === '/recommendations' ? 'default' : 'ghost'}
              asChild
            >
              <Link href="/recommendations">Recommandations</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
