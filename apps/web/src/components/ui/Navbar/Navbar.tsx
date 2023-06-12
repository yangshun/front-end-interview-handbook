import clsx from 'clsx';
import { Fragment, useState } from 'react';

import NavbarItem from './NavbarItem';
import NavbarSidebarItem from './NavbarSidebarItem';
import type { NavbarPrimaryItem } from './NavTypes';

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  endAddOnItems?: React.ReactNode;
  isLoading: boolean;
  links: ReadonlyArray<NavbarPrimaryItem>;
  logo?: React.ReactNode;
  mobileSidebarBottomItems?: React.ReactNode;
  renderMobileSidebarAddOnItems?: ({
    closeMobileNav,
  }: Readonly<{ closeMobileNav: () => void }>) => React.ReactNode;
}>;

export default function Navbar({
  endAddOnItems,
  isLoading,
  links,
  logo,
  renderMobileSidebarAddOnItems,
  mobileSidebarBottomItems,
}: Props) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const leftLinks = links.filter(({ position }) => position === 'start');
  const rightLinks = links.filter(({ position }) => position === 'end');

  const divider = (
    <hr aria-hidden="true" className="my-2 border-t border-neutral-200" />
  );

  function closeMobileNav() {
    setIsMobileNavOpen(false);
  }

  return (
    <div className="sticky top-0 z-30 border-b border-neutral-200 bg-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6">
        <div className="flex h-14 items-center justify-between md:justify-start md:gap-4">
          <div className="flex items-center justify-start lg:w-0 lg:grow">
            {logo && <div>{logo}</div>}
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
          <div className="-my-2 -mr-2 lg:hidden">
            <button
              className="focus:ring-brand inline-flex items-center justify-center rounded-md bg-white p-2 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset"
              type="button"
              onClick={() => {
                setIsMobileNavOpen(true);
              }}>
              <span className="sr-only">Open menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
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
              <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white focus:outline-none">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      type="button"
                      onClick={() => closeMobileNav()}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                  <div className="flex flex-shrink-0 items-center px-4">
                    {logo}
                  </div>
                  <nav aria-label="Sidebar" className="mt-5">
                    {leftLinks.length > 0 && (
                      <div className="space-y-1 px-2">
                        {leftLinks.map((navItem) => (
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
                    )}
                    {rightLinks.length > 0 && (
                      <>
                        {leftLinks.length > 0 && divider}
                        <div className="space-y-1 px-2">
                          {rightLinks.map((navItem) => (
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
                      </>
                    )}
                    {renderMobileSidebarAddOnItems && (
                      <>
                        {(leftLinks.length > 0 || rightLinks.length > 0) &&
                          divider}
                        {renderMobileSidebarAddOnItems({ closeMobileNav })}
                      </>
                    )}
                  </nav>
                </div>
                {mobileSidebarBottomItems && (
                  <div className="flex flex-shrink-0 border-t border-neutral-200 p-4">
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
