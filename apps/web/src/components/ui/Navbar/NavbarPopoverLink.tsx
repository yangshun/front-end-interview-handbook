import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import {
  themeBackgroundElementSubtleStateColor_Hover,
  themeBorderEmphasizeColor_Hover,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import NavbarFeatureIcon from './NavbarFeatureIcon';
import type { NavPopoverLinkItem } from './NavTypes';
import Text from '../Text';

export default function NavbarPopoverLink({
  label,
  href,
  number,
  onClick,
  sublabel,
  showAsNumber,
  labelAddon,
  bottomEl,
  ...props
}: NavPopoverLinkItem & Readonly<{ number: number }>) {
  const el = (
    <div
      className={clsx(
        'w-full',
        'group',
        'p-3',
        'flex items-center gap-4',
        'rounded-md',
        'transition-colors duration-100',
        themeBackgroundElementSubtleStateColor_Hover,
        ['border border-transparent', themeBorderEmphasizeColor_Hover],
      )}>
      <NavbarFeatureIcon
        number={showAsNumber ? number : undefined}
        {...props}
      />
      <div className={clsx('flex grow flex-col justify-center')}>
        <Text className="flex items-center gap-2" size="body2" weight="bold">
          <span className="shrink-0">{label}</span> {labelAddon}
        </Text>
        {sublabel && (
          <Text className="mt-2 block" color="secondary" size="body3">
            {sublabel}
          </Text>
        )}
        {bottomEl && <div className="mt-3">{bottomEl}</div>}
      </div>
      <RiArrowRightLine
        aria-hidden={true}
        className={clsx('size-5 shrink-0', themeTextSubtleColor)}
      />
    </div>
  );

  const className = clsx(
    'group flex grow',
    themeOutlineElement_FocusVisible,
    themeOutlineElementBrandColor_FocusVisible,
  );

  if (href == null) {
    return <div className={className}>{el}</div>;
  }

  return (
    <Anchor
      className={className}
      href={href}
      prefetch={null}
      variant="unstyled"
      onClick={onClick}>
      {el}
    </Anchor>
  );
}
