import { SearchResults } from "@/components/SearchResults";
import { searchMovie } from "@/services/MovieService";
import React from "react";

interface ISearchParams {
  title?: string;
}

interface ISearchProps {
  searchParams: ISearchParams;
}

export default async function Search({ searchParams }: ISearchProps) {
  const { title } = searchParams;

  const resultMovies = await searchMovie(title || '');

  return (
    <SearchResults movies={resultMovies.data} />
  );
}