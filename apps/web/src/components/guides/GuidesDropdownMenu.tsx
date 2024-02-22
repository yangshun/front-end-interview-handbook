import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useGuidesData } from '~/data/Guides';

import Anchor from '~/components/ui/Anchor';
import {
  dropdownContentClassName,
  dropdownContentItemClassName,
} from '~/components/ui/DropdownMenu/dropdownStyles';
import {
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
} from '~/components/ui/theme';

import Text from '../ui/Text';
import {
  themeBackgroundEmphasized,
  themeBackgroundLayerEmphasized,
  themeBackgroundLayerEmphasized_Hover,
  themeGlassyBorder,
  themeTextSecondaryColor,
} from '../ui/theme';

import {
  Content,
  Item,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dropdown-menu';

export default function GuidesDropdownMenu() {
  const guidesData = useGuidesData();
  const guides = [
    guidesData['front-end-interview-guidebook'],
    guidesData['front-end-system-design-guidebook'],
    guidesData['behavioral-interview-guidebook'],
  ];

  const pathname = usePathname();

  const selectedGuide =
    Object.values(guides).find(({ href }) => pathname?.startsWith(href)) ??
    guides[0];

  const Icon = selectedGuide.icon;
  const label = selectedGuide.shortName;

  return (
    <Root>
      <Trigger
        className={clsx(
          'group inline-flex flex-1 items-center justify-between gap-2',
          'rounded',
          'transition-colors',
          ['border', themeBorderElementColor],
          [
            themeOutlineElement_FocusVisible,
            themeOutlineElementBrandColor_FocusVisible,
          ],
          'px-3 py-1.5',
          themeGlassyBorder,
          themeBackgroundEmphasized,
          themeBackgroundLayerEmphasized_Hover,
        )}>
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              'size-6 flex shrink-0 items-center justify-center rounded-full',
              themeGlassyBorder,
              themeBackgroundLayerEmphasized,
            )}>
            <Icon className="size-3" />
          </div>
          <Text
            className="line-clamp-1 text-ellipsis text-left"
            size="body2"
            weight="bold">
            {label}
          </Text>
        </div>
        <RiArrowDownSLine
          aria-hidden="true"
          className={clsx('size-4 shrink-0', themeTextSecondaryColor)}
        />
      </Trigger>
      <Portal>
        <Content
          align="start"
          className={dropdownContentClassName}
          sideOffset={8}>
          {Object.values(guides).map(
            ({ key, href, shortName, icon: ItemIcon }) => {
              const isSelected = pathname ? href.startsWith(pathname) : false;

              return (
                <Item key={key} asChild={true}>
                  <Anchor
                    className={clsx(dropdownContentItemClassName, 'gap-2')}
                    href={href}
                    variant="unstyled">
                    <div
                      className={clsx(
                        'flex shrink-0 items-center justify-center',
                        'rounded-full',
                        'size-6',
                        themeGlassyBorder,
                        themeBackgroundLayerEmphasized,
                        isSelected
                          ? themeTextBrandColor
                          : themeTextSecondaryColor,
                      )}>
                      <ItemIcon className="size-4" />
                    </div>
                    <Text
                      color={isSelected ? 'active' : 'default'}
                      display="block"
                      size="body2"
                      weight="bold">
                      {shortName}
                    </Text>
                  </Anchor>
                </Item>
              );
            },
          )}
        </Content>
      </Portal>
    </Root>
  );
}
