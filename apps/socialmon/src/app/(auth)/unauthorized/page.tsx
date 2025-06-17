import { Button } from '@mantine/core';
import clsx from 'clsx';
import Link from 'next/link';

export default function Page() {
  return (
    <div
      className={clsx(
        'w-full',
        'flex flex-1 flex-col items-center justify-center gap-16',
      )}>
      <div className={clsx('flex flex-col gap-6', 'text-center')}>
        <h2 className="text-2xl font-bold leading-9 tracking-tight">
          Unauthorized
        </h2>
        <p>You are not authorized user to sign in.</p>
      </div>

      <Button component={Link} href="/login">
        Back to Login
      </Button>
    </div>
  );
}
