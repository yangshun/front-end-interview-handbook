import clsx from 'clsx';
import type { InterviewsCompanyGuide } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';

import { INTERVIEWS_REVAMP_2024 } from '~/data/FeatureFlags';
import { useQuestionUserFacingFormatData } from '~/data/QuestionFormats';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeGradientGreenYellow,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import InterviewsEntityProgress from '../common/InterviewsEntityProgress';
import CompletionCountSummary from '../questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '../questions/metadata/QuestionCountLabel';

type Props = Readonly<{
  companyGuide: InterviewsCompanyGuide;
  completionCount?: number;
  isStarted?: boolean;
}>;

export function InterviewsCompanyGuideCard({
  companyGuide,
  isStarted = false,
  completionCount = 0,
}: Props) {
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
            <Text size="body0" weight="bold">
              {name}
            </Text>
            {isStarted && !INTERVIEWS_REVAMP_2024 && (
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
              <InterviewsEntityProgress
                completed={completionCount}
                progressClassName={themeGradientGreenYellow.className}
                showProgress={isStarted ?? false}
                title={name}
                total={questionCount}
                type="question"
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
                {isStarted && (
                  <CompletionCountSummary
                    completed={completionCount}
                    total={questionCount}
                  />
                )}
              </>
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
      <Anchor aria-label={name} className="absolute inset-0" href={href} />
    </div>
  );
}
