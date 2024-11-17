import clsx from 'clsx';
import { useId } from 'react';
import { RiBookOpenLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import { themeIconColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import QuestionTopicLabel from './QuestionTopicLabel';
import type { QuestionTopic } from '../common/QuestionsTypes';

type Props = Readonly<{
  showIcon?: boolean;
  topics: ReadonlyArray<QuestionTopic>;
}>;

export default function QuestionTopics({ topics, showIcon = false }: Props) {
  const id = useId();
  const intl = useIntl();
  const label = intl.formatMessage({
    defaultMessage: 'Topics',
    description: 'Technical topics relevant to the question',
    id: 'r5tcl0',
  });

  return (
    <Tooltip asChild={true} label={label}>
      <div className="flex items-center gap-x-1.5">
        <span className="sr-only" id={id}>
          {label}
        </span>
        {showIcon && (
          <RiBookOpenLine
            aria-hidden="true"
            className={clsx('size-5 shrink-0', themeIconColor)}
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
    </Tooltip>
  );
}
