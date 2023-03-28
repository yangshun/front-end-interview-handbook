import type { Metadata } from 'next/types';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import defaultMetadata from '~/seo/defaultMetadata';

/* eslint-disable @typescript-eslint/ban-ts-comment */
import Hiring, {
  // @ts-expect-error
  href,
  // @ts-expect-error
  job_type as jobType,
  // @ts-expect-error
  pay_range as payRange,
  // @ts-expect-error
  title,
} from './hiring.mdx';
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
    pathname: '/hiring',
    title: 'We are Hiring!',
  });
}

export default function Page() {
  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      variant="narrow">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
        {title}
      </h1>
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:order-last">
          <div className="divide-y divide-slate-200 rounded border border-slate-200 bg-slate-50 text-sm">
            <div className="grid gap-y-2 p-4">
              <p className="font-medium">Job Type</p>
              <p className="text-slate-500">{jobType}</p>
            </div>
            <div className="grid gap-y-2 p-4">
              <p className="font-medium">Pay Range</p>
              <p className="text-slate-500">{payRange}</p>
            </div>
            <div className="p-5">
              <Button
                display="block"
                href={href}
                label="Apply Now"
                variant="primary"
              />
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <Prose>
            <Hiring />
          </Prose>
        </div>
      </div>
    </Container>
  );
}
