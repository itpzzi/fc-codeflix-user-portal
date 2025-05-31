import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MovieCardActions } from './MovieCardActions';

describe('MovieCardActions', () => {
  const onPlay = jest.fn();
  const onStar = jest.fn();
  const onAddToList = jest.fn();
  const onShowMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    render(
      <MovieCardActions
        onPlay={onPlay}
        onStar={onStar}
        onAddToList={onAddToList}
        onShowMore={onShowMore}
      />
    );
  });

  it('deve chamar onPlay ao clicar no botão de play', () => {
    fireEvent.click(screen.getByLabelText('Reproduzir filme'));
    expect(onPlay).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onStar ao clicar no botão de favoritar', () => {
    fireEvent.click(screen.getByLabelText('Favoritar filme'));
    expect(onStar).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onAddToList ao clicar no botão de adicionar à lista', () => {
    fireEvent.click(screen.getByLabelText('Adicionar à lista'));
    expect(onAddToList).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onShowMore ao clicar no botão de ver mais informações', () => {
    fireEvent.click(screen.getByLabelText('Ver mais informações'));
    expect(onShowMore).toHaveBeenCalledTimes(1);
  });
});
