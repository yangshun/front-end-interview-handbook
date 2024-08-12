import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { RiCloseLine } from 'react-icons/ri';
import { useEffect } from 'react';

const SlideOut = ({
  children,
  isShown,
  trigger,
  title,
  onClose,
  className,
}) => {
  useEffect(() => {
    if (isShown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isShown]);

  return (
    <>
      {trigger}

      {isShown &&
        createPortal(
          <div
            className={clsx(
              'fixed inset-0  z-modal lg:hidden',
              'bg-neutral-950 bg-opacity-70',
              'flex items-center justify-center'
            )}
            role="dialog"
            aria-modal="true">
            <div
              id="slideout"
              className={clsx(
                'fixed inset-0 z-fixed bg-white max-w-[360px]',
                'animate-slideout',
                'overflow-auto',
                className
              )}>
              <div
                className={clsx(
                  'z-sticky sticky top-0 bg-white p-6',
                  'flex flex-col gap-6'
                )}>
                <div
                  className={clsx(
                    'flex items-center',
                    !!title ? 'justify-between' : 'justify-end'
                  )}>
                  {title}
                  <button
                    onClick={onClose}
                    aria-label="Close sideout"
                    type="button"
                    className={clsx(
                      'text-neutral-600 rounded',
                      'focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-600/[.12]'
                    )}>
                    <RiCloseLine className="size-5" />
                  </button>
                </div>
                <div className="h-[1px] bg-neutral-200 w-full" />
              </div>
              <div className="px-6 pb-6">{children}</div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default SlideOut;
