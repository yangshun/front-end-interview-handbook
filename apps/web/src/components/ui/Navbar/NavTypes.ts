import type { Props as AnchorProps } from '../Anchor';

export type NavBaseItem = Readonly<{
  itemKey: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export type NavLinkItem = NavBaseItem &
  Readonly<{
    href: AnchorProps['href'];
    labelAddon?: React.ReactNode;
    type: 'link';
  }>;

export type NavPrimaryItem = Readonly<{
  position: 'end' | 'start';
}>;

export type NavPrimaryLinkItem = Readonly<
  NavLinkItem &
    NavPrimaryItem &
    Readonly<{
      type: 'link';
    }>
>;

export type NavPopoverItem = Readonly<
  NavBaseItem &
    NavPrimaryItem &
    Readonly<{
      items: ReadonlyArray<NavPopoverChildItem>;
      type: 'popover';
    }>
>;

export type NavPopoverTabsItem = Readonly<
  NavBaseItem &
    NavPrimaryItem &
    Readonly<{
      items: ReadonlyArray<NavPopoverGroupItem>;
      type: 'popover-tabs';
    }>
>;

export type NavPopoverChildItem = NavPopoverGroupItem | NavPopoverLinkItem;
export type NavPopoverSupplementaryItem = Readonly<
  NavLinkItem &
    Readonly<{
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    }>
>;
export type NavPopoverGroupItem = Readonly<
  NavBaseItem &
    Readonly<{
      alignment?: 'center' | 'top';
      items: ReadonlyArray<NavPopoverLinkItem>;
      supplementaryItem?: NavPopoverSupplementaryItem;
      type: 'popover-list';
    }>
>;

export type NavPopoverLinkItem = Readonly<
  NavBaseItem &
    Readonly<{
      href?: string;
      icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
      labelAddon?: React.ReactNode;
      sublabel?: string;
      type: 'popover-link';
    }>
>;

export type NavbarPrimaryItem =
  | NavPopoverItem
  | NavPopoverTabsItem
  | NavPrimaryLinkItem;
