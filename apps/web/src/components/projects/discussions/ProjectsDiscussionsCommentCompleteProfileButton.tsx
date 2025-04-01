'use client';

import { RiAddLine } from 'react-icons/ri';
import url from 'url';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { useI18nPathname } from '~/next-i18nostic/src';

import { useProjectsOnboardingContext } from '../onboarding/ProjectsOnboardingContext';

export default function ProjectsDiscussionsCommentCompleteProfileButton({
  scrollHash,
}: Readonly<{
  scrollHash: string;
}>) {
  const intl = useIntl();
  const { pathname } = useI18nPathname();
  const { handleActionRequiringCompletedProjectsProfile } =
    useProjectsOnboardingContext();

  return (
    <Button
      addonPosition="start"
      icon={RiAddLine}
      label={intl.formatMessage({
        defaultMessage: 'Add a comment',
        description: 'Add a comment button label',
        id: 'qTmzvl',
      })}
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
