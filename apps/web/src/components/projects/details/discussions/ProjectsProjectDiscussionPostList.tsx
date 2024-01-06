import clsx from 'clsx';
import { RiQuestionnaireLine, RiSortDesc } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import DiscussionPost from './ProjectsProjectDiscussionPost';
import type { ProjectsProjectDiscussionPost } from './types';

type Props = Readonly<{
  posts: ReadonlyArray<ProjectsProjectDiscussionPost>;
}>;

export default function ProjectsProjectDiscussionPostList({ posts }: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <div className="mt-9 flex items-center justify-between">
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
                commentCount: posts.length,
              }}
            />
          </Text>
        </div>
        <DropdownMenu
          align="end"
          icon={RiSortDesc}
          label={intl.formatMessage({
            defaultMessage: 'Sort By',
            description:
              'Label for sort button for projects discussion post list',
            id: 'n2QhOj',
          })}
          size="md">
          Placeholder
        </DropdownMenu>
      </div>
      {posts.map((post) => (
        <DiscussionPost key={post.id} post={post} />
      ))}
    </div>
  );
}
