import clsx from 'clsx';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';

import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  FaceFrownIcon,
  LockClosedIcon,
  RectangleStackIcon,
} from '@heroicons/react/24/outline';
import {
  CheckBadgeIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/solid';

type EmptyStateVariant =
  | 'empty'
  | 'error'
  | 'exit'
  | 'login'
  | 'not_subscribed'
  | 'success'
  | 'under_construction';

type Props = Readonly<{
  action?: React.ReactNode;
  subtitle?: string;
  title: string;
  variant: EmptyStateVariant;
}>;

const icons: Record<
  EmptyStateVariant,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  empty: RectangleStackIcon,
  error: FaceFrownIcon,
  exit: ArrowLeftOnRectangleIcon,
  login: ArrowRightOnRectangleIcon,
  not_subscribed: LockClosedIcon,
  success: CheckBadgeIcon,
  under_construction: WrenchScrewdriverIcon,
};
const colors: Record<EmptyStateVariant, string> = {
  empty: 'text-slate-400',
  error: 'text-danger',
  exit: 'text-slate-400',
  login: 'text-slate-400',
  not_subscribed: 'text-slate-400',
  success: 'text-success',
  under_construction: 'text-slate-400',
};

export default function EmptyState({
  action,
  subtitle,
  title,
  variant,
}: Props) {
  const Icon = icons[variant];

  return (
    <div className="mx-auto max-w-md py-6 text-center sm:py-12">
      <Icon
        aria-hidden="true"
        className={clsx('mx-auto h-12 w-12', colors[variant])}
      />
      <Heading className="mt-2 font-medium" level="custom">
        {title}
      </Heading>
      <Section>
        {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        {action && <div className="mt-6">{action}</div>}
      </Section>
    </div>
  );
}
