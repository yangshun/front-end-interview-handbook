import clsx from 'clsx';
import React from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import LogoMark from '~/components/global/logos/LogoMark';
import NavProductDropdownMenuContent from '~/components/global/navbar/NavProductDropdownMenuContent';
import Divider from '~/components/ui/Divider';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import LogoComboMark from '../logos/LogoComboMark';
import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type ProductValue = 'interviews' | 'projects';

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

type Props = Readonly<{
  product: ProductValue;
  triggerClassname?: string;
  variant: 'compact' | 'full';
}>;

export default function NavProductDropdownMenu({
  variant,
  product,
  triggerClassname,
}: Props) {
  const { label } = labels[product];
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild={true}>
        {variant === 'full' ? (
          <button
            className={clsx(
              'flex items-center gap-2 md:gap-4',
              'px-2 py-2',
              'rounded',
              'border-transparent',
              textVariants({
                size: 'body2',
                weight: 'bold',
              }),
              themeBackgroundElementEmphasizedStateColor_Hover,
              themeBackgroundElementPressedStateColor_Active,
              themeOutlineElementBrandColor_FocusVisible,
              triggerClassname,
            )}
            type="button">
            <LogoComboMark className="shrink-0" />
            <Divider
              className="h-3 shrink-0"
              color="emphasized"
              direction="vertical"
            />
            <span className="relative flex items-center gap-2">
              <Text size="body2" weight="bold">
                {label}
              </Text>
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
              <RiArrowDownSLine
                aria-hidden={true}
                className={clsx('size-5 shrink-0', themeTextSubtleColor)}
              />
            </span>
          </button>
        ) : (
          <button
            aria-label="Select product"
            className={clsx(
              'group',
              'flex shrink-0 items-center justify-center',
              'relative',
              'size-11',
              'rounded-lg',
              'select-none outline-none',
              'transition-colors',
              [
                themeOutlineElement_FocusVisible,
                themeOutlineElementBrandColor_FocusVisible,
              ],
              themeBackgroundElementEmphasizedStateColor_Hover,
              themeBackgroundElementPressedStateColor_Active,
              triggerClassname,
            )}
            type="button">
            <LogoMark height={19} width={26} />
            {showUnseenIndicator && (
              <span
                className={clsx(
                  'size-1.5 absolute',
                  'bg-red rounded-full',
                  'right-1 top-1',
                )}
              />
            )}
          </button>
        )}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <NavProductDropdownMenuContent product={product} />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
