'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import type { ReactNode } from 'react';
import superjson from 'superjson';

import { trpc } from '~/hooks/trpc';

type Props = Readonly<{
  children: ReactNode;
}>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () =>
        process.env.NODE_ENV === 'development' ||
        process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview',
    }),
    httpBatchLink({
      url: '/api/trpc',
    }),
  ],
  transformer: superjson,
});

export default function TrpcClientProvider({ children }: Props) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
