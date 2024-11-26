import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import Anchor from '~/components/ui/Anchor';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from '~/components/ui/DropdownMenu/dropdownStyles';
import Text from '~/components/ui/Text';
import {
  themeTextBrandColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { GuidebookItem } from '@prisma/client';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';

export default function GuidesDropdownMenu({
  guide,
}: Readonly<{ guide: GuidebookItem }>) {
  const guidesData = useGuidesData();
  const guides = [
    guidesData.FRONT_END_INTERVIEW_PLAYBOOK,
    guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK,
    guidesData.BEHAVIORAL_INTERVIEW_PLAYBOOK,
  ];

  const pathname = usePathname();

  const selectedGuide =
    Object.values(guides).find(({ key }) => key === guide) ??
    // System design questions are part of the FESD guidebook.
    (pathname?.includes('/questions/system-design')
      ? guidesData.FRONT_END_SYSTEM_DESIGN_PLAYBOOK
      : guides[0]);
  const label = selectedGuide.shortName;

  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger
        className={clsx(
          'group inline-flex flex-1 items-center justify-between gap-2',
          'px-2 py-1.5',
          'transition-colors',
        )}>
        <div className="text-[0.8125rem] leading-4">
          <Text
            className="line-clamp-1 text-ellipsis text-left"
            color="secondary"
            size="inherit"
            weight="medium">
            {label}
          </Text>
        </div>
        <RiArrowDownSLine
          aria-hidden="true"
          className={clsx('size-4 shrink-0', themeTextSubtleColor)}
        />
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="start"
          className={dropdownContentClassName}
          sideOffset={8}>
          {Object.values(guides).map(
            ({ key, firstPageHref, shortName, icon: ItemIcon }) => {
              const isSelected = key === guide;

              return (
                <DropdownMenuPrimitive.Item key={key} asChild={true}>
                  <Anchor
                    className={clsx(dropdownContentItemClassName, 'gap-2')}
                    href={firstPageHref}
                    variant="unstyled">
                    <ItemIcon
                      className={clsx(
                        'size-4',
                        isSelected ? themeTextBrandColor : themeTextSubtleColor,
                      )}
                    />
                    <Text
                      className="block"
                      color={isSelected ? 'active' : 'default'}
                      size="body2">
                      {shortName}
                    </Text>
                  </Anchor>
                </DropdownMenuPrimitive.Item>
              );
            },
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}
