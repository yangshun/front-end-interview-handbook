import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useIsClient, useLocalStorage } from 'usehooks-ts';

import InterviewsLogo from '~/components/global/logos/InterviewsLogo';
import LogoMark from '~/components/global/logos/LogoMark';
import ProjectsLogo from '~/components/global/logos/ProjectsLogo';
import NavProductDropdownMenuContent from '~/components/global/navbar/NavProductDropdownMenuContent';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

// Increment number whenever the indicator is to be shown again.
const indicatorKey = 'gfe:product-menu-unseen-indicator:0';

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
  const isClient = useIsClient();
  const [showUnseenIndicator, setShowUnseenIndicator] = useLocalStorage(
    indicatorKey,
    true,
  );

  return (
    <DropdownMenuPrimitive.Root
      onOpenChange={() => {
        setShowUnseenIndicator(false);
      }}>
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
              {value === 'interviews' ? (
                <InterviewsLogo height={32} />
              ) : (
                <ProjectsLogo height={32} />
              )}
              {isClient && showUnseenIndicator && (
                <span
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
        <NavProductDropdownMenuContent />
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
