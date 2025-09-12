import { useUser } from '@supabase/auth-helpers-react';
import clsx from 'clsx';
import { useState } from 'react';
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiPencilLine,
  RiReplyLine,
} from 'react-icons/ri';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { useIntl } from '~/components/intl';
import UserProfileDisplayName from '~/components/profile/info/UserProfileDisplayName';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import RichText from '~/components/ui/RichTextEditor/RichText';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import CodingWorkspaceDiscussionsCommentDeleteButton from './CodingWorkspaceDiscussionsCommentDeleteButton';
import CodingWorkspaceDiscussionsCommentEditInput from './CodingWorkspaceDiscussionsCommentEditInput';
import CodingWorkspaceDiscussionsCommentVoteButton from './CodingWorkspaceDiscussionsCommentVoteButton';
import CodingWorkspaceDiscussionsReplyInput from './CodingWorkspaceDiscussionsReplyInput';
import type { CodingWorkspaceDiscussionsCommentItem } from './types';

type Props = Readonly<{
  comment: CodingWorkspaceDiscussionsCommentItem;
}>;

export default function CodingWorkspaceDiscussionsComment({ comment }: Props) {
  const intl = useIntl();
  const user = useUser();
  const isLoggedIn = user != null;
  const {
    _count: { votes: votesCount },
    author,
    body,
    createdAt,
    updatedAt,
  } = comment;
  const isUserOwnComment = user?.id === author.id;

  const replyCount = comment.replies?.length ?? 0;
  const hasReplies = replyCount > 0;
  const [mode, setMode] = useState<'delete' | 'edit' | 'reply' | null>(null);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="py-2">
      <div className="flex gap-3">
        <Avatar
          alt={author.name ?? author.username}
          size="xs"
          src={author.avatarUrl ?? ''}
        />{' '}
        <div>
          <Text color="secondary" size="body2">
            <Text color="default" size="inherit">
              <UserProfileDisplayName userProfile={author} />
            </Text>
            {' · '}
            <RelativeTimestamp timestamp={createdAt} />
          </Text>
          <div className="mt-1.5">
            {mode === 'edit' ? (
              <CodingWorkspaceDiscussionsCommentEditInput
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
          </div>
          <div className="-ml-2 mt-3">
            <CodingWorkspaceDiscussionsCommentVoteButton
              comment={comment}
              count={votesCount}
            />
            {isLoggedIn && (
              <Button
                addonPosition="start"
                className={themeTextSecondaryColor}
                icon={RiReplyLine}
                label={intl.formatMessage({
                  defaultMessage: 'Reply',
                  description: 'Label for reply button',
                  id: 'do3v9Q',
                })}
                size="xs"
                variant="tertiary"
                onClick={() => setMode(mode === 'reply' ? null : 'reply')}
              />
            )}
            {isUserOwnComment && (
              <>
                <Button
                  addonPosition="start"
                  className={themeTextSecondaryColor}
                  icon={RiPencilLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Edit',
                    description: 'Edit button label',
                    id: '2rcoOT',
                  })}
                  size="xs"
                  variant="tertiary"
                  onClick={() => setMode(mode === 'edit' ? null : 'edit')}
                />
                <CodingWorkspaceDiscussionsCommentDeleteButton
                  comment={comment}
                  dialogShown={mode === 'delete'}
                  onClick={() => setMode('delete')}
                  onDismiss={() => setMode(null)}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {mode === 'reply' && user != null && (
        <div className="ml-9 mt-2">
          <CodingWorkspaceDiscussionsReplyInput
            author={author}
            parentComment={comment}
            onCancel={() => {
              setMode(null);
            }}
          />
        </div>
      )}
      {hasReplies && (
        <div className="ml-9">
          {showReplies && (
            <div className="mt-1.5">
              {comment.replies?.map((reply) => (
                <CodingWorkspaceDiscussionsComment
                  key={reply.id}
                  comment={reply}
                />
              ))}
            </div>
          )}
          <Button
            addonPosition="end"
            className={clsx('-ml-2', showReplies ? 'mt-1' : 'mt-3')}
            icon={showReplies ? RiArrowDownSLine : RiArrowUpSLine}
            label={
              showReplies
                ? intl.formatMessage({
                    defaultMessage: 'Hide replies',
                    description: 'Label for hide replies button',
                    id: 'aUHfy4',
                  })
                : intl.formatMessage({
                    defaultMessage: 'See more replies',
                    description: 'Label for see more replies button',
                    id: 'xufXOh',
                  })
            }
            size="xs"
            variant="tertiary"
            onClick={() => setShowReplies(!showReplies)}
          />
        </div>
      )}
    </div>
  );
}
