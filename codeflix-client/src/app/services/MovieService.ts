import { Movie } from "@/types/movie";
import { createJsonServerClient, JsonServerPaginatedResponse, JsonServerQueryParams } from "@/services/JsonServerApiClient";

const client = createJsonServerClient({
    baseURL: process.env.JSON_SERVER_URL || 'http://localhost:3333',
    defaultHeaders: {},
    timeout: 5000
});

export async function getMovies(params?: JsonServerQueryParams): Promise<JsonServerPaginatedResponse<Movie[]>> {
    return client.getList<Movie>('/movies', { params });
}

export async function getMovieById(id: string): Promise<Movie> {
    const response = await client.getItem<Movie>(`/movies/${id}`);
    return response.data;
}

export async function getFeaturedMovies(params?: JsonServerQueryParams): Promise<JsonServerPaginatedResponse<Movie[]>> {
    return client.getList<Movie>('/featured', { params });
}

export async function searchMovie(title: string, params?: JsonServerQueryParams): Promise<JsonServerPaginatedResponse<Movie[]>> {
    return getMovies({ ...params, "title_like": title });
}

export async function getMoviesByGenre(genre: string, params?: JsonServerQueryParams): Promise<JsonServerPaginatedResponse<Movie[]>> {
    return getMovies({ ...params, "genres_like": genre });
}