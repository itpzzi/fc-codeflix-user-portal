'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Home, Search, Play, User, Settings } from 'lucide-react';
import clsx from 'clsx';
import { SearchBar } from '@/components/SearchBar';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Busca' },
  { href: '/watch', icon: Play, label: 'Player' },
  { href: '/profile', icon: User, label: 'Perfil' },
  { href: '/settings', icon: Settings, label: 'Config' },
];

export function BottomNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getInitialQuery = () => {
    if (pathname.includes('/search')) {
      return searchParams.get('q') || '';
    }
    return '';
  };

  const initialQuery = getInitialQuery();

  return (
    <nav className="fixed bottom-4 left-0 right-0 flex justify-center px-4 z-50 scale-110">
      <div className="glass-menu text-white/70 flex items-center w-full max-w-xl md:max-w-2xl lg:max-w-md px-4 py-2 rounded-full shadow-lg backdrop-blur-lg">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname.startsWith(href);

          if (href === '/search') {
            return (
              <SearchBar
                key={href}
                icon={<Icon className="w-5 h-5" />}
                label={label}
                placeholder="Buscar..."
                routeBase="/search"
                initialQuery={initialQuery}
              />
            );
          }

          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={clsx(
                'transition-all duration-200 p-2 rounded-full flex-1 flex justify-center mx-1',
                isActive ? 'scale-110 bg-white/40' : 'hover:text-white'
              )}
            >
              <Icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
