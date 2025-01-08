import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import {
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { GuidebookItem } from '@prisma/client';

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
    <DropdownMenu
      trigger={
        <button
          className={clsx(
            'group inline-flex flex-1 items-center justify-between gap-2',
            'px-2 py-1.5',
            'transition-colors',
            themeOutlineElementBrandColor_FocusVisible,
          )}
          type="button">
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
        </button>
      }>
      {Object.values(guides).map(
        ({ key, firstPageHref, shortName, icon: ItemIcon }) => {
          const isSelected = key === guide;

          return (
            <DropdownMenu.Item
              key={key}
              href={isSelected ? undefined : firstPageHref}
              icon={ItemIcon}
              isSelected={isSelected}
              label={shortName}
            />
          );
        },
      )}
    </DropdownMenu>
  );
}
