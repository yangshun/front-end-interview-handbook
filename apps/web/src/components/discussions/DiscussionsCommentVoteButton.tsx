import { RiThumbUpFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';

type Props = Readonly<{
  commentId: string;
  count: number;
}>;

export default function DiscussionsCommentVoteButton({
  commentId,
  count,
}: Props) {
  const intl = useIntl();
  const voteCommentMutation = trpc.comments.vote.useMutation();

  return (
    <Button
      addonPosition="start"
      aria-label={intl.formatMessage({
        defaultMessage: 'Upvote comment',
        description: 'Vote button label',
        id: 'Ox+G1g',
      })}
      className=""
      icon={RiThumbUpFill}
      label={String(count)}
      tooltip={intl.formatMessage({
        defaultMessage: 'Vote',
        description: 'Vote button label',
        id: 'jRKmZ2',
      })}
      variant="tertiary"
      onClick={() => {
        voteCommentMutation.mutate({
          commentId,
        });
      }}
    />
  );
}
