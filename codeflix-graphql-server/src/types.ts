export type Movie = {
    id: string;
    title: string;
    description: string;
    yearLaunched: number;
    link: string;
    castMembers: string[];
    genres: string[];
    thumbFileURL: string;
    bannerFileURL: string;
    videoFileURL: string;
    rating: string;
}

export interface MovieRepository {
    getMovies(page?: number, limit?: number): Promise<Movie[]>;
    getMovie(id: string): Promise<Movie | null>;

    searchMovies(title: string): Promise<Movie[]>;
    moviesByGenre(genre: string): Promise<Movie[]>;
    featuredMovies(): Promise<Movie[]>;
}