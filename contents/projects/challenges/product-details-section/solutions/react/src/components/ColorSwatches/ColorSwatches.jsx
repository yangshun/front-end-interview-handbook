import clsx from 'clsx';

const ColorSwatches = ({ color, selectedColor, onClick, outOfStock }) => {
  return (
    <label
      key={color}
      aria-label={color}
      className={clsx(
        'flex size-[56.67px] items-center justify-center',
        'rounded-full',
        outOfStock ? 'pointer-events-none' : 'cursor-pointer',
      )}>
      <input
        type="radio"
        name="color-choice"
        value={color}
        checked={selectedColor === color}
        className="sr-only"
        aria-checked={selectedColor === color}
        onChange={() => onClick(color)}
        disabled={outOfStock}
      />
      <div
        aria-hidden="true"
        className={clsx(
          'flex items-center justify-center',
          'size-[38px] rounded-full',
          selectedColor === color
            ? 'border-2 border-white outline outline-1 outline-indigo-600'
            : [
                'hover:border-2 hover:border-indigo-200',
                'focus:border-none focus:outline-none focus:ring-[9.33px] focus:ring-indigo-600/[.12]',
              ],
        )}
        style={{ backgroundColor: color }}
        tabIndex={selectedColor === color || outOfStock ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(color);
          }
        }}>
        {selectedColor === color && !outOfStock && (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.6673 17.6993L22.3918 6.97485L24.0417 8.62477L11.6673 20.9991L4.24268 13.5745L5.89259 11.9246L11.6673 17.6993Z"
              fill="white"
            />
          </svg>
        )}

        {outOfStock && (
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect
              x="32.3999"
              y="0.199951"
              width="2.1"
              height="44.8"
              transform="rotate(45 32.3999 0.199951)"
              fill="#525252"
            />
          </svg>
        )}
      </div>
    </label>
  );
};

export default ColorSwatches;
