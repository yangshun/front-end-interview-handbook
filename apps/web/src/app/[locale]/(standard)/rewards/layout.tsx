import type { PropsWithChildren } from 'react';

import Container from '~/components/ui/Container';

export default function RewardsLayout({ children }: PropsWithChildren) {
  return (
    <Container className="py-6 lg:py-10" variant="4xl">
      {children}
    </Container>
  );
}
