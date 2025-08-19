import { useEffect, useState } from 'react'

interface SearchBarProps {
  placeHolder?: string
  buttonText?: string
  onSearchChange: (query: string) => void
}

export const CustomSearchBar = ({
  placeHolder = 'Buscar...',
  buttonText = 'Buscar',
  onSearchChange,
}: SearchBarProps) => {
  const [search, setSearch] = useState('')

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearchChange(search)
      setSearch('')
    }, 700)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [search, onSearchChange])

  const handleSearch = () => {
    onSearchChange(search)
    setSearch('')
  }
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className='search-container'>
      <input
        type='text'
        placeholder={placeHolder}
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch}>{buttonText}</button>
    </div>
  )
}
