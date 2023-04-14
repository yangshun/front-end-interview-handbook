import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionMetadata } from './QuestionsTypes';

import { CheckCircleIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  metadata: QuestionMetadata;
  showIcon?: boolean;
}>;

export default function QuestionUsersCompletedLabel({
  showIcon = false,
  metadata,
}: Props) {
  const id = useId();
  const intl = useIntl();

  const { data: count, isLoading } =
    trpc.questionProgress.globalCompleted.useQuery({
      format: metadata.format,
      slug: metadata.slug,
    });

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Users Completed',
        description: 'Number of users who completed the question',
        id: 'VMIoK4',
      })}
      position="above">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Users Completed"
          description="Number of users who completed the question"
          id="VMIoK4"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        {showIcon && (
          <CheckCircleIcon
            aria-hidden="true"
            className="mr-1.5 h-5 w-5 flex-shrink-0 text-slate-400"
          />
        )}
        <Text className="whitespace-nowrap" color="secondary" variant="body3">
          {isLoading ? (
            <div className="h-2 min-w-[80px] animate-pulse rounded bg-slate-200" />
          ) : (
            <FormattedMessage
              defaultMessage="{numUsers} completed"
              description="Number of users who completed the question"
              id="xVsq55"
              values={{
                numUsers: count,
              }}
            />
          )}
        </Text>
      </div>
    </Tooltip>
  );
}
