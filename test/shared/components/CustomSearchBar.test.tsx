import React from 'react'
import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { CustomSearchBar } from '../../../src/shared'
import { afterEach } from 'node:test'
describe('CustomSearchBar', () => {
  afterEach(() => {
    vi.clearAllMocks()
    vi.clearAllTimers()
  })
  test('should render with default value', () => {
    render(<CustomSearchBar onSearchChange={() => {}} />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: 'Buscar' })

    expect(input.getAttribute('placeholder')).toBe('Buscar...')
    expect(input.getAttribute('value')).toBe('')
    expect(input.getAttribute('type')).toBe('text')
    expect(button.innerHTML).toBe('Buscar')
  })
  test('should render with custom value', () => {
    render(
      <CustomSearchBar
        placeHolder='Buscar geniales gifs'
        buttonText='Buscar gifs'
        onSearchChange={() => {}}
      />
    )

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: 'Buscar gifs' })

    expect(input.getAttribute('placeholder')).toBe('Buscar geniales gifs')
    expect(input.getAttribute('value')).toBe('')
    expect(input.getAttribute('type')).toBe('text')
    expect(button.innerHTML).toBe('Buscar gifs')
  })

  test('should render with default value', () => {
    render(<CustomSearchBar onSearchChange={() => {}} />)

    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button', { name: 'Buscar' })

    expect(input.getAttribute('placeholder')).toBe('Buscar...')
    expect(input.getAttribute('value')).toBe('')
    expect(input.getAttribute('type')).toBe('text')
    expect(button.innerHTML).toBe('Buscar')
  })

  test('should call onQuery with the correct value after 700ms', async () => {
    const onQueryMock = vi.fn()
    render(<CustomSearchBar onSearchChange={onQueryMock} />)

    const input = screen.getByRole('textbox')
    // const button = screen.getByRole('button', { name: 'Buscar' })
    fireEvent.change(input, { target: { value: 'test' } })
    //await new Promise((resolve) => setTimeout(resolve, 701))
    await waitFor(() => {
      expect(onQueryMock).toHaveBeenCalled()
      expect(onQueryMock).toHaveBeenCalledWith('test')
    })
  })

  test('should call  onQuery only  with the last value (debounce)', async () => {
    const onQueryMock = vi.fn()
    render(<CustomSearchBar onSearchChange={onQueryMock} />)

    const input = screen.getByRole('textbox')
    // const button = screen.getByRole('button', { name: 'Buscar' })
    fireEvent.change(input, { target: { value: 't' } })
    fireEvent.change(input, { target: { value: 'te' } })
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.change(input, { target: { value: 'test1' } })
    // //await new Promise((resolve) => setTimeout(resolve, 701))
    await waitFor(() => {
      expect(onQueryMock).toHaveBeenCalledTimes(1)
      expect(onQueryMock).toHaveBeenCalledWith('test1')
    })
  })

  test('should call  onQuery only  with button clicked', () => {
    const onQueryMock = vi.fn()
    render(<CustomSearchBar onSearchChange={onQueryMock} />)

    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test1' } })
    const button = screen.getByRole('button', { name: 'Buscar' })
    fireEvent.click(button)
    expect(onQueryMock).toHaveBeenCalledTimes(1)
    expect(onQueryMock).toHaveBeenCalledWith('test1')
  })
})
