export interface ApiResponse<T> {
  data: T
  status: number
  headers: Headers
}

export interface ApiError extends Error {
  status?: number
  statusText?: string
  data?: unknown
}

export interface RequestConfig<T = unknown> {
  baseURL?: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: Record<string, unknown> | Array<unknown> | T
  withCredentials?: boolean
  timeout?: number
  signal?: AbortSignal
  cache?: RequestCache
  params?: Record<string, string | number>
}
