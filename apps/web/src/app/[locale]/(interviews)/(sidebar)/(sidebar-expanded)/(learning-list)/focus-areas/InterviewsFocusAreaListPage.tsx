'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';

import type {
  FocusArea,
  FocusAreas,
  FocusAreaType,
} from '~/data/focus-areas/FocusAreas';
import { getFocusAreaTheme } from '~/data/focus-areas/FocusAreas';

import type { QuestionDifficulty } from '~/components/interviews/questions/common/QuestionsTypes';
import CompletionCountSummary from '~/components/interviews/questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import QuestionDifficultySummary from '~/components/interviews/questions/metadata/QuestionDifficultySummary';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

import { useUser } from '@supabase/auth-helpers-react';

function FocusAreaCard({
  difficultySummary,
  area: { type, name, shortDescription, questions, href },
  isStarted = false,
  completionCount = 0,
}: {
  area: FocusArea;
  completionCount?: number;
  difficultySummary: Record<QuestionDifficulty, number>;
  isStarted?: boolean;
}) {
  const intl = useIntl();
  const questionCount = countNumberOfQuestionsInList(questions);
  const theme = getFocusAreaTheme(type);

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-6 rounded-lg p-4',
        'bg-white transition dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
        themeGlassyBorder,
      )}>
      <div className="flex flex-1 flex-col gap-3 self-stretch">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              'size-10 flex items-center justify-center rounded',
              theme.gradient.className,
            )}>
            <theme.iconOutline className="size-6 text-white" />
          </div>
          <Anchor href={href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Heading level="heading6">{name}</Heading>
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
        <Text className="grow" color="secondary" size="body2">
          {shortDescription}
        </Text>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <QuestionCountLabel count={questionCount} showIcon={true} />
          <QuestionDifficultySummary
            easy={difficultySummary.easy}
            hard={difficultySummary.hard}
            medium={difficultySummary.medium}
            showIcon={true}
          />
          {isStarted && (
            <CompletionCountSummary
              completed={completionCount}
              total={questionCount}
            />
          )}
        </div>
      </div>
      <RiArrowRightLine className="group-hover:text-brand-dark dark:group-hover:text-brand size-6 text-neutral-400 transition-colors" />
    </div>
  );
}

export type FocusAreaDifficultySummary = Record<
  FocusAreaType,
  Record<QuestionDifficulty, number>
>;

type Props = Readonly<{
  difficultySummary: FocusAreaDifficultySummary;
  focusAreas: FocusAreas;
}>;

export default function InterviewsFocusAreaListPage({
  focusAreas,
  difficultySummary,
}: Props) {
  const intl = useIntl();
  const user = useUser();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery(undefined, {
      enabled: !!user,
    });

  const sessions = questionListSessions ?? [];
  const areas = Object.values(focusAreas);

  return (
    <Container
      className={clsx(
        'flex flex-col',
        'py-4 md:py-6 lg:py-8 xl:py-16',
        'gap-y-8 md:gap-y-10 2xl:gap-y-12',
      )}>
      <div className="flex flex-col gap-3">
        <Heading level="heading5">
          {intl.formatMessage({
            defaultMessage: 'Focus areas',
            description: 'Title of focus areas page',
            id: 'Zui1cu',
          })}
        </Heading>
        <Text className="block" color="secondary" size="body2">
          {intl.formatMessage({
            defaultMessage:
              'Discover focus areas tailored to your needs to help you prepare for your upcoming technical interviews.',
            description: 'Description for focus areas page',
            id: 'Qe4ww/',
          })}
        </Text>
      </div>
      <Section>
        <div className="grid gap-4 lg:grid-cols-2">
          {areas.map((area) => {
            const session = sessions.find(
              (session_) => session_.key === area.type,
            );
            const completionCount = session?._count.progress;

            return (
              <FocusAreaCard
                key={area.type}
                area={area}
                completionCount={completionCount}
                difficultySummary={difficultySummary[area.type]}
                isStarted={session != null}
              />
            );
          })}
        </div>
      </Section>
    </Container>
  );
}
