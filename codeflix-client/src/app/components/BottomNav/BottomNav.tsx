  'use client';

  import Link from 'next/link';
  import { usePathname } from 'next/navigation';
  import { Home, Search, Play, User, Settings } from 'lucide-react';
  import clsx from 'clsx';

  const navItems = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/search', icon: Search, label: 'Busca' },
    { href: '/player', icon: Play, label: 'Player' },
    { href: '/profile', icon: User, label: 'Perfil' },
    { href: '/settings', icon: Settings, label: 'Config' },
  ];

  export function BottomNav() {
    const pathname = usePathname();

    return (
      <nav className="fixed bottom-4 left-0 right-0 flex justify-center px-4">
        <div className="glass-menu text-white/70 flex justify-around items-center w-full max-w-xl md:max-w-2xl lg:max-w-md px-4 py-2 rounded-full shadow-lg">
          {navItems.map(({ href, icon: Icon, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={clsx(
                  'transition-transform duration-200 p-2 rounded-full',
                  isActive
                    ? 'scale-120 bg-white/40'
                    : ' hover:text-white'
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
