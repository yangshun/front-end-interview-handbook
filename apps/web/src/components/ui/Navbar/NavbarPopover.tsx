import clsx from 'clsx';
import { useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundLayerColor,
  themeBorderEmphasizeColor,
} from '~/components/ui/theme';

import NavbarFeatureIcon from './NavbarFeatureIcon';
import type {
  NavPopoverChildItem,
  NavPopoverLinkItem,
  NavPopoverListItem,
} from './NavTypes';
import Text from '../Text';

function NavbarPopoverLink({
  number,
  label,
  href,
  onClick,
  sublabel,
  labelAddon,
  showAsNumber,
  ...props
}: NavPopoverLinkItem & Readonly<{ number: number }>) {
  const el =
    sublabel != null ? (
      <div className={clsx('group flex items-start gap-4 xl:flex-col')}>
        <NavbarFeatureIcon
          number={showAsNumber ? number : undefined}
          {...props}
        />
        <div className="flex flex-col gap-y-0.5 xl:gap-y-1">
          <Text
            className="flex items-center gap-2"
            size="body1"
            weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
          {sublabel && (
            <Text className="block" color="secondary" size="body2">
              {sublabel}
            </Text>
          )}
        </div>
      </div>
    ) : (
      <div className="group flex flex-col gap-y-4">
        <NavbarFeatureIcon
          number={showAsNumber ? number : undefined}
          {...props}
        />
        <div className="ml-4">
          <Text
            className="flex items-center gap-2"
            size="body1"
            weight="medium">
            <span className="shrink-0">{label}</span> {labelAddon}
          </Text>
        </div>
      </div>
    );

  if (href == null) {
    return el;
  }

  return (
    <Anchor
      href={href}
      prefetch={null}
      suppressHydrationWarning={true}
      variant="unstyled"
      onClick={onClick}>
      {el}
    </Anchor>
  );
}

function NavbarPopoverGroup({ label, items, onClick }: NavPopoverListItem) {
  return (
    <div>
      <span className="sr-only">{label}</span>
      <ul
        className={clsx(
          'grid gap-6',
          items.length === 2 && 'xl:grid-cols-2',
          items.length === 3 && 'xl:grid-cols-3',
        )}
        role="list">
        {items.map(({ onClick: onItemClick, ...item }, index) => (
          <li key={item.id}>
            <NavbarPopoverLink
              number={index + 1}
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
  onClose: (event?: React.MouseEvent<HTMLElement>) => void;
}>) {
  const laptopAndAbove = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    // Automatically close when popover is still open and
    // screen has been resized to be below laptop.
    if (!laptopAndAbove) {
      onClose();
    }
  }, [onClose, laptopAndAbove]);

  return (
    <div
      className={clsx(
        'overflow-hidden rounded-lg shadow-lg dark:shadow-none',
        ['border', themeBorderEmphasizeColor],
        themeBackgroundLayerColor,
      )}>
      <ul
        className={clsx(
          'relative grid divide-x',
          'p-6 xl:px-8 xl:py-10',
          items.length === 2 && 'grid-cols-2',
          items.length === 3 && 'grid-cols-3',
          items.length === 4 && 'grid-cols-4',
        )}>
        {items.map((item, index) => (
          <li
            key={item.id}
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
                number={index + 1}
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
