import { describe, expect, test } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useCounter } from '../../../src/shared'

describe('useCounter', () => {
  test('should initialize with default value', () => {
    const { result } = renderHook(() => useCounter())
    const { counter } = result.current

    expect(counter).toBe(0)
  })

  test('should initialize with new value 20', () => {
    const initialValue: number = 20
    const { result } = renderHook(() => useCounter(initialValue))
    const { counter } = result.current

    expect(counter).toBe(initialValue)
  })

  test('should increment when call increment function ', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.counter).toBe(1)
  })

  test('should decrement when call decrement function ', () => {
    const { result } = renderHook(() => useCounter(10))

    act(() => {
      result.current.decrement()
    })

    expect(result.current.counter).toBe(9)
  })

  test('should reset defaul value when call reset function ', () => {
    const { result } = renderHook(() => useCounter(10))

    act(() => {
      result.current.increment()
    })
    act(() => {
      result.current.increment()
    })
    act(() => {
      result.current.increment()
    })

    act(() => {
      result.current.reset()
    })
    expect(result.current.counter).toBe(10)
  })
})
