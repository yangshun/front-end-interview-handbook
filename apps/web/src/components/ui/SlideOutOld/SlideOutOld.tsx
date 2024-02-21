import clsx from 'clsx';
import { Fragment } from 'react';
import { RiCloseLine } from 'react-icons/ri';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import Text from '../Text';
import { themeBackgroundLayerColor } from '../theme';

import { Dialog, Transition } from '@headlessui/react';

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

export default function SlideOutOld({
  className,
  children,
  dark = false,
  enterFrom = 'end',
  isShown = false,
  size,
  primaryButton,
  title,
  secondaryButton,
  onClose,
  padding = true,
  isTitleHidden = false,
}: Props) {
  const enterFromClass = enterFromClasses[enterFrom];

  const closeButton = (
    <button
      className="focus:ring-brand size-10 -mr-2 flex items-center justify-center rounded-full p-2 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset"
      type="button"
      onClick={() => onClose?.()}>
      {/* TODO: i18n */}
      <span className="sr-only">Close menu</span>
      <RiCloseLine aria-hidden="true" className="size-6" />
    </button>
  );

  return (
    <Transition.Root as={Fragment} show={isShown}>
      <Dialog
        as="div"
        className={clsx('z-slideout-backdrop relative', className)}
        data-mode={dark ? 'dark' : undefined}
        onClose={() => onClose?.()}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-neutral-950/60" />
        </Transition.Child>
        <div className="z-slideout fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom={enterFromClass.hidden}
            enterTo={enterFromClass.shown}
            leave="transition ease-in-out duration-300 transform"
            leaveFrom={enterFromClass.shown}
            leaveTo={enterFromClass.hidden}>
            <Dialog.Panel
              className={clsx(
                'size-full relative flex flex-col',
                themeBackgroundLayerColor,
                'shadow-xl',
                enterFromClass.position,
                sizeClasses[size],
              )}>
              <div
                className={clsx(
                  isTitleHidden && [
                    'absolute top-0 pt-2',
                    enterFrom === 'start' && 'right-0 -mr-12',
                    enterFrom === 'end' && 'left-0 -ml-12',
                  ],
                  !isTitleHidden &&
                    'flex items-center justify-between gap-x-4 px-6 py-6',
                )}>
                {!isTitleHidden && (
                  <Dialog.Title as="div">
                    <Heading level="heading5">{title}</Heading>
                  </Dialog.Title>
                )}
                {closeButton}
              </div>
              <div className={clsx('grow overflow-y-auto', padding && 'px-6')}>
                <Section>
                  <Text className="h-full" display="block" size="body2">
                    {children}
                  </Text>
                </Section>
              </div>
              {primaryButton && (
                <div className={clsx('flex justify-end gap-2 px-6 py-4')}>
                  {secondaryButton}
                  {primaryButton}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
          {isTitleHidden && (
            <div aria-hidden="true" className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          )}
        </div>
      </Dialog>
    </Transition.Root>
  );
}
