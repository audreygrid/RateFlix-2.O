import React from 'react';

function MovieCard(props) {
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
    props.onSelect(movie);
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
      </div>
    </div>
  );
}

export default MovieCard;
