'use client';

import TrpcClientProvider from './TrpcClientProvider';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function GlobalProviders({ children }: Props) {
  return <TrpcClientProvider>{children}</TrpcClientProvider>;
}
