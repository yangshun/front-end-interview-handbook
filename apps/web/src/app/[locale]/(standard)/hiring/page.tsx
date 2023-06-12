import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

import HiringPage from './HiringPage';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    locale,
    pathname: '/hiring',
    title: 'We are Hiring!',
  });
}

export default function Page() {
  return <HiringPage />;
}
