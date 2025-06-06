'use client';

import { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import { MovieCardActions } from './MovieCardActions';
import { MovieCardInfo } from './MovieCardInfo';
import { MovieWithExtras } from '@/types/movie';
import { useImageColors } from '@/hooks/useImageColors';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface MovieCardProps {
  movie: MovieWithExtras;
  index: number;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { accentColor } = useImageColors(movie.bannerFileURL);
  const router = useRouter();

  const toggleHover = () => setIsHovered((prev) => !prev);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleHover();
    }
  };

  const handlePlay = () => router.push(movie.link)
  const handleStar = () => console.log('Star:', movie.title);
  const handleAddToList = () => console.log('Add to list:', movie.title);
  const handleShowMore = () => console.log('Show more:', movie.title);

  return (
    <div
      data-testid="movie-card"
      role="button"
      aria-label={`Filme: ${movie.title}`}
      className={clsx(
        'group relative rounded-xl overflow-hidden cursor-pointer',
        'focus:outline-2 focus:outline-white focus:outline-offset-2',
        'transition-all duration-200',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={handleKeyDown}
    >
      {/* Imagem de fundo */}
      <Image
        src={movie.bannerFileURL}
        alt={movie.title}
        fill
        className="object-cover object-top opacity-70 transition-opacity duration-300 
                   group-hover:opacity-0 group-focus-within:opacity-0"
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 p-4 flex flex-col justify-center text-white 
                    backdrop-blur-2xl backdrop-brightness-150 bg-gradient-to-t 
                    from-white/30 via-white/10 to-white/0 transition-opacity duration-200
                    ${isHovered ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100'}`}
      >
        {/* Preview */}
        <div
          className="relative aspect-video rounded-2xl overflow-hidden mb-4"
          style={{
            boxShadow: accentColor
              ? `8px 8px 32px ${accentColor}80, 0 8px 0 -4px ${accentColor}70`
              : undefined,
          }}
        >
          <Image
            src={movie.bannerFileURL}
            alt={movie.title}
            fill
            className="object-cover"
          />
        </div>

        <MovieCardActions
          onPlay={handlePlay}
          onStar={handleStar}
          onAddToList={handleAddToList}
          onShowMore={handleShowMore}
        />

        <MovieCardInfo
          title={movie.title}
          genres={movie.genres}
          description={movie.description}
          rating={movie.rating}
          duration={movie.duration}
          quality={movie.quality}
          matchPercentage={movie.matchPercentage}
        />
      </div>
    </div>
  );
}
