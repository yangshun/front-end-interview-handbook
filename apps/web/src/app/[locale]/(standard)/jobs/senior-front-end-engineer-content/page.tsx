import type { Metadata } from 'next/types';

import defaultMetadata from '~/seo/defaultMetadata';

/* eslint-disable @typescript-eslint/ban-ts-comment */
import Content, {
  // @ts-expect-error
  href,
  // @ts-expect-error
  job_type as jobType,
  // @ts-expect-error
  pay_range as payRange,
  // @ts-expect-error
  title,
} from './en-US.mdx';
import JobPage from '../JobPage';
/* eslint-enable @typescript-eslint/ban-ts-comment */

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    locale,
    pathname: '/jobs/senior-front-end-engineer-content',
    title,
  });
}

export default function Page() {
  return (
    <JobPage
      content={Content}
      href={href}
      jobType={jobType}
      payRange={payRange}
      title={title}
    />
  );
}
