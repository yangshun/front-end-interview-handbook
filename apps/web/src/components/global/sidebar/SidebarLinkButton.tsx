import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';
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

export default function SidebarLinkButton({
  isLabelHidden = false,
  label,
  icon: Icon,
  href,
  scrollToTop,
  onClick,
}: Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isLabelHidden?: boolean;
  label: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  scrollToTop?: boolean;
}>) {
  const { pathname } = useI18nPathname();
  const isSelected = pathname === href;
  const activeClassName = clsx(
    themeTextBrandColor,
    themeBackgroundElementEmphasizedStateColor,
  );
  const defaultClassName = clsx(
    themeTextSecondaryColor,
    themeTextBrandColor_Hover,
  );

  const link = (
    <Anchor
      aria-current={isSelected ? 'page' : undefined}
      aria-label={isLabelHidden ? label : undefined}
      className={clsx(
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
        isSelected ? activeClassName : defaultClassName,
      )}
      href={href}
      scrollToTop={scrollToTop}
      variant="unstyled"
      onClick={onClick}>
      <Icon className="size-5 shrink-0" />
      {!isLabelHidden && (
        <Text
          color="inherit"
          size="body2"
          weight={isSelected ? 'bold' : 'medium'}>
          {label}
        </Text>
      )}
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
