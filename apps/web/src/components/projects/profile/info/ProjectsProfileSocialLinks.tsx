import { RiGithubFill, RiGlobalLine, RiLinkedinBoxFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Tooltip from '~/components/ui/Tooltip';

import type { Profile } from '@prisma/client';

type Props = Readonly<{
  userProfile: Profile;
}>;

export default function ProjectsProfileSocialLinks({ userProfile }: Props) {
  const intl = useIntl();

  return (
    <div className="flex items-center gap-1">
      {userProfile.githubUsername && (
        <Tooltip
          asChild={true}
          label={intl.formatMessage({
            defaultMessage: 'View GitHub profile',
            description: 'Link to GitHub profile',
            id: 'Ol2L0M',
          })}>
          <Anchor href={userProfile.githubUsername} variant="muted">
            <span className="sr-only">GitHub</span>
            <RiGithubFill aria-hidden="true" className="size-5" />
          </Anchor>
        </Tooltip>
      )}
      {userProfile.linkedInUsername && (
        <Tooltip
          asChild={true}
          label={intl.formatMessage({
            defaultMessage: 'View LinkedIn profile',
            description: 'Link to LinkedIn profile',
            id: '918wg5',
          })}>
          <Anchor href={userProfile.linkedInUsername} variant="muted">
            <span className="sr-only">LinkedIn</span>
            <RiLinkedinBoxFill aria-hidden="true" className="size-5" />
          </Anchor>
        </Tooltip>
      )}
      {userProfile.website && (
        <Tooltip
          asChild={true}
          label={intl.formatMessage({
            defaultMessage: 'View website',
            description: 'Link to website',
            id: '6ZWO4y',
          })}>
          <Anchor href={userProfile.website} variant="muted">
            <span className="sr-only">Website</span>
            <RiGlobalLine aria-hidden="true" className="size-5" />
          </Anchor>
        </Tooltip>
      )}
    </div>
  );
}
