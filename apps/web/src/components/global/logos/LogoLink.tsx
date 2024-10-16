import clsx from 'clsx';

import Anchor from '~/components/ui/Anchor';

import LogoComboMark from './LogoComboMark';
import { themeTextColor } from '../../ui/theme';

type Props = Readonly<{
  height?: number;
  href?: string;
}>;

export default function LogoLink({ height = 20, href = '/' }: Props) {
  return (
    <Anchor
      aria-label="Go to the homepage"
      className={clsx('inline-block', themeTextColor)}
      href={href}
      variant="unstyled">
      <LogoComboMark height={height} />
    </Anchor>
  );
}
