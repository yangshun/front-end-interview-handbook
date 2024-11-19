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

type NavTopLevelItem = Readonly<{
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  position: 'end' | 'start';
}>;

export type NavTopLevelLinkItem = Readonly<NavLinkItem & NavTopLevelItem>;

export type NavPopoverItem = Readonly<
  NavBaseItem &
    NavTopLevelItem &
    Readonly<{
      align: PopoverContentAlignment;
      items: ReadonlyArray<NavPopoverChildItem>;
      type: 'popover';
    }>
>;

export type NavPopoverTabsItem = Readonly<
  NavBaseItem &
    NavTopLevelItem &
    Readonly<{
      align: PopoverContentAlignment;
      items: ReadonlyArray<NavPopoverListItem>;
      type: 'popover-tabs';
    }>
>;

export type NavPopoverChildItem = NavPopoverLinkItem | NavPopoverListItem;

export type NavPopoverListItem = Readonly<
  NavBaseItem &
    Readonly<{
      align: 'center';
      icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
      items: ReadonlyArray<NavPopoverLinkItem>;
      type: 'popover-list';
    }>
>;

export type NavPopoverLinkItem = Readonly<
  NavBaseItem &
    Readonly<{
      bottomEl?: React.ReactNode;
      href?: string;
      labelAddon?: React.ReactNode;
      showAsNumber?: boolean;
      sublabel?: string;
      type: 'popover-link';
    }> &
    (
      | Readonly<{ icon: (props: React.ComponentProps<'svg'>) => JSX.Element }>
      | Readonly<{ imageUrl: string }>
    )
>;

export type NavbarTopLevelItem =
  | NavPopoverItem
  | NavPopoverTabsItem
  | NavTopLevelLinkItem;
