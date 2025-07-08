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
      className={clsx('flex flex-col', 'py-16', 'mb-40 sm:mb-60 lg:mb-80')}
      width="xl">
      <SupabaseAuthUpdatePassword next={next} />
    </Container>
  );
}
