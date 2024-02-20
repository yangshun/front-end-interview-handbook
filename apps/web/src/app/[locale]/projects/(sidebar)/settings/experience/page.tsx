import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

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
    pathname: '/projects/settings/experience',
    title: intl.formatMessage({
      defaultMessage: 'Experience | Settings | Projects',
      description: 'Title of experience page',
      id: 'J9MCjZ',
    }),
  });
}

export default async function Page() {
  return <div>Experience</div>;
}
