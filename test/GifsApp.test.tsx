import React from 'react'
import { describe, test, expect } from 'vitest'
import { render } from '@testing-library/react'
import { GifsApp } from '../src/GifsApp'
describe('GifsApp.tsx', () => {
  test('should match snapshot', () => {
    const { container } = render(<GifsApp />)

    expect(container).toMatchSnapshot()
  })
})
