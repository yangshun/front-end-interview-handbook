'use client';

import * as PopoverPrimitive from '@radix-ui/react-popover';
import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useDebounceValue } from 'usehooks-ts';

import LogoMark from '~/components/global/logos/LogoMark';
import ProjectsLogo from '~/components/global/logos/ProjectsLogo';
import NavProductPopoverContent from '~/components/global/navbar/NavProductPopoverContent';
import { useIntl } from '~/components/intl';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

type Props = Readonly<{
  product: 'interviews' | 'projects';
  variant: 'compact' | 'full';
}>;

const buttonBaseClassname = clsx(
  'rounded-lg',
  'select-none outline-none',
  ['border', themeBorderElementColor],
  'transition-colors',
  [
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
  ],
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
);

export default function NavProductPopover_DEPRECATED({
  product,
  variant,
}: Props) {
  const intl = useIntl();

  if (product === 'interviews') {
    throw 'Interviews unsupported';
  }

  const [showUnseenIndicator] = useProductMenuUnseenIndicator();
  const [debouncedOpen, setOpen] = useDebounceValue(false, 100);

  // To debounce open state when quick hovering on and out

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
        {variant === 'full' ? (
          <button
            aria-label={intl.formatMessage({
              defaultMessage: 'Select product',
              description: 'Select product label',
              id: 'yuMfLH',
            })}
            className={clsx(
              'group',
              'flex items-center justify-between',
              'shrink-0',
              'p-3',
              buttonBaseClassname,
            )}
            type="button">
            <div className="flex gap-1">
              <ProjectsLogo height={32} />
              {showUnseenIndicator && (
                <span
                  aria-hidden={true}
                  className={clsx(
                    'bg-red size-2 -translate-y-1/2 rounded-full',
                  )}
                />
              )}
            </div>
            <RiArrowDownSLine
              className={clsx(
                'size-4 shrink-0',
                'text-neutral-600 dark:text-neutral-200',
                'transition-transform group-data-[state=open]:rotate-180',
              )}
            />
          </button>
        ) : (
          <button
            aria-label={intl.formatMessage({
              defaultMessage: 'Select product',
              description: 'Select product label',
              id: 'yuMfLH',
            })}
            className={clsx(
              'grid place-content-center',
              'relative',
              'size-11',
              'shrink-0',
              'group',
              buttonBaseClassname,
            )}
            type="button">
            <LogoMark height={19} width={26} />
            {showUnseenIndicator && (
              <span
                className={clsx(
                  'absolute size-1.5',
                  'bg-red rounded-full',
                  'right-1 top-1',
                )}
              />
            )}
          </button>
        )}
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
