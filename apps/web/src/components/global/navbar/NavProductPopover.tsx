import clsx from 'clsx';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDebounce } from 'usehooks-ts';

import LogoMark from '~/components/global/logos/LogoMark';
import NavProductPopoverContent from '~/components/global/navbar/NavProductPopoverContent';
import Anchor from '~/components/ui/Anchor';
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

import * as PopoverPrimitive from '@radix-ui/react-popover';

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

export default function NavProductPopover({
  variant,
  product,
  triggerClassname,
}: Props) {
  const { label } = labels[product];
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();
  const [open, setOpen] = useState(false);
  // To debounce open state when quick hovering on and out
  const debouncedOpen = useDebounce(open, 100);

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    setOpen(false);
  }

  return (
    <div
      className={clsx(
        'flex items-center',
        variant === 'full' ? 'gap-2 md:gap-4' : 'gap-2',
      )}>
      <Anchor
        href={product === 'interviews' ? '/' : '/projects'}
        variant="unstyled">
        <LogoComboMark
          className="shrink-0"
          height={variant === 'full' ? 20 : 17}
        />
      </Anchor>
      <Divider
        className="h-3.5 shrink-0"
        color="emphasized"
        direction="vertical"
      />
      <PopoverPrimitive.Root open={debouncedOpen} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          asChild={true}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <button
            className={clsx(
              '-ml-2',
              'relative flex items-center gap-2',
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
            <Text
              color={variant === 'full' ? 'default' : 'secondary'}
              size={variant === 'full' ? 'body2' : 'body3'}
              weight="bold">
              {label}
            </Text>
            {showUnseenIndicator && (
              <span
                aria-hidden={true}
                className={clsx(
                  'size-1.5 inline-block',
                  'bg-red rounded-full',
                  'absolute right-7 top-2.5',
                )}
              />
            )}
            <RiArrowDownSLine
              aria-hidden={true}
              className={clsx('size-5 shrink-0', themeTextSubtleColor)}
            />
          </button>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <NavProductPopoverContent
            product={product}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </div>
  );
}

export function NavProductPopoverLogoOnly({
  product,
  triggerClassname,
}: Readonly<{
  product: ProductValue;
  triggerClassname?: string;
}>) {
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();
  const [open, setOpen] = useState(false);
  // To debounce open state when quick hovering on and out
  const debouncedOpen = useDebounce(open, 100);

  function handleMouseEnter() {
    setOpen(true);
  }

  function handleMouseLeave() {
    setOpen(false);
  }

  return (
    <PopoverPrimitive.Root open={debouncedOpen} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger
        asChild={true}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Anchor
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
          href={product === 'interviews' ? '/' : '/projects'}
          variant="unstyled">
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
        </Anchor>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <NavProductPopoverContent
          product={product}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
