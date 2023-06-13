import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import QuestionQuizTopicLabel from './QuestionQuizTopicLabel';
import type { QuestionQuizTopic } from './QuestionsTypes';
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
    <div className="flex items-center">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Quiz Topics"
          description="Screenreader text indicating component for quiz question topics"
          id="RWMcHN"
        />
      </span>
      {showIcon && (
        <RiBookOpenLine
          aria-hidden="true"
          className="mr-1.5 h-5 w-5 flex-shrink-0 text-neutral-400"
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
