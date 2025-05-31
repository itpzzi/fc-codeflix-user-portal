import { Movie, MovieWithExtras } from '@/types/movie';

const mockMovie: Movie = {
    id: 1,
    title: 'Test Movie 1',
    description: 'This is a test movie description',
    yearLaunched: '2023',
    link: '/watch/1',
    castMembers: ['Actor1', 'Actor2'],
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    thumbFileURL: '/test-thumb.jpg',
    bannerFileURL: '/test-banner.jpg',
    videoFileURL: '/test-video.mp4',
    rating: 'L'
};

const mockExtras = {
    matchPercentage: 82,
    quality: 'FHD',
    duration: 120
};



export const createMockMovie = (overrides: Partial<Movie> = {}): Movie => ({
    ...mockMovie,
    ...overrides,
});

export const createMockMovieWithExtras = (overrides: Partial<MovieWithExtras> = {}): MovieWithExtras => ({
    ...mockMovie,
    ...mockExtras,
    ...overrides,
});
