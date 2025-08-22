import { describe, expect, test } from 'vitest'
import { giphyApi } from '../../../src/gifs'

describe('giphyApi', () => {
  test('should be configured Correctly', () => {
    const params = giphyApi.defaults.params

    expect(giphyApi.defaults.baseURL).toBe('https://api.giphy.com/v1/gifs')
    expect(params.lang).toBe('es')
    expect(params.api_key).toBeDefined()
  })
})
