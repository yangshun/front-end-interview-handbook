import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import Container from '~/components/ui/Container';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

export default function RewardsLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'isolate before:!-top-[180px]',
        themeRadialWhiteGlowBackground,
      )}>
      <Container className={clsx('py-6 lg:py-10')} width="4xl">
        {children}
      </Container>
    </div>
  );
}
