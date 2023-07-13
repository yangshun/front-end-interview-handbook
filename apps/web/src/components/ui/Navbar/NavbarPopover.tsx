import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundLayerColor,
  themeGlassyBorder,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type {
  NavPopoverChildItem,
  NavPopoverGroupItem,
  NavPopoverLinkItem,
} from './NavTypes';
import Text from '../Text';

function NavbarPopoverLink({
  label,
  icon: Icon,
  href,
  onClick,
  sublabel,
  labelAddon,
}: NavPopoverLinkItem) {
  const el =
    sublabel != null ? (
      <>
        <div
          className={clsx(
            'rounded-full p-3 dark:bg-neutral-800/70',
            themeGlassyBorder,
            themeTextSubtitleColor,
          )}>
          <Icon
            aria-hidden="true"
            className="group-hover:text-brand-dark dark:group-hover:text-brand h-6 w-6"
          />
        </div>
        <div className="flex flex-col gap-y-1">
          <Text className="items-center gap-2" display="flex" weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
          {sublabel && (
            <Text color="secondary" display="block" size="body2">
              {sublabel}
            </Text>
          )}
        </div>
      </>
    ) : (
      <div className="flex flex-col gap-y-4">
        <div
          className={clsx(
            'rounded-full p-3 dark:bg-neutral-800/70',
            themeGlassyBorder,
            themeTextSubtitleColor,
          )}>
          <Icon
            aria-hidden="true"
            className="group-hover:text-brand-dark dark:group-hover:text-brand h-6 w-6"
          />
        </div>
        <div className="ml-4">
          <Text className="items-center gap-2" display="flex" weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
        </div>
      </div>
    );

  const item = (
    <div className={clsx('group flex flex-col items-start gap-y-4')}>{el}</div>
  );

  if (href == null) {
    return item;
  }

  return (
    <Anchor
      href={href}
      suppressHydrationWarning={true}
      variant="unstyled"
      onClick={onClick}>
      {item}
    </Anchor>
  );
}

function NavbarPopoverGroup({ label, items, onClick }: NavPopoverGroupItem) {
  return (
    <div>
      <span className="sr-only">{label}</span>
      <ul
        className={clsx(
          'grid gap-x-6',
          items.length === 2 && 'grid-cols-2',
          items.length === 3 && 'grid-cols-3',
        )}
        role="list">
        {items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.itemKey}>
            <NavbarPopoverLink
              {...item}
              onClick={(event) => {
                onItemClick?.(event);
                // To close the popover.
                onClick?.(event);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavbarPopover({
  items,
  onClose,
}: Readonly<{
  items: ReadonlyArray<NavPopoverChildItem>;
  onClose: () => void;
}>) {
  return (
    <div
      className={clsx(
        'overflow-hidden rounded-lg shadow-lg dark:shadow-none',
        themeBackgroundLayerColor,
        themeGlassyBorder,
      )}>
      <ul
        className={clsx(
          'relative grid divide-x px-8 py-10',
          items.length === 2 && 'grid-cols-2',
          items.length === 3 && 'grid-cols-3',
          items.length === 4 && 'grid-cols-4',
        )}>
        {items.map((item, index) => (
          <li
            key={item.itemKey}
            className={clsx(
              index !== 0 && 'pl-6',
              index !== items.length - 1 && 'pr-6',
            )}>
            {item.type === 'popover-list' && (
              <NavbarPopoverGroup
                {...item}
                onClick={(event) => {
                  onClose();
                  item?.onClick?.(event);
                }}
              />
            )}
            {item.type === 'popover-link' && (
              <NavbarPopoverLink
                {...item}
                onClick={(event) => {
                  onClose();
                  item?.onClick?.(event);
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
