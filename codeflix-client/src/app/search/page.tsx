import { SearchResults } from "@/components/SearchResults";
import { searchMoviesPaginated } from "@/services/MovieQuery";
// import { searchMovie } from "@/services/MovieService";
import React from "react";

interface ISearchParams {
  title?: string;
}

interface SearchProps {
  searchParams: Promise<ISearchParams>
}

export default async function Search({ searchParams }: SearchProps) {
  const { title } = await searchParams;

  const resultMovies = await searchMoviesPaginated({
    title: title || '',
    limit: 10,
  });
  // const resultMovies = await searchMovie(title || '');

  return (
    <SearchResults
      movies={resultMovies.data}
    />
  );
}