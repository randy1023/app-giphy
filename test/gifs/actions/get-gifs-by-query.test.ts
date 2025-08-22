import { describe, expect, test, vi } from 'vitest'
import AxiosMockAdapter from 'axios-mock-adapter'
import { giphyApi, getGifsByQuery } from '../../../src/gifs'
import { giphyResponseData } from '../../mocks/giphy.response.data'
import { afterEach } from 'node:test'

describe('getGifsByQuery', () => {
  const axiosMock = new AxiosMockAdapter(giphyApi)
  //   test('should return a list of gifs', async () => {
  //     const gifsList = await getGifsByQuery('goku')
  //     const [gif1] = gifsList
  //     expect(gifsList.length).toBe(10)
  //     expect(gif1).toStrictEqual({
  //       id: expect.any(String),
  //       title: expect.any(String),
  //       url: expect.any(String),
  //       width: expect.any(Number),
  //       height: expect.any(Number),
  //     })
  //   })
  afterEach(() => {
    axiosMock.reset()
  })
  test('should return a list of Gifs', async () => {
    axiosMock.onGet('/search').reply(200, giphyResponseData)
    const gifsList = await getGifsByQuery('goku')

    expect(gifsList.length).toBe(10)

    gifsList.forEach((gif) => {
      expect(typeof gif.id).toBe('string')
      expect(typeof gif.title).toBe('string')
      expect(typeof gif.url).toBe('string')
      expect(typeof gif.width).toBe('number')
      expect(typeof gif.height).toBe('number')
    })

    // expect(gif1).toStrictEqual({
    //   id: expect.any(String),
    //   title: expect.any(String),
    //   url: expect.any(String),
    //   width: expect.any(Number),
    //   height: expect.any(Number),
    // })
  })

  test('should return a empty list of Gifs if query is empty', async () => {
    // axiosMock.onGet('/search').reply(200, giphyResponseData)

    const gifsList = await getGifsByQuery('')

    expect(gifsList.length).toBe(0)
  })

  test('should nadle error when the API return an error ', async () => {
    const consoleErrorSpyOn = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    axiosMock.onGet('/search').reply(400, {
      data: {
        message: 'Bad request',
      },
    })
    const gifsList = await getGifsByQuery('goku')
    expect(gifsList.length).toBe(0)
    expect(consoleErrorSpyOn).toHaveBeenCalled()
    expect(consoleErrorSpyOn).toHaveBeenCalledTimes(1)
    expect(consoleErrorSpyOn).toHaveBeenCalledWith(expect.any(Error))
  })
})
