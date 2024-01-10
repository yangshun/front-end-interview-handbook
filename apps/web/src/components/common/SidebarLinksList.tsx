'use client';

import clsx from 'clsx';
import { RiExternalLinkFill } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBorderColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nPathname } from '~/next-i18nostic/src';

type SidebarItemType = Readonly<
  | {
      href: string;
      slug?: string;
      title: string;
    }
  | {
      href?: string;
      slug: string;
      title: string;
    }
>;

export type NavigationType = {
  items: ReadonlyArray<SidebarItemType>;
  subtitle?: string;
  title?: string;
};

function LinksListItem({
  items,
  activeItem,
  onSelect,
}: Readonly<{
  activeItem?: string;
  items: ReadonlyArray<SidebarItemType>;
  onSelect?: (value: string) => void;
}>) {
  const { pathname } = useI18nPathname();

  return (
    <ul className={clsx('border-l', themeBorderColor)} role="list">
      {items.map((link) => {
        const isExternalURL =
          typeof link?.href === 'string'
            ? /^(http|mailto)/.test(link.href ?? '')
            : false;

        return link.href ? (
          <div key={link.href}>
            <Anchor
              className={clsx(
                '-ml-px flex w-full py-[7px] justify-between gap-x-1 border-l text-sm',
                pathname === link.href
                  ? clsx(themeTextBrandColor, 'border-current font-semibold')
                  : clsx(
                      themeTextSecondaryColor,
                      'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                    ),
              )}
              href={link.href}
              variant="unstyled">
              <span className="pl-4">{link.title}</span>
              {isExternalURL && (
                <RiExternalLinkFill className="text-inherit h-4 w-4" />
              )}
            </Anchor>
          </div>
        ) : (
          <button
            key={String(link.slug)}
            className={clsx(
              '-ml-px flex w-full py-[7px] items-center gap-x-2 border-l text-sm',
              activeItem === link.slug
                ? clsx(themeTextBrandColor, 'border-current font-semibold')
                : clsx(
                    themeTextSecondaryColor,
                    'border-transparent hover:border-current hover:text-neutral-800 dark:hover:text-white',
                  ),
            )}
            type="button"
            onClick={() => onSelect?.(link.slug ?? '')}>
            <span className="pl-4 text-left">{link.title}</span>
          </button>
        );
      })}
    </ul>
  );
}

type SidebarLinksListProps = Readonly<{
  activeItem?: string;
  className?: string;
  navigation: Array<NavigationType>;
  onSelect?: (value: string) => void;
  sticky?: boolean;
}>;

export function SidebarLinksList({
  sticky = true,
  navigation,
  className,
  onSelect,
  activeItem,
}: SidebarLinksListProps) {
  return (
    <nav
      className={clsx(
        'flex w-[280px] flex-shrink-0 flex-col gap-4',
        sticky && 'sticky',
        className,
      )}
      style={{
        height: sticky
          ? 'calc(100vh - 38px - var(--nav-top-offset))'
          : undefined,
        top: 'calc(38px + var(--nav-top-offset))',
      }}>
      <div className="flex flex-col gap-8">
        {navigation.map((navigationItem) => (
          <div key={navigationItem.title || navigationItem.subtitle}>
            {navigationItem.subtitle && (
              <Text
                className="text-neutral-700 dark:text-neutral-500"
                size="body3"
                weight="bold">
                {navigationItem.title}
              </Text>
            )}
            <div className="flex flex-col gap-3">
              <Text size="body2" weight="bold">
                {navigationItem.subtitle || navigationItem.title}
              </Text>
              <LinksListItem
                activeItem={activeItem}
                items={navigationItem.items}
                onSelect={onSelect}
              />
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}
