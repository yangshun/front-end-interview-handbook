import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import Terms from './terms.mdx';

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
    pathname: '/legal/student-discount',
    title: intl.formatMessage({
      defaultMessage: 'Student Discount Terms and Conditions',
      description: 'Title of legal page',
      id: 'lt1xn6',
    }),
  });
}

export default function Page() {
  return (
    <Container className="my-20" width="4xl">
      <Prose>
        <Terms />
      </Prose>
    </Container>
  );
}
