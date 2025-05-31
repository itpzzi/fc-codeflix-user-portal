import { Movie, MovieWithExtras } from "@/types/movie";

const randomInteger = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const qualityOptions = ['HD', 'FHD', 'UHD', '4K', '8K'];

export const addMovieExtras = (movie: Movie): MovieWithExtras => ({
  ...movie,
  matchPercentage: randomInteger(0, 100),
  quality: qualityOptions[randomInteger(0, 3)],
  duration: randomInteger(30, 240),
});

export const formatDuration = (duration: number): string => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

export const getMatchColor = (percentage: number): string => {
  if (percentage < 30) return "#FF6B6B";
  if (percentage < 60) return "#FFD93D";
  return "#6BCB77";
};