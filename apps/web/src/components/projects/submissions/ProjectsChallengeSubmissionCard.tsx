import { RiPushpinFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';

import type { ProjectsChallengeSubmissionItem } from './types';
import ProjectsSkillRow from '../skills/ProjectsSkillRow';
import ProjectsCommentCountTag from '../stats/ProjectsCommentCountTag';
import ProjectsLikeCountTag from '../stats/ProjectsLikeCountTag';
import ProjectsViewCountTag from '../stats/ProjectsViewCountTag';
import ProjectsUserJobTitle from '../users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '../users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '../users/UserAvatarWithLevel';

type Props = Readonly<{
  challenge?: Readonly<{
    href: string;
    title: string;
  }>;
  isPinnedOnProfile?: boolean;
  submission: ProjectsChallengeSubmissionItem;
}>;

export default function ProjectsChallengeSubmissionCard({
  isPinnedOnProfile = false,
  challenge,
  submission,
}: Props) {
  const intl = useIntl();
  const { id, title, stack, author, summary, comments, votes, views, imgSrc } =
    submission;

  return (
    <Card disableSpotlight={true} padding={false} pattern={false}>
      <div className="flex flex-col px-4 py-6 gap-4">
        {isPinnedOnProfile && challenge != null && (
          <div className="flex justify-between">
            <Text color="secondary" size="body3">
              <FormattedMessage
                defaultMessage="Brief: <link>{briefDescription}</link>"
                description="Link to brief for pinned project submission"
                id="Ukm+GC"
                values={{
                  briefDescription: challenge?.title,
                  link: (chunks) => (
                    <Anchor href={challenge?.href}>{chunks}</Anchor>
                  ),
                }}
              />
            </Text>
            <RiPushpinFill className="!text-brand" />
          </div>
        )}
        <div className="flex flex-col gap-3">
          <Anchor href={`/projects/s/${id}`}>
            <Text weight="bold">{title}</Text>
          </Anchor>
          <ProjectsSkillRow
            label={intl.formatMessage({
              defaultMessage: 'Stack used',
              description: 'Label for tech stack used in project',
              id: 'aiI8c6',
            })}
            skills={stack}
          />
        </div>
        <img alt="" className="h-[190px] w-full rounded-md" src={imgSrc} />
        {!isPinnedOnProfile && author != null && (
          <div className="flex items-center gap-4">
            <UserAvatarWithLevel
              level={11}
              profile={author}
              progress={40}
              size="xl"
            />
            <div className="flex flex-col gap-1">
              <Text size="body2" weight="medium">
                {author.name}
              </Text>
              <div className="flex gap-x-4 flex-wrap gap-y-2">
                {author.title && (
                  <ProjectsUserJobTitle jobTitle={author.title} size="2xs" />
                )}
                <ProjectsUserYearsOfExperience
                  size="2xs"
                  yearsOfExperience={2}
                />
              </div>
            </div>
          </div>
        )}
        <Text color="subtitle" display="block" size="body3">
          {summary}
        </Text>
        <div className="flex justify-between gap-4">
          <div className="flex gap-4">
            <ProjectsLikeCountTag likeCount={votes} />
            <ProjectsViewCountTag viewCount={views} />
            <ProjectsCommentCountTag commentCount={comments} />
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
