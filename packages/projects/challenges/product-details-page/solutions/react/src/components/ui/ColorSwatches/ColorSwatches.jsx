import clsx from 'clsx';

const outerSizeClasses = {
  md: 'size-[56.67px]',
  sm: 'size-6',
};

const innerSizeClasses = {
  md: 'size-[38px]',
  sm: 'size-4',
};

const ringSizeClasses = {
  md: 'focus:ring-[9.33px]',
  sm: 'focus:ring-4',
};

const strokeLineClasses = {
  md: 'h-0.5 w-11',
  sm: 'h-px w-5',
};

const ColorSwatches = ({
  color,
  selected,
  onClick,
  outOfStock,
  size = 'md',
  type = 'radio',
}) => {
  const readOnly = !onClick || outOfStock;

  return (
    <label
      key={color}
      aria-label={color}
      className={clsx(
        'flex items-center justify-center',
        'rounded-full',
        outerSizeClasses[size],
        readOnly ? 'pointer-events-none' : 'cursor-pointer'
      )}>
      <input
        type={type}
        name="color-choice"
        value={color}
        checked={selected}
        className="sr-only"
        onChange={() => {
          if (!onClick) {
            return;
          }
          onClick(color);
        }}
        tabIndex={-1}
        disabled={outOfStock}
      />
      <div
        aria-hidden="true"
        className={clsx(
          'relative',
          'flex items-center justify-center',
          'rounded-full',
          innerSizeClasses[size],
          color === '#fff' && 'border border-neutral-200',
          selected
            ? 'outline outline-1 outline-indigo-600 border-2 border-white'
            : !readOnly && [
                'hover:border-2 hover:border-indigo-200',
                'focus:outline-none focus:border-none focus:ring-indigo-600/[.12]',
                ringSizeClasses[size],
              ]
        )}
        style={{ backgroundColor: color }}
        tabIndex={selected || outOfStock || readOnly ? -1 : 0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick(color);
          }
        }}>
        {selected && !outOfStock && (
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            className={clsx(color === '#fff' ? 'fill-black' : 'fill-white')}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6673 17.6993L22.3918 6.97485L24.0417 8.62477L11.6673 20.9991L4.24268 13.5745L5.89259 11.9246L11.6673 17.6993Z" />
          </svg>
        )}
        {outOfStock && (
          <div
            className={clsx(
              'absolute bg-neutral-600 -rotate-45',
              strokeLineClasses[size]
            )}
          />
        )}
      </div>
    </label>
  );
};

export default ColorSwatches;
