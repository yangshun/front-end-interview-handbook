import { redirect } from 'next/navigation';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: Props) {
  // TODO(projects): Remove this file when launching.
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    redirect('/');
  }

  return children;
}
