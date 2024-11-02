'use client';

import clsx from 'clsx';

import SupabaseAuthUpdatePassword from '~/components/auth/SupabaseAuthUpdatePassword';
import Container from '~/components/ui/Container';

type Props = Readonly<{
  next: string | null;
}>;

export default function AuthPasswordResetPage({ next }: Props) {
  return (
    <Container
      className={clsx('flex flex-col', 'py-8 md:py-12 lg:py-16')}
      width="xl">
      <SupabaseAuthUpdatePassword next={next} />
    </Container>
  );
}
