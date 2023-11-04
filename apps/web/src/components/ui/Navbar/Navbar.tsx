'use client';

import clsx from 'clsx';
import type { CSSProperties } from 'react';
import { forwardRef, Fragment, useState } from 'react';
import { RiCloseLine, RiMenuFill } from 'react-icons/ri';

import {
  themeBackgroundLayerColor,
  themeLineColor,
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
        'sticky top-0 z-30 backdrop-blur',
        ['border-b', themeLineColor],
        transparent && 'bg-white dark:bg-neutral-950/60',
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
            <Button
              icon={RiMenuFill}
              isLabelHidden={true}
              label="Open menu"
              variant="secondary"
              onClick={() => {
                setIsMobileNavOpen(true);
              }}
            />
          </div>
        </div>
      </div>
      <Transition.Root as={Fragment} show={isMobileNavOpen}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setIsMobileNavOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-neutral-600 bg-opacity-75" />
          </Transition.Child>
          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <Dialog.Panel
                className={clsx(
                  'relative flex w-full max-w-xs flex-1 flex-col focus:outline-none',
                  themeBackgroundLayerColor,
                )}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute right-0 top-0 -mr-12 pt-2">
                    <button
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      type="button"
                      onClick={() => closeMobileNav()}>
                      <span className="sr-only">Close sidebar</span>
                      <RiCloseLine
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex h-0 flex-1 flex-col pb-4 pt-5">
                  <div className="flex flex-shrink-0 items-center px-4">
                    {logo}
                  </div>
                  <nav
                    aria-label="Sidebar"
                    className="mt-5 flex flex-1 flex-col justify-between overflow-hidden">
                    <div className="flex flex-col overflow-y-auto">
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
                    {renderMobileSidebarAddOnItems?.({ closeMobileNav })}
                  </nav>
                </div>
                {mobileSidebarBottomItems && (
                  <div
                    className={clsx(
                      'flex flex-shrink-0 border-t p-4',
                      themeLineColor,
                    )}>
                    {mobileSidebarBottomItems}
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
            <div aria-hidden="true" className="w-14 flex-shrink-0">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default forwardRef(Navbar);
