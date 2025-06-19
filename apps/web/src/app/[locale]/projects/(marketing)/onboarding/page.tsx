import type { Metadata } from 'next/types';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsOnboardingPage from '~/components/projects/onboarding/ProjectsOnboardingPage';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Create your developer profile on GreatFrontEnd. Showcase your skills, experiences and connect with the community.',
      description: 'Description of projects onboarding profile page',
      id: '/nidaR',
    }),
    locale,
    pathname: '/projects/onboarding',
    title: intl.formatMessage({
      defaultMessage: 'Profile set up',
      description: 'Title of projects onboarding profile page',
      id: '9KGyJX',
    }),
  });
}

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/projects/onboarding');

  return <ProjectsOnboardingPage />;
}
