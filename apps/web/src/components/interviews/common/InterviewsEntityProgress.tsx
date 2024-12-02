import clsx from 'clsx';
import { RiBookOpenLine, RiQuestionnaireLine } from 'react-icons/ri';

import getProgressBarGradient from '~/components/interviews/common/utils';
import { FormattedMessage } from '~/components/intl';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLineEmphasizedColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  completed: number;
  entity: 'article' | 'question';
  showProgress?: boolean;
  showProgressBar?: boolean;
  title: string;
  total: number;
}>;

export default function InterviewsEntityProgress({
  total,
  completed,
  entity,
  title,
  showProgress = true,
  showProgressBar = true,
}: Props) {
  const Icon = entity === 'question' ? RiQuestionnaireLine : RiBookOpenLine;

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
      <div className="flex shrink-0 items-center gap-1.5">
        <Icon className={clsx('size-5 shrink-0', themeTextSubtleColor)} />
        <Text color="secondary" size="body3">
          {entity === 'question' ? (
            showProgress ? (
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
                defaultMessage="{totalQuestions} questions"
                description="Number of questions"
                id="J41qJW"
                values={{
                  totalQuestions: total,
                }}
              />
            )
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
      {showProgress && showProgressBar && (
        <div className="w-[114px]">
          <ProgressBar
            backgroundClass={clsx(
              'overflow-hidden',
              themeBackgroundLineEmphasizedColor,
            )}
            heightClass="h-1.5"
            label={title}
            progressClass={
              getProgressBarGradient({
                total,
                value: completed,
              }).className
            }
            total={total}
            value={completed}
          />
        </div>
      )}
    </div>
  );
}
