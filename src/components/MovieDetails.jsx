import React, { useEffect, useState } from 'react';
import ReviewSection from './ReviewSection';

function MovieDetails(props) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.movie && props.movie.id) {
      setLoading(true);
      setError("");

      fetch(`https://api.themoviedb.org/3/movie/${props.movie.id}?api_key=b0ed1f6f63ebbe0de9794dbde73a27d4&language=en-US`)
        .then(function (res) {
          if (!res.ok) {
            throw new Error("Could not fetch movie details");
          }
          return res.json();
        })
        .then(function (data) {
          setDetails(data);
        })
        .catch(function (err) {
          setError(err.message);
        })
        .finally(function () {
          setLoading(false);
        });
    }
  }, [props.movie]);

  if (loading) {
    return <p id="loading-message">Loading movie details...</p>;
  }

  if (error) {
    return <p id="error-message">Error: {error}</p>;
  }

  if (!details) {
    return <p id="no-details">No details available</p>;
  }

  return (
    <div id="movie-details">
      <h2 id="details-title">{details.title} ({details.release_date ? details.release_date.substring(0, 4) : "N/A"})</h2>
      
      <p id="details-overview">{details.overview}</p>
      
      <p id="details-rating">Rating: {details.vote_average}/10</p>
      
      <p id="details-votes">Votes: {details.vote_count}</p>
      
      {details.runtime && (
        <p id="details-runtime">Runtime: {details.runtime} minutes</p>
      )}
      
      {details.genres && details.genres.length > 0 && (
        <p id="details-genres">Genres: {details.genres.map(g => g.name).join(", ")}</p>
      )}
      
      {details.production_companies && details.production_companies.length > 0 && (
        <p id="details-production">Produced by: {details.production_companies.map(c => c.name).join(", ")}</p>
      )}
      
      <div id="review-section">
        <ReviewSection movieId={props.movie.id} />
      </div>
    </div>
  );  
}

export default MovieDetails;
