'use client';

import { useState } from 'react';
import { Movie } from '@/types/movie';
import { BannerFeatured } from '@/components/FeaturedSection/BannerFeatured';
import { SlideFeatured } from '@/components/FeaturedSection/SlideFeatured';

interface Props {
  movies: Movie[];
}

export function FeaturedSection({ movies }: Props) {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0]);

  return (
    <div>
      <BannerFeatured {...selectedMovie} />
      <div className="text-xl md:text-3xl lg:text-5xl font-bold mb-8 -mt-16">Trending now</div>
      <SlideFeatured movies={movies} onSelect={setSelectedMovie} selectedMovie={selectedMovie} />
    </div>
  );
}
