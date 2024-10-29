import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
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
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { groupQuestionHashesByFormat } from '~/db/QuestionsUtils';

import InterviewsEntityProgress from '../common/InterviewsEntityProgress';
import CompletionCountSummary from '../questions/listings/stats/CompletionCountSummary';
import QuestionCountLabel from '../questions/metadata/QuestionCountLabel';

type Props = Readonly<{
  companyGuide: InterviewsStudyList;
  completionCount?: number;
  isStarted?: boolean;
  showProgressBar?: boolean;
}>;

// TODO(interviews): consolidate with InterviewsStudyListCard.
export function InterviewsCompanyGuideCard({
  companyGuide,
  isStarted = false,
  completionCount = 0,
  showProgressBar = true,
}: Props) {
  const intl = useIntl();
  const questionFormatLists = useQuestionUserFacingFormatData();
  const { name, href, logoUrl, questionHashes } = companyGuide;
  const questionsSlugs = groupQuestionHashesByFormat(questionHashes);

  const questionsCodingCount =
    questionsSlugs.algo.length +
    questionsSlugs.javascript.length +
    questionsSlugs['user-interface'].length;
  const questionCount =
    questionsCodingCount +
    questionsSlugs.quiz.length +
    questionsSlugs['system-design'].length;

  return (
    <div
      className={clsx(
        'group relative flex items-center gap-6',
        'rounded-lg px-6 py-4',
        'transition',
        ['border', themeBorderElementColor],
        'isolate',
        themeBackgroundCardWhiteOnLightColor,
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
            {isStarted &&
              (INTERVIEWS_REVAMP_2024 ? (
                <span>
                  <Badge
                    label={intl.formatMessage({
                      defaultMessage: 'Started',
                      description: 'Started on study plan label',
                      id: 'cKn3cK',
                    })}
                    size="sm"
                    variant="neutral"
                  />
                </span>
              ) : (
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
              ))}
          </div>
          <div className="z-[1] flex flex-wrap items-center gap-x-4 gap-y-2">
            {INTERVIEWS_REVAMP_2024 ? (
              <InterviewsEntityProgress
                completed={completionCount}
                showProgress={showProgressBar}
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
                {questionsSlugs.quiz.length > 0 && (
                  <QuestionCountLabel
                    count={questionsSlugs.quiz.length}
                    icon={questionFormatLists.quiz.icon}
                    label={questionFormatLists.quiz.longName}
                    showIcon={true}
                  />
                )}
                {questionsSlugs['system-design']?.length > 0 && (
                  <QuestionCountLabel
                    count={questionsSlugs['system-design'].length}
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
