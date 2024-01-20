import clsx from 'clsx';
import { RiQuestionnaireLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import ProjectsChallengeDiscussionComment from './ProjectsChallengeDiscussionComment';
import type { ProjectsChallengeDiscussionCommentData } from './types';

type Props = Readonly<{
  comments: ReadonlyArray<ProjectsChallengeDiscussionCommentData>;
}>;

export default function ProjectsChallengeDiscussionCommentList({
  comments,
}: Props) {
  const intl = useIntl();

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
                commentCount: comments.length,
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
      {comments.map((comment) => (
        <ProjectsChallengeDiscussionComment
          key={comment.id}
          comment={comment}
        />
      ))}
    </div>
  );
}
