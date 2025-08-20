import React from 'react'
import { describe, expect, test } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MyCounterApp } from '../../../src/counter/components/MyCounterApp'
describe('MyCounterApp', () => {
  test('should render the components by default', () => {
    render(<MyCounterApp />)

    const h1 = screen.getByRole('heading', { level: 1 })
    const buttonLength = screen.getAllByRole('button').length

    expect(h1).toBeDefined()
    expect(h1.innerHTML).toContain('counter:')
    expect(h1.innerHTML).toContain(0)

    expect(buttonLength).toBe(3)
    expect(screen.getByText('+1')).toBeTruthy()
    expect(screen.getByText('-1')).toBeTruthy()
    expect(screen.getByText('Reset')).toBeTruthy()
  })

  test('should increment the counter', () => {
    render(<MyCounterApp />)
    const h1 = screen.getByRole('heading', { level: 1 })
    const buttonIncrement = screen.getByRole('button', { name: '+1' })
    fireEvent.click(buttonIncrement)
    expect(h1.innerHTML).toBe('counter: 1')
  })
  test('should decrement the counter', () => {
    render(<MyCounterApp />)
    const h1 = screen.getByRole('heading', { level: 1 })
    const buttonIncrement = screen.getByRole('button', { name: '+1' })
    const buttonDecrement = screen.getByRole('button', { name: '-1' })
    fireEvent.click(buttonIncrement)
    expect(h1.innerHTML).toBe('counter: 1')
    fireEvent.click(buttonDecrement)
    expect(h1.innerHTML).toBe('counter: 0')
  })

  test('should reset the counter', () => {
    render(<MyCounterApp />)
    const h1 = screen.getByRole('heading', { level: 1 })
    const buttonIncrement = screen.getByRole('button', { name: '+1' })
    const buttonReset = screen.getByRole('button', { name: 'Reset' })
    fireEvent.click(buttonIncrement)
    fireEvent.click(buttonIncrement)
    expect(h1.innerHTML).toBe('counter: 2')
    fireEvent.click(buttonReset)
    expect(h1.innerHTML).toBe('counter: 0')
  })
})
