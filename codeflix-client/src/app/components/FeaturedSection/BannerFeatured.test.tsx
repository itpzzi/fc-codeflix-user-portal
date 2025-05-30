import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BannerFeatured } from '@/components/FeaturedSection/BannerFeatured';
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


jest.mock('./BannerContent', () => ({
  BannerContent: ({ title, description }: any) => (
    <div data-testid="banner-content">
      <p>{title}</p>
      <p>{description}</p>
    </div>
  ),
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

describe('BannerFeatured', () => {
  it('deve renderizar o vídeo de fundo com poster e atributos corretos', () => {
    const { container } = render(<BannerFeatured {...mockMovie} />);

    const video = container.querySelector('video') as HTMLVideoElement;
    expect(video).toBeInTheDocument();
    expect(video).toHaveAttribute('src', mockMovie.videoFileURL);
    expect(video).toHaveAttribute('poster', mockMovie.bannerFileURL);
    expect(video).toHaveAttribute('autoplay');
    expect(video).toHaveAttribute('loop');
    expect(video.muted).toBe(true);
  });

  it('deve renderizar a imagem fallback para mobile', () => {
    render(<BannerFeatured {...mockMovie} />);

    const image = screen.getByAltText(mockMovie.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockMovie.bannerFileURL);
  });

  it('deve renderizar o componente filho com detalhes do filme', () => {
    render(<BannerFeatured {...mockMovie} />);

    const movieDetails = screen.getByTestId('banner-content');
    expect(movieDetails).toBeInTheDocument();
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.description)).toBeInTheDocument();
  });
});
