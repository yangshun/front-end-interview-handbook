import clsx from 'clsx';
import { useState } from 'react';
import { RiFileDamageLine } from 'react-icons/ri';

import RelativeTimestamp from '~/components/common/datetime/RelativeTimestamp';
import { FormattedMessage } from '~/components/intl';
import Img from '~/components/ui/Img';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import type { ProjectsNotificationSubmissionUpvoteItemType } from '../types';

type Props = Readonly<{
  data: ProjectsNotificationSubmissionUpvoteItemType;
}>;

export default function ProjectsNotificationSubmissionUpvote({ data }: Props) {
  const { data: upvoteData, submission, createdAt } = data;
  const [showImageFallback, setShowImageFallback] = useState<boolean>(
    !submission?.imgSrc,
  );

  return (
    <div className="flex gap-4">
      <div
        className={clsx(
          'flex items-center justify-center',
          'h-11 w-12 shrink-0 overflow-hidden rounded',
          'bg-neutral-200 dark:bg-neutral-950',
        )}>
        {showImageFallback ? (
          <RiFileDamageLine
            className={clsx('size-5', themeTextSecondaryColor)}
          />
        ) : (
          <Img
            alt={submission?.title}
            className="size-full object-cover"
            src={submission?.imgSrc}
            onError={() => {
              setShowImageFallback(true);
            }}
          />
        )}
      </div>
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
                <Text color="subtle" size="body3">
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
