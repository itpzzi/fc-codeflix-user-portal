import { Movie, MovieRepository } from "./types.js";

const API_URL = process.env.API_URL || 'http://localhost:3333';

export class InMemoryMovieRepository implements MovieRepository {
    async getMovies(page = 1, limit = 10): Promise<Movie[]> {
        const res = await fetch(`${API_URL}/movies?_page=${page}&_limit=${limit}`);
        return res.json();
    }

    async getMovie(id: string): Promise<Movie | null> {
        const res = await fetch(`${API_URL}/movies/${id}`);
        return res.json();
    }

    async searchMovies(title: string): Promise<Movie[]> {
        const res = await fetch(`${API_URL}/movies?title_like=${encodeURIComponent(title)}`);
        return res.json();
    }

    async moviesByGenre(genre: string): Promise<Movie[]> {
        const res = await fetch(`${API_URL}/movies?genres_like=${encodeURIComponent(genre)}`);
        return res.json();
    }

    async featuredMovies(): Promise<Movie[]> {
        const res = await fetch(`${API_URL}/featured`);
        return res.json();
    }
}
