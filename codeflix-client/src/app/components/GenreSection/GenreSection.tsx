import { MovieCard } from '@/components/MovieCard';
import { addMovieExtras } from '@/utils/movieMocks';
import { Movie } from '@/types/movie';

interface GenreSectionProps {
  movies: Movie[];
  genreTitle: string;
}

export function GenreSection({ movies, genreTitle }: GenreSectionProps) {
  // Adiciona os extras de mock aos filmes
  const moviesWithExtras = movies.map(addMovieExtras);

  const genreId = `genre-${genreTitle.toLowerCase()}`;

  return (
    <section className="space-y-4" aria-labelledby={genreId}>
      <h2 
        id={genreId}
        className="text-xl md:text-3xl lg:text-5xl font-semibold"
        aria-label={`Filmes do gênero ${genreTitle}`}
      >
        {genreTitle}
      </h2>

      <div 
        className="relative -mx-16 overflow-x-auto scrollbar-hide no-scrollbar"
      >
        <div 
          className="flex gap-4 px-16 py-2 animate-scroll-loop"
          style={{ width: 'max-content' }}
        >
          {moviesWithExtras.map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              index={index}
              className="w-full aspect-[2/3] max-w-[20rem] min-w-[280px] flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}