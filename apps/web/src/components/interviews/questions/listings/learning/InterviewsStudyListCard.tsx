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

type Props = Readonly<{
  completionCount?: number;
  icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
  isStarted?: boolean;
  metadata: InterviewsStudyList;
}>;

export default function InterviewsStudyListCard({
  completionCount = 0,
  metadata,
  icon: Icon,
  isStarted,
}: Props) {
  const intl = useIntl();

  const { name, shortDescription, href } = metadata;
  const questionCount =
    (metadata.questionsAlgo?.length ?? 0) +
    (metadata.questionsJavaScript?.length ?? 0) +
    (metadata.questionsQuiz?.length ?? 0) +
    (metadata.questionsSystemDesign?.length ?? 0) +
    (metadata.questionsUserInterface?.length ?? 0);

  return (
    <div
      className={clsx(
        'group',
        'relative isolate',
        'flex flex-grow items-center gap-2 md:gap-6',
        'rounded-lg',
        'px-6 py-5',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
      )}>
      <div className="flex flex-1 flex-col gap-6 md:flex-row md:items-center">
        {Icon && (
          <div
            className={clsx(
              'flex items-center justify-center',
              'size-12 shrink-0',
              'rounded-md',
              themeBackgroundLayerEmphasized,
              themeGlassyBorder,
            )}>
            <Icon className={clsx('size-6', themeTextSubtitleColor)} />
          </div>
        )}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-3">
              <Text size="body0" weight="bold">
                {name}
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
            <Text color="secondary" size="body2">
              {shortDescription}
            </Text>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 md:gap-x-10">
            <InterviewsEntityProgress
              completed={completionCount}
              title={name}
              total={questionCount}
              type="question"
            />
            {metadata.schedule && (
              <QuestionStudyAllocationLabel
                frequency={metadata.schedule.frequency}
                hours={metadata.schedule.hours}
                showIcon={true}
              />
            )}
          </div>
        </div>
      </div>
      <RiArrowRightLine
        className={clsx(
          'size-6 shrink-0 transition-colors',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
      <Anchor aria-label={name} className="absolute inset-0" href={href} />
    </div>
  );
}