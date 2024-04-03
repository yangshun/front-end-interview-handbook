import clsx from 'clsx';
import {
  RiContractLeftLine,
  RiContractRightLine,
  RiDiscordLine,
  RiLinkedinFill,
  RiMoreLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { SocialLinks } from '~/data/SocialLinks';

import SidebarLinkButton from '~/components/global/sidebar/SidebarLinkButton';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import { themeBorderColor } from '~/components/ui/theme';

import SidebarAuthDropdownItem from './SidebarAuthDropdownItem';
import SidebarColorSchemeSubMenu from './SidebarColorSchemeSubMenu';
import NavProductMenuSelector from '../navbar/NavProductMenuSelector';

type SidebarItem = SidebarLink;

export type SidebarLink = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  scrollToTop?: boolean;
}>;

export type SidebarItems = Readonly<{
  bottom: ReadonlyArray<SidebarItem>;
  top: ReadonlyArray<SidebarItem>;
}>;

export function SidebarCollapsed({
  moreMenuItems,
  topAddonElements,
  sidebarItems,
  onCollapseClick,
  isViewerPremium,
  product,
}: Readonly<{
  isViewerPremium: boolean;
  moreMenuItems: React.ReactElement | false | null | undefined;
  onCollapseClick: () => void;
  product: React.ComponentProps<typeof NavProductMenuSelector>['value'];
  sidebarItems: SidebarItems;
  topAddonElements: React.ReactNode;
}>) {
  const intl = useIntl();

  return (
    <nav
      className={clsx(
        'flex flex-col items-center gap-y-4',
        'relative h-full',
        'px-3 py-4',
        ['border-e', themeBorderColor],
      )}>
      <NavProductMenuSelector value={product} variant="compact" />
      {topAddonElements}
      <ul className="flex grow flex-col gap-1">
        {sidebarItems.top.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton isLabelHidden={true} {...link} />
          </li>
        ))}
      </ul>
      <Divider className="w-full" />
      <ul className="flex flex-col gap-1">
        {sidebarItems.bottom.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton isLabelHidden={true} {...link} />
          </li>
        ))}
      </ul>
      <Divider className="w-full" />
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <DropdownMenu
            align="end"
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            side="right"
            size="sm">
            <SidebarColorSchemeSubMenu />
            {moreMenuItems}
            <Divider />
            <DropdownMenu.Item
              href={SocialLinks.linkedin.href}
              icon={RiLinkedinFill}
              label="LinkedIn"
            />
            {isViewerPremium ? (
              <DropdownMenu.Item
                color="active"
                href={SocialLinks.discordPremium.href}
                icon={RiDiscordLine}
                label={intl.formatMessage({
                  defaultMessage: 'Premium Discord',
                  description: 'Link to the premium Discord server',
                  id: 'gvLQbK',
                })}
              />
            ) : (
              <DropdownMenu.Item
                href={SocialLinks.discord.href}
                icon={RiDiscordLine}
                label="Discord"
              />
            )}
            <Divider />
            <SidebarAuthDropdownItem />
          </DropdownMenu>
        </div>
        <Button
          icon={RiContractRightLine}
          isLabelHidden={true}
          label="Expand sidebar"
          size="sm"
          tooltip="Expand sidebar"
          tooltipSide="right"
          variant="secondary"
          onClick={onCollapseClick}
        />
      </div>
    </nav>
  );
}

export function SidebarExpanded({
  renderTopAddonElements,
  renderBottomAddonElements,
  isLoading,
  isViewerPremium,
  moreMenuItems,
  sidebarItems,
  onCollapseClick,
  product,
}: Readonly<{
  isLoading: boolean;
  isViewerPremium: boolean;
  moreMenuItems: React.ReactElement | false | null | undefined;
  onCollapseClick?: () => void;
  product: React.ComponentProps<typeof NavProductMenuSelector>['value'];
  renderBottomAddonElements: (fadeInClassname: string) => React.ReactNode;
  renderTopAddonElements: (fadeInClassname: string) => React.ReactNode;
  sidebarItems: SidebarItems;
}>) {
  const intl = useIntl();
  const fadeInClass = clsx(
    'transition-opacity duration-500',
    isLoading && 'select-none opacity-0',
  );

  return (
    <nav
      className={clsx('flex flex-col gap-y-4', 'relative h-full p-4', [
        'border-e',
        themeBorderColor,
      ])}>
      <NavProductMenuSelector value={product} variant="full" />
      {renderTopAddonElements(fadeInClass)}
      <ul className={clsx('flex grow flex-col gap-2', fadeInClass)}>
        {sidebarItems.top.map(({ key: childKey, ...link }) => (
          <li key={childKey}>
            <SidebarLinkButton {...link} />
          </li>
        ))}
      </ul>
      <div className={clsx('flex flex-col gap-y-5', fadeInClass)}>
        <Divider />
        <ul className="flex flex-col gap-2">
          {sidebarItems.bottom.map(({ key: childKey, ...link }) => (
            <li key={childKey}>
              <SidebarLinkButton {...link} />
            </li>
          ))}
        </ul>
        {renderBottomAddonElements(fadeInClass)}
        <Divider />
      </div>
      <div className="flex justify-between gap-4 pt-2">
        <div className="flex gap-4">
          <Button
            href={SocialLinks.linkedin.href}
            icon={RiLinkedinFill}
            isLabelHidden={true}
            label="LinkedIn"
            size="sm"
            tooltip={intl.formatMessage({
              defaultMessage: 'Follow on LinkedIn',
              description: 'Link to the LinkedIn page',
              id: 'gAep7Q',
            })}
            variant="secondary"
          />
          {isViewerPremium ? (
            <Button
              href={SocialLinks.discordPremium.href}
              icon={RiDiscordLine}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Premium Discord',
                description: 'Link to the premium Discord server',
                id: 'gvLQbK',
              })}
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Premium Discord',
                description: 'Link to the Discord server',
                id: 'KdVEiX',
              })}
              variant="special"
            />
          ) : (
            <Button
              href={SocialLinks.discord.href}
              icon={RiDiscordLine}
              isLabelHidden={true}
              label="Discord"
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Discord',
                description: 'Link to the Discord server',
                id: 'kdO5C4',
              })}
              variant="secondary"
            />
          )}
          <DropdownMenu
            icon={RiMoreLine}
            isLabelHidden={true}
            label="More"
            showChevron={false}
            size="sm">
            <SidebarColorSchemeSubMenu />
            {moreMenuItems}
            <Divider />
            <SidebarAuthDropdownItem />
          </DropdownMenu>
        </div>
        {onCollapseClick && (
          <Button
            icon={RiContractLeftLine}
            isLabelHidden={true}
            label="Collapse"
            size="sm"
            variant="secondary"
            onClick={onCollapseClick}
          />
        )}
      </div>
    </nav>
  );
}
