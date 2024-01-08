import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading/Heading';

import Section from '../Heading/HeadingContext';
import Text from '../Text';
import { themeBackgroundLayerColor } from '../theme';

import { Dialog, Transition } from '@headlessui/react';

export type DialogWidth =
  | 'screen-lg'
  | 'screen-md'
  | 'screen-sm'
  | 'screen-xl'
  | 'sm';

type Props = Readonly<{
  children: React.ReactNode;
  dark?: boolean;
  isShown?: boolean;
  onClose: () => void;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  title: string;
  width?: DialogWidth;
}>;

const widthClasses: Record<DialogWidth, string> = {
  'screen-lg':
    'sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg',
  'screen-md': 'sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md',
  'screen-sm': 'sm:max-w-sm md:max-w-screen-sm',
  'screen-xl':
    'sm:max-w-sm md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl',
  sm: 'sm:max-w-sm',
};

export default function DialogImpl({
  children,
  dark = false,
  isShown,
  primaryButton,
  secondaryButton,
  title,
  width = 'sm',
  onClose,
}: Props) {
  const intl = useIntl();
  const cancelButtonRef = useRef(null);

  const closeButton = (
    <button
      className="focus:ring-brand -mr-2 flex h-10 w-10 items-center justify-center rounded-full p-2 text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset"
      type="button"
      onClick={() => onClose?.()}>
      <span className="sr-only">
        {intl.formatMessage({
          defaultMessage: 'Close menu',
          description: 'Button to close menu',
          id: 'NVGZEe',
        })}
      </span>
      <RiCloseLine aria-hidden="true" className="h-6 w-6" />
    </button>
  );

  return (
    <Transition.Root as={Fragment} show={isShown}>
      <Dialog
        as="div"
        className={clsx('relative z-40')}
        data-mode={dark ? 'dark' : undefined}
        initialFocus={cancelButtonRef}
        onClose={() => onClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-neutral-500 bg-opacity-75 backdrop-blur-sm transition-opacity dark:bg-neutral-950/60" />
        </Transition.Child>
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <Dialog.Panel
                className={clsx(
                  'relative transform overflow-hidden',
                  'rounded-lg',
                  themeBackgroundLayerColor,
                  ['sm:w-full', widthClasses[width]],
                  'text-left shadow-xl transition-all',
                )}>
                <div className="grid gap-y-2.5 px-6 pb-4 pt-6">
                  <div className="flex items-center justify-between">
                    <Dialog.Title as="div">
                      <Heading level="heading6">{title}</Heading>
                    </Dialog.Title>
                    {closeButton}
                  </div>
                  <Section>
                    <Text display="block" size="body2">
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
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
