import clsx from 'clsx';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';

import { useI18nPathname } from '~/next-i18nostic/src';

import { Menu, Transition } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function NavLocaleDropdown() {
  const intl = useIntl();
  const { pathname } = useI18nPathname();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          aria-label={intl.formatMessage({
            defaultMessage: 'Language',
            description: 'Change site language button label',
            id: '58dfbv',
          })}
          className="focus:ring-brand-500 inline-flex w-full justify-center gap-x-1.5 rounded-md border border-slate-300 bg-white px-1.5 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2">
          <LanguageIcon
            aria-hidden="true"
            className="-mr-1 h-5 w-5 text-slate-900"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-lg bg-white shadow-lg focus:outline-none">
          <div className="py-1">
            {[
              {
                label: 'English (US)',
                locale: 'en',
              },
              {
                label: '中文（中国）',
                locale: 'zh-CN',
              },
              {
                label: 'Português (Brasil)',
                locale: 'pt-BR',
              },
            ].map(({ locale, label }) => (
              <Menu.Item key={locale}>
                {({ active }) => (
                  <Anchor
                    className={clsx(
                      active ? 'bg-slate-100 text-slate-900' : 'text-slate-700',
                      'block px-4 py-2 text-sm',
                    )}
                    href={pathname ?? '/'}
                    locale={locale}
                    variant="unstyled">
                    {label}
                  </Anchor>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
