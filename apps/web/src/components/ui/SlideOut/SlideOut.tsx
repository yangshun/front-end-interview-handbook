import clsx from 'clsx';
import * as React from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import Text from '../Text';
import { themeBackgroundLayerColor } from '../theme';

import * as SlideOutPrimitive from '@radix-ui/react-dialog';

type SlideOutSize = 'lg' | 'md' | 'sm' | 'xl' | 'xs';
type SlideOutEnterFrom = 'end' | 'start';

type Props = Readonly<{
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  enterFrom?: SlideOutEnterFrom;
  isShown?: boolean;
  isTitleHidden?: boolean;
  onClose?: () => void;
  padding?: boolean;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  size: SlideOutSize;
  title?: string;
}>;

const sizeClasses: Record<SlideOutSize, string> = {
  lg: 'max-w-lg',
  md: 'max-w-md',
  sm: 'max-w-sm',
  xl: 'max-w-xl',
  xs: 'max-w-xs',
};

const enterFromClasses: Record<
  SlideOutEnterFrom,
  Readonly<{ hidden: string; position: string; shown: string }>
> = {
  end: {
    hidden: 'translate-x-full',
    position: 'ml-auto',
    shown: 'translate-x-0',
  },
  start: {
    hidden: '-translate-x-full',
    position: 'mr-auto',
    shown: 'translate-x-0',
  },
};

const SlideOut = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Root> & {
    className?: string;
  }
>(({ className, ...props }, ref) => (
  <div ref={ref} className={clsx('z-slideout-backdrop relative', className)}>
    <SlideOutPrimitive.Root {...props} />
  </div>
));

SlideOut.displayName = SlideOutPrimitive.Root.displayName;

const SlideOutTrigger = SlideOutPrimitive.Trigger;

const SlideOutClose = SlideOutPrimitive.Close;

const SlideOutPortal = SlideOutPrimitive.Portal;

const SlideOutOverlay = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SlideOutPrimitive.Overlay
    className={clsx(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'z-slideout-backdrop fixed inset-0 bg-neutral-500 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-neutral-950/60',
      className,
    )}
    {...props}
    ref={ref}
  />
));

SlideOutOverlay.displayName = SlideOutPrimitive.Overlay.displayName;

type SlideOutContentProps = Props &
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Content>;

const SlideOutContent = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Content>,
  SlideOutContentProps
>(({ enterFrom = 'end', dark, size, className, children, ...props }, ref) => (
  <SlideOutPortal>
    <SlideOutOverlay />
    <div
      className={clsx('z-slideout fixed inset-0 flex')}
      data-mode={dark ? 'dark' : undefined}>
      <SlideOutPrimitive.Content
        ref={ref}
        className={clsx(
          enterFromClasses[enterFrom].position,
          'size-full relative flex flex-col',
          themeBackgroundLayerColor,
          'shadow-xl',
          // TODO: fix the transition - below doesn't work, classes following slide-in/out-from-left/right don't work either
          'transition-all duration-1000',
          'data-[state=open]:left-0',
          'data-[state=closed]:-left-full',
          'ease-in-out',
          sizeClasses[size],
          className,
        )}
        {...props}>
        {children}
      </SlideOutPrimitive.Content>
    </div>
  </SlideOutPortal>
));

SlideOutContent.displayName = SlideOutPrimitive.Content.displayName;

function SlideOutHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-col justify-between gap-x-4 gap-y-2 px-6 py-6',
        className,
      )}>
      <div {...props} />
      <SlideOutPrimitive.Close
        className={clsx(
          'absolute right-4 top-4',
          'data-[state=open]:bg-secondary disabled:pointer-events-none',
          'focus:ring-brand size-10 -mr-2 flex items-center justify-center rounded-full p-2 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset',
        )}>
        <span className="sr-only">
          <FormattedMessage
            defaultMessage="Close menu"
            description="Close menu"
            id="lu1/V5"
          />
        </span>
        <RiCloseLine aria-hidden="true" className="size-6" />
      </SlideOutPrimitive.Close>
    </div>
  );
}
SlideOutHeader.displayName = 'SlideOutHeader';

function SlideOutFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'flex flex-row-reverse justify-start gap-2 px-6 py-4',
        className,
      )}
      {...props}
    />
  );
}
SlideOutFooter.displayName = 'SlideOutFooter';

const SlideOutTitle = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Title>
>(({ className, children, ...props }, ref) => (
  <SlideOutPrimitive.Title
    ref={ref}
    className={clsx('flex items-center justify-between gap-x-4', className)}
    {...props}>
    <Heading level="heading5">{children}</Heading>
  </SlideOutPrimitive.Title>
));

SlideOutTitle.displayName = SlideOutPrimitive.Title.displayName;

const SlideOutDescription = React.forwardRef<
  React.ElementRef<typeof SlideOutPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SlideOutPrimitive.Description> & {
    padding?: boolean;
  }
>(({ className, padding, children }, ref) => (
  <SlideOutPrimitive.Description
    ref={ref}
    className={clsx('grow overflow-y-auto', padding && 'px-6', className)}>
    <Section>
      <Text className="h-full" display="block" size="body2">
        {children}
      </Text>
    </Section>
  </SlideOutPrimitive.Description>
));

SlideOutDescription.displayName = SlideOutPrimitive.Description.displayName;

export {
  SlideOut,
  SlideOutClose,
  SlideOutContent,
  SlideOutDescription,
  SlideOutFooter,
  SlideOutHeader,
  SlideOutOverlay,
  SlideOutPortal,
  SlideOutTitle,
  SlideOutTrigger,
};
