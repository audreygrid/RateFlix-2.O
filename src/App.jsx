import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fetchMovies(query) {
    if (query === "") {
      return;
    }

    setLoading(true);
    setError("");

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

  return (
    <div>
      <h1>RATEFLIX</h1>
      <SearchBar onSearch={fetchMovies} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      <MovieList movies={movies} onSelect={function (movie) {
        setSelectedMovie(movie);
      }} />

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          onClose={function () {
            setSelectedMovie(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
