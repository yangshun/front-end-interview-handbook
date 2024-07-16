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
        <Text color="subtle" size="body3" weight="medium">
          <FormattedMessage
            defaultMessage="{count, plural, one {Your project <bold>{title}</bold> has received its 1st upvote {timestamp}} other {Your project <bold>{title}</bold> has received # upvotes {timestamp}}}"
            description="Number of comments for project submission"
            id="eDD1zi"
            values={{
              bold: (chunks) => (
                <Text size="body3" weight="bold">
                  {chunks}
                </Text>
              ),
              count: upvoteData.count,
              timestamp: (
                <span>
                  {`· `}
                  <RelativeTimestamp timestamp={new Date(createdAt)} />
                </span>
              ),
              title: submission?.title ?? '',
            }}
          />
        </Text>
      </div>
    </div>
  );
}
