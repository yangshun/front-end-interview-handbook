import clsx from 'clsx';
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import Button from '../Button';

const DropdownContext = createContext();

const DropdownItem = ({ children, isSelected, onSelect }) => {
  const { setIsOpen, isOpen } = useContext(DropdownContext);
  const handleOptionClick = () => {
    setIsOpen(false);
    if (onSelect) {
      onSelect();
    }
  };

  return (
    <div
      onClick={handleOptionClick}
      className={clsx(
        'block text-sm',
        'cursor-pointer',
        'rounded',
        'hover:bg-neutral-50',
        'border-none outline-none',
        'focus:ring focus:ring-indigo-200',
        'p-2',
        isSelected ? 'text-indigo-700 font-medium' : 'text-neutral-600'
      )}
      role="menuitem"
      tabIndex={isOpen ? 0 : -1}
      id="menu-item-0">
      {children}
    </div>
  );
};

const Dropdown = ({ children }) => {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <Button
          type="button"
          label="Sort by"
          onClick={() => setIsOpen(!isOpen)}
          id={id}
          aria-expanded="true"
          aria-haspopup="true"
          variant="secondary"
          endIcon={RiArrowDownSLine}
        />
      </div>

      <div
        className={clsx(
          'absolute right-0 z-dropdown mt-2 w-56 origin-top-right max-h-50',
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
          <DropdownContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
          </DropdownContext.Provider>
        </div>
      </div>
    </div>
  );
};

export { Dropdown, DropdownItem };
