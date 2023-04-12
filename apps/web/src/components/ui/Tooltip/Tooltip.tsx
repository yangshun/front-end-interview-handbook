'use client';

import clsx from 'clsx';
import type { ReactNode } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

export type TooltipPosition = 'above' | 'below' | 'end' | 'start';
export type TooltipAlignment = 'bottom' | 'center' | 'end' | 'start' | 'top';

type TooltipLabelProps = Readonly<{
  alignment: TooltipAlignment;
  children: ReactNode;
  position: TooltipPosition;
  triggerRect?: DOMRect;
}>;

function TooltipLabel({
  children,
  position,
  alignment,
  triggerRect,
}: TooltipLabelProps) {
  const shouldUseXAlignment = position === 'above' || position === 'below';
  const shouldUseYAlignment = position === 'start' || position === 'end';

  if (!triggerRect) {
    return null;
  }

  const {
    left: triggerLeft,
    right: triggerRight,
    top: triggerTop,
    bottom: triggerBottom,
  } = triggerRect;

  const xAlignmentStyle = {
    left:
      alignment === 'center'
        ? (triggerLeft + triggerRight) / 2
        : alignment === 'start'
        ? triggerLeft
        : undefined,
    right: alignment === 'end' ? window.innerWidth - triggerRight : undefined,
  };
  const yAlignmentStyle = {
    bottom:
      alignment === 'bottom' ? window.innerHeight - triggerBottom : undefined,
    top:
      alignment === 'center'
        ? (triggerTop + triggerBottom) / 2
        : alignment === 'top'
        ? triggerTop
        : undefined,
  };
  const startPositionStyle = {
    right: window.innerWidth - triggerLeft,
    ...yAlignmentStyle,
  };
  const endPositionStyle = {
    left: triggerRight,
    ...yAlignmentStyle,
  };
  const abovePositionStyle = {
    bottom: window.innerHeight - triggerTop,
    ...xAlignmentStyle,
  };
  const belowPositionStyle = {
    ...xAlignmentStyle,
    top: triggerBottom,
  };
  const styleMap = {
    above: abovePositionStyle,
    below: belowPositionStyle,
    end: endPositionStyle,
    start: startPositionStyle,
  };

  return (
    <span
      className={clsx(
        'fixed z-40 whitespace-nowrap rounded-md bg-slate-800 px-2 py-1 text-xs text-white drop-shadow',
        position === 'above' && 'mb-1',
        position === 'below' && 'mt-1',
        position === 'start' && 'mr-1',
        position === 'end' && 'ml-1',
        shouldUseXAlignment && alignment === 'center' && '-translate-x-1/2',
        shouldUseYAlignment && alignment === 'center' && '-translate-y-1/2',
      )}
      role="tooltip"
      style={styleMap[position]}>
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
  const itemRef = useRef<HTMLSpanElement>(null);
  const [triggerRect, setTriggerRect] = useState(
    itemRef.current?.getBoundingClientRect(),
  );

  useEffect(() => {
    const moveOnScroll = () => {
      setTriggerRect(itemRef.current?.getBoundingClientRect());
    };

    window.addEventListener('scroll', moveOnScroll);

    return () => window.removeEventListener('scroll', moveOnScroll);
  }, []);

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
      ref={itemRef}
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
      {isShown &&
        createPortal(
          <TooltipLabel
            alignment={alignment}
            position={position}
            triggerRect={triggerRect}>
            {label}
          </TooltipLabel>,
          document.body,
        )}
    </span>
  );
}
