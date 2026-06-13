import { useEffect, useRef } from "react";

function SearchBar({ city, handleCityChange, handleSuggestionClick, suggestions, handleSearch, searchImg }) {
  const debounceTimer = useRef(null);

  const handleInput = (e) => {
    handleCityChange(e);  // still updates the city state immediately

    // Clear previous timer, fire suggestion fetch after 400ms pause
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleCityChange(e);
    }, 400);
  };

  useEffect(() => {
    return () => clearTimeout(debounceTimer.current); // cleanup on unmount
  }, []);

  return (
    <form onSubmit={handleSearch} className="input-group mb-3 search-bar-container">
      <input
        id="city-search"
        name="city"
        className="form-control bg-transparent border-0 text-white shadow-none ps-3"
        placeholder="Enter City"
        value={city}
        onChange={handleInput}
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