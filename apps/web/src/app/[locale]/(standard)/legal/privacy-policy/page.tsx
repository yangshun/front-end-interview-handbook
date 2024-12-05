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
  const title = intl.formatMessage({
    defaultMessage: 'Privacy Policy',
    description: 'Title of Privacy Policy page',
    id: 'nTu2nu',
  });

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Learn how GreatFrontEnd collects, uses, and protects your data. Review our privacy policy to understand your rights and our commitment to your privacy.',
      description: 'Description of Privacy Policy page',
      id: '5kFTG0',
    }),
    locale,
    ogImageProduct: null,
    ogImageTitle: title,
    pathname: '/legal/privacy-policy',
    socialTitle: intl.formatMessage({
      defaultMessage: 'Privacy Policy | GreatFrontEnd',
      description: 'Title of Privacy Policy page',
      id: '+Xw4ly',
    }),
    title,
  });
}

export default function Page() {
  return (
    <Container className="my-20" width="4xl">
      <Prose>
        <PrivacyPolicy />
      </Prose>
    </Container>
  );
}
