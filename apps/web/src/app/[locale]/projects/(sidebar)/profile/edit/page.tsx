import type { Metadata } from 'next';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsProfileEditPage from '~/components/projects/profile/edit/ProjectsProfileEditPage';
import { redirectToProjectsOnboardingIfNoProjectsProfile } from '~/components/projects/utils/redirectToPathIfNoProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage({
      defaultMessage:
        'Update your profile to reflect your latest achievements and interests, making it easier for the community to connect with you',
      description: 'Description of Projects edit profile page',
      id: 'bvn22p',
    }),
    locale,
    pathname: '/projects/profile/edit',
    title: intl.formatMessage({
      defaultMessage: 'Edit profile',
      description: 'Title of Projects edit profile page',
      id: 'x6+x/5',
    }),
  });
}

export default async function Page() {
  const viewer = await redirectToLoginPageIfNotLoggedIn(
    '/projects/profile/edit',
  );

  const viewerProfile =
    await redirectToProjectsOnboardingIfNoProjectsProfile(viewer);

  return (
    <ProjectsProfileEditPage
      userProfile={{
        ...viewerProfile,
        projectsProfile: viewerProfile.projectsProfile!,
      }}
    />
  );
}
