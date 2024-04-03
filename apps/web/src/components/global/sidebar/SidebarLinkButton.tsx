import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementPressedStateColor_Active,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor,
  themeTextBrandColor_Hover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { useI18nPathname } from '~/next-i18nostic/src';

import type { SidebarItem } from './Sidebar';

type Props = Readonly<{
  isLabelHidden?: boolean;
}> &
  SidebarItem;

export default function SidebarLinkButton({
  currentMatchRegex,
  isLabelHidden = false,
  label,
  icon: Icon,
  onClick,
  ...props
}: Props) {
  const { pathname } = useI18nPathname();
  const activeClassName = clsx(
    themeTextBrandColor,
    themeBackgroundElementEmphasizedStateColor,
  );
  const defaultClassName = clsx(
    themeTextSecondaryColor,
    themeTextBrandColor_Hover,
  );

  const isSelected = pathname != null && currentMatchRegex?.test(pathname);
  const commonClass = clsx(
    'flex shrink-0 items-center gap-2',
    'w-full p-3',
    'rounded',
    themeTextBrandColor_Hover,
    [
      themeOutlineElement_FocusVisible,
      themeOutlineElementBrandColor_FocusVisible,
    ],
    themeBackgroundElementPressedStateColor_Active,
    'transition-colors',
  );

  const iconElement = <Icon className="size-5 shrink-0" />;
  const labelElement = !isLabelHidden && (
    <Text color="inherit" size="body2" weight={isSelected ? 'bold' : 'medium'}>
      {label}
    </Text>
  );

  if (props.type === 'link') {
    const isLinkSelected = pathname === props.href || isSelected;

    const link = (
      <Anchor
        aria-current={isLinkSelected ? 'page' : undefined}
        aria-label={isLabelHidden ? label : undefined}
        className={clsx(
          commonClass,
          isLinkSelected ? activeClassName : defaultClassName,
        )}
        href={props.href}
        scrollToTop={props.scrollToTop}
        variant="unstyled"
        onClick={onClick}>
        {iconElement}
        {labelElement}
      </Anchor>
    );

    return isLabelHidden ? (
      <Tooltip asChild={true} label={label} side="right">
        {link}
      </Tooltip>
    ) : (
      link
    );
  }

  return (
    <DropdownMenu
      side="right"
      trigger={
        <button
          aria-label={isLabelHidden ? label : undefined}
          className={clsx(
            commonClass,
            isSelected ? activeClassName : defaultClassName,
          )}
          type="button">
          {iconElement}
          {labelElement}
        </button>
      }>
      {props.items.map((popoverItem) => (
        <DropdownMenu.Item
          key={popoverItem.key}
          endAddOn={popoverItem.labelAddon}
          href={popoverItem.href}
          icon={popoverItem.icon}
          label={popoverItem.label}
        />
      ))}
    </DropdownMenu>
  );
}
