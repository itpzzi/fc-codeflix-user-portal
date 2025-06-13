import React from 'react';
import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { useSearchParams } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
    useSearchParams: jest.fn(),
    useRouter: jest.fn(),
}));

jest.mock('@/components/MovieCard', () => ({
    MovieCard: () => <div>MovieCard</div>
}));

const mockedUseSearchParams = useSearchParams as jest.Mock;

describe('SearchResults', () => {
    it('deve renderizar legenda de filmes vazios com o termo pesquisado', () => {
        mockedUseSearchParams.mockReturnValue({
            get: jest.fn().mockImplementation((key) => {
                if (key === 'title') return 'Termo Pesquisa';
            })
        });
        render(<SearchResults movies={[]} />);
        expect(screen.getByText('No results for "Termo Pesquisa"')).toBeInTheDocument();
        expect(screen.queryAllByRole('movie-card').length).toBe(0);
    });

    it('deve renderizar cards de filmes e legenda com o termo pesquisado', () => {
        mockedUseSearchParams.mockReturnValue({
            get: jest.fn().mockImplementation((key) => {
                if (key === 'title') return 'Termo Pesquisa';
            })
        });
        // @ts-expect-error - passando mock não-tipado de filmes, pois o foco do teste é a contagem de renderizações
        render(<SearchResults movies={[1, 2, 3]} />);

        expect(screen.getByText('Search results for "Termo Pesquisa"')).toBeInTheDocument();
        expect(screen.queryAllByText('MovieCard').length).toBe(3);
    });
});