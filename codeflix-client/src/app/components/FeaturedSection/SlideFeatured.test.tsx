import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SlideFeatured, SlideItem } from '@/components/FeaturedSection/SlideFeatured';
import { Movie } from '@/types/movie';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, fill, ...props }: any) => (
    <img
      src={src}
      alt={alt}
      style={fill ? {} : {}}
      {...props}
    />
  ),
}));

jest.mock('clsx', () => ({
  __esModule: true,
  default: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Test Movie 1',
    description: 'This is a test movie description',
    yearLaunched: '2023',
    link: '/watch/test-movie',
    castMembers: ['Actor1', 'Actor2'],
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    thumbFileURL: '/test-thumb.jpg',
    bannerFileURL: '/test-banner.jpg',
    videoFileURL: '/test-video.mp4',
    rating: 'L'
  },
  {
    id: 2,
    title: 'Test Movie 2',
    description: 'This is a test movie description',
    yearLaunched: '2025',
    link: '/watch/test-movie',
    castMembers: ['Actor3', 'Actor4'],
    genres: ['Drama', 'Suspense'],
    thumbFileURL: '/test-thumb.jpg',
    bannerFileURL: '/test-banner.jpg',
    videoFileURL: '/test-video.mp4',
    rating: 'L'
  },
];

const mockOnSelect = jest.fn();

// Mock dos timers
jest.useFakeTimers();

describe('SlideFeatured', () => {
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should render movie slides', () => {
    render(
      <SlideFeatured
        movies={mockMovies}
        onSelect={mockOnSelect}
        selectedMovie={mockMovies[0]}
      />
    );

    mockMovies.forEach(movie => {
      expect(screen.getByAltText(movie.title)).toBeInTheDocument();
    });
  });

  it('should call onSelect when movie is clicked', () => {
    render(
      <SlideFeatured
        movies={mockMovies}
        onSelect={mockOnSelect}
        selectedMovie={mockMovies[0]}
      />
    );

    const movieSlide = screen.getByAltText('Test Movie 2').closest('div');
    fireEvent.click(movieSlide!);

    expect(mockOnSelect).toHaveBeenCalledWith(mockMovies[1]);
  });

  it('should auto-advance slides after interval', () => {
    render(
      <SlideFeatured
        movies={mockMovies}
        onSelect={mockOnSelect}
        selectedMovie={mockMovies[0]}
      />
    );

    act(() => {
      jest.advanceTimersByTime(10000); // SLIDE_INTERVAL_MS
    });

    expect(mockOnSelect).toHaveBeenCalledWith(mockMovies[1]);
  });

  it('should limit movies to 5 slides maximum', () => {
    const manyMovies = Array.from({ length: 10 }, (_, i) => ({
      ...mockMovies[0],
      id: i + 1,
      title: `Movie ${i + 1}`,
    }));

    render(
      <SlideFeatured
        movies={manyMovies}
        onSelect={mockOnSelect}
        selectedMovie={manyMovies[0]}
      />
    );

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
  });

  it('should cleanup interval on unmount', () => {
    const { unmount } = render(
      <SlideFeatured
        movies={mockMovies}
        onSelect={mockOnSelect}
        selectedMovie={mockMovies[0]}
      />
    );

    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
  });
});

describe('SlideItem', () => {
  beforeEach(() => {
    mockOnSelect.mockClear();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should apply different opacity for inactive movies', () => {
    render(
      <SlideItem
        movie={mockMovies[0]}
        onSelect={mockOnSelect}
        isActive={false}
      />
    );

    const inactiveImage = screen.getByAltText('Test Movie 1');

    expect(inactiveImage).toHaveClass('opacity-20');
  });

  it('should not apply different opacity for active movies', () => {
    render(
      <SlideItem
        movie={mockMovies[0]}
        onSelect={mockOnSelect}
        isActive={true}
      />
    );

    const activeImage = screen.getByAltText('Test Movie 1');

    expect(activeImage).not.toHaveClass('opacity-20');
  });
});