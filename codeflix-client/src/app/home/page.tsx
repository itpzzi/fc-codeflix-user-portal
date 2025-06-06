import React from "react";
import { FeaturedSection } from "@/components/FeaturedSection";
import { GenreSection } from "@/components/GenreSection";
import { StateSimulator } from "@/components/StateSimulator";
import { getFeaturedMovies, getMoviesByGenre } from "@/services/MovieService";

const genres = [
  "Drama",
  "Sci-Fi",
  "Thriller",
  "Crime",
  "Animation",
  "Adventure",
  "Fantasy",
  "Horror",
  "Comedy",
  "Action",
  "Mystery",
];

// const genreIcons = new Map<string, React.ReactNode>([
//   ["Drama", <Drama width={120} height={120} />],
//   ["Sci-Fi", <Dna width={120} height={120} />],
//   ["Thriller", <Skull width={120} height={120} />],
//   ["Crime", <Siren width={120} height={120} />],
//   ["Animation", <Sparkles width={120} height={120} />],
//   ["Adventure", <TentTree width={120} height={120} />],
//   ["Fantasy", <Swords width={120} height={120} />],
//   ["Horror", <Ghost width={120} height={120} />],
//   ["Comedy", <MicVocal width={120} height={120} />],
//   ["Action", <HeartPulse width={120} height={120} />],
//   ["Mystery", <BrainCog width={120} height={120} />],
//   ["Family", <Baby width={120} height={120} />],
// ]);

export default async function Home() {

  const featuredMovies = await getFeaturedMovies();

  const requestsByGenres = genres.map(async (genre) => {
    const movies = await getMoviesByGenre(genre)
    return {
      genreTitle: genre,
      movies,
    };
  });

  const moviesByGenre = await Promise.all(requestsByGenres);

  return (
    <>
      <FeaturedSection movies={featuredMovies.data} />
      <StateSimulator />
      {moviesByGenre.map(({ genreTitle, movies },) => (
        <GenreSection
          key={genreTitle}
          genreTitle={genreTitle}
          movies={movies.data}
        />
      ))}
    </>
  );
}