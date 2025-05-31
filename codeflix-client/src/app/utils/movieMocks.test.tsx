import { addMovieExtras, formatDuration, getMatchColor } from '@/utils/movieMocks';
import { Movie } from '@/types/movie';
import { createMockMovie } from '@/tests/mocks/movie';

describe('addMovieExtras', () => {
  it('deve adicionar matchPercentage, quality e duration ao objeto do filme', () => {
    const movie: Movie = createMockMovie();

    const movieWithExtras = addMovieExtras(movie);

    expect(movieWithExtras).toHaveProperty('matchPercentage');
    expect(typeof movieWithExtras.matchPercentage).toBe('number');
    expect(movieWithExtras).toHaveProperty('quality');
    expect(['HD', 'FHD', 'UHD', '4K']).toContain(movieWithExtras.quality);
    expect(movieWithExtras).toHaveProperty('duration');
    expect(typeof movieWithExtras.duration).toBe('number');
  });
});

describe('formatDuration', () => {
  it('deve formatar corretamente a duração em horas e minutos', () => {
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(45)).toBe('0h 45m');
    expect(formatDuration(120)).toBe('2h 0m');
  });
});

describe('getMatchColor', () => {
  it('deve retornar cor vermelha para porcentagem abaixo de 30', () => {
    expect(getMatchColor(10)).toBe('#FF6B6B');
  });

  it('deve retornar cor amarela para porcentagem entre 30 e 59', () => {
    expect(getMatchColor(45)).toBe('#FFD93D');
  });

  it('deve retornar cor verde para porcentagem 60 ou mais', () => {
    expect(getMatchColor(85)).toBe('#6BCB77');
  });
});
