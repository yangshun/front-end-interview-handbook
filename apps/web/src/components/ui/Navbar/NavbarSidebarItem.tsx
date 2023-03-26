import clsx from 'clsx';

import type {
  NavbarPrimaryItem,
  NavPopoverChildItem,
  NavPopoverItem,
  NavPopoverTabsItem,
} from './NavTypes';
import Anchor from '../Anchor';

type Item = NavPopoverChildItem | NavPopoverItem | NavPopoverTabsItem;

type NavbarSidebarInnerProps = Readonly<
  Item &
    Readonly<{
      className: string;
      isCurrent: boolean;
      linkClass: string;
    }>
>;

function NavbarSidebarInner({
  className,
  isCurrent,
  linkClass,
  onClick,
  ...props
}: NavbarSidebarInnerProps) {
  if (props.type === 'popover-link') {
    if (props.href == null) {
      return (
        <div className={clsx('flex gap-2', className)}>
          {props.label} {props.labelAddon}
        </div>
      );
    }

    return (
      <Anchor
        aria-current={isCurrent ? 'page' : undefined}
        className={clsx('flex gap-2', className, !isCurrent && linkClass)}
        href={props.href}
        variant="unstyled"
        onClick={onClick}>
        {props.label} {props.labelAddon}
      </Anchor>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      <p className={className}>{props.label}</p>
      <ul
        className="my-1 ml-2 space-y-1 border-l-2 border-slate-200 pl-2 lg:border-slate-200"
        role="list">
        {props.items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.itemKey}>
            <NavbarSidebarInner
              className={className}
              isCurrent={isCurrent}
              linkClass={linkClass}
              onClick={(event) => {
                onItemClick?.(event);
                // To close the sidebar.
                onClick?.(event);
              }}
              {...item}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NavbarSidebarItem({
  onClick,
  label,
  ...props
}: NavbarPrimaryItem) {
  const isCurrent = false; // TODO: Read from router.
  const className = clsx(
    isCurrent ? 'bg-slate-100 text-slate-900' : 'text-slate-600',
    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
  );
  const linkClass = 'hover:bg-slate-50 hover:text-slate-900';

  if (props.type === 'link') {
    return (
      <Anchor
        key={props.itemKey}
        aria-current={isCurrent ? 'page' : undefined}
        className={clsx(className, !isCurrent && linkClass)}
        href={props.href}
        variant="unstyled"
        onClick={onClick}>
        {label}
      </Anchor>
    );
  }

  return (
    <NavbarSidebarInner
      key={props.itemKey}
      className={className}
      isCurrent={isCurrent}
      label={label}
      linkClass={linkClass}
      onClick={onClick}
      {...props}
    />
  );
}
