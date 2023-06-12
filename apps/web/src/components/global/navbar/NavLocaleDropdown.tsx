import clsx from 'clsx';
import { Fragment } from 'react';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';

import i18nLabelOptions from '~/i18n/i18nLabelOptions';
import { useI18nPathname } from '~/next-i18nostic/src';

import { Menu, Transition } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';

export default function NavLocaleDropdown() {
  const intl = useIntl();
  const { pathname, locale } = useI18nPathname();

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          aria-label={intl.formatMessage({
            defaultMessage: 'Language',
            description: 'Change site language button label',
            id: '58dfbv',
          })}
          className="focus:ring-brand inline-flex w-full justify-center gap-x-1.5 rounded-md border border-neutral-300 bg-white px-2 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-offset-2">
          <LanguageIcon
            aria-hidden="true"
            className="-mr-1 h-4 w-4 text-neutral-900"
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {i18nLabelOptions.map(({ locale: localeItem, label, isBeta }) => (
              <Menu.Item key={localeItem}>
                {({ active }) => (
                  <Anchor
                    className={clsx(
                      active || locale === localeItem
                        ? 'bg-neutral-100 text-neutral-900'
                        : 'text-neutral-700',
                      'flex items-center justify-between px-4 py-2 text-xs font-medium',
                    )}
                    href={pathname ?? '/'}
                    locale={localeItem}
                    variant="unstyled">
                    {label}
                    {isBeta && (
                      <Badge
                        label={intl.formatMessage({
                          defaultMessage: 'Beta',
                          description: 'Beta version',
                          id: 'PiwdUd',
                        })}
                        size="sm"
                        variant="info"
                      />
                    )}
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
