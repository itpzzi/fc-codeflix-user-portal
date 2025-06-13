import { gql } from '@apollo/client';
import { apolloClient } from '@/lib/apolloClient';

export const MOVIE_FRAGMENT = gql`
  fragment MovieFragment on Movie {
    __typename
    id
    title
    description
    yearLaunched
    link
    castMembers
    genres
    thumbFileURL
    bannerFileURL
    videoFileURL
    rating
  }
`;

export const GET_MOVIES = gql`
  query Movies($page: Int, $limit: Int) {
    movies(page: $page, limit: $limit) {
      ...MovieFragment
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const GET_MOVIE_BY_ID = gql`
  query MovieByID($id: ID!) {
    movie(id: $id) {
      ...MovieFragment
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const GET_MOVIES_BY_GENRE = gql`
  query MoviesByGenre($genre: String!) {
    moviesByGenre(genre: $genre) {
      ...MovieFragment
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const SEARCH_MOVIES_PAGINATED = gql`
  query SearchForMoviesPaginated($title: String!, $cursor: String, $limit: Int) {
    searchMovies(title: $title, cursor: $cursor, limit: $limit) {
      movies {
        ...MovieFragment
      }
      pageMeta {
        startCursor
        endCursor
        nextCursor
        prevCursor
      }
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const getMovies = async () => {
  const { data } = await apolloClient.query({
    query: GET_MOVIES,
    variables: {},
  });

  return {
    data: data.movies
  }
}

export const getMovieById = async (id: string) => {
  const { data } = await apolloClient.query({
    query: GET_MOVIE_BY_ID,
    variables: { id },
  });

  return data.movie;
};

export const getMoviesByGenre = async (genre: string) => {
  const { data } = await apolloClient.query({
    query: GET_MOVIES_BY_GENRE,
    variables: { genre }
  });

  return {
    data: data.moviesByGenre
  };
};

export const searchMoviesPaginated = async ({ title, cursor, limit }: any) => {
  const { data } = await apolloClient.query({
    query: SEARCH_MOVIES_PAGINATED,
    variables: {
      title,
      cursor,
      limit
    },
  });

  return {
    data: data.searchMovies.movies,
    pageMeta: data.searchMovies.pageMeta
  };
};          