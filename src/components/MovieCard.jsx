import React, { useState } from 'react';

function MovieCard(props) {
  const [selectedRating, setSelectedRating] = useState('');

  function handleAddRating(movieId, newRating) {
    window.location.reload();
    setMovies((prevMovies) =>
      prevMovies.map((movie) =>
        movie.id === movieId ? { ...movie, rating: newRating } : movie
      )
    );

    // Make a fetch request to save the rating in the database
    fetch(`/api/movies/${movieId}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ rating: newRating }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally handle any data or update the UI
        console.log('Rating saved', data);
        
      })
      .catch((error) => console.error('Error saving rating:', error));
      
  }

  const movie = props.movie;

  let posterUrl = "https://via.placeholder.com/200x300?text=No+Poster";
  if (movie.poster_path) {
    posterUrl = "https://image.tmdb.org/t/p/w200" + movie.poster_path;
  }

  let year = "N/A";
  if (movie.release_date) {
    year = movie.release_date.substring(0, 4);
  }

  function handleClick() {
    //props.onSelect(movie);
  }

  return (
    <div id="movie-card" onClick={handleClick}>
      <img id="movie-poster" src={posterUrl} alt={movie.title} />
      <div id="movie-info">
        <h3 id="movie-title">{movie.title}</h3>
        <p id="movie-year">{year}</p>

        {movie.vote_average && (
          <p id="movie-rating">⭐ {movie.vote_average.toFixed(1)}/10</p>
        )}

        <select
          onChange={(e) => setSelectedRating(e.target.value)}
          value={selectedRating}
        >
          <option value="">Rate this movie</option>
          <option value="1">⭐</option>
          <option value="2">⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <button
          onClick={() => handleAddRating(movie.id, selectedRating)}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Submit Rating
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
