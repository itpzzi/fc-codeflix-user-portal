"use client";

import { Movie } from "@/types/movie";
import { addMovieExtras } from "@/utils/movieMocks";
import { MovieCard } from "@/components/MovieCard";
import { useSearchParams } from "next/navigation";

interface SearchResultsProps {
  movies: Movie[];
}

export function SearchResults({ movies }: SearchResultsProps) {
  // Adiciona os extras de mock aos filmes
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("title") || "";

  const moviesWithExtras = movies.map(addMovieExtras);

  const hasResults = movies.length > 0;

  const whenHaveMovies = () => {
    return (
      <>
        <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold mb-8">
          Search results for &quot;{searchTerm}&quot;
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 md:gap-2 xl:gap-4">
          {moviesWithExtras.map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              index={index}
              className="w-full aspect-[1] md:aspect-[2/3]"
            />
          ))}
        </div>
      </>
    )
  }

  const whenNoMovies = () => {
    return (
      <>
        <h2 className="text-xl md:text-3xl lg:text-5xl font-semibold mb-8">
          No results for &quot;{searchTerm}&quot;
        </h2>
      </>
    )
  }

  return (hasResults ? whenHaveMovies() : whenNoMovies());
}