import { IResolvers } from '@graphql-tools/utils';
import { Movie, MovieRepository } from './types.js';

function encodeCursor(index: number): string {
    return Buffer.from(String(index)).toString('base64');
}

function decodeCursor(cursor: string): number {
    return parseInt(Buffer.from(cursor, 'base64').toString(), 10);
}

function paginateByCursor<T>(items: T[], cursor: string | null, limit: number) {
    let startIndex = cursor ? decodeCursor(cursor) : 0;
    const endIndex = items.length - 1;

    const prevIndex = startIndex - limit;
    const nextIndex = startIndex + limit;

    const hasNextPage = nextIndex < items.length;
    const hasPrevPage = prevIndex >= 0;

    const movies = items.slice(startIndex, startIndex + limit);

    return {
        movies,
        pageMeta: {
            startCursor: encodeCursor(startIndex),
            endCursor: encodeCursor(endIndex),
            nextCursor: hasNextPage ? encodeCursor(nextIndex) : null,
            prevCursor: hasPrevPage ? encodeCursor(prevIndex) : null,
        },
    };
}


interface GraphQLContext {
    movieRepository: MovieRepository;
}

export const resolvers: IResolvers<unknown, GraphQLContext> = {
    Query: {
        async movies(_, { page, limit }, { movieRepository }) {
            return movieRepository.getMovies(page, limit);
        },
        async movie(_, { id }, { movieRepository }) {
            return movieRepository.getMovie(id);
        },
        async moviesByGenre(_, { genre }, { movieRepository }) {
            return movieRepository.moviesByGenre(genre);
        },
        async featuredMovies(_, __, { movieRepository }) {
            return movieRepository.featuredMovies();
        },
        async searchMovies(_, { title, cursor, limit }, { movieRepository }) {
            const items = await movieRepository.searchMovies(title);
            return paginateByCursor<Movie>(items, cursor, limit);
        }
    },
    Movie: {
        yearLaunched(movie: Movie) {
            const regex = /(\d{4})/;
            const match = regex.exec(String(movie.yearLaunched));
            const [year] = match || [];
            return year ? parseInt(year) : 0;
        },
    }
};