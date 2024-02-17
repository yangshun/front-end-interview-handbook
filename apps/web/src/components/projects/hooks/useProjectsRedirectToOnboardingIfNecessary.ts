import { useEffect } from 'react';

import { trpc } from '~/hooks/trpc';

import { useI18nPathname, useI18nRouter } from '~/next-i18nostic/src';

const EXCLUSIONS = ['/projects', '/projects/onboarding'];

export default function useProjectsRedirectToOnboardingIfNecessary() {
  const router = useI18nRouter();
  const { pathname } = useI18nPathname();

  const { data: userProfile } = trpc.projects.profile.get.useQuery();

  useEffect(() => {
    if (
      userProfile != null &&
      userProfile?.projectsProfile == null &&
      !EXCLUSIONS.includes(pathname ?? '')
    ) {
      router.push({
        pathname: '/projects/onboarding',
        query: {
          next: pathname,
        },
      });
    }
  }, [router, userProfile, pathname]);
}
