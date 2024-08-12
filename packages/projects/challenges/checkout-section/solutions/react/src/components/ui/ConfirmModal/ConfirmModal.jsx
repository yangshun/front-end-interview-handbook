import clsx from 'clsx';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { RiCloseLine } from 'react-icons/ri';

import Button from '../Button';

const ConfirmModal = ({
  isOpen,
  onClose,
  onAction,
  title,
  description,
  children,
  primaryActionLabel,
  secondaryActionLabel,
  actionBtnSize = 'lg',
  className,
}) => {
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
        'fixed inset-0  z-modal',
        'bg-neutral-950 bg-opacity-70',
        'flex items-center justify-center'
      )}
      role="dialog"
      aria-modal="true">
      <div
        className={clsx(
          'bg-white rounded-lg',
          'w-[343px]',
          'p-6',
          'flex flex-col gap-8',
          className
        )}>
        {children ? (
          children
        ) : (
          <div className="flex flex-col gap-1">
            <div className={clsx('flex justify-between items-center gap-4')}>
              <div className="font-semibold text-lg">{title}</div>
              <button
                aria-label="Close modal"
                className="text-black text-xl font-semibold"
                onClick={onClose}>
                <RiCloseLine className="size-6" />
              </button>
            </div>

            <p className="text-sm text-neutral-600">{description}</p>
          </div>
        )}
        <div className={clsx('flex gap-3')}>
          {secondaryActionLabel && (
            <Button
              label={secondaryActionLabel}
              variant="secondary"
              size={actionBtnSize}
              className="flex-1"
              onClick={onClose}
            />
          )}
          <Button
            label={primaryActionLabel}
            size={actionBtnSize}
            className="flex-1"
            onClick={onAction}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;
