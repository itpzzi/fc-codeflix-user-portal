import { createMockMovie } from '@/tests/mocks/movie';
import {
    removeTrailingSlash,
    normalizePath,
    buildQueryString,
    buildUrl,
    extractTotalCount,
    extractPaginationLinks,
    parseJsonServerPaginationHeaders,
    isClientError,
    ensureError,
    waitBeforeRetry,
    tryFetchOrThrow,
    apiRequest
} from './JsonServerApiClient'
import { HttpMethod, JsonServerQueryParams } from './types';

describe('removeTrailingSlash', () => {
    it('should remove trailing slash', () => {
        expect(removeTrailingSlash('/api/')).toEqual('/api');
    });
});

describe('normalizePath', () => {
    it('should normalize path', () => {
        expect(normalizePath('api/users')).toEqual('/api/users');
    });
    it('should keep normalized path', () => {
        expect(normalizePath('/api/users')).toEqual('/api/users');
    });
});

describe('buildQueryString', () => {
    it('should build query string with empty params', () => {
        const queryString = buildQueryString({});
        expect(queryString).toBe('');
    });

    it('should build query string with params', () => {
        const params: JsonServerQueryParams = { "_page": 1, "_limit": 20, "title_like": "title of movie" };
        const queryString = buildQueryString(params);
        expect(queryString).toBe('_page=1&_limit=20&title_like=title+of+movie');
    });
});

describe('buildUrl', () => {
    it('should build url with base, path and provided params', () => {
        const baseURL = 'https://api.example.com';
        const path = '/movies';
        const params: JsonServerQueryParams = { "_page": 1, "_limit": 20 };
        const url = buildUrl(baseURL, path, params);
        expect(url).toBe('https://api.example.com/movies?_page=1&_limit=20');
    });
});

describe('extractTotalCount', () => {
    it('should extract totalCount from headers with X-Total-Count header', () => {
        const headers = new Headers();
        headers.append('X-Total-Count', '42');
        const totalCount = extractTotalCount(headers);
        expect(totalCount).toBe(42);
    });

    it('should return undefined if no X-Total-Count header is present', () => {
        const headers = new Headers();
        const totalCount = extractTotalCount(headers);
        expect(totalCount).toBeUndefined();
    });
});

describe('extractPaginationLinks', () => {
    it('should extract pagination links from Link response header', () => {
        const headers = new Headers();
        headers.append(
            'Link',
            '<https://api.example.com/movies?_page=1&_limit=5>; rel="first", <https://api.example.com/movies?_page=1&_limit=5>; rel="prev", <https://api.example.com/movies?_page=3&_limit=5>; rel="next", <https://api.example.com/movies?_page=22&_limit=5>; rel="last"'
        );
        const links = extractPaginationLinks(headers);
        expect(links).toEqual({
            first: 'https://api.example.com/movies?_page=1&_limit=5',
            prev: 'https://api.example.com/movies?_page=1&_limit=5',
            next: 'https://api.example.com/movies?_page=3&_limit=5',
            last: 'https://api.example.com/movies?_page=22&_limit=5'
        });
    });
});

describe('parseJsonServerPaginationHeaders', () => {
    it('should parse the X-Total-Count and links headers correctly', async () => {
        const headers = new Headers();
        headers.append('X-Total-Count', '10');
        headers.append(
            'Link',
            '<https://api.example.com/movies?_page=1&_limit=5>; rel="first", <https://api.example.com/movies?_page=1&_limit=5>; rel="prev", <https://api.example.com/movies?_page=3&_limit=5>; rel="next", <https://api.example.com/movies?_page=22&_limit=5>; rel="last"'
        );
        const pagination = parseJsonServerPaginationHeaders(headers);
        expect(pagination).toEqual({
            total: 10,
            links: {
                first: 'https://api.example.com/movies?_page=1&_limit=5',
                prev: 'https://api.example.com/movies?_page=1&_limit=5',
                next: 'https://api.example.com/movies?_page=3&_limit=5',
                last: 'https://api.example.com/movies?_page=22&_limit=5'
            }
        });
    });
});

describe('isClientError', () => {
    it('should return true for a 400 error response', async () => {
        const response = { status: 404 } as Response;
        expect(isClientError(response)).toBe(true);
    });

    it('should return false for a non-400 error response', async () => {
        const response = { status: 500 } as Response;
        expect(isClientError(response)).toBe(false);
    });
});

describe('ensureError', () => {
    it('should transform an Error if the input is not an instance of Error', async () => {
        const error = 'This is a string';
        expect(ensureError(error).message).toBe('Unknown error: This is a string');
        expect(ensureError(error).name).toBe('Error');
        expect(ensureError(error).stack).toBeDefined();
    });

    it('should return the input as-is if it is already an instance of Error', async () => {
        const error = new Error('This is an error');
        expect(ensureError(error)).toBe(error);
        expect(ensureError(error).message).toBe('This is an error');
        expect(ensureError(error).name).toBe('Error');
    });
});

describe('waitBeforeRetry com spies', () => {
    let setTimeoutSpy: jest.SpyInstance;

    beforeEach(() => {
        setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    });

    afterEach(() => {
        setTimeoutSpy.mockRestore();
    });

    it('deve chamar setTimeout com diferentes tempos para diferentes attempts', () => {
        waitBeforeRetry(0);
        waitBeforeRetry(1);
        waitBeforeRetry(3);

        expect(setTimeoutSpy).toHaveBeenCalledTimes(3);
        expect(setTimeoutSpy).toHaveBeenNthCalledWith(1, expect.any(Function), 1000);
        expect(setTimeoutSpy).toHaveBeenNthCalledWith(2, expect.any(Function), 2000);
        expect(setTimeoutSpy).toHaveBeenNthCalledWith(3, expect.any(Function), 8000);
    });

});

describe('waitBeforeRetry com fake timers', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('deve aguardar 1 segundo na primeira tentativa (attempt = 0)', async () => {
        const promise = waitBeforeRetry(0);
        expect(jest.getTimerCount()).toBe(1);

        jest.advanceTimersByTime(1000);
        await expect(promise).resolves.toBeUndefined();
    });

    it('deve aguardar 2 segundos na segunda tentativa (attempt = 1)', async () => {
        const promise = waitBeforeRetry(1);
        expect(jest.getTimerCount()).toBe(1);

        jest.advanceTimersByTime(1500);
        expect(jest.getTimerCount()).toBe(1);

        jest.advanceTimersByTime(500);
        await expect(promise).resolves.toBeUndefined();
    });

    it('deve aguardar 4 segundos na terceira tentativa (attempt = 2)', async () => {
        const promise = waitBeforeRetry(2);
        expect(jest.getTimerCount()).toBe(1);

        jest.advanceTimersByTime(4000);
        await expect(promise).resolves.toBeUndefined();
    });

});


describe('tryFetchOrThrow', () => {
    global.fetch = jest.fn();
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    it('retorna a resposta quando o status for OK', async () => {
        const mockResponse = {
            ok: true,
            status: 200,
            statusText: 'OK'
        } as Response;
        mockFetch.mockResolvedValueOnce(mockResponse);

        const result = await tryFetchOrThrow('https://example.com', {});
        expect(result).toBe(mockResponse);
    });

    it('retorna a resposta quando for erro do cliente (4xx)', async () => {
        const mockResponse = {
            ok: false,
            status: 400,
            statusText: 'Bad Request'
        } as Response;
        mockFetch.mockResolvedValueOnce(mockResponse);

        const result = await tryFetchOrThrow('https://example.com', {});
        expect(result).toBe(mockResponse);
    });

    it('lança erro quando for erro do servidor (5xx)', async () => {
        const mockResponse = { status: 500 } as Response;
        mockFetch.mockResolvedValueOnce(mockResponse);

        await expect(tryFetchOrThrow('https://example.com', {}))
            .rejects
            .toThrow('Server error: 500');
    });
});


describe('apiRequest', () => {
    let mockFetch: jest.MockedFunction<typeof fetch>;

    beforeAll(() => {
        global.fetch = jest.fn();
        mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;
    });

    beforeEach(() => {
        mockFetch.mockClear();
    });

    const mockResponseBody = createMockMovie();

    const mockResponse = new Response(JSON.stringify(mockResponseBody), { status: 200 });

    const clientConfig = {
        baseURL: 'https://api.example.com',
        defaultHeaders: { Authorization: 'Bearer token' },
        timeout: 5000
    };

    const requestConfig = {
        method: HttpMethod.GET,
        url: '/movies'
    };

    it('should make a GET request to the API', async () => {
        const dependencies = {
            urlBuilder: buildUrl,
            httpClient: mockFetch as typeof fetch
        };

        mockFetch.mockResolvedValueOnce(mockResponse);

        const { raw, body } = await apiRequest(dependencies, requestConfig, clientConfig);

        expect(raw).toBeInstanceOf(Response);
        expect(body).toEqual(mockResponseBody);
        expect(raw.status).toBe(200);
        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/movies', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer token',
                'Content-Type': 'application/json'
            },
            signal: expect.any(AbortSignal)
        });
    });
});