'use client';

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  icon: React.ReactNode;
  label: string;
  placeholder?: string;
  initialQuery?: string;
  routeBase?: string;
}

export function SearchBar({
  icon,
  label,
  placeholder = 'Search...',
  initialQuery = '',
  routeBase = '/search',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`${routeBase}?title=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white/20 rounded-full px-3 py-1 mx-1 flex-[3] min-w-[120px]"
    >
      <div className="text-white mr-2" aria-hidden="true">
        {icon}
      </div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        className="bg-transparent border-none outline-none text-white placeholder-white/70 w-full"
      />
    </form>
  );
}
