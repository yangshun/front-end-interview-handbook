'use client';

import { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { GuideNavigation } from './GuidesLayoutSidebar';
import { GuidesSidebar } from './GuidesSidebar';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function GuidesNavbar({
  navigation,
}: Readonly<{
  navigation: GuideNavigation;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  return (
    <div
      className="sticky z-30 border-b border-slate-200 bg-white lg:hidden"
      style={{ top: 'var(--navbar-height)' }}>
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex h-10 items-center justify-end">
          <button
            className="inline-flex items-center justify-center rounded-md bg-white p-2"
            type="button"
            onClick={() => {
              setIsSidebarOpen(true);
            }}>
            <span className="sr-only">Open menu</span>
            <span className="text-sm">
              <FormattedMessage
                defaultMessage="Menu"
                description="Guides navbar menu button label"
                id="oo7GzR"
              />
            </span>
          </button>
        </div>
      </div>
      <Transition.Root as={Fragment} show={isSidebarOpen}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={closeSidebar}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-slate-600 bg-opacity-75" />
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
              <Dialog.Panel className="relative flex w-full max-w-sm flex-1 flex-col bg-white focus:outline-none">
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
                      onClick={closeSidebar}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-white"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-0 flex-1 overflow-y-auto">
                  <nav aria-label="Sidebar">
                    <GuidesSidebar navigation={navigation} />
                  </nav>
                </div>
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
