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
    description: intl.formatMessage({
      defaultMessage:
        'Take the structured route to front end learning by building projects according to our skills roadmap. Learn any front end core skill you may need.',
      description: 'Description of Projects skills roadmap page',
      id: 'Wtrj0o',
    }),
    locale,
    pathname: '/projects/skills',
    title: intl.formatMessage({
      defaultMessage:
        'Skills roadmap | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects skills roadmap page',
      id: 'rZtR76',
    }),
  });
}

export default async function Page() {
  // This page is rendered entirely by the layout.
  // It's a hacky way to render the skills details dialog
  // with a separate URL without unmounting the skills roadmap list.
  return null;
}
