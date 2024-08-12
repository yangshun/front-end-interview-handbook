import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';

import TextInput from '../TextInput';

const Autocomplete = ({ value, onSelect, options, ...props }) => {
  const id = useId();
  const autocompleteRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = item => {
    setIsOpen(false);
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <div className="relative w-full" ref={autocompleteRef}>
      <TextInput
        {...props}
        value={value}
        id={id}
        onFocus={() => setIsOpen(true)}
      />
      {options.length > 0 && (
        <div
          className={clsx(
            'absolute right-0 z-dropdown mt-2 w-full origin-top-right max-h-50 overflow-y-auto',
            'border border-[#e6e6e6]',
            'rounded-lg bg-white shadow-lg',
            'transition ease-in-out duration-300 transform origin-top',
            isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
          )}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby={id}
          tabIndex={-1}>
          <div className="flex flex-col gap-2 p-2" role="none">
            {options.map(item => (
              <div
                key={item.id}
                onClick={() => handleOptionClick(item)}
                className={clsx(
                  'block text-sm',
                  'cursor-pointer',
                  'rounded',
                  'hover:bg-neutral-50',
                  'border-none outline-none',
                  'focus:ring focus:ring-indigo-200',
                  'p-2',
                  value === item.id || value === item.name
                    ? 'text-indigo-700 font-medium'
                    : 'text-neutral-600'
                )}
                role="menuitem"
                tabIndex={isOpen ? 0 : -1}
                id="menu-item-0">
                {item.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
