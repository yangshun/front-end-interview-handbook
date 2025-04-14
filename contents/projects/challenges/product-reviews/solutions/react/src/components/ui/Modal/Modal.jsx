import clsx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine } from 'react-icons/ri';

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={clsx(
        'z-modal fixed  inset-0',
        'bg-neutral-950 bg-opacity-70',
        'flex items-center justify-center',
        'py-20',
      )}
      role="dialog"
      aria-modal="true">
      <div
        className={clsx(
          'rounded-lg bg-white',
          'w-full max-w-[343px] md:max-w-[522px] lg:max-w-[1008px]',
        )}>
        <div
          className={clsx(
            'flex flex-col items-end justify-center gap-4 self-stretch',
            'p-6 lg:px-8',
          )}>
          <button
            aria-label="Close modal"
            className="text-xl font-semibold text-black"
            onClick={onClose}>
            <RiCloseLine className="size-6" />
          </button>
        </div>
        <div className={clsx('max-h-[calc(100vh_-_160px)]', 'overflow-y-auto')}>
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
