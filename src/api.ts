export const apiVersion = '1.0.0'

export function helloWorld(): string {
  return 'Hello, world!'
}

console.log('API module loaded successfully')

export interface ApiResponse<T> {
  data: T
  status: number
  headers: Record<string, string>
}

export interface ApiError {
  message: string
  statusCode: number
}
