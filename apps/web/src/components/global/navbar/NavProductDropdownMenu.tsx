import clsx from 'clsx';
import React from 'react';
import {
  RiArrowDownSLine,
  RiBriefcaseLine,
  RiRocketLine,
} from 'react-icons/ri';

import NavProductDropdownMenuContent from '~/components/global/navbar/NavProductDropdownMenuContent';
import Button from '~/components/ui/Button';
import { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

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
      icon: RiRocketLine,
      label: 'Projects',
    },
  };

  const { icon: Icon, label } = labels[value];

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
          variant="unstyled"
        />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <NavProductDropdownMenuContent />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
