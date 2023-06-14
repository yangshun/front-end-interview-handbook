'use client';

import clsx from 'clsx';
import type { ReactNode, RefObject } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import Text from '../Text';

export type TooltipPosition = 'above' | 'below' | 'end' | 'start';
export type TooltipAlignment = 'bottom' | 'center' | 'end' | 'start' | 'top';

type TooltipLabelProps = Readonly<{
  alignment: TooltipAlignment;
  children: ReactNode;
  position: TooltipPosition;
  triggerRef: RefObject<HTMLSpanElement>;
}>;

function TooltipLabel({
  alignment,
  children,
  position,
  triggerRef,
}: TooltipLabelProps) {
  const shouldUseXAlignment = position === 'above' || position === 'below';
  const shouldUseYAlignment = position === 'start' || position === 'end';

  const [triggerRect, setTriggerRect] = useState(
    triggerRef.current?.getBoundingClientRect(),
  );

  useEffect(() => {
    const moveOnScroll = () => {
      setTriggerRect(triggerRef.current?.getBoundingClientRect());
    };

    window.addEventListener('scroll', moveOnScroll);

    return () => window.removeEventListener('scroll', moveOnScroll);
  });

  useEffect(() => {
    const moveOnWindowResize = () => {
      setTriggerRect(triggerRef.current?.getBoundingClientRect());
    };

    window.addEventListener('resize', moveOnWindowResize);

    return () => window.removeEventListener('resize', moveOnWindowResize);
  });

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
    right:
      alignment === 'end'
        ? document.body.clientWidth - triggerRight
        : undefined,
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
    right: document.body.clientWidth - triggerLeft,
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
        'fixed z-40 whitespace-nowrap rounded bg-neutral-800 px-3 py-2',
        position === 'above' && 'mb-1.5',
        position === 'below' && 'mt-1.5',
        position === 'start' && 'mr-1.5',
        position === 'end' && 'ml-1.5',
        shouldUseXAlignment && alignment === 'center' && '-translate-x-1/2',
        shouldUseYAlignment && alignment === 'center' && '-translate-y-1/2',
      )}
      role="tooltip"
      style={styleMap[position]}>
      <Text color="white" size="body2" weight="medium">
        {children}
      </Text>
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
  const triggerRef = useRef<HTMLSpanElement>(null);

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
      ref={triggerRef}
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
            triggerRef={triggerRef}>
            {label}
          </TooltipLabel>,
          document.body,
        )}
    </span>
  );
}
