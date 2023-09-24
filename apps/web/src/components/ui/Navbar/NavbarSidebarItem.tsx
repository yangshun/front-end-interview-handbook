import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import {
  themeBackgroundLayerEmphasizedHover,
  themeGlassyBorder,
  themeTextColor,
  themeTextSecondaryColor,
  themeTextSubtitleColor,
} from '~/components/ui/theme';

import type {
  NavbarPrimaryItem,
  NavPopoverChildItem,
  NavPopoverItem,
  NavPopoverTabsItem,
} from './NavTypes';
import Anchor from '../Anchor';
import Button from '../Button';
import Divider from '../Divider';
import Text from '../Text';

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
    const Icon = props.icon;
    const roundedIcon = (
      <div
        className={clsx(
          'rounded-full p-2 dark:bg-neutral-800/70',
          themeGlassyBorder,
          themeTextSubtitleColor,
        )}>
        <Icon
          aria-hidden="true"
          className="group-hover:text-brand-dark dark:group-hover:text-brand h-4 w-4"
        />
      </div>
    );

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
        variant="unstyled"
        onClick={onClick}>
        {roundedIcon}
        {props.label} {props.labelAddon}
      </Anchor>
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <Text color="secondary" size="body2">
        {props.label}
      </Text>
      <ul className="flex flex-col" role="list">
        {props.items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.itemKey}>
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
      {props.type === 'popover-list' && props.supplementaryItem && (
        <Button
          addonPosition="start"
          className="self-end"
          href={props.supplementaryItem.href}
          icon={props.supplementaryItem.icon}
          label={props.supplementaryItem.label}
          variant="secondary"
          onClick={(event) => {
            props?.supplementaryItem?.onClick?.(event as any);
          }}
        />
      )}
      <Divider />
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
        variant="unstyled"
        onClick={() => {
          setIsOpen(!isOpen);
        }}>
        <Text size="body">{props.label}</Text>
        <DropdownIcon className={clsx(themeTextSecondaryColor, 'h-5 w-5')} />
      </Anchor>
      <ul
        className={clsx('flex flex-col gap-y-4 px-4', !isOpen && 'hidden')}
        role="list">
        {props.items.map(({ onClick: onItemClick, ...item }) => (
          <li key={item.itemKey}>
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
}: NavbarPrimaryItem) {
  const isCurrent = false; // TODO: Read from router.
  const linkClass = clsx(themeBackgroundLayerEmphasizedHover);

  if (props.type === 'link') {
    return (
      <>
        <Anchor
          key={props.itemKey}
          aria-current={isCurrent ? 'page' : undefined}
          className={clsx(themeTextColor, !isCurrent && linkClass, 'p-4')}
          href={props.href}
          variant="unstyled"
          onClick={onClick}>
          {label}
        </Anchor>
        <Divider className="mx-4" />
      </>
    );
  }

  return (
    <NavbarSidebarAccordion
      key={props.itemKey}
      isCurrent={isCurrent}
      label={label}
      linkClass={linkClass}
      onClick={onClick}
      {...props}
    />
  );
}
