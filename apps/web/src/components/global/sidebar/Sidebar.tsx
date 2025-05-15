import clsx from 'clsx';
import {
  RiContractLeftLine,
  RiContractRightLine,
  RiLinkedinFill,
  RiMoreLine,
  RiPhoneLine,
  RiScales3Line,
  RiShakeHandsLine,
} from 'react-icons/ri';

import { SPONSORSHIPS_AVAILABLE } from '~/data/FeatureFlags';
import { SocialLinks } from '~/data/SocialLinks';

import SidebarI18nSubMenu from '~/components/global/sidebar/SidebarI18nSubMenu';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import ScrollArea from '~/components/ui/ScrollArea';

import NavProductDropdownMenu, {
  NavProductPopoverLogoOnly,
} from '../navbar/NavProductPopover';
import SidebarAuthDropdownItem from './SidebarAuthDropdownItem';
import type { SidebarCollapsedLinkItemProps } from './SidebarCollapsedLinkItem';
import SidebarCollapsedLinkItem from './SidebarCollapsedLinkItem';
import SidebarColorSchemeSubMenu from './SidebarColorSchemeSubMenu';
import type { SidebarLinkEntity } from './SidebarLinksSection';
import SidebarLinksSection from './SidebarLinksSection';

export function SidebarDropdownMenu({
  moreEndMenuItems,
  moreMenuItems,
}: Readonly<{
  moreEndMenuItems?: React.ReactElement | false | null | undefined;
  moreMenuItems?: React.ReactElement | false | null | undefined;
}>) {
  const intl = useIntl();

  return (
    <DropdownMenu
      align="end"
      icon={RiMoreLine}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'More',
        description: 'More button label',
        id: 'biFSa7',
      })}
      showChevron={false}
      side="right"
      size="sm">
      <SidebarColorSchemeSubMenu />
      <SidebarI18nSubMenu type="submenu" />
      {moreMenuItems}
      <DropdownMenu.Item
        href="/contact"
        icon={RiPhoneLine}
        label={intl.formatMessage({
          defaultMessage: 'Contact us',
          description: 'Link to contact page',
          id: 'dRUyU9',
        })}
      />
      <DropdownMenu.Sub
        icon={RiScales3Line}
        label={intl.formatMessage({
          defaultMessage: 'Legal',
          description: 'Link to legal page',
          id: 'J7b0BM',
        })}>
        <DropdownMenu.Item
          href="/legal/privacy-policy"
          label={intl.formatMessage({
            defaultMessage: 'Privacy policy',
            description: 'Link to privacy policy page',
            id: 'RxU5TE',
          })}
        />
        <DropdownMenu.Item
          href="/legal/terms"
          label={intl.formatMessage({
            defaultMessage: 'Terms of service',
            description: 'Link to terms of service page',
            id: 'WYR3gj',
          })}
        />
      </DropdownMenu.Sub>
      {SPONSORSHIPS_AVAILABLE && (
        <DropdownMenu.Sub
          icon={RiShakeHandsLine}
          label={intl.formatMessage({
            defaultMessage: 'Partner',
            description: 'Label for partner',
            id: '9hx6+J',
          })}>
          <DropdownMenu.Item
            href="/affiliates"
            label={intl.formatMessage({
              defaultMessage: 'Become an affiliate',
              description: 'Link to affiliate marketing program page',
              id: 'IZH9WZ',
            })}
          />
          <DropdownMenu.Item
            href="/advertise-with-us"
            label={intl.formatMessage({
              defaultMessage: 'Advertise with us',
              description: 'Link to advertise with us',
              id: '9OVmVF',
            })}
          />
        </DropdownMenu.Sub>
      )}
      {moreEndMenuItems}
      <Divider />
      <SidebarAuthDropdownItem />
    </DropdownMenu>
  );
}

export function SidebarCollapsed({
  bottomAddonElements,
  moreMenuItems,
  notificationItem,
  onCollapseClick,
  product,
  showPremiumDiscord,
  sidebarItems,
  topAddonElements,
}: Readonly<{
  bottomAddonElements?: React.ReactNode;
  moreMenuItems: React.ReactElement | false | null | undefined;
  notificationItem?: React.ReactElement | false | null | undefined;
  onCollapseClick: () => void;
  product: React.ComponentProps<typeof NavProductDropdownMenu>['product'];
  showPremiumDiscord: boolean;
  sidebarItems: ReadonlyArray<
    Readonly<{ position: 'end' | 'start' }> & SidebarCollapsedLinkItemProps
  >;
  topAddonElements?: React.ReactNode;
}>) {
  const intl = useIntl();
  const startItems = sidebarItems.filter((item) => item.position === 'start');
  const endItems = sidebarItems.filter((item) => item.position === 'end');

  return (
    <nav
      className={clsx(
        'flex flex-col items-center gap-y-4',
        'relative h-full',
        'py-4',
      )}>
      <div className="pb-8">
        <NavProductPopoverLogoOnly product={product} />
      </div>
      {topAddonElements}
      <ul className="flex grow flex-col gap-1">
        {startItems.map((item) => (
          <li key={item.id}>
            <SidebarCollapsedLinkItem {...item} />
          </li>
        ))}
      </ul>
      {endItems.length > 0 && (
        <>
          <Divider className="w-full" />
          <ul className="flex flex-col gap-1">
            {endItems.map((item) => (
              <li key={item.id}>
                <SidebarCollapsedLinkItem {...item} />
              </li>
            ))}
          </ul>
        </>
      )}
      {bottomAddonElements}
      <Divider className="w-full" />
      <div className="flex flex-col items-center gap-4">
        {notificationItem}
        <div className="flex flex-col items-center gap-4">
          <SidebarDropdownMenu
            moreEndMenuItems={
              <>
                <Divider />
                {showPremiumDiscord ? (
                  <DropdownMenu.Item
                    href={SocialLinks.discordPremium.href}
                    icon={SocialLinks.discordPremium.icon}
                    label={SocialLinks.discordPremium.name}
                  />
                ) : (
                  <DropdownMenu.Item
                    href={SocialLinks.discord.href}
                    icon={SocialLinks.discord.icon}
                    label={SocialLinks.discord.name}
                  />
                )}
                <DropdownMenu.Item
                  href={SocialLinks.linkedin.href}
                  icon={RiLinkedinFill}
                  label={SocialLinks.linkedin.name}
                />
                <DropdownMenu.Item
                  href={SocialLinks.github.href}
                  icon={SocialLinks.github.icon}
                  label={SocialLinks.github.name}
                />
                <DropdownMenu.Item
                  href={SocialLinks.x.href}
                  icon={SocialLinks.x.icon}
                  label={SocialLinks.x.name}
                />
              </>
            }
            moreMenuItems={moreMenuItems}
          />
        </div>
        <Button
          icon={RiContractRightLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Expand sidebar',
            description: 'Expand sidebar label',
            id: '3U95FQ',
          })}
          size="sm"
          tooltip={intl.formatMessage({
            defaultMessage: 'Expand sidebar',
            description: 'Expand sidebar label',
            id: '3U95FQ',
          })}
          tooltipSide="right"
          variant="secondary"
          onClick={onCollapseClick}
        />
      </div>
    </nav>
  );
}

export function SidebarExpanded({
  bottomBarItems,
  defaultOpenSections,
  isLoading,
  isViewerPremium,
  moreMenuItems,
  notificationItem,
  onCollapseClick,
  product,
  renderBottomAddonElements,
  renderTopAddonElements,
  sidebarItems,
}: Readonly<{
  bottomBarItems?: React.ReactElement | false | null | undefined;
  defaultOpenSections?: ReadonlyArray<string>;
  isLoading: boolean;
  isViewerPremium: boolean;
  moreMenuItems?: React.ReactElement | false | null | undefined;
  notificationItem?: React.ReactElement | false | null | undefined;
  onCollapseClick?: () => void;
  product: React.ComponentProps<typeof NavProductDropdownMenu>['product'];
  renderBottomAddonElements?: (fadeInClassname: string) => React.ReactNode;
  renderTopAddonElements?: (fadeInClassname: string) => React.ReactNode;
  sidebarItems: ReadonlyArray<
    Readonly<{ position: 'end' | 'start' }> & SidebarLinkEntity
  >;
}>) {
  const intl = useIntl();
  const fadeInClass = clsx(
    'transition-opacity duration-500',
    isLoading && 'select-none opacity-0',
  );
  const startItems = sidebarItems.filter((item) => item.position === 'start');
  const endItems = sidebarItems.filter((item) => item.position === 'end');

  const bottomAddonElements = renderBottomAddonElements?.(fadeInClass);

  return (
    <nav className={clsx('flex flex-col', 'relative h-full')}>
      <div className="flex grow flex-col justify-between px-4 pt-4">
        <div className="flex justify-center pb-3 pl-2">
          <NavProductDropdownMenu product={product} variant="compact" />
        </div>
        <div className="flex grow flex-col justify-between gap-4">
          <div className={clsx('h-0 grow overflow-auto')}>
            <ScrollArea className="vignette-scroll">
              {renderTopAddonElements?.(fadeInClass)}
              <div className="pt-4">
                <SidebarLinksSection
                  defaultOpenSections={defaultOpenSections}
                  items={startItems}
                  type="single"
                />
              </div>
            </ScrollArea>
          </div>
          {endItems.length > 0 && (
            <div className={clsx('flex flex-col gap-y-4', fadeInClass)}>
              <Divider />
              <SidebarLinksSection items={endItems} type="single" />
            </div>
          )}
        </div>
      </div>
      {bottomAddonElements && (
        <div className="px-4 pb-4 pt-2">{bottomAddonElements}</div>
      )}
      <Divider />
      <div className={clsx('flex justify-between gap-4', 'p-4')}>
        <div className="flex gap-4">
          {notificationItem}
          {isViewerPremium ? (
            <Button
              href={SocialLinks.discordPremium.href}
              icon={SocialLinks.discordPremium.icon}
              isLabelHidden={true}
              label={SocialLinks.discordPremium.name}
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Discord (premium)',
                description: 'Tooltip for join premium discord',
                id: 'XG1Wfg',
              })}
              variant="primary"
            />
          ) : (
            <Button
              href={SocialLinks.discord.href}
              icon={SocialLinks.discord.icon}
              isLabelHidden={true}
              label={SocialLinks.discord.name}
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Join Discord channel (public)',
                description: 'Link to the Discord server',
                id: 'OchGBW',
              })}
              variant="secondary"
            />
          )}
          {bottomBarItems}
          <SidebarDropdownMenu moreMenuItems={moreMenuItems} />
        </div>
        {onCollapseClick && (
          <Button
            icon={RiContractLeftLine}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Collapse sidebar',
              description: 'Collapse sidebar label',
              id: 'ohLJdT',
            })}
            size="sm"
            tooltip={intl.formatMessage({
              defaultMessage: 'Collapse sidebar',
              description: 'Collapse sidebar label',
              id: 'ohLJdT',
            })}
            variant="secondary"
            onClick={onCollapseClick}
          />
        )}
      </div>
    </nav>
  );
}
