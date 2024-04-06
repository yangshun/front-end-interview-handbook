import type { Metadata } from 'next';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Take the structured route to front end learning by building projects according to our skills roadmap. Learn any front end core skill you may need.',
      description: 'Description of Projects skills roadmap page',
      id: 'Wtrj0o',
    }),
    locale,
    pathname: '/projects/skills',
    title: intl.formatMessage({
      defaultMessage: 'Skills roadmap',
      description: 'Title of Projects skills roadmap page',
      id: 'LSQPwj',
    }),
  });
}

export default async function Page() {
  // This page is rendered entirely by the layout.
  // It's a hacky way to render the skills details dialog
  // with a separate URL without unmounting the skills roadmap list.
  return null;
}
