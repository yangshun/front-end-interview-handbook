'use client';

import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { forwardRef, useState } from 'react';
import { RiMenuFill } from 'react-icons/ri';

import { useAnchorClickHandler } from '~/hooks/useAnchorClickHandler';

import SlideOut from '~/components/ui/SlideOut';
import {
  themeBackgroundBrandColor,
  themeBorderColor,
} from '~/components/ui/theme';

import Button from '../Button';
import NavbarEnd from './NavbarEnd';
import NavbarHeightStyles from './NavbarHeightStyles';
import NavbarItem from './NavbarItem';
import NavbarSidebarItem from './NavbarSidebarItem';
import type { NavbarTopLevelItem } from './NavTypes';

type Props = Readonly<{
  bottomBorder?: boolean;
  className?: string;
  endAddOnItems?: React.ReactNode;
  hideOnDesktop?: boolean;
  isLoading: boolean;
  links: ReadonlyArray<NavbarTopLevelItem>;
  logo?: React.ReactNode;
  mobileSidebarBottomItems?: React.ReactNode;
  mobileSidebarHeaderClassName?: string;
  mobileSidebarTopItems?: React.ReactNode;
  navbarEnd?: React.ReactNode;
  renderMobileSidebarAddOnItems?: ({
    closeMobileNav,
  }: Readonly<{ closeMobileNav: () => void }>) => React.ReactNode;
  renderMobileSidebarContent?: ({
    closeMobileNav,
  }: Readonly<{ closeMobileNav: () => void }>) => React.ReactNode;
  sidebarLogo?: React.ReactNode;
  style?: CSSProperties;
  translucent?: boolean;
  unreadNotificationCount?: number;
}>;

function Navbar(
  {
    bottomBorder,
    className,
    endAddOnItems,
    hideOnDesktop = false,
    isLoading,
    links,
    logo,
    mobileSidebarBottomItems,
    mobileSidebarHeaderClassName,
    mobileSidebarTopItems,
    navbarEnd,
    renderMobileSidebarAddOnItems,
    renderMobileSidebarContent,
    sidebarLogo,
    translucent = false,
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

  const { handleAnchorItemClick } = useAnchorClickHandler(closeMobileNav);

  return (
    <div
      ref={ref}
      className={clsx(
        'z-fixed sticky top-[var(--banner-height)]',
        bottomBorder && ['border-b', themeBorderColor],
        translucent ? 'backdrop-blur' : 'bg-white dark:bg-neutral-900/60',
        'transition-[background-color]',
        hideOnDesktop && 'lg:hidden',
        className,
      )}>
      <NavbarHeightStyles
        borderHeight={bottomBorder ? 1 : 0}
        hideOnDesktop={hideOnDesktop}
      />
      <div className="max-w-8xl mx-auto px-6">
        <div
          className={clsx(
            'flex items-center justify-between gap-6 md:justify-start',
            'h-[var(--navbar-height)]',
          )}>
          <div className="flex items-center justify-start lg:w-0 lg:grow">
            {logo}
            <nav
              className={clsx(
                'flex items-center gap-4 md:gap-x-8 lg:w-0 lg:flex-1',
                'ml-3 sm:ml-6 lg:ml-20',
              )}>
              {leftLinks.map((navItem) => (
                <NavbarItem key={navItem.id} {...navItem} />
              ))}
            </nav>
          </div>
          {navbarEnd ?? (
            <NavbarEnd
              addOnItems={endAddOnItems}
              className={clsx(
                'hidden items-center justify-end gap-x-8',
                'md:flex md:grow lg:w-0 lg:grow-0',
              )}
              isLoading={isLoading}
              links={rightLinks}
            />
          )}
          <div className={clsx('-ml-3 lg:hidden')}>
            <SlideOut
              enterFrom="start"
              headerClassName={clsx('pt-5 pb-3', mobileSidebarHeaderClassName)}
              isShown={isMobileNavOpen}
              padding={false}
              size="sm"
              title={
                <div className="flex shrink-0 items-center">
                  {sidebarLogo ?? logo}
                </div>
              }
              trigger={
                <div className="relative">
                  <Button
                    icon={RiMenuFill}
                    isLabelHidden={true}
                    label="Open menu"
                    size="xs"
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
              {renderMobileSidebarContent?.({ closeMobileNav }) ?? (
                <div
                  className="flex h-full flex-col"
                  onClick={handleAnchorItemClick}>
                  {mobileSidebarTopItems}
                  <div className="flex h-0 flex-1 flex-col pb-4">
                    <nav
                      aria-label="Sidebar"
                      className="flex flex-1 flex-col justify-between overflow-hidden">
                      <div className={clsx('flex flex-col overflow-y-auto')}>
                        {leftLinks.length > 0 &&
                          leftLinks.map((navItem) => (
                            <NavbarSidebarItem
                              key={navItem.id}
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
                              key={navItem.id}
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
              )}
            </SlideOut>
          </div>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(Navbar);
