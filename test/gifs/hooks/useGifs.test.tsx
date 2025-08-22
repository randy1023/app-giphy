import { afterAll, describe, expect, test, vi } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useGifs } from '../../../src/gifs'
import * as gifsAction from '../../../src/gifs/actions/get-gifs-by-query.action'

//vi.mock('../../../src/gifs/actions/get-gifs-by-query.action', () => ({}))
describe('useGifs Hook', () => {
  afterAll(() => {
    vi.clearAllMocks()
  })
  test('should return with default values and methods', () => {
    const { result } = renderHook(() => useGifs())
    const {
      gifs,
      previousSearches,
      handlePreviousSearchesChange,
      handleSearchChange,
    } = result.current

    expect(gifs.length).toBe(0)
    expect(previousSearches.length).toBe(0)
    expect(typeof handleSearchChange).toBe('function')
    expect(typeof handlePreviousSearchesChange).toBe('function')
  })
  test('should return a list of Gifs call handleSearchChange ', async () => {
    const { result } = renderHook(() => useGifs())

    await act(async () => {
      await result.current.handleSearchChange('goku')
    })

    expect(result.current.gifs.length).toBe(10)
    expect(result.current.previousSearches.length).toBeGreaterThan(0)
  })
  test('should return a list of Gifs call handlePreviousSearchesChange', async () => {
    const { result } = renderHook(() => useGifs())
    await act(async () => {
      await result.current.handleSearchChange('goku')
    })

    await act(async () => {
      await result.current.handleSearchChange('naruto')
    })
    await act(async () => {
      await result.current.handlePreviousSearchesChange('naruto')
    })

    expect(result.current.gifs.length).toBe(10)
    expect(result.current.previousSearches.length).toBe(2)
  })

  test('should return a list of Gifs from cache', async () => {
    const { result } = renderHook(() => useGifs())

    await act(async () => {
      await result.current.handlePreviousSearchesChange('naruto')
    })

    expect(result.current.gifs.length).toBe(10)
    expect(result.current.previousSearches.length).toBe(1)

    vi.spyOn(gifsAction, 'getGifsByQuery').mockRejectedValue(
      new Error('Esto es un error')
    )
    await act(async () => {
      await result.current.handlePreviousSearchesChange('naruto')
    })

    expect(result.current.gifs.length).toBe(10)
  })

  test('should return no more 7 previusSearch', async () => {
    const { result } = renderHook(() => useGifs())
    vi.spyOn(gifsAction, 'getGifsByQuery').mockResolvedValue([])
    await act(async () => {
      await result.current.handleSearchChange('goku1')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku2')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku3')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku4')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku5')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku6')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku7')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku8')
    })
    await act(async () => {
      await result.current.handleSearchChange('goku9')
    })
    expect(result.current.previousSearches.length).toBe(8)
  })
})
