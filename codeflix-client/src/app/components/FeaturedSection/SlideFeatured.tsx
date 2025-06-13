import Image from 'next/image';
import { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

export interface SlideFeaturedProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
  selectedMovie: Movie | null;
}

const SLIDE_INTERVAL_MS = 10000;
const TOTAL_SLIDE_SLOTS = 5;

export function SlideFeatured({ movies, onSelect, selectedMovie }: SlideFeaturedProps) {
  const internalMovies = movies.slice(0, TOTAL_SLIDE_SLOTS);
  const [, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % internalMovies.length;
        onSelect(internalMovies[next]);
        return next;
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [internalMovies, onSelect]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
      {internalMovies.map((movie) => (
        <SlideItem
          key={movie.id}
          movie={movie}
          isActive={selectedMovie?.id === movie.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

interface SlideItemProps {
  movie: Movie;
  isActive: boolean;
  onSelect: (movie: Movie) => void;
}

export function SlideItem({ movie, isActive, onSelect }: SlideItemProps) {
  return (
    <div
      onClick={() => onSelect(movie)}
      className="glass-card cursor-pointer overflow-hidden aspect-video relative rounded-4xl"
    >
      <div className="absolute top-0 left-0 w-full h-full opacity-60" />
      <Image
        src={movie.bannerFileURL}
        alt={movie.title}
        width={320}
        height={180}
        className={clsx('object-cover w-full h-full', !isActive && 'opacity-20')}
      />
    </div>
  );
}