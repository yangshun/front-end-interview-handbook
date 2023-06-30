import clsx from 'clsx';
import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { themeIconColor } from '~/components/ui/theme';

import QuestionQuizTopicLabel from './QuestionQuizTopicLabel';
import type { QuestionQuizTopic } from '../common/QuestionsTypes';

type Props = Readonly<{
  showIcon?: boolean;
  topics: ReadonlyArray<QuestionQuizTopic>;
}>;

export default function QuestionQuizTopics({
  topics,
  showIcon = false,
}: Props) {
  const id = useId();

  return (
    <div className="flex items-center gap-x-1.5">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Quiz topics"
          description="Screenreader text indicating component for quiz question topics"
          id="vzcdoW"
        />
      </span>
      {showIcon && (
        <RiBookOpenLine
          aria-hidden="true"
          className={clsx('h-5 w-5 flex-shrink-0', themeIconColor)}
        />
      )}
      <div
        aria-labelledby={id}
        className="inline-flex flex-wrap items-center gap-2">
        {topics.map((topic) => (
          <QuestionQuizTopicLabel key={topic} value={topic} />
        ))}
      </div>
    </div>
  );
}
