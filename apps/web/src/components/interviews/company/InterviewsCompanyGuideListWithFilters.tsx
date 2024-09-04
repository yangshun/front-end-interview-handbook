import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { useState } from 'react';
import {
  RiArrowRightLine,
  RiQuestionnaireLine,
  RiSearchLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import CompletionCountSummary from '~/components/interviews/questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import EmptyState from '~/components/ui/EmptyState';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';
import {
  themeBackgroundCardColor,
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { useUser } from '@supabase/auth-helpers-react';

function InterviewsCompanyGuideCard({
  companyGuide,
  isStarted = false,
  completionCount = 0,
}: {
  companyGuide: InterviewsCompanyGuide;
  completionCount?: number;
  isStarted?: boolean;
}) {
  const intl = useIntl();
  const questionFormatLists = useQuestionUserFacingFormatData();
  const {
    name,
    href,
    logoUrl,
    questionsJavaScript,
    questionsUserInterface,
    questionsQuiz,
    questionsSystemDesign,
  } = companyGuide;
  const questionsCodingCount =
    (questionsJavaScript?.length ?? 0) + (questionsUserInterface?.length ?? 0);
  const questionCount =
    questionsCodingCount +
    (questionsQuiz?.length ?? 0) +
    (questionsSystemDesign?.length ?? 0);

  return (
    <div
      className={clsx(
        'flex-2 group relative flex items-center gap-6',
        'rounded-lg px-6 py-5',
        themeBackgroundCardWhiteOnLightColor,
        'hover:bg-neutral-50 dark:hover:bg-neutral-800/80',
        'transition',
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div className="flex flex-grow items-center gap-4 self-stretch">
        <div
          className={clsx(
            'flex shrink-0 items-center justify-center',
            'size-12 rounded-lg',
            'shadow-md',
            'bg-white',
          )}>
          <img
            alt={name}
            className="size-9"
            decoding="async"
            loading="lazy"
            src={logoUrl}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Anchor href={href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text size="body0" weight="bold">
                {name}
              </Text>
            </Anchor>
            {isStarted && (
              <span>
                <Badge
                  label={intl.formatMessage({
                    defaultMessage: 'Started',
                    description: 'Started on study plan label',
                    id: 'cKn3cK',
                  })}
                  size="sm"
                  variant="info"
                />
              </span>
            )}
          </div>
          <div className="z-[1] flex flex-wrap items-center gap-x-4 gap-y-2">
            {INTERVIEWS_REVAMP_2024 ? (
              <QuestionCountLabel
                count={questionCount}
                icon={RiQuestionnaireLine}
                label={intl.formatMessage({
                  defaultMessage: 'Question count',
                  description: 'Label for question count',
                  id: 'b/AtxG',
                })}
                showIcon={true}
              />
            ) : (
              <>
                {questionsCodingCount > 0 && (
                  <QuestionCountLabel
                    count={questionsCodingCount}
                    icon={questionFormatLists.coding.icon}
                    label={questionFormatLists.coding.longName}
                    showIcon={true}
                  />
                )}
                {questionsQuiz && questionsQuiz?.length > 0 && (
                  <QuestionCountLabel
                    count={questionsQuiz.length}
                    icon={questionFormatLists.quiz.icon}
                    label={questionFormatLists.quiz.longName}
                    showIcon={true}
                  />
                )}
                {questionsSystemDesign && questionsSystemDesign?.length > 0 && (
                  <QuestionCountLabel
                    count={questionsSystemDesign.length}
                    icon={questionFormatLists['system-design'].icon}
                    label={questionFormatLists['system-design'].longName}
                    showIcon={true}
                  />
                )}
              </>
            )}
            {isStarted && (
              <CompletionCountSummary
                completed={completionCount}
                total={questionCount}
              />
            )}
          </div>
        </div>
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
    </div>
  );
}

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
}>;

export default function InterviewsCompanyGuideListWithFilters({
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
    <Section>
      <div className="flex flex-col gap-8">
        {INTERVIEWS_REVAMP_2024 && (
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
        )}
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
                defaultMessage: 'No companies',
                description:
                  'Title for empty state when application of filters return no results',
                id: 'Ckm7RZ',
              })}
              variant="empty"
            />
          </div>
        ) : (
          <div className="grid gap-x-4 gap-y-6 md:grid-cols-2">
            {filteredCompanyGuides.map((companyGuide) => {
              const session = sessions.find(
                (session_) => session_.key === companyGuide.slug,
              );
              const completionCount = session?._count.progress;

              return (
                <InterviewsCompanyGuideCard
                  key={companyGuide.slug}
                  companyGuide={companyGuide}
                  completionCount={completionCount}
                  isStarted={session != null}
                />
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
