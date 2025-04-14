import { useState } from 'react';
import Star from './Star';
import clsx from 'clsx';

const Rating = ({ value, max = 5, onChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const readOnlyMode = !onChange;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          tabIndex={readOnlyMode ? -1 : 0}
          onMouseEnter={() => !readOnlyMode && setHoveredIndex(index)}
          onMouseLeave={() => !readOnlyMode && setHoveredIndex(null)}
          className={clsx(!readOnlyMode && 'cursor-pointer')}
          onClick={() => onChange?.(index + 1)}>
          <Star
            filled={
              hoveredIndex != null ? index <= hoveredIndex : value >= index + 1
            }
            halfFilled={value < index + 1 && value > index}
          />
        </span>
      ))}
    </div>
  );
};

export default Rating;
