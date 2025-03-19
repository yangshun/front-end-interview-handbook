'use client';

import clsx from 'clsx';
import { useRef } from 'react';
import { RiMoreLine, RiPhoneLine, RiScales3Line } from 'react-icons/ri';
import url from 'url';

import useIsSticky from '~/hooks/useIsSticky';

import { SocialLinks } from '~/data/SocialLinks';

import NavColorSchemeDropdown from '~/components/global/navbar/NavColorSchemeDropdown';
import NavI18nDropdown from '~/components/global/navbar/NavI18nDropdown';
import NavProductPopover from '~/components/global/navbar/NavProductPopover';
import SidebarColorSchemeSubMenu from '~/components/global/sidebar/SidebarColorSchemeSubMenu';
import SidebarI18nSubMenu from '~/components/global/sidebar/SidebarI18nSubMenu';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Navbar from '~/components/ui/Navbar/Navbar';
import { themeBorderColor } from '~/components/ui/theme';

export default function SponsorsNavbar() {
  const intl = useIntl();
  const navbarRef = useRef(null);
  const { isSticky } = useIsSticky(navbarRef);

  const translucent = !isSticky;

  return (
    <Navbar
      ref={navbarRef}
      endAddOnItems={
        <div className="hidden items-center gap-6 lg:flex">
          <div className="flex items-center gap-3">
            <Button
              href={url.format({
                hash: 'contact-section',
                pathname: '/advertise-with-us',
              })}
              label={intl.formatMessage({
                defaultMessage: 'Contact us',
                description: 'Contact us button label',
                id: 'IxYmig',
              })}
              size="xs"
              variant="secondary"
            />
            <Button
              href="/advertise-with-us/request"
              label={intl.formatMessage({
                defaultMessage: 'Schedule your slots',
                description: 'Book advertising slots',
                id: 'Y/+dNC',
              })}
              size="xs"
              variant="primary"
            />
          </div>
          <div className="flex gap-x-3">
            <NavI18nDropdown size="xs" />
            <NavColorSchemeDropdown size="xs" />
          </div>
        </div>
      }
      isLoading={false}
      links={[]}
      logo={
        <NavProductPopover
          label={intl.formatMessage({
            defaultMessage: 'Advertise with us',
            description: 'Link to advertise with us',
            id: '9OVmVF',
          })}
          product="interviews"
          triggerClassname="-ml-2"
          variant="full"
        />
      }
      mobileSidebarHeaderClassName="!gap-x-0"
      renderMobileSidebarContent={({ closeMobileNav }) => (
        <div className={clsx('flex flex-col gap-6', 'h-full')}>
          <div className={clsx('flex flex-1 flex-col gap-2', 'px-6 pt-4')}>
            <Button
              href={url.format({
                hash: 'contact-section',
                pathname: '/advertise-with-us',
              })}
              label={intl.formatMessage({
                defaultMessage: 'Contact us',
                description: 'Contact us button label',
                id: 'IxYmig',
              })}
              size="xs"
              variant="secondary"
              onClick={closeMobileNav}
            />
            <Button
              href="/advertise-with-us/request"
              label={intl.formatMessage({
                defaultMessage: 'Schedule your slots',
                description: 'Book advertising slots',
                id: 'Y/+dNC',
              })}
              size="xs"
              variant="primary"
              onClick={closeMobileNav}
            />
          </div>
          <div
            className={clsx('flex justify-between gap-4', 'px-6 py-4', [
              'border-t',
              themeBorderColor,
            ])}>
            <Button
              href={SocialLinks.discord.href}
              icon={SocialLinks.discord.icon}
              isLabelHidden={true}
              label={SocialLinks.discord.name}
              variant="secondary"
            />
            <Button
              href={SocialLinks.linkedin.href}
              icon={SocialLinks.linkedin.icon}
              isLabelHidden={true}
              label={SocialLinks.linkedin.name}
              variant="secondary"
            />
            <NavI18nDropdown size="sm" />
            <NavColorSchemeDropdown size="sm" />
            <DropdownMenu
              icon={RiMoreLine}
              isLabelHidden={true}
              label="More"
              showChevron={false}
              size="sm">
              <SidebarColorSchemeSubMenu />
              <SidebarI18nSubMenu type="submenu" />
              <Divider />
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
              <Divider />
              <DropdownMenu.Item
                href={SocialLinks.github.href}
                icon={SocialLinks.github.icon}
                label={SocialLinks.github.name}
              />
              <DropdownMenu.Item
                href={SocialLinks.linkedin.href}
                icon={SocialLinks.linkedin.icon}
                label={SocialLinks.linkedin.name}
              />
              <DropdownMenu.Item
                href={SocialLinks.discord.href}
                icon={SocialLinks.discord.icon}
                label={SocialLinks.discord.name}
              />
            </DropdownMenu>
          </div>
        </div>
      )}
      translucent={translucent}
    />
  );
}
