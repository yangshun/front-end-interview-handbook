import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { useParams } from 'next/navigation';
import { useCallback, useState } from 'react';
import {
  RiAddCircleLine,
  RiIndeterminateCircleLine,
  RiPencilFill,
  RiReplyFill,
} from 'react-icons/ri';

import useScrollToHash from '~/hooks/useScrollToHash';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';
import {
  themeBackgroundColor,
  themeBorderElementColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import ProjectsDiscussionsCommentDeleteButton from './ProjectsDiscussionsCommentDeleteButton';
import ProjectsDiscussionsCommentEditInput from './ProjectsDiscussionsCommentEditInput';
import ProjectsDiscussionsCommentReplies from './ProjectsDiscussionsCommentReplies';
import ProjectsDiscussionsCommentRepliesThreadLines from './ProjectsDiscussionsCommentRepliesThreadLines';
import ProjectsDiscussionsCommentVoteButton from './ProjectsDiscussionsCommentVoteButton';
import ProjectsDiscussionsReplyInput from './ProjectsDiscussionsReplyInput';
import type {
  ProjectsDiscussionsCommentAuthor,
  ProjectsDiscussionsCommentItem,
} from './types';
import ProjectsVoteCountTag from '../stats/ProjectsVoteCountTag';
import ProjectsProfileAvatar from '../users/ProjectsProfileAvatar';
import ProjectsProfileDisplayNameLink from '../users/ProjectsProfileDisplayNameLink';
import UserProfileInformationRow from '../../profile/info/UserProfileInformationRow';

type Props = Readonly<{
  className?: string;
  comment: ProjectsDiscussionsCommentItem;
  level: number;
  viewer?: ProjectsDiscussionsCommentAuthor | null;
}>;

const MAX_LEVEL_TO_ALLOW_REPLIES = 2;

export default function ProjectsDiscussionsComment({
  comment,
  level,
  className,
  viewer,
}: Props) {
  const params = useParams();
  const [highlightComment, setHighlightComment] = useState<boolean>(false);
  const {
    _count: { votes: votesCount },
    id: commentId,
    author,
    body,
    category,
    replies,
    updatedAt,
  } = comment;

  const highlightOnScrolledToItem = useCallback(() => {
    const commentHashId = window.location.hash.replace('#', '');

    if (commentHashId === comment.id) {
      setHighlightComment(true);
    }
    setTimeout(() => {
      setHighlightComment(false);
    }, 2000);
    // Params dependency is to rerender when the hashId changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comment.id, params]);

  useScrollToHash({
    onScrolledToItem: highlightOnScrolledToItem,
    topOffset: 140, // Rough top offset height due to navbar
  });

  const intl = useIntl();
  const replyCount = replies?.length ?? 0;
  const hasReplies = replyCount > 0;

  const [mode, setMode] = useState<'delete' | 'edit' | 'reply' | null>(null);
  const [showReplies, setShowReplies] = useState(true);

  const shouldPadBottom = mode === 'reply' || showReplies;
  const collapseButtonLabel = intl.formatMessage(
    {
      defaultMessage:
        'Collapse {replyCount, plural, =0 {none} one {# reply} other {# replies}}',
      description: 'Label for collapse replies button',
      id: 'puP8B5',
    },
    {
      replyCount,
    },
  );

  return (
    // Id is to enable linking / auto scrolling to a specific comment
    // TODO: rework this to integrate with comment pagination if comments list are paginated
    <div
      className={clsx(
        'flex grow flex-col',
        highlightComment &&
          'bg-brand-dark/30 dark:bg-brand/30 rounded-md transition-colors',
        className,
      )}
      id={comment.id}>
      <div className="flex items-start gap-4">
        <div className="relative flex flex-col items-center self-stretch">
          <ProjectsProfileAvatar
            points={author.points}
            size="2xl"
            userProfile={author.userProfile}
          />
          {(hasReplies || mode === 'reply') && (
            <div
              className={clsx(
                'h-full w-px flex-1 border-l',
                themeBorderElementColor,
              )}
            />
          )}
          {showReplies && hasReplies && (
            <>
              <div
                className={clsx(
                  'size-4 absolute bottom-8',
                  themeBackgroundColor,
                )}
              />
              <div className="absolute bottom-6 self-center">
                <Button
                  icon={RiIndeterminateCircleLine}
                  isLabelHidden={true}
                  label={collapseButtonLabel}
                  tooltip={collapseButtonLabel}
                  variant="tertiary"
                  onClick={() => {
                    setShowReplies(false);
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div
          className={clsx(
            'flex flex-1 flex-col items-start gap-3',
            shouldPadBottom ? 'pb-6' : 'pb-1',
          )}>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <Text color="secondary" size="body2">
                <Text color="default" size="inherit">
                  <ProjectsProfileDisplayNameLink
                    userProfile={author.userProfile}
                  />
                </Text>
                {' · '}
                <RelativeTimestamp timestamp={comment.createdAt} />
              </Text>
            </div>
            <UserProfileInformationRow
              size="body3"
              userProfile={author.userProfile}
            />
          </div>
          {category && (
            <Badge
              label={startCase(category.toLowerCase())}
              size="sm"
              variant="primary"
            />
          )}
          {mode === 'edit' ? (
            <ProjectsDiscussionsCommentEditInput
              comment={comment}
              onCancel={() => {
                setMode(null);
              }}
            />
          ) : (
            <RichText
              key={updatedAt.getTime()}
              color="body"
              size="sm"
              value={body}
            />
          )}
          <div
            className={clsx(
              '-mt-1 flex',
              viewer != null && '-ml-3', // Because the upvote button has some horizontal padding.
            )}>
            {viewer == null ? (
              <ProjectsVoteCountTag count={votesCount} />
            ) : (
              <ProjectsDiscussionsCommentVoteButton
                comment={comment}
                count={votesCount}
              />
            )}
            {viewer != null && level <= MAX_LEVEL_TO_ALLOW_REPLIES && (
              <Button
                addonPosition="start"
                icon={RiReplyFill}
                iconClassName={themeTextSubtleColor}
                label={intl.formatMessage({
                  defaultMessage: 'Reply',
                  description:
                    'Label for reply button on project discussions page',
                  id: 'buggxJ',
                })}
                variant="tertiary"
                onClick={() => setMode(mode === 'reply' ? null : 'reply')}
              />
            )}
            {viewer?.userProfile.id === author.userProfile.id && (
              <Button
                addonPosition="start"
                icon={RiPencilFill}
                iconClassName={themeTextSubtleColor}
                label={intl.formatMessage({
                  defaultMessage: 'Edit',
                  description:
                    'Label for edit button on project discussions page',
                  id: 'g2Nt5j',
                })}
                variant="tertiary"
                onClick={() => setMode(mode === 'edit' ? null : 'edit')}
              />
            )}
            {viewer?.userProfile.id === author.userProfile.id && (
              <ProjectsDiscussionsCommentDeleteButton
                commentId={commentId}
                dialogShown={mode === 'delete'}
                onClick={() => setMode('delete')}
                onDismiss={() => setMode(null)}
              />
            )}
          </div>
        </div>
      </div>
      {mode === 'reply' && viewer != null && (
        <ProjectsDiscussionsReplyInput
          hasNext={hasReplies}
          parentComment={comment}
          viewer={viewer}
          onCancel={() => {
            setMode(null);
          }}
        />
      )}
      {hasReplies &&
        (showReplies ? (
          <ProjectsDiscussionsCommentReplies
            level={level + 1}
            replies={comment.replies ?? []}
            viewer={viewer}
          />
        ) : (
          <div className="flex">
            <ProjectsDiscussionsCommentRepliesThreadLines branchHeightClass="h-5 -translate-y-1" />
            <Button
              addonPosition="start"
              className="-ms-3.5"
              icon={RiAddCircleLine}
              label={intl.formatMessage(
                {
                  defaultMessage:
                    '{replyCount, plural, one {Show # reply} other {Show # replies}}',
                  description:
                    'Label for more replies button on project discussions page',
                  id: 'g9OX0J',
                },
                { replyCount },
              )}
              variant="tertiary"
              onClick={() => {
                setShowReplies(true);
              }}
            />
          </div>
        ))}
    </div>
  );
}
