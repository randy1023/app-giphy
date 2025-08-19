import { useRef, useState } from 'react'
import { Gif } from '../interfaces'
import { getGifsByQuery } from '../actions'

//const gifsCache: Record<string, Gif[]> = {}
export const useGifs = () => {
  const [previousSearches, setPreviousSearches] = useState<string[]>([])
  const [gifs, setGifs] = useState<Gif[]>([])
  const gifsCache = useRef<Record<string, Gif[]>>({})

  const handlePreviousSearchesChange = (search: string) => {
    if (gifsCache.current[search]) {
      setGifs(gifsCache.current[search])
      return
    }
  }
  const handleSearchChange = async (query: string) => {
    const queryClean = query.trim().toLocaleLowerCase()
    if (queryClean.length === 0) return
    if (previousSearches.includes(queryClean)) return

    setPreviousSearches((prev) => [queryClean, ...prev.splice(0, 7)])

    const gifs = await getGifsByQuery(queryClean)
    setGifs(gifs)
    gifsCache.current[query] = gifs
  }

  return {
    gifs,
    previousSearches,
    handleSearchChange,
    handlePreviousSearchesChange,
  }
}
