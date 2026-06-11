function SearchBar({ city, handleCityChange, handleSuggestionClick, suggestions, handleSearch, searchImg }) {
  return (
    <form onSubmit={handleSearch} className="input-group mb-4 search-bar-container">
      <input 
        className="form-control bg-transparent border-0 text-dark shadow-none ps-3"
        placeholder="Enter City" 
        value={city} 
        onChange={handleCityChange}
        autoComplete="off"
      />
      <button className="btn text-white border-0 p-0" type="submit">
        <img src={searchImg} alt="Search" className="icon-small" />
      </button>

      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion, idx) => (
            <li
              key={idx}
              className="suggestion-item"
              onMouseDown={() => handleSuggestionClick(suggestion)}
            >
              <div>
                <strong>{suggestion.name}</strong>
                <span>{suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}

export default SearchBar;