import React from 'react'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MyCounterApp } from '../../../src/counter/components/MyCounterApp'
//import { useCounter } from '../../../src/shared/hooks/useCounter'

const incrementMock = vi.fn()
const decrementMock = vi.fn()
const resetMock = vi.fn()
vi.mock('../../../src/shared/hooks/useCounter', () => ({
  useCounter: () => ({
    counter: 20,
    increment: incrementMock,
    decrement: decrementMock,
    reset: resetMock,
  }),
}))

describe('MyCounterApp', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  test('should render the components by default', () => {
    render(<MyCounterApp />)

    const h1 = screen.getByRole('heading', { level: 1 })
    const buttonLength = screen.getAllByRole('button').length

    expect(h1).toBeDefined()
    expect(h1.innerHTML).toContain('counter:')
    expect(h1.innerHTML).toContain(20)

    expect(buttonLength).toBe(3)
    expect(screen.getByText('+1')).toBeTruthy()
    expect(screen.getByText('-1')).toBeTruthy()
    expect(screen.getByText('Reset')).toBeTruthy()
  })

  test('should call increment function if button +1 is clicked', () => {
    render(<MyCounterApp />)

    const buttonIncrement = screen.getByRole('button', { name: '+1' })
    fireEvent.click(buttonIncrement)

    expect(incrementMock).toHaveBeenCalled()
    expect(incrementMock).toHaveBeenCalledTimes(1)
    expect(decrementMock).not.toHaveBeenCalled()
    expect(resetMock).not.toHaveBeenCalled()
    screen.debug()
  })
  // test('should decrement the counter', () => {
  //   render(<MyCounterApp />)
  //   const h1 = screen.getByRole('heading', { level: 1 })
  //   const buttonIncrement = screen.getByRole('button', { name: '+1' })
  //   const buttonDecrement = screen.getByRole('button', { name: '-1' })
  //   fireEvent.click(buttonIncrement)
  //   expect(h1.innerHTML).toBe('counter: 1')
  //   fireEvent.click(buttonDecrement)
  //   expect(h1.innerHTML).toBe('counter: 0')
  // })

  // test('should reset the counter', () => {
  //   render(<MyCounterApp />)
  //   const h1 = screen.getByRole('heading', { level: 1 })
  //   const buttonIncrement = screen.getByRole('button', { name: '+1' })
  //   const buttonReset = screen.getByRole('button', { name: 'Reset' })
  //   fireEvent.click(buttonIncrement)
  //   fireEvent.click(buttonIncrement)
  //   expect(h1.innerHTML).toBe('counter: 2')
  //   fireEvent.click(buttonReset)
  //   expect(h1.innerHTML).toBe('counter: 0')
  // })
})
