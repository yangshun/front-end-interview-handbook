import clsx from 'clsx';
import { useState } from 'react';
import {
  RiAddCircleLine,
  RiIndeterminateCircleLine,
  RiPencilFill,
  RiReplyFill,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeElementBorderColor,
} from '~/components/ui/theme';

import ProjectsChallengeDiscussionPostReplyInput from './ProjectsChallengeDiscussionReplyInput';
import ProjectsChallengeDiscussionSubposts from './ProjectsChallengeDiscussionSubPosts';
import type { ProjectsChallengeDiscussionPost } from './types';
import ProjectsLikeCountTag from '../../stats/ProjectsLikeCountTag';
import ProjectsUserJobTitle from '../../users/ProjectsUserJobTitle';
import ProjectsUserYearsOfExperience from '../../users/ProjectsUserYearsOfExperience';
import UserAvatarWithLevel from '../../users/UserAvatarWithLevel';

type Props = Readonly<{
  className?: string;
  post: ProjectsChallengeDiscussionPost;
}>;

export default function DiscussionPost({ post, className }: Props) {
  const {
    author,
    likeCount,
    replyCount,
    content,
    isQuestion,
    id: postId,
  } = post;
  const intl = useIntl();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const shouldPadBottom = isExpanded || isReplying;

  return (
    <div className={clsx('flex flex-col', className)}>
      <div className="flex items-start gap-4">
        <div className="relative flex flex-col items-center self-stretch">
          <UserAvatarWithLevel
            level={11}
            profile={author}
            progress={50}
            size="2xl"
          />
          <div
            className={clsx(
              'h-full w-px flex-1 border-l',
              themeElementBorderColor,
            )}
          />
          {isExpanded && (
            <>
              <div
                className={clsx(
                  'absolute bottom-8 h-4 w-4',
                  themeBackgroundColor,
                )}
              />
              <Button
                className="absolute bottom-6 self-center"
                icon={RiIndeterminateCircleLine}
                isLabelHidden={true}
                label={intl.formatMessage(
                  {
                    defaultMessage: 'Collapse {replyCount} replies',
                    description:
                      'Label for collapse replies button on project discussions page',
                    id: 'jRGPwh',
                  },
                  {
                    replyCount,
                  },
                )}
                variant="tertiary"
                onClick={() => {
                  setIsExpanded(false);
                }}
              />
            </>
          )}
        </div>
        <div
          className={clsx(
            'flex flex-1 flex-col items-start gap-3',
            shouldPadBottom ? 'mb-6' : 'mb-1',
          )}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <Text color="secondary" size="body2">
                <FormattedMessage
                  defaultMessage="<emphasis>{author}</emphasis> · {date}"
                  description="Label for author and date of discussion post on project discussions page"
                  id="WdiFBs"
                  values={{
                    author: author.name,
                    date: intl.formatDate(new Date(), {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    }),
                    emphasis: (chunks) => (
                      <Text size="inherit" weight="medium">
                        {chunks}
                      </Text>
                    ),
                  }}
                />
              </Text>
            </div>
            <div className="flex gap-4">
              {author.title && (
                <ProjectsUserJobTitle jobTitle={author.title} size="2xs" />
              )}
              <ProjectsUserYearsOfExperience size="2xs" yearsOfExperience={2} />
            </div>
          </div>
          {isQuestion && (
            <Badge
              label={intl.formatMessage({
                defaultMessage: 'Question',
                description:
                  'Label for question badge on project discussions page',
                id: 'AIcBCW',
              })}
              size="sm"
              variant="primary"
            />
          )}
          <Text size="body2">{content}</Text>
          <div className="flex">
            <ProjectsLikeCountTag likeCount={likeCount} />
            <Button
              addonPosition="start"
              className="ms-2"
              icon={RiReplyFill}
              label={intl.formatMessage({
                defaultMessage: 'Reply',
                description:
                  'Label for reply button on project discussions page',
                id: 'buggxJ',
              })}
              variant="tertiary"
              onClick={() => {
                setIsReplying((replying) => !replying);
              }}
            />
            <Button
              addonPosition="start"
              icon={RiPencilFill}
              label={intl.formatMessage({
                defaultMessage: 'Edit',
                description:
                  'Label for edit button on project discussions page',
                id: 'g2Nt5j',
              })}
              variant="tertiary"
            />
          </div>
        </div>
      </div>
      {isReplying && (
        <ProjectsChallengeDiscussionPostReplyInput
          hasNext={replyCount > 0}
          onCancel={() => {
            setIsReplying(false);
          }}
        />
      )}
      {!isExpanded && replyCount > 0 && (
        <div className="flex">
          <div className="flex flex-col">
            <div
              className={clsx(
                'ms-[27.5px] h-1/2 w-[45.5px] self-stretch rounded-es-2xl border-b border-s',
                themeElementBorderColor,
              )}
            />
          </div>
          <Button
            addonPosition="start"
            className="-ms-3.5"
            icon={RiAddCircleLine}
            label={intl.formatMessage(
              {
                defaultMessage: '{replyCount} more replies',
                description:
                  'Label for more replies button on project discussions page',
                id: 's1tiYn',
              },
              { replyCount },
            )}
            variant="tertiary"
            onClick={() => {
              setIsExpanded(true);
            }}
          />
        </div>
      )}
      {isExpanded && <ProjectsChallengeDiscussionSubposts postId={postId} />}
    </div>
  );
}
