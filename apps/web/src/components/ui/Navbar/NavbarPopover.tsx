import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

import type {
  NavPopoverChildItem,
  NavPopoverGroupItem,
  NavPopoverLinkItem,
} from './NavTypes';

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
        <div className="bg-brand-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md text-white sm:h-10 sm:w-10">
          <Icon
            aria-hidden="true"
            className="h-5 w-5 transition-transform group-hover:scale-110"
          />
        </div>
        <div className="ml-4">
          <p className="flex items-center gap-2 text-base font-medium text-slate-900">
            <span>{label}</span> {labelAddon}
          </p>
          {sublabel && (
            <p className="mt-1 text-sm text-slate-500">{sublabel}</p>
          )}
        </div>
      </>
    ) : (
      <div className="flex items-center">
        <div className="text-brand-500 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md sm:h-10 sm:w-10">
          <Icon
            aria-hidden="true"
            className="h-8 w-8 transition-transform group-hover:scale-110"
          />
        </div>
        <div className="ml-4">
          <p className="flex items-center gap-2 text-base font-medium text-slate-900">
            <span>{label}</span> {labelAddon}
          </p>
        </div>
      </div>
    );

  const item = (
    <div className="group -mx-3 flex items-start rounded-lg p-3 hover:bg-slate-50">
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
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <ul className="space-y-1" role="list">
        {items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.key}>
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
          'relative grid divide-x bg-white px-5 py-6 sm:p-8',
          items.length === 2 && 'grid-cols-2',
          items.length === 3 && 'grid-cols-3',
          items.length === 4 && 'grid-cols-4',
        )}>
        {items.map(({ key, ...item }, index) => (
          <li
            key={key}
            className={clsx(
              index !== 0 && 'pl-6',
              index !== items.length - 1 && 'pr-6',
            )}>
            {item.type === 'popover-list' && (
              <NavbarPopoverGroup
                key={key}
                {...item}
                onClick={(event) => {
                  onClose();
                  item?.onClick?.(event);
                }}
              />
            )}
            {item.type === 'popover-link' && (
              <NavbarPopoverLink
                key={key}
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
