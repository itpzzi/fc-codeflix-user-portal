import { render, screen } from '@testing-library/react';
import { GenreSection } from './GenreSection';
import { Movie } from '@/types/movie';
import { createMockMovie } from '@/tests/mocks/movie';
import '@testing-library/jest-dom';

jest.mock('@/components/MovieCard', () => ({
  MovieCard: ({ movie, index }: { index: number; movie: Movie }) => (
    <div data-testid="movie-card" data-index={index}>
      {movie.title}
    </div>
  ),
}));

const mockMovie: Movie = createMockMovie();

jest.mock('@/utils/movieMocks', () => ({
  addMovieExtras: (movie: Movie) => ({
    ...createMockMovie(movie),
    matchPercentage: 90,
    quality: 'HD',
    duration: 120,
  }),
}));

const mockMovies: Movie[] = [
  ...Array.from({ length: 8 }).map(() => mockMovie)
];

describe('GenreSection', () => {
  it('deve renderizar a quantidade correta de MovieCards', () => {
    render(<GenreSection movies={mockMovies} genreTitle="Action" />);
    const cards = screen.getAllByTestId('movie-card');
    expect(cards).toHaveLength(8);
  });

  it('deve renderizar o título do gênero corretamente', () => {
    const genreTitle = "Comedy";
    render(<GenreSection movies={mockMovies} genreTitle={genreTitle} />);
    const titleElement = screen.getByRole('heading', { level: 2, name: `Filmes do gênero ${genreTitle}` });
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(genreTitle);
  });

  it('deve ter o atributo aria-labelledby no section com o id correto', () => {
    const genreTitle = "Drama";
    render(<GenreSection movies={mockMovies} genreTitle={genreTitle} />);
    const sectionElement = screen.getByRole('region', { name: `Filmes do gênero ${genreTitle}` });
    const expectedId = `genre-${genreTitle.toLowerCase()}`;
    expect(sectionElement).toHaveAttribute('aria-labelledby', expectedId);
  });

  it('deve ter o id correto no título', () => {
    const genreTitle = "Fantasy";
    render(<GenreSection movies={mockMovies} genreTitle={genreTitle} />);
    const titleElement = screen.getByRole('heading', { level: 2, name: `Filmes do gênero ${genreTitle}` });
    const expectedId = `genre-${genreTitle.toLowerCase()}`;
    expect(titleElement).toHaveAttribute('id', expectedId);
  });
});