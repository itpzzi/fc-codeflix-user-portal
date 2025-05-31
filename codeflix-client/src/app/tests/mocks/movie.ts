import { Movie } from '@/types/movie';

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

export const createMockMovie = (overrides: Partial<Movie> = {}): Movie => ({
    ...mockMovie,
    ...overrides,
});
