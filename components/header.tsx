'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/components/theme-provider';
import { Moon, Sun, Home, Settings, Sparkles, Compass } from 'lucide-react';

export function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <Compass className="h-7 w-7" />
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Opti'Match
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant={pathname === '/' ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden sm:inline">Accueil</span>
              </Link>
            </Button>
            <Button
              variant={pathname === '/configure' ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link href="/configure" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Configuration</span>
              </Link>
            </Button>
            <Button
              variant={pathname === '/recommendations' ? 'default' : 'ghost'}
              size="sm"
              asChild
            >
              <Link href="/recommendations" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Recommandations</span>
              </Link>
            </Button>
            <div className="h-6 w-px bg-border mx-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
