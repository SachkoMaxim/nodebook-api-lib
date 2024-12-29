import { api } from '@/api'
import { ApiError } from '@/interfaces'
import fetchMock from 'jest-fetch-mock'

fetchMock.enableMocks()

describe('API', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  it('should make a GET request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: 'test' }))

    const response = await api.get('/test')

    expect(JSON.parse(response.data as string)).toEqual({ data: 'test' })
    expect(fetchMock).toHaveBeenCalledWith(
      '/test',
      expect.objectContaining({
        method: 'GET',
      }),
    )
  })

  it('should make a POST request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }))

    const response = await api.post('/test', { body: { key: 'value' } })

    expect(JSON.parse(response.data as string)).toEqual({ success: true })
    expect(fetchMock).toHaveBeenCalledWith(
      '/test',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ key: 'value' }),
      }),
    )
  })

  it('should handle errors properly', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ error: 'Something went wrong' }),
      { status: 500 },
    )

    try {
      await api.get('/error')
    } catch (error) {
      if (error instanceof Error && 'data' in error) {
        const apiError = error as ApiError

        expect(apiError.status).toBe(500)
        expect(apiError.statusText).toBe('Internal Server Error')

        const errorData =
          typeof apiError.data === 'string'
            ? JSON.parse(apiError.data)
            : apiError.data
        expect(errorData).toEqual({ error: 'Something went wrong' })
      } else {
        throw error
      }
    }
  })

  it('should handle timeouts', async () => {
    fetchMock.mockResponseOnce('', { status: 200 })

    const timeout = 500
    const config = { timeout }

    try {
      await api.get('/test', config)
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toBe(`Request timed out after ${timeout}ms`)
      } else {
        throw error
      }
    }
  })

  it('should handle PUT request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ updated: true }))

    const response = await api.put('/test', { body: { key: 'value' } })

    expect(JSON.parse(response.data as string)).toEqual({ updated: true })
    expect(fetchMock).toHaveBeenCalledWith(
      '/test',
      expect.objectContaining({
        method: 'PUT',
        body: JSON.stringify({ key: 'value' }),
      }),
    )
  })

  it('should handle DELETE request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ deleted: true }))

    const response = await api.delete('/test')

    expect(JSON.parse(response.data as string)).toEqual({ deleted: true })
    expect(fetchMock).toHaveBeenCalledWith(
      '/test',
      expect.objectContaining({
        method: 'DELETE',
      }),
    )
  })

  it('should handle PATCH request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ patched: true }))

    const response = await api.patch('/test', { body: { key: 'value' } })

    expect(JSON.parse(response.data as string)).toEqual({ patched: true })
    expect(fetchMock).toHaveBeenCalledWith(
      '/test',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ key: 'value' }),
      }),
    )
  })

  it('should return proper data for successful request', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ result: 'success' }))

    const response = await api.get('/success')

    const parsedData =
      typeof response.data === 'string'
        ? JSON.parse(response.data as string)
        : response.data

    expect(parsedData).toEqual({ result: 'success' })
  })

  it('should handle 404 error', async () => {
    fetchMock.mockResponseOnce('Not Found', { status: 404 })

    try {
      await api.get('/not-found')
    } catch (error) {
      if (error instanceof Error && 'data' in error) {
        const apiError = error as ApiError
        expect(apiError.status).toBe(404)
        expect(apiError.statusText).toBe('Not Found')
      } else {
        throw error
      }
    }
  })

  it('should handle 403 error', async () => {
    fetchMock.mockResponseOnce('Forbidden', { status: 403 })

    try {
      await api.get('/forbidden')
    } catch (error) {
      if (error instanceof Error && 'data' in error) {
        const apiError = error as ApiError
        expect(apiError.status).toBe(403)
        expect(apiError.statusText).toBe('Forbidden')
      } else {
        throw error
      }
    }
  })

  it('should handle invalid JSON response', async () => {
    fetchMock.mockResponseOnce('Invalid JSON', { status: 200 })

    try {
      await api.get('/invalid-json')
    } catch (error) {
      if (error instanceof Error) {
        expect(error.message).toBe('Unexpected token I in JSON at position 0')
      } else {
        throw error
      }
    }
  })
})
