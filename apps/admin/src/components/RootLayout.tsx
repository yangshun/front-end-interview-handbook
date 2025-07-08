'use client';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: Props) {
  return <>{children}</>;
}
