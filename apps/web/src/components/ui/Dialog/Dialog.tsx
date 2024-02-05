import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Heading from '~/components/ui/Heading/Heading';

import Button from '../Button';
import Section from '../Heading/HeadingContext';
import Text from '../Text';
import { themeBackgroundLayerEmphasized } from '../theme';

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
  previousButton?: React.ReactNode;
  primaryButton?: React.ReactNode;
  scrollable?: boolean;
  secondaryButton?: React.ReactNode;
  title: string;
  width?: DialogWidth;
  wrapContents?: (contents: React.ReactNode) => React.ReactNode;
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
  isShown = false,
  previousButton,
  primaryButton,
  scrollable = false,
  secondaryButton,
  title,
  width = 'sm',
  wrapContents,
  onClose,
}: Props) {
  const intl = useIntl();
  const cancelButtonRef = useRef(null);

  const contents = (
    <div
      className={clsx(
        'flex flex-col p-6 max-h-full',
        scrollable && 'overflow-hidden',
      )}>
      <div className="flex justify-between">
        <Dialog.Title as="div">
          <Heading level="heading6">{title}</Heading>
        </Dialog.Title>
        <Button
          className="-mt-2 -me-2"
          icon={RiCloseLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Close menu',
            description: 'Button to close menu',
            id: 'NVGZEe',
          })}
          size="lg"
          type="button"
          variant="tertiary"
          onClick={() => onClose?.()}
        />
      </div>
      <Section>
        <div className={clsx('mt-2.5', scrollable && 'overflow-y-auto grow')}>
          <Text display="block" size="body2">
            {children}
          </Text>
        </div>
      </Section>
      {primaryButton && (
        <div
          className={clsx('flex flex-row-reverse justify-between gap-4 mt-6')}>
          <div className="flex gap-2">
            {secondaryButton}
            {primaryButton}
          </div>
          {previousButton}
        </div>
      )}
    </div>
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
          <div
            className={clsx(
              'fixed inset-0',
              'bg-neutral-500 dark:bg-neutral-950/60',
              'bg-opacity-75',
              'backdrop-blur-sm transition-opacity',
            )}
          />
        </Transition.Child>
        <div className="fixed inset-0 z-40 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center px-6 sm:items-center sm:px-0">
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
                  'relative transform',
                  'flex flex-col',
                  'rounded-lg',
                  'my-6',
                  scrollable && 'max-h-[calc(100vh_-_48px)]',
                  themeBackgroundLayerEmphasized,
                  ['w-full', widthClasses[width]],
                  'text-left shadow-xl transition-all',
                )}>
                {wrapContents ? wrapContents(contents) : contents}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
