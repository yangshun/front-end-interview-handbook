import type { Metadata } from 'next/types';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';
import ProjectsChallengeSubmitPage from '~/components/projects/submissions/form/ProjectsChallengeSubmitPage';
import { redirectToProjectsOnboardingIfProjectsProfileIncomplete } from '~/components/projects/utils/ProjectsProfileUtils';

import { readProjectsChallengeItem } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import i18nRedirect from '~/next-i18nostic/src/utils/i18nRedirect';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { challenge }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsChallengeItem(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Submit your solution for {challengeName}. Get feedback and code reviews from the community.',
        description: 'Description of Projects challenge submission page',
        id: 'B4AISh',
      },
      {
        challengeName: challenge.info.title,
      },
    ),
    locale,
    pathname: challenge.metadata.submitHref,
    title: intl.formatMessage(
      {
        defaultMessage: 'Challenge: {challengeName} | Submit your work',
        description: 'Title of Projects challenge submission page',
        id: 'u59kYU',
      },
      {
        challengeName: challenge.info.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { slug, locale } = params;
  const { challenge } = await readProjectsChallengeItem(slug, locale);
  const viewer = await redirectToLoginPageIfNotLoggedIn(
    challenge.metadata.submitHref,
    locale,
  );

  const session = await prisma.projectsChallengeSession.findFirst({
    where: {
      projectsProfile: {
        userId: viewer?.id,
      },
      slug: challenge.metadata.slug,
      status: 'IN_PROGRESS',
    },
  });

  if (session == null) {
    return i18nRedirect(challenge.metadata.href, { locale });
  }

  const viewerProfile =
    await redirectToProjectsOnboardingIfProjectsProfileIncomplete(
      viewer,
      challenge.metadata.submitHref,
      locale,
    );

  return (
    <ProjectsChallengeSubmitPage
      challenge={challenge}
      isViewerPremium={viewerProfile.projectsProfile?.premium ?? false}
      locale={locale}
      points={viewerProfile.projectsProfile?.points ?? 0}
      session={session}
    />
  );
}
