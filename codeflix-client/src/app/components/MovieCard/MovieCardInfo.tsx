import { formatDuration, getMatchColor } from '@/utils/movieMocks';

interface MovieCardInfoProps {
  title: string;
  genres: string[];
  description: string;
  rating: string;
  duration: number;
  quality: string;
  matchPercentage: number;
}

export function MovieCardInfo({
  title,
  genres,
  description,
  rating,
  duration,
  quality,
  matchPercentage
}: MovieCardInfoProps) {
  return (
    <div data-testid="movie-card-info" className="space-y-3">
      <div className="space-y-2">
        <h4 className="text-sm font-semibold line-clamp-1">{title}</h4>

        <div className="flex text-xs text-gray-200/75 gap-3">
          {genres.join(" • ")}
        </div>

        <p className="text-xs text-gray-200 line-clamp-2">{description}</p>
      </div>

      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-4">
          <span className="border border-white/50 text-white/75 px-3 py-1 uppercase text-xs">
            {rating}
          </span>
          <span className="text-white/75 font-semibold">
            {formatDuration(duration)}
          </span>
          <span className="text-white/75 font-semibold">
            {quality}
          </span>
        </div>

        <span
          className="text-sm font-semibold opacity-75"
          style={{ color: getMatchColor(matchPercentage) }}
        >
          Match {matchPercentage}%
        </span>
      </div>
    </div>
  );
}