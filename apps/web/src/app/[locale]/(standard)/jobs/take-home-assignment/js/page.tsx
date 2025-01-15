import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import defaultMetadata from '~/seo/defaultMetadata';

/* eslint-disable @typescript-eslint/ban-ts-comment */
import Content, {
  // @ts-expect-error
  title,
} from './en-US.mdx';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  return defaultMetadata({
    locale,
    pathname: '/jobs/take-home-assignment/js',
    title,
  });
}

export default function Page() {
  return (
    <Container
      className="my-10 grid gap-y-8 md:my-20 md:gap-y-16"
      width="marketing">
      <Prose>
        <Content />
      </Prose>
    </Container>
  );
}
