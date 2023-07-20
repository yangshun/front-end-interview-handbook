import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import FrequentlyAskedQuestions from './faq.mdx';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    locale,
    pathname: '/faq',
    title: intl.formatMessage({
      defaultMessage: 'Frequently asked questions',
      description: 'Title of frequently asked questions page',
      id: 'bBbCZY',
    }),
  });
}

export default function Page() {
  return (
    <Container className="my-20" variant="4xl">
      <Prose>
        <FrequentlyAskedQuestions />
      </Prose>
    </Container>
  );
}
