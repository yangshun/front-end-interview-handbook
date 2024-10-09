import clsx from 'clsx';
import React from 'react';
import {
  RiArrowDownSLine,
  RiBriefcaseLine,
  RiRocketLine,
} from 'react-icons/ri';

import NavProductDropdownMenuContent from '~/components/global/navbar/NavProductDropdownMenuContent';
import { FormattedMessage } from '~/components/intl';
import Button from '~/components/ui/Button';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type ProductValue = 'interviews' | 'projects';

type Props = Readonly<{
  value: ProductValue;
}>;

export default function NavProductDropdownMenu({ value }: Props) {
  const labels: Record<
    ProductValue,
    Readonly<{
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
      label: string;
    }>
  > = {
    interviews: {
      icon: RiBriefcaseLine,
      label: 'Interviews',
    },
    projects: {
      icon: ({ className, ...props }) => (
        <RiRocketLine
          className={clsx('-translate-y-0.5 rotate-45', className)}
          {...props}
        />
      ),
      label: 'Projects',
    },
  };

  const { icon: Icon, label } = labels[value];
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild={true}>
        <Button
          addonPosition="start"
          className={clsx(
            'border-transparent',
            'bg-neutral-100 dark:bg-neutral-800',
            textVariants({ color: 'subtitle' }),
            themeBackgroundElementEmphasizedStateColor_Hover,
            themeBackgroundElementPressedStateColor_Active,
            themeOutlineElementBrandColor_FocusVisible,
          )}
          icon={Icon}
          iconSecondary_USE_SPARINGLY={({ className, ...props }) => (
            <RiArrowDownSLine
              className={clsx(className, themeTextSubtleColor)}
              {...props}
            />
          )}
          label={label}
          tooltip={
            <FormattedMessage
              defaultMessage="View all products"
              description="Tooltip for view product dropdown menu"
              id="Ugr9/X"
            />
          }
          variant="unstyled">
          <span className="relative">
            {label}
            {showUnseenIndicator && (
              <span
                aria-hidden={true}
                className={clsx(
                  'size-1.5 inline-block',
                  'bg-red rounded-full',
                  'absolute -right-1.5 -top-0.5',
                )}
              />
            )}
          </span>
        </Button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <NavProductDropdownMenuContent product={value} />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
