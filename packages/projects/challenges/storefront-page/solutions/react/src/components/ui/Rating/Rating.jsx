import { useState } from 'react';
import clsx from 'clsx';

import Star from './Star';

const Rating = ({ value, max = 5, onChange, selected, showHover }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const readOnlyMode = !onChange;

  return (
    <div className="flex items-center gap-1 group star-rating">
      {Array.from({ length: max }).map((_, index) => (
        <span
          key={index}
          tabIndex={readOnlyMode ? -1 : 0}
          onMouseEnter={() => !readOnlyMode && setHoveredIndex(index)}
          onMouseLeave={() => !readOnlyMode && setHoveredIndex(null)}
          className={clsx(
            !readOnlyMode && 'cursor-pointer',
            selected ? 'text-yellow-500' : 'text-yellow-400'
          )}
          onClick={() => onChange?.(index + 1)}>
          <Star
            filled={
              hoveredIndex != null ? index <= hoveredIndex : value >= index + 1
            }
            halfFilled={value < index + 1 && value > index}
            className={clsx(showHover && 'group-hover:stroke-indigo-200')}
          />
        </span>
      ))}
    </div>
  );
};

export default Rating;
