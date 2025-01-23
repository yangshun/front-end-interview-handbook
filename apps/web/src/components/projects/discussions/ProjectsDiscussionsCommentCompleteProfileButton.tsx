import { RiAddLine } from 'react-icons/ri';
import url from 'url';

import Button from '~/components/ui/Button';

import { useI18nPathname } from '~/next-i18nostic/src';

import { useProjectsOnboardingContext } from '../onboarding/ProjectsOnboardingContext';

export default function ProjectsDiscussionsCommentCompleteProfileButton({
  scrollHash,
}: Readonly<{
  scrollHash: string;
}>) {
  const { pathname } = useI18nPathname();
  const { handleActionRequiringCompletedProjectsProfile } =
    useProjectsOnboardingContext();

  return (
    <Button
      addonPosition="start"
      icon={RiAddLine}
      label="Add a comment"
      variant="primary"
      onClick={() =>
        handleActionRequiringCompletedProjectsProfile({
          onboardingNextHref: url.format({
            hash: scrollHash,
            pathname,
          }),
        })
      }
    />
  );
}
