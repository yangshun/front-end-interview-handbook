import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import InterviewsEntityProgress from '~/components/interviews/common/InterviewsEntityProgress';
import useQuestionTopicLabels from '~/components/interviews/questions/listings/filters/useQuestionTopicLabels';
import Badge from '~/components/ui/Badge';
import { themeGradientGreenYellow } from '~/components/ui/theme';

import InterviewsDashboardPracticeCard from '../InterviewsDashboardPracticeCard';
import type { InterviewsDashboardPracticeQuestionsType } from '../../types';

type Props = Readonly<{
  data: InterviewsDashboardPracticeQuestionsType;
}>;

const MAX_TOPIC = 4;

export default function InterviewsDashboardPracticeQuestionsCard({
  data,
}: Props) {
  const id = useId();
  const intl = useIntl();
  const topicLabels = useQuestionTopicLabels();
  const { description, href, icon, title, question, article, topics } = data;

  return (
    <InterviewsDashboardPracticeCard
      description={description}
      href={href}
      icon={icon}
      title={title}>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        {question && (
          <InterviewsEntityProgress
            completed={question.completed}
            progressClassName={themeGradientGreenYellow.className}
            title={title}
            total={question.total}
            type="question"
          />
        )}
        {article && (
          <InterviewsEntityProgress
            completed={article.completed}
            progressClassName={themeGradientGreenYellow.className}
            title={title}
            total={article.total}
            type="article"
          />
        )}
        {topics && (
          <>
            <span className="sr-only" id={id}>
              <FormattedMessage
                defaultMessage="Question topics"
                description="Screenreader text to indicate the question topics"
                id="PtAdqY"
              />
            </span>
            <div
              aria-labelledby={id}
              className="flex flex-wrap gap-x-2 gap-y-1">
              {topics.slice(0, MAX_TOPIC).map((topic) => (
                <Badge
                  key={topic}
                  label={`#${topicLabels[topic].label}`}
                  size="sm"
                  variant="neutral"
                />
              ))}
              {topics.length > MAX_TOPIC && (
                <Badge
                  label={intl.formatMessage(
                    {
                      defaultMessage: '+{count} more',
                      description: 'Badge label for more topics',
                      id: 'sg/5hy',
                    },
                    {
                      count: topics.length - MAX_TOPIC,
                    },
                  )}
                  size="sm"
                  variant="neutral"
                />
              )}
            </div>
          </>
        )}
      </div>
    </InterviewsDashboardPracticeCard>
  );
}
