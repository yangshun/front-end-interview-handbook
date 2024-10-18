'use client';

import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { forwardRef, useState } from 'react';
import { RiMenuFill } from 'react-icons/ri';

import SlideOut from '~/components/ui/SlideOut';
import {
  themeBackgroundBrandColor,
  themeBorderColor,
} from '~/components/ui/theme';

import NavbarItem from './NavbarItem';
import NavbarSidebarItem from './NavbarSidebarItem';
import type { NavbarPrimaryItem } from './NavTypes';
import Button from '../Button';

type Props = Readonly<{
  className?: string;
  endAddOnItems?: React.ReactNode;
  hideOnDesktop?: boolean;
  isLoading: boolean;
  links: ReadonlyArray<NavbarPrimaryItem>;
  logo?: React.ReactNode;
  mobileSidebarBottomItems?: React.ReactNode;
  renderMobileSidebarAddOnItems?: ({
    closeMobileNav,
  }: Readonly<{ closeMobileNav: () => void }>) => React.ReactNode;
  style?: CSSProperties;
  transparent?: boolean;
  unreadNotificationCount?: number;
}>;

function Navbar(
  {
    className,
    endAddOnItems,
    isLoading,
    links,
    logo,
    renderMobileSidebarAddOnItems,
    mobileSidebarBottomItems,
    transparent = false,
    hideOnDesktop = false,
    unreadNotificationCount = 0,
  }: Props,
  ref: React.Ref<HTMLDivElement>,
) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const leftLinks = links.filter(({ position }) => position === 'start');
  const rightLinks = links.filter(({ position }) => position === 'end');

  function closeMobileNav() {
    setIsMobileNavOpen(false);
  }

  return (
    <div
      ref={ref}
      className={clsx(
        'z-fixed sticky top-[var(--banner-height)] backdrop-blur',
        ['border-b', themeBorderColor],
        transparent && 'bg-white dark:bg-neutral-900/60',
        'transition-[background-color]',
        hideOnDesktop && 'lg:hidden',
        className,
      )}>
      <style
        dangerouslySetInnerHTML={{
          __html: `:root { --navbar-height: 52px; --navbar-border: 1px; }`,
        }}
      />
      {hideOnDesktop && (
        <style
          dangerouslySetInnerHTML={{
            __html: `@media (min-width: 1024px) { :root { --navbar-height: 0px; --navbar-border: 0px; } }`,
          }}
        />
      )}
      <div className="max-w-8xl mx-auto px-4 md:px-6">
        <div
          className={clsx(
            'flex items-center justify-between md:justify-start md:gap-4',
            'h-[var(--navbar-height)]',
          )}>
          <div className="flex items-center justify-start lg:w-0 lg:grow">
            {logo}
            <nav className="hidden items-center space-x-4 lg:ml-10 lg:flex lg:w-0 lg:flex-1">
              {leftLinks.map((navItem) => (
                <NavbarItem key={navItem.itemKey} {...navItem} />
              ))}
            </nav>
          </div>
          <div
            className={clsx(
              'hidden items-center justify-end gap-x-4 transition-opacity duration-500 md:flex md:grow lg:w-0 lg:grow-0',
              isLoading ? 'opacity-0' : 'opacity-100',
            )}>
            <div className="flex gap-x-4">
              {rightLinks.map((navItem) => (
                <NavbarItem key={navItem.itemKey} {...navItem} />
              ))}
            </div>
            {endAddOnItems}
          </div>
          <div className="-my-2 sm:-mr-2 lg:hidden">
            <SlideOut
              enterFrom="start"
              isShown={isMobileNavOpen}
              padding={false}
              size="sm"
              title={<div className="flex shrink-0 items-center">{logo}</div>}
              trigger={
                <div className="relative">
                  <Button
                    icon={RiMenuFill}
                    isLabelHidden={true}
                    label="Open menu"
                    variant="secondary"
                    onClick={() => {
                      setIsMobileNavOpen(true);
                    }}
                  />
                  {unreadNotificationCount > 0 && (
                    <div
                      className={clsx(
                        'size-2 shrink-0 rounded-full',
                        'absolute right-0.5 top-0.5',
                        themeBackgroundBrandColor,
                      )}
                    />
                  )}
                </div>
              }
              onClose={() => {
                setIsMobileNavOpen(false);
              }}>
              <div className="flex h-full flex-col">
                <div className="flex h-0 flex-1 flex-col pb-4">
                  <nav
                    aria-label="Sidebar"
                    className="flex flex-1 flex-col justify-between overflow-hidden">
                    <div className={clsx('flex flex-col overflow-y-auto')}>
                      {leftLinks.length > 0 &&
                        leftLinks.map((navItem) => (
                          <NavbarSidebarItem
                            key={navItem.itemKey}
                            {...navItem}
                            onClick={(event) => {
                              closeMobileNav();
                              navItem.onClick?.(event);
                            }}
                          />
                        ))}
                      {rightLinks.length > 0 &&
                        rightLinks.map((navItem) => (
                          <NavbarSidebarItem
                            key={navItem.itemKey}
                            {...navItem}
                            onClick={(event) => {
                              closeMobileNav();
                              navItem.onClick?.(event);
                            }}
                          />
                        ))}
                    </div>
                    {renderMobileSidebarAddOnItems && (
                      <div className={clsx('border-t', themeBorderColor)}>
                        {renderMobileSidebarAddOnItems?.({ closeMobileNav })}
                      </div>
                    )}
                  </nav>
                </div>
                {mobileSidebarBottomItems && (
                  <div
                    className={clsx(
                      'flex shrink-0 border-t p-4',
                      themeBorderColor,
                    )}>
                    {mobileSidebarBottomItems}
                  </div>
                )}
              </div>
            </SlideOut>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Navbar);
