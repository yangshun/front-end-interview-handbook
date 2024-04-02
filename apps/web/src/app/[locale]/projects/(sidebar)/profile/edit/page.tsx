import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import url from 'node:url';

import ProjectsProfileEditPage from '~/components/projects/profile/edit/ProjectsProfileEditPage';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultMetadata({
    description: intl.formatMessage({
      defaultMessage:
        'Update your profile to reflect your latest achievements and interests, making it easier for the community to connect with you',
      description: 'Description of Projects edit profile page',
      id: 'bvn22p',
    }),
    locale,
    pathname: '/projects/profile/edit',
    title: intl.formatMessage({
      defaultMessage:
        'Edit Profile | GreatFrontEnd Projects - Real-world project challenges',
      description: 'Title of Projects edit profile page',
      id: 'zDGZ2c',
    }),
  });
}

export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/projects/profile/edit',
        },
      }),
    );
  }

  const viewerProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer.id,
    },
  });

  // If no user profile.
  if (viewerProfile == null) {
    return redirect(`/projects/challenges`);
  }

  const { projectsProfile } = viewerProfile;

  // If no user profile, which is impossible.
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
