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
  const title = intl.formatMessage({
    defaultMessage: 'Terms of Service',
    description: 'Title of Terms of Service page',
    id: 'dk2vXq',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Review the terms of service for GreatFrontEnd. Understand the rules, guidelines, and user responsibilities for accessing and using our platform.',
      description: 'Title of Terms of Service page',
      id: 'yoj8R9',
    }),
    locale,
    ogImageTitle: title,
    pathname: '/legal/terms',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Terms of Service | GreatFrontEnd',
      description: 'Title of Terms of Service page',
      id: 's9Oi92',
    }),
    title,
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
