import clsx from 'clsx';
import {
  RiCheckboxCircleLine,
  RiEmotionSadLine,
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
  empty: RiGhost2Line,
  error: RiEmotionSadLine,
  exit: RiLogoutBoxLine,
  login: RiLoginBoxLine,
  not_subscribed: RiLockLine,
  success: RiCheckboxCircleLine,
  under_construction: RiToolsLine,
};
const colors: Record<EmptyStateVariant, TextColor> = {
  empty: 'disabled',
  error: 'error',
  exit: 'disabled',
  login: 'disabled',
  not_subscribed: 'disabled',
  success: 'success',
  under_construction: 'disabled',
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
      <Text color={colors[variant]} display="block">
        <Icon
          aria-hidden="true"
          className={clsx('mx-auto h-10 w-10 shrink-0')}
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
