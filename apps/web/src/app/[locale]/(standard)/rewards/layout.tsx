import clsx from 'clsx';
import type { PropsWithChildren } from 'react';

import Container from '~/components/ui/Container';
import { themeRadialWhiteGlowBackground } from '~/components/ui/theme';

export default function RewardsLayout({ children }: PropsWithChildren) {
  return (
    <div
      className={clsx(
        'isolate before:-top-[250px] before:left-1/2 before:-translate-x-1/2 before:opacity-20 before:md:w-1/2',
        themeRadialWhiteGlowBackground,
      )}>
      <Container className={clsx('py-6 lg:py-10')} width="4xl">
        {children}
      </Container>
    </div>
  );
}
