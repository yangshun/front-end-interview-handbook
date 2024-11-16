import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
import { useState } from 'react';
import { RiSearchLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import InterviewsStudyListCard from '~/components/interviews/questions/listings/learning/InterviewsStudyListCard';
import { useIntl } from '~/components/intl';
import EmptyState from '~/components/ui/EmptyState';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundCardColor,
  themeBorderElementColor,
} from '~/components/ui/theme';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  companyGuides: Array<InterviewsStudyList>;
}>;

export default function InterviewsStudyListListWithFilters({
  companyGuides,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];
  const [query, setQuery] = useState('');

  // Search filtering
  const filteredCompanyGuides = companyGuides.filter((guide) =>
    guide.name.toLowerCase().includes(query.toLowerCase()),
  );

  const isEmptyState = filteredCompanyGuides.length === 0 && !!query;

  return (
    <div className="flex flex-col gap-8">
      <TextInput
        autoComplete="off"
        isLabelHidden={true}
        label={intl.formatMessage({
          defaultMessage: 'Search company guides',
          description: 'Placeholder for search input of company guides',
          id: 'ysth0B',
        })}
        placeholder={intl.formatMessage({
          defaultMessage: 'Search for your target company',
          description: 'Placeholder for search input of company guides',
          id: 'J7bWrf',
        })}
        size="sm"
        startIcon={RiSearchLine}
        value={query}
        onChange={(value) => setQuery(value)}
      />
      {isEmptyState ? (
        <div
          className={clsx(
            'h-60 w-full',
            'rounded-lg',
            themeBackgroundCardColor,
            ['border', themeBorderElementColor],
          )}>
          <EmptyState
            subtitle={intl.formatMessage({
              defaultMessage: 'Try changing your search terms',
              description: 'Subtitle for empty state for company guides list',
              id: 'Kajzf7',
            })}
            title={intl.formatMessage({
              defaultMessage: 'No result',
              description:
                'Title for empty state when application of filters return no results',
              id: 'Up/FZA',
            })}
            variant="empty"
          />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:gap-6">
          {filteredCompanyGuides.map((companyGuide) => {
            const session = sessions.find(
              (session_) => session_.key === companyGuide.slug,
            );
            const completionCount = session?._count.progress;

            return (
              <InterviewsStudyListCard
                key={companyGuide.slug}
                alignVerticalOnMobile={false}
                completionCount={completionCount}
                isStarted={session != null}
                showDescription={false}
                studyList={companyGuide}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
