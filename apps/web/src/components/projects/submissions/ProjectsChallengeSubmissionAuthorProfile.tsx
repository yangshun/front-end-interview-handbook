import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiStarSmileFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import UserProfileInformationRow from '~/components/profile/info/UserProfileInformationRow';
import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';
import ProjectsProfileAvatar from '~/components/projects/users/ProjectsProfileAvatar';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';

import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';

type Props = Readonly<{
  author: ProjectsChallengeSubmissionAuthor;
  points: number;
}>;

export default function ProjectsChallengeSubmissionAuthorProfile({
  author,
  points,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex items-center gap-4">
      <ProjectsProfileAvatar
        profile={{ ...author, projectsProfile: { points } }}
        size="2xl"
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Text size="body2" weight="medium">
            <ProjectsProfileDisplayNameLink profile={author} />
          </Text>
          {/* TODO(projects): Add actual premium logic */}
          <Badge
            icon={RiStarSmileFill}
            label={intl.formatMessage({
              defaultMessage: 'Premium',
              description: 'Premium content',
              id: 'gIeLON',
            })}
            size="sm"
            variant="special"
          />
          {author.githubUsername && (
            <a href={author.githubUsername} target="_blank">
              <span className="sr-only">Github</span>
              <RiGithubFill aria-hidden="true" className="size-5" />
            </a>
          )}
          {author.linkedInUsername && (
            <a href={author.linkedInUsername} target="_blank">
              <span className="sr-only">LinkedIn</span>
              <RiLinkedinBoxFill aria-hidden="true" className="size-5" />
            </a>
          )}
        </div>
        <UserProfileInformationRow profile={author} size="body3" />
      </div>
    </div>
  );
}
