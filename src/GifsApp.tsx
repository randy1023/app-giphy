import { GifList, PreviousSearches, useGifs } from './gifs'
import { CustomHeader, CustomSearchBar } from './shared'

export const GifsApp = () => {
  const {
    gifs,
    handleSearchChange,
    previousSearches,
    handlePreviousSearchesChange,
  } = useGifs()

  return (
    <>
      <CustomHeader
        title='Buscador de Gifs'
        description='Descubre y comparte el gif perfecto'
      />
      {/* Search */}
      <CustomSearchBar
        placeHolder='Buscar gifs...'
        onSearchChange={handleSearchChange}
      />
      {/* Busquedas previas */}
      <PreviousSearches
        previousSearches={previousSearches}
        handleSearchesChange={handlePreviousSearchesChange}
      />
      {/* GifsList */}
      <GifList gifs={gifs} />
    </>
  )
}
