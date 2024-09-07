import type { Props as AnchorProps } from '../Anchor';
import type { PopoverContentAlignment } from '../Popover';

export type NavBaseItem = Readonly<{
  currentMatchRegex?: RegExp;
  itemKey: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
}>;

export type NavLinkItem = NavBaseItem &
  Readonly<{
    href: AnchorProps['href'];
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    labelAddon?: React.ReactNode;
    scroll?: boolean;
    type: 'link';
  }>;

export type NavPrimaryItem = Readonly<{
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
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
      align: PopoverContentAlignment;
      items: ReadonlyArray<NavPopoverChildItem>;
      type: 'popover';
    }>
>;

export type NavPopoverTabsItem = Readonly<
  NavBaseItem &
    NavPrimaryItem &
    Readonly<{
      align: PopoverContentAlignment;
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
      labelAddon?: React.ReactNode;
      sublabel?: string;
      type: 'popover-link';
    }> &
    (
      | Readonly<{ icon: (props: React.ComponentProps<'svg'>) => JSX.Element }>
      | Readonly<{ imageUrl: string }>
    )
>;

export type NavbarPrimaryItem =
  | NavPopoverItem
  | NavPopoverTabsItem
  | NavPrimaryLinkItem;
