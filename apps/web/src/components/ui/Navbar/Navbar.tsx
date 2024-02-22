'use client';

import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { forwardRef, Fragment, useState } from 'react';
import { RiCloseLine, RiMenuFill } from 'react-icons/ri';

import SlideOut from '~/components/ui/SlideOut';
import {
  themeBackgroundLayerColor,
  themeBorderColor,
} from '~/components/ui/theme';

import NavbarItem from './NavbarItem';
import NavbarSidebarItem from './NavbarSidebarItem';
import type { NavbarPrimaryItem } from './NavTypes';
import Button from '../Button';

import { Dialog, Transition } from '@headlessui/react';

type Props = Readonly<{
  className?: string;
  endAddOnItems?: React.ReactNode;
  isLoading: boolean;
  links: ReadonlyArray<NavbarPrimaryItem>;
  logo?: React.ReactNode;
  mobileSidebarBottomItems?: React.ReactNode;
  renderMobileSidebarAddOnItems?: ({
    closeMobileNav,
  }: Readonly<{ closeMobileNav: () => void }>) => React.ReactNode;
  style?: CSSProperties;
  transparent?: boolean;
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
    style,
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
        'z-sticky sticky top-0 backdrop-blur',
        ['border-b', themeBorderColor],
        transparent && 'bg-white dark:bg-neutral-900/60',
        'transition-[background-color]',
        className,
      )}
      style={style}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex h-[var(--navbar-height)] items-center justify-between md:justify-start md:gap-4">
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
                <Button
                  icon={RiMenuFill}
                  isLabelHidden={true}
                  label="Open menu"
                  variant="secondary"
                  onClick={() => {
                    setIsMobileNavOpen(true);
                  }}
                />
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
