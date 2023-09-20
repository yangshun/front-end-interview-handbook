import clsx from 'clsx';
import {
  RiCheckboxCircleLine,
  RiCodeBoxLine,
  RiEmotionSadLine,
  RiFlaskLine,
  RiGhost2Line,
  RiLockLine,
  RiLoginBoxLine,
  RiLogoutBoxLine,
  RiToolsLine,
} from 'react-icons/ri';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import type { TextColor } from '../Text';
import Text from '../Text';

type EmptyStateVariant =
  | 'editor_loading'
  | 'empty'
  | 'error'
  | 'exit'
  | 'login'
  | 'not_subscribed'
  | 'success'
  | 'tests_loading'
  | 'under_construction';

type Props = Readonly<{
  action?: React.ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  iconClassName?: string;
  subtitle?: React.ReactNode;
  title: React.ReactNode;
  variant?: EmptyStateVariant;
}>;

const icons: Record<
  EmptyStateVariant,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  editor_loading: RiCodeBoxLine,
  empty: RiGhost2Line,
  error: RiEmotionSadLine,
  exit: RiLogoutBoxLine,
  login: RiLoginBoxLine,
  not_subscribed: RiLockLine,
  success: RiCheckboxCircleLine,
  tests_loading: RiFlaskLine,
  under_construction: RiToolsLine,
};
const colors: Record<EmptyStateVariant, TextColor> = {
  editor_loading: 'disabled',
  empty: 'disabled',
  error: 'error',
  exit: 'disabled',
  login: 'disabled',
  not_subscribed: 'disabled',
  success: 'success',
  tests_loading: 'disabled',
  under_construction: 'disabled',
};

export default function EmptyState({
  action,
  icon,
  iconClassName,
  subtitle,
  title,
  variant = 'empty',
}: Props) {
  const Icon = icon ?? icons[variant];

  return (
    <div className="mx-auto max-w-md py-6 text-center sm:py-12">
      <Text color={colors[variant]} display="block">
        <Icon
          aria-hidden="true"
          className={clsx('mx-auto h-10 w-10 shrink-0', iconClassName)}
        />
      </Text>
      <Heading className="mt-4" level="custom">
        <Text display="block" size="body" weight="medium">
          {title}
        </Text>
      </Heading>
      <Section>
        {subtitle && (
          <Text className="mt-1" color="secondary" display="block" size="body2">
            {subtitle}
          </Text>
        )}
        {action && <div className="mt-6">{action}</div>}
      </Section>
    </div>
  );
}
