'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDebounce } from 'usehooks-ts';

import LogoMark from '~/components/global/logos/LogoMark';
import NavProductPopoverContent from '~/components/global/navbar/NavProductPopoverContent';
import { useIntl } from '~/components/intl';
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
  label?: string;
  onClick?: () => void;
  product: ProductValue;
  triggerClassname?: string;
  variant: 'compact' | 'full' | 'nav';
}>;

export default function NavProductPopover({
  label,
  onClick,
  product,
  triggerClassname,
  variant,
}: Props) {
  const { label: productLabel } = labels[product];
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
        variant === 'nav'
          ? 'gap-1 lg:gap-4'
          : variant === 'full'
            ? 'gap-2 md:gap-4'
            : 'gap-2',
      )}>
      <Anchor
        href={product === 'interviews' ? '/' : '/projects'}
        variant="unstyled"
        onClick={onClick}>
        <LogoComboMark
          className={clsx(
            'shrink-0',
            variant === 'nav' ? 'hidden lg:block' : 'block',
          )}
          height={variant === 'full' || variant === 'nav' ? 20 : 17}
        />
        <div className={clsx(variant === 'nav' ? 'block lg:hidden' : 'hidden')}>
          <LogoMark height={20} width={27} />
        </div>
      </Anchor>
      <Divider
        className={clsx(
          'h-3.5 shrink-0',
          variant === 'nav' ? 'hidden lg:block' : 'block',
        )}
        color="emphasized"
        direction="vertical"
      />
      <PopoverPrimitive.Root open={debouncedOpen} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger
          asChild={true}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          <div>
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
                variant === 'nav' ? 'hidden lg:flex' : 'flex',
              )}
              type="button">
              <Text
                color={
                  variant === 'full' || variant === 'nav'
                    ? 'default'
                    : 'secondary'
                }
                size={
                  variant === 'full' || variant === 'nav' ? 'body2' : 'body3'
                }
                weight="bold">
                {label ?? productLabel}
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
            <button
              className={clsx(
                '-mx-1',
                'relative flex items-center',
                'p-1',
                'rounded',
                'border-transparent',
                themeBackgroundElementEmphasizedStateColor_Hover,
                themeBackgroundElementPressedStateColor_Active,
                themeOutlineElementBrandColor_FocusVisible,
                triggerClassname,
                variant === 'nav' ? 'flex lg:hidden' : 'hidden',
              )}
              type="button">
              {showUnseenIndicator && (
                <span
                  aria-hidden={true}
                  className={clsx(
                    'size-1.5 inline-block',
                    'bg-red rounded-full',
                    'absolute right-5 top-1',
                  )}
                />
              )}
              <RiArrowDownSLine
                aria-hidden={true}
                className={clsx('size-5 shrink-0', themeTextSubtleColor)}
              />
            </button>
          </div>
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <NavProductPopoverContent
            product={product}
            onClose={() => setOpen(false)}
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
  const intl = useIntl();
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
          aria-label={intl.formatMessage({
            defaultMessage: 'Select product',
            description: 'Select product label',
            id: 'yuMfLH',
          })}
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
          onClose={() => setOpen(false)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
