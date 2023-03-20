import { useState } from 'react';

import StarRating from './StarRating';

import './styles.css';

export default function App() {
  const [rating, setRating] = useState(3);

  return (
    <div>
      <StarRating
        max={5}
        value={rating}
        onChange={setRating}
      />
    </div>
  );
}
