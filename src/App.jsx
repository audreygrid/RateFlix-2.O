import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [showMovieList, setShowMovieList] = useState(false);  // State to toggle movie list visibility

  function fetchMovies(query) {
    if (query === "") return;

    setLoading(true);
    setError("");
    setShowMovieList(true);  // Show movie list when search starts

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=b0ed1f6f63ebbe0de9794dbde73a27d4&query=${query}&language=en-US&page=1&include_adult=false`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then(function (data) {
        setMovies(data.results);
      })
      .catch(function (err) {
        setError(err.message);
        setMovies([]);
      })
      .finally(function () {
        setLoading(false);
      });
  }

  const handleBackToSearch = () => {
    setShowMovieList(false); // Hide movie list
    setQuery(""); // Reset search query
  };

  return (
    <div>
      <h1>RATEFLIX</h1>

      <SearchBar 
        onSearch={fetchMovies} 
        query={query} 
        setQuery={setQuery} 
      />
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {showMovieList && (
        <>
          <button
            onClick={handleBackToSearch}
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Return
          </button>
          <MovieList 
            movies={movies} 
            onSelect={(movie) => setSelectedMovie(movie)} 
          />
        </>
      )}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default App;
