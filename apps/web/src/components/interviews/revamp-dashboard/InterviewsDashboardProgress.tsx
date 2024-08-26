import clsx from 'clsx';
import { RiBookOpenLine, RiQuestionnaireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLineEmphasizedColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  completed: number;
  progressClassName: string;
  title: string;
  total: number;
  type: 'article' | 'question';
}>;

export default function InterviewsDashboardProgress({
  total,
  completed,
  type,
  title,
  progressClassName,
}: Props) {
  const Icon = type === 'question' ? RiQuestionnaireLine : RiBookOpenLine;

  return (
    <div className="flex items-center gap-2">
      <div className="flex shrink-0 items-center gap-1.5">
        <Icon className={clsx('size-5 shrink-0', themeTextSubtleColor)} />
        <Text color="secondary" size="body3">
          {type === 'question' ? (
            <FormattedMessage
              defaultMessage="<bold>{completedQuestions}</bold>/{totalQuestions} questions"
              description="Line describing the number of questions completed by user over the total number of questions"
              id="9115HX"
              values={{
                bold: (chunks) => (
                  <Text size="body2" weight="bold">
                    {chunks}
                  </Text>
                ),
                completedQuestions: completed,
                totalQuestions: total,
              }}
            />
          ) : (
            <FormattedMessage
              defaultMessage="<bold>{completedArticles}</bold>/{totalArticles} articles"
              description="Line describing the number of articles completed by user over the total number of articles"
              id="A7IkHe"
              values={{
                bold: (chunks) => (
                  <Text size="body2" weight="bold">
                    {chunks}
                  </Text>
                ),
                completedArticles: completed,
                totalArticles: total,
              }}
            />
          )}
        </Text>
      </div>
      <div className="w-[114px]">
        <ProgressBar
          backgroundClass={clsx(
            'overflow-hidden',
            themeBackgroundLineEmphasizedColor,
          )}
          label={title}
          progressClass={progressClassName}
          total={total}
          value={completed}
        />
      </div>
    </div>
  );
}
