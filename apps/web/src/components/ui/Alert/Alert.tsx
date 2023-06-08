import clsx from 'clsx';
import type { ReactNode } from 'react';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import Text from '../Text';

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
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClass: string;
    titleClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-lighter',
    icon: XCircleIcon,
    iconClass: 'text-danger',
    titleClass: 'text-danger',
  },
  info: {
    backgroundClass: 'bg-info-lighter',
    icon: InformationCircleIcon,
    iconClass: 'text-info',
    titleClass: 'text-info',
  },
  success: {
    backgroundClass: 'bg-success-lighter',
    icon: CheckCircleIcon,
    iconClass: 'text-success',
    titleClass: 'text-success',
  },
  warning: {
    backgroundClass: 'bg-warning-lighter',
    icon: ExclamationTriangleIcon,
    iconClass: 'text-warning',
    titleClass: 'text-warning',
  },
};

export default function Alert({ children, title, variant }: Props) {
  const {
    backgroundClass,
    iconClass,
    titleClass,
    icon: Icon,
  } = classes[variant];

  return (
    <div className={clsx('rounded-lg p-4', backgroundClass)}>
      <div className="flex gap-x-2">
        <div className="flex-shrink-0">
          <Icon
            aria-hidden="true"
            className={clsx('mt-0.5 h-5 w-5', iconClass)}
          />
        </div>
        <div className="grid gap-y-1">
          {title && (
            <Heading
              className={clsx('text-base font-semibold', titleClass)}
              color="custom"
              level="custom">
              {title}
            </Heading>
          )}
          <Section>
            <Text color="secondary" display="block" variant="body">
              {children}
            </Text>
          </Section>
        </div>
      </div>
    </div>
  );
}
