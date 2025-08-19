interface PreviousSearchesProps {
  previousSearches: string[]
  handleSearchesChange: (search: string) => void
}

export const PreviousSearches = ({
  previousSearches,
  handleSearchesChange,
}: PreviousSearchesProps) => {
  return (
    <div className='previous-searches'>
      <h2>Busquedas previas</h2>
      <ul className='previous-searches-list'>
        {previousSearches.map((search) => (
          <li key={search} onClick={() => handleSearchesChange(search)}>
            {search}
          </li>
        ))}
      </ul>
    </div>
  )
}
