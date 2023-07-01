import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Fragment, useEffect, useRef } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiCloseLine,
  RiErrorWarningFill,
  RiInformationFill,
  RiStarFill,
} from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import type { TextColor } from '~/components/ui/Text';
import Text from '~/components/ui/Text';

import { Transition } from '@headlessui/react';

export type ToastVariant =
  | 'danger'
  | 'dark'
  | 'info'
  | 'plain'
  | 'special'
  | 'success'
  | 'warning';

export type ToastMessage = Readonly<{
  duration?: number;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
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
    iconClass: string;
    textColor: TextColor;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger',
    icon: RiCloseCircleFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  dark: {
    backgroundClass: 'bg-neutral-900 border border-neutral-700',
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  info: {
    backgroundClass: 'bg-info',
    icon: RiInformationFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  plain: {
    backgroundClass: 'bg-neutral-900 dark:bg-neutral-100',
    iconClass: 'text-neutral-900 focus:ring-neutral-500',
    textColor: 'invert',
  },
  special: {
    backgroundClass: 'bg-brand-dark',
    icon: RiStarFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  success: {
    backgroundClass: 'bg-success',
    icon: RiCheckboxCircleFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
  warning: {
    backgroundClass: 'bg-warning',
    icon: RiErrorWarningFill,
    iconClass: 'text-white focus:ring-white-500',
    textColor: 'light',
  },
};

export default function Toast({
  duration = 4000,
  icon: IconProp,
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

  const {
    icon: VariantIcon,
    backgroundClass,
    iconClass,
    textColor,
  } = classes[variant];

  const Icon = IconProp ?? VariantIcon;

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
          'pointer-events-auto w-full max-w-sm overflow-hidden rounded shadow-lg',
          backgroundClass,
        )}>
        <Text
          className="w-full items-start gap-x-2 px-3 py-2"
          color={textColor}
          display="flex">
          {Icon && <Icon className={clsx('h-5 w-5 shrink-0', iconClass)} />}
          <div className="w-0 grow space-y-1">
            <Text
              color={textColor}
              display="block"
              size="body2"
              weight="medium">
              {title}
            </Text>
            {subtitle && (
              <Text color={textColor} display="block" size="body3">
                {subtitle}
              </Text>
            )}
          </div>
          <div className="flex shrink-0">
            <button
              className={clsx(
                'inline-flex items-center justify-center rounded hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2',
                iconClass,
              )}
              type="button"
              onClick={close}>
              <span className="sr-only">
                <FormattedMessage
                  defaultMessage="Close"
                  description="Close button label"
                  id="PyDwDF"
                />
              </span>
              <RiCloseLine aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </Text>
      </div>
    </Transition>
  );
}
