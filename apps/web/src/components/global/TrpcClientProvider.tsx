'use client';

import type { ReactNode } from 'react';

import { trpc } from '~/hooks/trpc';

import { getSiteUrl } from '~/seo/siteUrl';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';

type Props = Readonly<{
  children: ReactNode;
}>;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url: `${getSiteUrl()}/api/trpc`,
    }),
  ],
});

export default function TrpcClientProvider({ children }: Props) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
