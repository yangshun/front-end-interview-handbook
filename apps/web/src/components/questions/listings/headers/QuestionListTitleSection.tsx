import clsx from 'clsx';

import QuestionProgressLabel from '~/components/questions/common/QuestionsProgressLabel';
import Heading from '~/components/ui/Heading';

import QuestionCountLabel from '../../common/QuestionCountLabel';
import QuestionDurationLabel from '../../common/QuestionDurationLabel';

type Props = Readonly<{
  completedCount?: number;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  questionCount: number;
  themeBackgroundClass: string;
  title: string;
  totalDurationMins: number;
}>;

export default function QuestionListTitleSection({
  questionCount,
  completedCount = 0,
  totalDurationMins,
  icon: Icon,
  themeBackgroundClass,
  title,
}: Props) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-x-6">
        <div
          className={clsx(
            'inline-flex h-16 w-16 items-center justify-center rounded-lg text-white',
            themeBackgroundClass,
          )}>
          <Icon aria-hidden={true} className="h-10 w-10" />
        </div>
        <div className="flex flex-col gap-y-2">
          <Heading level="heading5">{title}</Heading>
          <div className="flex flex-wrap items-center gap-x-8">
            <QuestionCountLabel count={questionCount} showIcon={true} />
            <QuestionDurationLabel mins={totalDurationMins} showIcon={true} />
            <div className="flex items-center sm:w-[280px]">
              <QuestionProgressLabel
                barClassName={themeBackgroundClass}
                completed={completedCount}
                total={questionCount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
