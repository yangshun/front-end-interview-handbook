import type { Metadata } from 'next/types';

import ProjectsOnboardingProfilePage from '~/components/projects/onboarding/ProjectsOnboardingProfilePage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Create your developer profile on GreatFrontEnd. Showcase your skills, experiences and connect with the community.',
      description: 'Description of projects onboarding profile page',
      id: '/nidaR',
    }),
    locale,
    pathname: '/projects/onboarding/profile',
    title: intl.formatMessage({
      defaultMessage:
        'Profile set up | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of projects onboarding profile page',
      id: 'MKt3gG',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default function Page() {
  return <ProjectsOnboardingProfilePage />;
}
