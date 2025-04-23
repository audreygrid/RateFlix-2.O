import React, { useEffect, useState } from 'react';

function ReviewSection({ movieId }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    const res = await fetch(`http://localhost:3001/reviews?movieId=${movieId}`);
    const data = await res.json();
    setReviews(data);
  };

  const submitReview = async () => {
    const newReview = { movieId, rating, text };
    await fetch(`http://localhost:3001/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newReview)
    });
    setText('');
    setRating(5);
    fetchReviews();
  };

  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length || 0).toFixed(1);

  return (
    <div id="review-section">
      <h3 id="average-rating">Average Rating: {avgRating}/5</h3>
      
      <textarea
        id="review-text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Leave a review..."
      />
      <br />

      <label id="rating-label">
        Rating:
        <input
          id="review-rating"
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </label>

      <button id="submit-review-button" onClick={submitReview}>Submit</button>

      <ul id="review-list">
        {reviews.map((r, idx) => (
          <li key={idx} id={`review-item-${idx}`}>
            <span id={`review-rating-${idx}`}>{r.rating}/5</span> - 
            <span id={`review-text-${idx}`}> {r.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewSection;
