import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Divider from '~/components/ui/Divider';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized_Hover,
  themeGlassyBorder,
  themeTextSecondaryColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type {
  NavbarTopLevelItem,
  NavPopoverChildItem,
  NavPopoverItem,
  NavPopoverTabsItem,
} from './NavTypes';

type Item = NavPopoverChildItem | NavPopoverItem | NavPopoverTabsItem;

type NavbarSidebarInnerProps = Readonly<
  Item &
    Readonly<{
      className?: string;
      isCurrent: boolean;
      linkClass: string;
    }>
>;

function NavbarAccordionSubsection({
  className,
  isCurrent,
  linkClass,
  onClick,
  ...props
}: NavbarSidebarInnerProps) {
  if (props.type === 'popover-link') {
    const roundedIcon =
      'icon' in props ? (
        <div
          className={clsx(
            'rounded-full p-2 dark:bg-neutral-800/70',
            themeGlassyBorder,
            themeTextSubtitleColor,
          )}>
          <props.icon
            aria-hidden="true"
            className="group-hover:text-brand-dark dark:group-hover:text-brand size-4"
          />
        </div>
      ) : null;

    if (props.href == null) {
      return (
        <div
          className={clsx(
            '-mx-2 flex items-center gap-2 p-2 text-sm',
            className,
          )}>
          {roundedIcon}
          {props.label} {props.labelAddon}
        </div>
      );
    }

    return (
      <Anchor
        aria-current={isCurrent ? 'page' : undefined}
        className={clsx(
          '-mx-2 flex items-center gap-2 rounded p-2 text-sm',
          !isCurrent && linkClass,
        )}
        href={props.href}
        prefetch={null}
        variant="unstyled"
        onClick={onClick}>
        {roundedIcon}
        {props.label} {props.labelAddon}
      </Anchor>
    );
  }

  return (
    <div className="flex flex-col gap-y-1 pb-2">
      <Text color="secondary" size="body2">
        {props.label}
      </Text>
      <ul className="flex flex-col" role="list">
        {props.items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.id}>
            <NavbarAccordionSubsection
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

function NavbarSidebarAccordion({
  className,
  isCurrent,
  linkClass,
  onClick,
  ...props
}: NavbarSidebarInnerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const DropdownIcon = isOpen ? RiArrowUpSLine : RiArrowDownSLine;

  if (props.type === 'popover-link') {
    return null;
  }

  return (
    <div className="flex flex-col">
      <Anchor
        className={clsx(linkClass, 'flex items-center justify-between p-4')}
        prefetch={null}
        variant="unstyled"
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <Text size="body1">{props.label}</Text>
        <DropdownIcon className={clsx(themeTextSecondaryColor, 'size-5')} />
      </Anchor>
      <ul
        className={clsx(
          'flex flex-col gap-y-2',
          'px-4 pt-1',
          !isOpen && 'hidden',
        )}
        role="list">
        {props.items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.id}>
            <NavbarAccordionSubsection
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
      <Divider className="mx-4" />
    </div>
  );
}

export default function NavbarSidebarItem({
  onClick,
  label,
  ...props
}: NavbarTopLevelItem) {
  const isCurrent = false; // TODO: Read from router.
  const linkClass = clsx(themeBackgroundLayerEmphasized_Hover);

  if (props.type === 'link') {
    return (
      <Anchor
        key={props.id}
        aria-current={isCurrent ? 'page' : undefined}
        className={clsx(
          'p-4',
          !isCurrent && linkClass,
          textVariants({ size: 'body1' }),
        )}
        href={props.href}
        prefetch={null}
        variant="unstyled"
        onClick={onClick}>
        {label}
      </Anchor>
    );
  }

  return (
    <NavbarSidebarAccordion
      key={props.id}
      isCurrent={isCurrent}
      label={label}
      linkClass={linkClass}
      onClick={onClick}
      {...props}
    />
  );
}
