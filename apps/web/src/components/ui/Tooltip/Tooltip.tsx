'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

export type TooltipPosition = 'above' | 'below' | 'end' | 'start';
export type TooltipAlignment = 'bottom' | 'center' | 'end' | 'start' | 'top';

type TooltipLabelProps = Readonly<{
  alignment: TooltipAlignment;
  children: ReactNode;
  position: TooltipPosition;
}>;

function TooltipLabel({ children, position, alignment }: TooltipLabelProps) {
  const shouldUseXAlignment = position === 'above' || position === 'below';
  const shouldUseYAlignment = position === 'start' || position === 'end';

  return (
    <span
      className={clsx(
        'absolute z-40 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white drop-shadow',
        position === 'above' && 'bottom-full mb-1',
        position === 'below' && 'top-full mt-1',
        shouldUseXAlignment &&
          clsx(
            alignment === 'center' && 'left-1/2 -translate-x-1/2',
            alignment === 'start' && 'left-0',
            alignment === 'end' && 'right-0',
          ),
        position === 'start' && 'right-full mr-1',
        position === 'end' && 'left-full ml-1',
        shouldUseYAlignment &&
          clsx(
            alignment === 'center' && 'top-1/2 -translate-y-1/2',
            alignment === 'top' && 'top-0',
            alignment === 'bottom' && 'bottom-0',
          ),
      )}
      role="tooltip">
      {children}
    </span>
  );
}

type Props = Readonly<{
  alignment?: TooltipAlignment;
  children: ReactNode;
  className?: string;
  label?: ReactNode;
  position?: TooltipPosition;
}>;

type TooltipTriggerSource = 'focus' | 'mouseenter';

export default function Tooltip({
  alignment = 'center',
  children,
  className,
  label,
  position = 'above',
}: Props) {
  const [triggerSource, setTriggerSource] =
    useState<TooltipTriggerSource | null>(null);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    function dismissOnEscape(event: KeyboardEvent) {
      if (event.code !== 'Escape') {
        return;
      }

      setIsShown(false);
    }

    window.addEventListener('keydown', dismissOnEscape);

    return () => {
      window.removeEventListener('keydown', dismissOnEscape);
    };
  }, []);

  useEffect(() => {
    function dismissOnBlur() {
      // Only dismiss when it's due to mouse.
      if (triggerSource === 'focus') {
        return;
      }

      setIsShown(false);
    }

    window.addEventListener('blur', dismissOnBlur);

    return () => {
      window.removeEventListener('blur', dismissOnBlur);
    };
  }, [triggerSource]);

  return (
    <span
      className={clsx('pointer-events-auto relative inline-block', className)}
      onBlur={() => {
        if (triggerSource !== 'focus') {
          return;
        }

        setIsShown(false);
        setTriggerSource(null);
      }}
      onFocus={() => {
        if (triggerSource != null) {
          return;
        }

        setIsShown(true);
        setTriggerSource('focus');
      }}
      onMouseEnter={() => {
        if (triggerSource != null) {
          return;
        }

        setIsShown(true);
        setTriggerSource('mouseenter');
      }}
      onMouseLeave={() => {
        if (triggerSource !== 'mouseenter') {
          return;
        }

        setIsShown(false);
        setTriggerSource(null);
      }}>
      {children}
      {isShown && (
        <TooltipLabel alignment={alignment} position={position}>
          {label}
        </TooltipLabel>
      )}
    </span>
  );
}
