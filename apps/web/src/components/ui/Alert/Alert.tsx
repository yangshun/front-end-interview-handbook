import clsx from 'clsx';
import type { ReactNode } from 'react';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from '@heroicons/react/20/solid';

type AlertVariant = 'danger' | 'info' | 'success' | 'warning';

type Props = Readonly<{
  children: ReactNode;
  title?: string;
  variant: AlertVariant;
}>;

const classes: Record<
  AlertVariant,
  Readonly<{
    backgroundClass: string;
    bodyClass: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClass: string;
    titleClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-rose-50',
    bodyClass: 'text-rose-700',
    icon: XCircleIcon,
    iconClass: 'text-rose-400',
    titleClass: 'text-rose-800',
  },
  info: {
    backgroundClass: 'bg-sky-50',
    bodyClass: 'text-sky-700',
    icon: InformationCircleIcon,
    iconClass: 'text-sky-400',
    titleClass: 'text-sky-800',
  },
  success: {
    backgroundClass: 'bg-emerald-50',
    bodyClass: 'text-emerald-700',
    icon: CheckCircleIcon,
    iconClass: 'text-emerald-400',
    titleClass: 'text-emerald-800',
  },
  warning: {
    backgroundClass: 'bg-amber-50',
    bodyClass: 'text-amber-700',
    icon: ExclamationTriangleIcon,
    iconClass: 'text-amber-400',
    titleClass: 'text-amber-800',
  },
};

export default function Alert({ children, title, variant }: Props) {
  const {
    backgroundClass,
    iconClass,
    titleClass,
    bodyClass,
    icon: Icon,
  } = classes[variant];

  return (
    <div className={clsx('rounded-md p-4', backgroundClass)}>
      <div className="flex">
        <div className="flex-shrink-0">
          <Icon aria-hidden="true" className={clsx('h-5 w-5', iconClass)} />
        </div>
        <div className="ml-3 space-y-2">
          {title && (
            <Heading
              className={clsx('text-base font-medium', titleClass)}
              color="custom"
              level="custom">
              {title}
            </Heading>
          )}
          <Section>
            <div className={clsx('text-base', bodyClass)}>
              <p>{children}</p>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}
