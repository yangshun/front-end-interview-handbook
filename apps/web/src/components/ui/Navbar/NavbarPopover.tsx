import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundEmphasizedHover,
  themeBackgroundLayerColor,
  themeBackgroundLayerEmphasizedHover,
  themeTextInvertColor,
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
            'bg-brand flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10',
            themeTextInvertColor,
          )}>
          <Icon
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        </div>
        <div className="ml-4 grid gap-y-1">
          <Text className="items-center gap-2" display="flex" weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
          {sublabel && (
            <Text color="secondary" display="block" variant="body2">
              {sublabel}
            </Text>
          )}
        </div>
      </>
    ) : (
      <div className="flex items-center">
        <div
          className={clsx(
            'bg-brand flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10',
            themeTextInvertColor,
          )}>
          <Icon
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:scale-110"
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
    <div
      className={clsx(
        'group -mx-3 flex items-start rounded-lg p-3',
        themeBackgroundLayerEmphasizedHover,
      )}>
      {el}
    </div>
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
    <div className="flex flex-col space-y-2">
      <Text color="secondary" display="block" variant="body2" weight="medium">
        {label}
      </Text>
      <ul className="space-y-1" role="list">
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
    <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
      <ul
        className={clsx(
          'relative grid divide-x px-5 py-6 sm:p-8',
          themeBackgroundLayerColor,
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
