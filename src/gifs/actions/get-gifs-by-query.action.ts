import { Gif, GiphyResponse } from '../interfaces'
import { giphyApi } from '../api'

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
  const response = await giphyApi<GiphyResponse>('/search', {
    params: {
      q: query,
      limit: 10,
    },
  })
  console.log(response.data)

  return response.data.data.map((gif) => ({
    id: gif.id,
    title: gif.title,
    url: gif.images.original.url,
    width: Number(gif.images.original.width),
    height: Number(gif.images.original.height),
  }))
}
