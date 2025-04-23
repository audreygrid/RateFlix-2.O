import React, { useState } from 'react';

function SearchBar(props) {
  const [query, setQuery] = useState("");

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    if (query !== "") {
      props.onSearch(query);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
