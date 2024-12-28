export interface ApiResponse<T> {
    data: T;
    status: number;
    headers: Headers;
}
export interface ApiError extends Error {
    status?: number;
    statusText?: string;
    data?: unknown;
}
export interface RequestConfig<T = unknown> {
    baseURL?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    headers?: Record<string, string>;
    body?: Record<string, unknown> | Array<unknown> | T;
    withCredentials?: boolean;
    timeout?: number;
    signal?: AbortSignal;
    cache?: RequestCache;
}
export type GetConfig = Omit<RequestConfig, 'method'>;
export type PostConfig = Omit<RequestConfig, 'method'>;
export type PutConfig = Omit<RequestConfig, 'method'>;
export type DeleteConfig = Omit<RequestConfig, 'method'>;
export type PatchConfig = Omit<RequestConfig, 'method'>;
declare const api: {
    get: <T>(url: string, config?: GetConfig) => Promise<ApiResponse<T>>;
    post: <T>(url: string, config?: PostConfig) => Promise<ApiResponse<T>>;
    put: <T>(url: string, config?: PutConfig) => Promise<ApiResponse<T>>;
    delete: <T>(url: string, config?: DeleteConfig) => Promise<ApiResponse<T>>;
    patch: <T>(url: string, config?: PatchConfig) => Promise<ApiResponse<T>>;
};
export default api;
