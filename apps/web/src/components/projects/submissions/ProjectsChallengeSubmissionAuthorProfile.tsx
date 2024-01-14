import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiStarSmileFill,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsChallengeSubmissionAuthor } from '~/components/projects/submissions/types';
import ProjectsUserJobTitle from '~/components/projects/users/ProjectsUserJobTitle';
import ProjectsUserReputation from '~/components/projects/users/ProjectsUserReputation';
import ProjectsUserYearsOfExperience from '~/components/projects/users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '~/components/projects/users/UserAvatarWithLevel';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeSubmissionAuthorProfile({
  author,
}: {
  author: ProjectsChallengeSubmissionAuthor;
}) {
  const intl = useIntl();

  return (
    <div className="gap-4 items-center flex">
      <UserAvatarWithLevel
        level={11}
        profile={author}
        progress={30}
        size="2xl"
      />
      <div className="flex gap-3 flex-col">
        <div className="flex gap-2 items-center">
          <Text size="body2" weight="medium">
            {author.name}
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
            <a href={author.githubUsername}>
              <span className="sr-only">Github</span>
              <RiGithubFill aria-hidden="true" className="h-[18px] w-[18px]" />
            </a>
          )}
          {author.linkedInUsername && (
            <a href={author.linkedInUsername}>
              <span className="sr-only">LinkedIn</span>
              <RiLinkedinBoxFill
                aria-hidden="true"
                className="h-[18px] w-[18px]"
              />
            </a>
          )}
        </div>
        <div className="flex gap-x-4 gapy-0.5 items-center flex-wrap">
          {author.title && (
            <ProjectsUserJobTitle jobTitle={author.title} size="2xs" />
          )}

          {/* TODO(projects): Remove the hardcoded YOE */}
          <ProjectsUserYearsOfExperience size="2xs" yearsOfExperience={2} />
          <ProjectsUserReputation points={1650} size="2xs" />
        </div>
      </div>
    </div>
  );
}
