import clsx from 'clsx';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import NavProductDropdownMenuContent from '~/components/global/navbar/NavProductDropdownMenuContent';
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
      label: string;
    }>
  > = {
    interviews: {
      label: 'Interviews',
    },
    projects: {
      label: 'Projects',
    },
  };

  const { label } = labels[value];
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild={true}>
        <Button
          addonPosition="start"
          className={clsx(
            'border-transparent',
            textVariants({
              size: 'body2',
              weight: 'bold',
            }),
            themeBackgroundElementEmphasizedStateColor_Hover,
            themeBackgroundElementPressedStateColor_Active,
            themeOutlineElementBrandColor_FocusVisible,
          )}
          iconSecondary_USE_SPARINGLY={({ className, ...props }) => (
            <RiArrowDownSLine
              className={clsx(className, themeTextSubtleColor)}
              {...props}
            />
          )}
          label={label}
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
