import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import {
  type FocusArea,
  getFocusAreaTheme,
} from '~/data/focus-areas/FocusAreas';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeGlassyBorder,
  themeTextBrandColor_GroupHover,
  themeTextSubtitleColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { countNumberOfQuestionsInList } from '~/db/QuestionsUtils';

type Props = Readonly<{
  area: FocusArea;
  completionCount?: number;
  isStarted: boolean;
}>;

export default function InterviewsFocusAreasCard({
  completionCount = 0,
  isStarted,
  area: { type, name, shortDescription, questions, href },
}: Props) {
  const theme = getFocusAreaTheme(type);
  const questionCount = countNumberOfQuestionsInList(questions);
  const { iconOutline: Icon, gradient } = theme;

  return (
    <div
      className={clsx(
        'group relative flex flex-1 items-center gap-x-8 md:gap-x-6 ',
        'rounded-lg px-6 py-5',
        'transition',
        'bg-neutral-200/40 dark:bg-neutral-800/40',
        ['border', themeBorderElementColor],
        'isolate',
      )}>
      <div className="flex flex-grow flex-col gap-6 md:flex-row md:items-center">
        <div
          className={clsx(
            'flex items-center justify-center',
            'rounded-md',
            'size-12 shrink-0',
            themeBackgroundLayerEmphasized,
            themeGlassyBorder,
          )}>
          <Icon className={clsx('size-6', themeTextSubtitleColor)} />
        </div>
        <div className="flex flex-1 flex-col gap-5">
          <div className="flex flex-1 flex-col gap-1">
            <Anchor className="flex-1" href={href} variant="unstyled">
              <span aria-hidden={true} className="absolute inset-0" />
              <Text size="body1" weight="medium">
                {name}
              </Text>
            </Anchor>

            <Text color="secondary" size="body2">
              {shortDescription}
            </Text>
          </div>
          <InterviewsEntityProgress
            completed={completionCount}
            progressClassName={gradient.className}
            showProgress={isStarted ?? false}
            title={name}
            total={questionCount}
            type="question"
          />
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
  );
}
