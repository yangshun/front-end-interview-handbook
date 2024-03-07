import clsx from 'clsx';
import type { ReactNode } from 'react';
import {
  RiCheckboxCircleFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiStarFill,
} from 'react-icons/ri';

import {
  themeBorderBrandColor,
  themeBrandShadow,
  themeTextBrandColor,
  themeTextColor,
} from '~/components/ui/theme';

import Heading from '../Heading';
import Section from '../Heading/HeadingContext';
import Text from '../Text';

type AlertVariant =
  | 'danger'
  | 'info'
  | 'primary'
  | 'special'
  | 'success'
  | 'warning';

type Props = Readonly<{
  children: ReactNode;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title?: string;
  variant: AlertVariant;
}>;

const classes: Record<
  AlertVariant,
  Readonly<{
    backgroundClass: string;
    borderClass?: string;
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    iconClass: string;
    titleClass: string;
  }>
> = {
  danger: {
    backgroundClass: 'bg-danger-lighter dark:bg-neutral-800/70',
    icon: RiCloseCircleFill,
    iconClass: 'text-danger',
    titleClass: 'text-danger',
  },
  info: {
    backgroundClass: 'bg-info-lighter dark:bg-neutral-800/70',
    icon: RiInformationFill,
    iconClass: 'text-info',
    titleClass: 'text-info',
  },
  primary: {
    backgroundClass: 'bg-brand-lighter dark:bg-neutral-800/70',
    icon: RiStarFill,
    iconClass: themeTextBrandColor,
    titleClass: themeTextBrandColor,
  },
  special: {
    backgroundClass: 'bg-white dark:bg-neutral-800/70',
    borderClass: clsx('border', themeBorderBrandColor, themeBrandShadow),
    icon: RiStarFill,
    iconClass: themeTextColor,
    titleClass: themeTextColor,
  },
  success: {
    backgroundClass: 'bg-success-lightest dark:bg-neutral-800/70',
    icon: RiCheckboxCircleFill,
    iconClass: 'text-success',
    titleClass: 'text-success',
  },
  warning: {
    backgroundClass: 'bg-warning-lighter dark:bg-neutral-800/70',
    icon: RiErrorWarningFill,
    iconClass: 'text-warning',
    titleClass: 'text-warning',
  },
};

export default function Alert({
  children,
  icon: IconProp,
  title,
  variant,
}: Props) {
  const {
    backgroundClass,
    borderClass,
    iconClass,
    titleClass,
    icon: VariantIcon,
  } = classes[variant];

  const Icon = IconProp ?? VariantIcon;

  return (
    <div
      className={clsx(
        'relative',
        'flex gap-x-2',
        'rounded-lg p-4',
        backgroundClass,
        borderClass,
      )}
      role="alert">
      <div className="shrink-0">
        <Icon aria-hidden="true" className={clsx('size-5 mt-0.5', iconClass)} />
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
          <Text color="secondary" display="block" size="body1">
            {children}
          </Text>
        </Section>
      </div>
    </div>
  );
}
