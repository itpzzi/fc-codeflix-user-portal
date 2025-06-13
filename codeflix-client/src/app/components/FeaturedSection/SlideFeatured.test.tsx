import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SlideFeatured, SlideItem } from '@/components/FeaturedSection/SlideFeatured';
import { Movie } from '@/types/movie';
import { createMockMovie } from '@/tests/mocks/movie';

jest.mock('clsx', () => ({
  __esModule: true,
  default: (...classes: string[]) => classes.filter(Boolean).join(' '),
}));

const mockMovies: Movie[] = [
  createMockMovie(),
  createMockMovie(
    {
      id: 2,
      title: 'Test Movie 2',
      yearLaunched: '2025',
      castMembers: ['Actor3', 'Actor4'],
      link: '/watch/2',
    }
  )
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