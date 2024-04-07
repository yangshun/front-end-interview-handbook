import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import url from 'node:url';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsProfileEditPage from '~/components/projects/profile/edit/ProjectsProfileEditPage';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

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
  await redirectToLoginPageIfNotLoggedIn('/projects/profile/edit');

  const viewer = await readViewerFromToken();
  const viewerProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer!.id,
    },
  });

  // If no user profile.
  if (viewerProfile == null) {
    return redirect(`/projects/challenges`);
  }

  const { projectsProfile } = viewerProfile;

  // If no projects profile, get them to create one.
  if (projectsProfile == null) {
    return redirect(`/projects/onboarding`);
  }

  return (
    <ProjectsProfileEditPage
      userProfile={{
        ...viewerProfile,
        projectsProfile,
      }}
    />
  );
}
