import clsx from 'clsx';
import { last, reduce } from 'lodash-es';

import { useToast } from '~/components/global/toasts/useToast';
import type {
  GuideCardMetadata,
  GuideCardMetadataWithCompletedStatus,
} from '~/components/guides/types';
import { useIntl } from '~/components/intl';
import Heading from '~/components/ui/Heading';

import {
  useMutationGuideProgressAdd,
  useMutationGuideProgressDelete,
} from '~/db/guides/GuidesProgressClient';

import GuidesCountLabel from './GuidesCountLabel';
import GuidesList from './GuidesList';
import GuideReadingTimeLabel from './GuidesReadingTimeLabel';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  guides: ReadonlyArray<{
    articles: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
    totalReadingTime: number;
  }>;
}>;

export default function GuidesListWithCategory({ guides }: Props) {
  const intl = useIntl();
  const { showToast } = useToast();
  const user = useUser();
  const addGuideProgressMutation = useMutationGuideProgressAdd();
  const deleteGuideProgressMutation = useMutationGuideProgressDelete();

  function markGuideAsCompleted(guide: GuideCardMetadata) {
    if (user == null) {
      return;
    }

    addGuideProgressMutation.mutate(
      {
        category: guide.category,
        slug: guide.slug,
        status: 'complete',
      },
      {
        onError: () => {
          showToast({
            title: intl.formatMessage({
              defaultMessage:
                'Failed to mark article as complete. Please try again',
              description:
                'Error message shown when a guide has failed to mark as complete',
              id: '6eVVTu',
            }),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{articleTitle}" as complete',
                description:
                  'Success message for marking a question as complete',
                id: 'GoDdwh',
              },
              {
                articleTitle: guide.title,
              },
            ),
            variant: 'success',
          });
        },
      },
    );
  }

  function markGuideAsNotCompleted(guide: GuideCardMetadata) {
    if (user == null) {
      return;
    }

    deleteGuideProgressMutation.mutate(
      {
        category: guide.category,
        slug: guide.slug,
      },
      {
        onError: () => {
          showToast({
            title: intl.formatMessage({
              defaultMessage:
                'Failed to mark article as not complete. Please try again',
              description:
                'Error message shown when a guide has failed to mark as not complete',
              id: 'i+5/Aq',
            }),
            variant: 'danger',
          });
        },
        onSuccess: () => {
          showToast({
            title: intl.formatMessage(
              {
                defaultMessage: 'Marked "{articleTitle}" as not completed',
                description:
                  'Success message for marking a question as not completed',
                id: 'yjjdMB',
              },
              {
                articleTitle: guide.title,
              },
            ),
            variant: 'info',
          });
        },
      },
    );
  }

  // For the starting value of the guides list
  const cumulativeCounts = reduce(
    guides,
    (result, item) => {
      const lastCount = last(result) || 0;

      result.push(lastCount + item.articles.length);

      return result;
    },
    [0],
  );

  return (
    <div className={clsx('grid lg:grid-cols-12')}>
      <div className={clsx('flex flex-col gap-12', 'lg:col-span-9')}>
        {guides.map(({ title, totalReadingTime, articles }, index) => (
          <div key={title}>
            <Heading level="heading5">{title}</Heading>
            <div className="mb-4 mt-6 flex items-center gap-10">
              <GuidesCountLabel count={articles.length} />
              <GuideReadingTimeLabel readingTime={totalReadingTime} />
            </div>
            <GuidesList
              articles={articles}
              checkIfCompletedGuide={(guide) => guide.isCompleted}
              startingValue={cumulativeCounts[index]}
              onMarkAsCompleted={markGuideAsCompleted}
              onMarkAsNotCompleted={markGuideAsNotCompleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
