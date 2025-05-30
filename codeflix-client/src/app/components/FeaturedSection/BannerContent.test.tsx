
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BannerContent } from '@/components/FeaturedSection/BannerContent';
import { Movie } from '@/types/movie';


jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
}));

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  description: 'This is a test movie description',
  yearLaunched: '2023',
  link: '/watch/test-movie',
  castMembers: ['Actor1', 'Actor2'],
  genres: ['Action', 'Adventure', 'Sci-Fi'],
  thumbFileURL: '/test-thumb.jpg',
  bannerFileURL: '/test-banner.jpg',
  videoFileURL: '/test-video.mp4',
  rating: 'L'
};

describe('BannerContent', () => {
  it('deve renderizar o título do filme', () => {
    render(<BannerContent {...mockMovie} />);
    
    expect(screen.getByText(mockMovie.title)).toHaveTextContent(mockMovie.title);
  });

  it('deve renderizar a descrição do filme', () => {
    render(<BannerContent {...mockMovie} />);
    
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });

  it('deve renderizar os botões de gênero', () => {
    render(<BannerContent {...mockMovie} />);
    
    mockMovie.genres.forEach(genre => {
      expect(screen.getByText(genre)).toBeInTheDocument();
    });
  });

  it('deve renderizar o botão "Watch Now" com link correto', () => {
    render(<BannerContent {...mockMovie} />);
    
    const watchButton = screen.getByRole('link');
    expect(watchButton).toHaveAttribute('href', mockMovie.link);
    expect(watchButton).toHaveTextContent('Watch Now');
  });

  it('deve renderizar o botão "Watch Info"', () => {
    render(<BannerContent {...mockMovie} />);
    
    const infoButton = screen.getByText('Watch Info');
    expect(infoButton).toBeInTheDocument();
    expect(infoButton.tagName).toBe('BUTTON');
  });
});
