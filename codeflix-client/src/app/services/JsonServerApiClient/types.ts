export interface ApiResponse<T = unknown> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface ParamsApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode: number;
}

export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export type QueryParams = Record<string, string | number | boolean | undefined>;

export interface RequestConfig {
  method: HttpMethod;
  url: string;
  headers?: Record<string, string>;
  params?: QueryParams;
  data?: unknown;
  timeout?: number;
  retries?: number;
  cache?: boolean;
}

export interface JsonServerQueryParams extends QueryParams {
  _sort?: string;
  _order?: 'asc' | 'desc';
  _start?: number;
  _end?: number;
  _limit?: number;
  _page?: number;
  q?: string;
}

export interface PaginationLinks {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
}

export interface JsonServerPagination {
  total?: number;
  links: PaginationLinks;
}

export interface JsonServerPaginatedResponse<T> extends ApiResponse<T> {
  pagination: JsonServerPagination;
}

export interface JsonServerConfig {
  baseURL: string;
  defaultHeaders?: Record<string, string>;
  timeout?: number;
}