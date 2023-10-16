import clsx from 'clsx';
import { Fragment, useRef } from 'react';

import Heading from '~/components/ui/Heading/Heading';

import Section from '../Heading/HeadingContext';
import Text from '../Text';

import { Dialog, Transition } from '@headlessui/react';

type Props = Readonly<{
  children: React.ReactNode;
  dark?: boolean;
  isShown?: boolean;
  onClose: () => void;
  primaryButton?: React.ReactNode;
  secondaryButton?: React.ReactNode;
  title: string;
}>;

export default function DialogImpl({
  children,
  dark = false,
  isShown,
  primaryButton,
  title,
  secondaryButton,
  onClose,
}: Props) {
  const cancelButtonRef = useRef(null);

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
                  'bg-white dark:bg-neutral-900',
                  'sm:w-full sm:max-w-sm',
                  'text-left shadow-xl transition-all',
                )}>
                <div className="grid gap-y-2.5 px-6 pb-4 pt-6">
                  <Dialog.Title as="div">
                    <Heading level="heading6">{title}</Heading>
                  </Dialog.Title>
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
