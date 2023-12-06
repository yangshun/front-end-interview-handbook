'use client';

import { trpc } from '~/hooks/trpc';

export default function Greeting() {
  const { isLoading, data } = trpc.greeting.helloWorld.useQuery();

  return <div className="py-8">{isLoading ? 'Loading...' : data}</div>;
}
