import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundEmphasized_Hover,
  themeBorderColor,
  themeDivideColor,
} from '~/components/ui/theme';

import ProjectsProfileCommunityChallengeCommentLog from './ProjectsProfileCommunityChallengeCommentLog';
import type { ProjectsProfileCommunityComment } from './ProjectsProfileCommunitySection';
import ProjectsProfileCommunitySubmissionCommentLog from './ProjectsProfileCommunitySubmissionCommentLog';
import RelativeTimestamp from '../../../common/datetime/RelativeTimestamp';

type Props = Readonly<{
  comments: ReadonlyArray<ProjectsProfileCommunityComment>;
  isViewingOwnProfile: boolean;
  targetUserId?: string;
  title: string;
}>;

export default function ProjectsProfileCommunityCommentList({
  comments,
  isViewingOwnProfile,
  targetUserId,
  title,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-4">
      <Text size="body1" weight="medium">
        {title}
      </Text>
      <ul
        className={clsx(
          'isolate rounded-lg',
          ['divide-y', themeDivideColor],
          ['border', themeBorderColor],
        )}>
        {comments.map((comment, index) => (
          <li
            key={comment.id}
            className={clsx(
              'group relative flex py-5 pl-4 pr-6',
              'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
              themeBackgroundCardWhiteOnLightColor,
              'transition-colors',
              themeBackgroundEmphasized_Hover,
              index === 0 && 'rounded-t-lg',
              index === comments.length - 1 && 'rounded-b-lg',
            )}>
            <div className="flex w-full gap-3">
              <UserAvatar
                className="size-6 shrink-0"
                size="xs"
                userProfile={comment.author.userProfile}
              />
              <div className="flex w-full grow flex-col gap-x-6 gap-y-1 lg:flex-row lg:justify-between">
                <div className="flex grow flex-col gap-3 lg:flex-row">
                  {comment.category === 'QUESTION' && (
                    <Badge
                      className="h-6 w-min"
                      label={intl.formatMessage({
                        defaultMessage: 'Question',
                        description: 'Label for question badge',
                        id: '6+IMdW',
                      })}
                      size="sm"
                      variant="primary"
                    />
                  )}
                  {comment.category === 'CODE_REVIEW' && (
                    <Badge
                      className="h-6 w-min"
                      label={intl.formatMessage({
                        defaultMessage: 'Code review',
                        description: 'Label for question badge',
                        id: 'pJA5oJ',
                      })}
                      size="sm"
                      variant="info"
                    />
                  )}
                  <div className="flex items-start">
                    <Text color="secondary" size="body2">
                      {(() => {
                        // Submissions logs
                        if (comment.domain === 'PROJECTS_SUBMISSION') {
                          return (
                            <ProjectsProfileCommunitySubmissionCommentLog
                              comment={comment}
                              isViewingOwnProfile={isViewingOwnProfile}
                              targetUserId={targetUserId}
                            />
                          );
                        }

                        // Challenge logs
                        return (
                          <ProjectsProfileCommunityChallengeCommentLog
                            comment={comment}
                            isViewingOwnProfile={isViewingOwnProfile}
                            targetUserId={targetUserId}
                          />
                        );
                      })()}
                    </Text>
                  </div>
                </div>
                <Text
                  className="whitespace-nowrap"
                  color="secondary"
                  size="body3">
                  <RelativeTimestamp timestamp={new Date(comment.createdAt)} />
                </Text>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
