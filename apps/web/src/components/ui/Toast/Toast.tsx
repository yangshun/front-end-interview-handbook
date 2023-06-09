import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Fragment, useEffect, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';

import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  StarIcon,
  XCircleIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid';

export type ToastVariant =
  | 'danger'
  | 'info'
  | 'plain'
  | 'special'
  | 'success'
  | 'warning';

export type ToastMessage = Readonly<{
  duration?: number;
  onClose?: () => void;
  subtitle?: ReactNode;
  title: ReactNode;
  variant: ToastVariant;
}>;

type Props = Readonly<{
  onExpire?: () => void;
}> &
  ToastMessage;

const classes: Record<
  ToastVariant,
  Readonly<{
    backgroundClass: string;
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-dark',
    icon: XCircleIcon,
  },
  info: {
    backgroundClass: 'bg-info-dark',
    icon: InformationCircleIcon,
  },
  plain: {
    backgroundClass: 'bg-slate-900',
  },
  special: {
    backgroundClass: 'bg-brand-500',
    icon: StarIcon,
  },
  success: {
    backgroundClass: 'bg-success-dark',
    icon: CheckCircleIcon,
  },
  warning: {
    backgroundClass: 'bg-warning-dark',
    icon: ExclamationTriangleIcon,
  },
};

export default function Toast({
  duration = 4000,
  title,
  subtitle,
  variant,
  onClose,
  onExpire,
}: Props) {
  const timer = useRef<number | null>(null);

  function clearTimer() {
    if (timer.current == null) {
      return;
    }
    window.clearTimeout(timer.current);
    timer.current = null;
  }

  function close() {
    onClose?.();
    clearTimer();
  }

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      onExpire?.();
    }, duration);

    return () => {
      clearTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { icon: Icon, backgroundClass } = classes[variant];

  return (
    <Transition
      as={Fragment}
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-2 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      show={true}>
      <div
        className={clsx(
          'pointer-events-auto w-full max-w-sm overflow-hidden rounded shadow-lg ring-1 ring-black ring-opacity-5',
          backgroundClass,
        )}>
        <div className="flex w-full items-start gap-x-2 py-2 px-3">
          {Icon && <Icon className="h-5 w-5 shrink-0 text-white" />}
          <div className="w-0 grow space-y-1">
            <Text color="white" display="block" variant="body2" weight="medium">
              {title}
            </Text>
            {subtitle && (
              <Text color="white" display="block" variant="body3">
                {subtitle}
              </Text>
            )}
          </div>
          <div className="flex shrink-0">
            <button
              className="focus:ring-white-500 inline-flex items-center justify-center rounded text-white hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2"
              type="button"
              onClick={close}>
              <span className="sr-only">
                <FormattedMessage
                  defaultMessage="Close"
                  description="Close button label"
                  id="PyDwDF"
                />
              </span>
              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  );
}
