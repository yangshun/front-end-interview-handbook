import type { Metadata } from 'next/types';

import Container from '~/components/ui/Container';
import Prose from '~/components/ui/Prose';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

import PrivacyPolicy from './privacy-policy.mdx';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    pathname: '/legal/privacy-policy',
    title: intl.formatMessage({
      defaultMessage: 'Privacy Policy',
      description: 'Title of Privacy Policy page',
      id: 'nTu2nu',
    }),
  });
}

export default function Page() {
  return (
    <Container variant="narrow">
      <Prose>
        <div className="my-20">
          <PrivacyPolicy />
        </div>
      </Prose>
    </Container>
  );
}
