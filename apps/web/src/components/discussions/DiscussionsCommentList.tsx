import clsx from 'clsx';
import { RiQuestionnaireLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import DropdownMenu from '~/components/ui/DropdownMenu';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import DiscussionsComment from './DiscussionsComment';

type Props = Readonly<{
  domain: 'PROJECTS_CHALLENGE' | 'PROJECTS_SUBMISSION';
  entityId: string;
  viewer?: Readonly<{
    avatarUrl: string | null;
    id: string;
    name: string | null;
    title: string | null;
    username: string;
  }> | null;
}>;

export default function DiscussionsCommentList({
  entityId,
  domain,
  viewer,
}: Props) {
  const intl = useIntl();
  const { data: comments, isLoading } = trpc.comments.list.useQuery({
    domain,
    entityId,
  });

  if (isLoading) {
    return (
      <div className="w-full p-8">
        <Spinner display="block" size="lg" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center justify-between">
        <div
          className={clsx(
            'flex items-center gap-1.5',
            themeTextSecondaryColor,
          )}>
          <RiQuestionnaireLine className="h-5 w-5" />
          <Text color="inherit" size="body3">
            <FormattedMessage
              defaultMessage="{commentCount} comments"
              description="Label for comment count on project discussions page"
              id="g5XqyS"
              values={{
                commentCount: comments?.length,
              }}
            />
          </Text>
        </div>
        <DropdownMenu
          align="end"
          icon={RiSortDesc}
          label={intl.formatMessage({
            defaultMessage: 'Sort by',
            description:
              'Label for sort button for projects discussion post list',
            id: 'NjnYqU',
          })}
          size="md">
          Placeholder
        </DropdownMenu>
      </div>
      {comments?.map((comment) => (
        <DiscussionsComment
          key={comment.id}
          comment={comment}
          viewer={viewer}
        />
      ))}
    </div>
  );
}
