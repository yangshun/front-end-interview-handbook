import { FormattedMessage } from 'react-intl';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import Text from '~/components/ui/Text';

import type { ProjectsNotificationSubmissionUpvoteItemType } from '../types';

type Props = Readonly<{
  data: ProjectsNotificationSubmissionUpvoteItemType;
}>;

export default function ProjectsNotificationSubmissionUpvote({ data }: Props) {
  const { data: upvoteData, submission, createdAt } = data;

  return (
    <div className="flex gap-4">
      <img
        alt={submission?.title}
        className="h-11 w-12 rounded object-cover"
        src={submission?.imgSrc}
      />
      <div className="inline-flex">
        <Text color="secondary" size="body3" weight="medium">
          <FormattedMessage
            defaultMessage="{count, plural, one {Your submission <bold>{title}</bold> has received its 1st upvote {timestamp}} other {Your submission <bold>{title}</bold> has received # upvotes {timestamp}}}"
            description="Number of comments for project submission"
            id="kEx00C"
            values={{
              bold: (chunks) => (
                <Text color="subtitle" size="body3" weight="bold">
                  {chunks}
                </Text>
              ),
              count: upvoteData.count,
              timestamp: (
                <Text color="subtle" size="body2" weight="medium">
                  {`· `}
                  <RelativeTimestamp timestamp={new Date(createdAt)} />
                </Text>
              ),
              title: submission?.title ?? '',
            }}
          />
        </Text>
      </div>
    </div>
  );
}
