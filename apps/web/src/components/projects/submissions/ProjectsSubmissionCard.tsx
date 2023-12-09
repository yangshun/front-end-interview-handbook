import { useIntl } from 'react-intl';

import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';

import useUserName from '~/utils/user/useUserName';

import type { ProjectsSubmission } from './types';
import ProjectsSkillRow from '../skills/ProjectsSkillRow';
import ProjectsCommentCountTag from '../stats/ProjectsCommentCountTag';
import ProjectsLikeCountTag from '../stats/ProjectsLikeCountTag';
import ProjectsViewCountTag from '../stats/ProjectsViewCountTag';
import ProjectsUserJobTitle from '../users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '../users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '../users/UserAvatarWithLevel';

type Props = Readonly<{
  submission: ProjectsSubmission;
}>;

export default function ProjectsSubmissionCard({
  submission: {
    title,
    stack,
    author,
    description,
    commentCount,
    likeCount,
    viewCount,
    imgSrc,
  },
}: Props) {
  const intl = useIntl();
  const authorUserName = useUserName(author);

  return (
    <Card padding={false} pattern={false}>
      <div className="flex flex-col px-4 py-6">
        <Text weight="bold">{title}</Text>
        <ProjectsSkillRow
          className="mt-3"
          label={intl.formatMessage({
            defaultMessage: 'Stack used',
            description: 'Label for tech stack used in project',
            id: 'aiI8c6',
          })}
          skills={stack}
        />
        <img alt="" className="mt-4 h-[190px] w-full rounded-md" src={imgSrc} />
        <div className="mt-4 flex items-center gap-4">
          <UserAvatarWithLevel
            level={11}
            progress={40}
            size="xl"
            user={author}
          />
          <div className="flex flex-col gap-1">
            <Text size="body2">{authorUserName}</Text>
            <div className="flex gap-4">
              <ProjectsUserJobTitle jobTitle="Software Engineer" />
              <ProjectsUserYearsOfExperience yearsOfExperience={2} />
            </div>
          </div>
        </div>
        <Text className="mt-4" size="body3">
          {description}
        </Text>
        <div className="mt-4 flex justify-between gap-4">
          <div className="flex gap-4">
            <ProjectsLikeCountTag likeCount={likeCount} />
            <ProjectsViewCountTag viewCount={viewCount} />
            <ProjectsCommentCountTag commentCount={commentCount} />
          </div>
          {/* TODO(projects): Format relative time */}
          <Text color="secondary" size="body3">
            12 h. ago
          </Text>
        </div>
      </div>
    </Card>
  );
}
