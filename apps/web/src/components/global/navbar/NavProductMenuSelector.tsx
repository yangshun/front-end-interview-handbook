import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import LogoLink from '~/components/global/logos/LogoLink';
import LogoMark from '~/components/global/logos/LogoMark';
import NavProductDropdownMenuContent from '~/components/global/navbar/NavProductDropdownMenuContent';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import { useProductMenuUnseenIndicator } from '../product-theme/useProductMenuUnseenIndicator';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

type Props = Readonly<{
  value: 'interviews' | 'projects';
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

export default function NavProductMenuSelector({ variant, value }: Props) {
  const [showUnseenIndicator] = useProductMenuUnseenIndicator();

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild={true}>
        {variant === 'full' ? (
          <button
            aria-label="Select product"
            className={clsx(
              'group',
              'flex items-center justify-between',
              'shrink-0',
              'p-3',
              buttonBaseClassname,
            )}
            type="button">
            <div className="flex gap-1">
              <LogoLink height={17} />
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
            aria-label="Select product"
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
                  'size-2 absolute',
                  'bg-red rounded-full',
                  'right-1 top-1',
                )}
              />
            )}
          </button>
        )}
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <NavProductDropdownMenuContent product={value} />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
