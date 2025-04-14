import { useState } from 'react';
import clsx from 'clsx';
import Star from './Star';

const Rating = ({ value, max = 5, onChange, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const readOnlyMode = !onChange;

  return (
    <div className={clsx('flex items-center gap-1', className)}>
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
