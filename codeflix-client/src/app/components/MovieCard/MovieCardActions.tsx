import { Play, Star, ListPlus, ChevronDown } from 'lucide-react';

interface MovieCardActionsProps {
  onPlay: () => void;
  onStar: () => void;
  onAddToList: () => void;
  onShowMore: () => void;
}

export function MovieCardActions({ onPlay, onStar, onAddToList, onShowMore }: MovieCardActionsProps) {
  return (
    <div data-testid="movie-card-actions" className="flex justify-between items-center gap-3 mb-4">
      <div className="flex gap-3">
        <button
          onClick={onPlay}
          className="border border-white/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
          aria-label="Reproduzir filme"
        >
          <Play size={16} />
        </button>
        <button
          onClick={onStar}
          className="border border-white/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
          aria-label="Favoritar filme"
        >
          <Star size={16} />
        </button>
        <button
          onClick={onAddToList}
          className="border border-white/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
          aria-label="Adicionar à lista"
        >
          <ListPlus size={16} />
        </button>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onShowMore}
          className="border border-white/50 text-white rounded-full p-2 hover:bg-white/20 transition-colors"
          aria-label="Ver mais informações"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}