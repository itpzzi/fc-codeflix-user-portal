import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BannerFeatured, BannerFeaturedProps } from '@/components/FeaturedSection/BannerFeatured';
import { Movie } from '@/types/movie';
import { createMockMovie } from '@/tests/mocks/movie';

jest.mock('./BannerContent', () => ({
  BannerContent: ({ title, description }: BannerFeaturedProps) => (
    <div data-testid="banner-content">
      <p>{title}</p>
      <p>{description}</p>
    </div>
  ),
}));

const mockMovie: Movie = createMockMovie();

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
