import clsx from 'clsx';
import type { InterviewsStudyList } from 'contentlayer/generated';
import { RiArrowRightLine } from 'react-icons/ri';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import QuestionStudyAllocationLabel from '~/components/interviews/questions/metadata/QuestionStudyAllocationLabel';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import type { QuestionTopic } from '../../common/QuestionsTypes';
import QuestionTopics from '../../metadata/QuestionTopics';

type Props = Readonly<{
  alignVerticalOnMobile?: boolean;
  backgroundClass?: string;
  completionCount?: number;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isStarted?: boolean;
  showDescription?: boolean;
  showLogoShadow?: boolean;
  showLongName?: boolean;
  showProgress?: boolean;
  showTopics?: boolean;
  studyList: InterviewsStudyList;
}>;

export default function InterviewsStudyListCard({
  completionCount = 0,
  studyList,
  icon: Icon,
  isStarted,
  showDescription = true,
  showProgress = true,
  showLogoShadow = true,
  backgroundClass = themeBackgroundCardWhiteOnLightColor,
  alignVerticalOnMobile = true,
  showLongName = false,
  showTopics = true,
}: Props) {
  const intl = useIntl();

  const {
    name,
    shortDescription,
    href,
    questionHashes,
    logoUrl,
    longName,
    schedule,
    topics,
  } = studyList;
  const questionCount = questionHashes.length;

  return (
    <div
      className={clsx(
        'group',
        'relative isolate',
        'flex flex-grow',
        alignVerticalOnMobile
          ? 'flex-col sm:flex-row sm:items-center'
          : 'flex-row items-center',
        showDescription ? 'gap-4' : 'gap-6',
        'rounded-lg',
        'px-6 py-4',
        backgroundClass,
        ['border', themeBorderElementColor],
      )}>
      {(logoUrl || Icon) && (
        <div
          className={clsx(
            'flex shrink-0 items-center justify-center',
            'size-10 rounded-lg',
            logoUrl
              ? ['bg-white', showLogoShadow && 'shadow-md']
              : [themeBackgroundLayerEmphasized, themeGlassyBorder],
          )}>
          {logoUrl ? (
            <img
              alt={name}
              className="size-6"
              decoding="async"
              loading="lazy"
              src={logoUrl}
            />
          ) : (
            Icon && <Icon className={clsx('size-6', themeTextSubtitleColor)} />
          )}
        </div>
      )}
      <div
        className={clsx(
          'flex flex-1 items-center',
          showDescription ? 'gap-4' : 'gap-6',
        )}>
        <div
          className={clsx(
            'flex flex-1 flex-col',
            showDescription ? 'gap-4' : 'gap-2',
          )}>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <Text size="body1" weight="bold">
                {showLongName ? longName : name}
              </Text>

              {isStarted && (
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
              )}
            </div>
            {showDescription && (
              <Text color="secondary" size="body2">
                {shortDescription}
              </Text>
            )}
          </div>
          <div className="z-[1] flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-10">
            <InterviewsEntityProgress
              completed={completionCount}
              showProgress={showProgress && isStarted}
              title={name}
              total={questionCount}
              type="question"
            />
            {schedule && (
              <QuestionStudyAllocationLabel
                frequency={schedule.frequency}
                hours={schedule.hours}
                showIcon={true}
              />
            )}
            {topics.length > 0 && showTopics && (
              <QuestionTopics topics={topics as ReadonlyArray<QuestionTopic>} />
            )}
          </div>
        </div>
        <RiArrowRightLine
          className={clsx(
            'size-6 shrink-0 transition-colors',
            themeTextSubtleColor,
            themeTextBrandColor_GroupHover,
          )}
        />
      </div>
      <Anchor aria-label={name} className="absolute inset-0" href={href} />
    </div>
  );
}
