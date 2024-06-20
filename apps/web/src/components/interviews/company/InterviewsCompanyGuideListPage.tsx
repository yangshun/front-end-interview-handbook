'use client';

import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import { useQuestionFormatLists } from '~/data/QuestionFormats';

import CompletionCountSummary from '~/components/interviews/questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '~/components/interviews/questions/metadata/QuestionCountLabel';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import { themeGlassyBorder } from '~/components/ui/theme';

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
  const questionFormatLists = useQuestionFormatLists();
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
        'rounded-lg p-4',
        'bg-white hover:bg-neutral-50 dark:bg-neutral-800/70 dark:hover:bg-neutral-800/80',
        'transition',
        themeGlassyBorder,
        'isolate',
      )}>
      <div className="flex flex-grow gap-4 self-stretch">
        <div
          className={clsx(
            'flex shrink-0 items-center justify-center',
            'size-16 rounded',
            'bg-white',
            'shadow-md',
          )}>
          <img
            alt={name}
            className="size-10"
            decoding="async"
            loading="lazy"
            src={logoUrl}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
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
          <div className="z-[1] flex flex-wrap items-center gap-x-4 gap-y-2">
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
            {isStarted && (
              <CompletionCountSummary
                completed={completionCount}
                total={questionCount}
              />
            )}
          </div>
        </div>
      </div>
      <RiArrowRightLine className="group-hover:text-brand-dark dark:group-hover:text-brand size-6 text-neutral-400 transition-colors" />
    </div>
  );
}

type Props = Readonly<{
  companyGuides: Array<InterviewsCompanyGuide>;
}>;

export default function InterviewsCompanyGuideListPage({
  companyGuides,
}: Props) {
  const intl = useIntl();
  const { data: questionListSessions } =
    trpc.questionLists.getActiveSessions.useQuery();

  const sessions = questionListSessions ?? [];

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
            defaultMessage: 'Company Guides for Front End Engineer Interviews',
            description: 'Title of company guides page',
            id: 'BvkdTb',
          })}
        </Heading>
        <Text className="block" color="secondary" size="body2">
          {intl.formatMessage({
            defaultMessage:
              'Explore front end engineering interview questions and preparation resources tailored to popular companies and ace your interviews.',
            description: 'Description for company guides page',
            id: 'hf8Jl7',
          })}
        </Text>
      </div>
      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          {companyGuides.map((companyGuide) => {
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
      </Section>
    </Container>
  );
}
