import clsx from 'clsx';
import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import { themeIconColor } from '~/components/ui/theme';

import QuestionTopicLabel from './QuestionTopicLabel';
import type { QuestionTopic } from '../common/QuestionsTypes';

type Props = Readonly<{
  showIcon?: boolean;
  topics: ReadonlyArray<QuestionTopic>;
}>;

export default function QuestionTopics({ topics, showIcon = false }: Props) {
  const id = useId();

  return (
    <div className="flex items-center gap-x-1.5">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Topics"
          description="Screenreader text indicating component for question topics"
          id="D2YUXz"
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
          <QuestionTopicLabel key={topic} value={topic} />
        ))}
      </div>
    </div>
  );
}
