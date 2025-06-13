import {
  ApiResponse,
  HttpMethod,
  JsonServerConfig,
  JsonServerPaginatedResponse,
  JsonServerPagination,
  JsonServerQueryParams,
  PaginationLinks,
  QueryParams,
  RequestConfig
} from "./types";

export function removeTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

export function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function buildQueryString(params?: QueryParams): string {
  if (!params || Object.keys(params).length === 0) return '';

  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });

  return query.toString();
}

export function buildUrl(baseURL: string, path: string, params?: QueryParams): string {
  const normalizedBaseURL = removeTrailingSlash(baseURL);
  const normalizedPath = normalizePath(path);
  const queryString = buildQueryString(params);

  return queryString
    ? `${normalizedBaseURL}${normalizedPath}?${queryString}`
    : `${normalizedBaseURL}${normalizedPath}`;
}

export function extractTotalCount(headers: Headers): number | undefined {
  if (!headers.has('X-Total-Count')) return undefined;
  const raw = headers.get('X-Total-Count') ?? '';
  const parsed = parseInt(raw, 10);
  return isNaN(parsed) ? undefined : parsed;
}

export function extractPaginationLinks(headers: Headers): PaginationLinks {
  const raw = headers.get('Link');
  if (!raw) return {};

  return raw.split(',').reduce<PaginationLinks>((acc, part) => {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) {
      const [, url, rel] = match;
      acc[rel as keyof PaginationLinks] = url;
    }
    return acc;
  }, {});
}

export function parseJsonServerPaginationHeaders(headers: Headers): JsonServerPagination {
  const total = extractTotalCount(headers);
  const links = extractPaginationLinks(headers);
  return { total, links };
}


export function isClientError(response: Response): boolean {
  const status = response.status;
  const isError = status >= 400;
  const isClientSide = status < 500;

  return isError && isClientSide;
}

export function ensureError(error: unknown): Error {
  return error instanceof Error ? error : new Error(`Unknown error: ${error}`);
}

export function waitBeforeRetry(attempt: number): Promise<void> {
  const backoffMs = Math.pow(2, attempt) * 1000;
  return new Promise(resolve => setTimeout(resolve, backoffMs));
}

export async function tryFetchOrThrow(url: string, options: RequestInit): Promise<Response> {
  const response = await fetch(url, options);
  if (response.ok || isClientError(response)) return response;
  throw new Error(`Server error: ${response.status}`);
}

// export async function executeWithRetry(
//   url: string,
//   options: RequestInit,
//   retries: number
// ): Promise<Response> {
//   let lastError: Error;

//   for (let attempt = 0; attempt <= retries; attempt++) {
//     try {
//       return await tryFetchOrThrow(url, options);
//     } catch (error) {
//       lastError = ensureError(error);
//       if (attempt < retries) await waitBeforeRetry(attempt);
//     }
//   }

//   throw lastError!;
// }

type Fetcher = (url: string, options: RequestInit) => Promise<Response>;
type UrlBuilder = (baseURL: string, path: string, params?: Record<string, boolean | number | string | undefined>) => string;

interface ApiRequestDependencies {
  urlBuilder: UrlBuilder;
  httpClient: Fetcher;
}

/**
 * Constrói as opções de requisição para `fetch`.
 * @param options - Configurações da requisição.
 * @param clientConfig - Configurações do cliente (ex: baseURL, defaultHeaders).
 * @returns As opções de requisição formatadas para `fetch`.
 */
function buildRequestOptions(
  options: RequestConfig,
  clientConfig: JsonServerConfig
): RequestInit {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...clientConfig.defaultHeaders,
  };

  const headers = { ...defaultHeaders, ...options.headers };
  const timeout = options.timeout || clientConfig.timeout || 30000;

  const requestOptions: RequestInit = {
    method: options.method,
    headers,
    signal: AbortSignal.timeout(timeout),
  };

  return requestOptions;
}

export async function apiRequest<T>(
  dependencies: ApiRequestDependencies,
  options: RequestConfig,
  clientConfig: JsonServerConfig
): Promise<{ raw: Response; body: T }> {
  const { urlBuilder, httpClient } = dependencies;
  const { url, params } = options;

  const fullUrl = urlBuilder(clientConfig.baseURL, url, params);
  const requestOptions = buildRequestOptions(options, clientConfig);

  const response = await httpClient(fullUrl, requestOptions);
  const body: T = await response.json();

  return { raw: response, body };
}

const commonDependencies: ApiRequestDependencies = {
  urlBuilder: buildUrl,
  httpClient: fetch,
};


export async function getList<T>(
  clientConfig: JsonServerConfig,
  url: string,
  requestConfig?: Partial<RequestConfig & { params?: JsonServerQueryParams }>
): Promise<JsonServerPaginatedResponse<T[]>> {
  const response = await apiRequest<T[]>(
    commonDependencies,
    {
      method: HttpMethod.GET,
      url,
      ...requestConfig
    },
    clientConfig
  );
  const pagination = parseJsonServerPaginationHeaders(response.raw.headers);

  return {
    data: response.body,
    success: true,
    timestamp: new Date().toISOString(),
    pagination
  };
}

export async function getItem<T>(
  clientConfig: JsonServerConfig,
  url: string,
  requestConfig?: Partial<RequestConfig>
): Promise<ApiResponse<T>> {
  const response = await apiRequest<T>(
    commonDependencies,
    {
      method: HttpMethod.GET,
      url,
      ...requestConfig
    },
    clientConfig
  );

  return {
    data: response.body,
    success: true,
    timestamp: new Date().toISOString()
  };
}

export function createJsonServerClient(clientConfig: JsonServerConfig) {
  return {
    getList: <T>(url: string, requestConfig?: Partial<RequestConfig & { params?: JsonServerQueryParams }>) =>
      getList<T>(clientConfig, url, requestConfig),

    getItem: <T>(url: string, requestConfig?: Partial<RequestConfig>) =>
      getItem<T>(clientConfig, url, requestConfig),
  };
}