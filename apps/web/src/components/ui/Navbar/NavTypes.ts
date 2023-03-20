export type NavBaseItem = Readonly<{
  key: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}>;

export type NavLinkItem = Readonly<
  NavBaseItem &
    Readonly<{
      href: string;
      type: 'link';
    }>
>;

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
