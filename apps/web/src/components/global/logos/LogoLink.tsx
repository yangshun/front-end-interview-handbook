import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';

import LogoComboMark from './LogoComboMark';
import { themeTextColor } from '../../ui/theme';

type Props = Readonly<{
  height?: number;
  href?: string;
}>;

export default function LogoLink({ height = 20, href = '/' }: Props) {
  const intl = useIntl();

  return (
    <Anchor
      aria-label={intl.formatMessage({
        defaultMessage: 'Go to the homepage',
        description: 'Back to homepage link',
        id: 'GkZlVc',
      })}
      className={clsx('inline-block', themeTextColor)}
      href={href}
      variant="unstyled">
      <LogoComboMark height={height} />
    </Anchor>
  );
}
