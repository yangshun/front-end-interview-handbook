import clsx from 'clsx';

import type { TextSize } from '~/components/ui/Text';

import type { InterviewsQuestionMetadata } from '../common/QuestionsTypes';
import QuestionAuthor from './QuestionAuthor';
import QuestionDifficultyLabel from './QuestionDifficultyLabel';
import QuestionDurationLabel from './QuestionDurationLabel';
import QuestionImportanceLabel from './QuestionImportanceLabel';
import QuestionLanguages from './QuestionLanguages';
import QuestionTopics from './QuestionTopics';
import QuestionUsersCompletedLabelWithFetching from './QuestionUsersCompletedLabelWithFetching';

type MetadataElement =
  | 'author'
  | 'difficulty'
  | 'duration'
  | 'importance'
  | 'languages'
  | 'topics'
  | 'users_completed';

type Props = Readonly<{
  className?: string;
  elements?: ReadonlyArray<MetadataElement>;
  justify?: 'center' | 'start';
  metadata: InterviewsQuestionMetadata;
  size?: TextSize;
}>;

const DEFAULT_ELEMENTS: ReadonlyArray<MetadataElement> = [
  'author',
  'languages',
  'difficulty',
  'duration',
  'users_completed',
];

export default function QuestionMetadataSection({
  className,
  elements = DEFAULT_ELEMENTS,
  justify = 'start',
  metadata,
  size = 'body3',
}: Props) {
  return (
    <section
      className={clsx(
        'flex flex-wrap items-center',
        justify === 'start' && 'justify-start',
        justify === 'center' && 'justify-center',
        'gap-x-6 gap-y-4',
        className,
      )}>
      {elements.includes('author') && metadata.author && (
        <QuestionAuthor author={metadata.author} size={size} />
      )}
      {elements.includes('languages') &&
        metadata.languages &&
        metadata.languages.length > 0 && (
          <QuestionLanguages languages={metadata.languages} showIcon={true} />
        )}
      {elements.includes('importance') && metadata.importance && (
        <QuestionImportanceLabel showIcon={true} value={metadata.importance} />
      )}
      {elements.includes('difficulty') && metadata.difficulty && (
        <QuestionDifficultyLabel
          showIcon={true}
          size={size}
          value={metadata.difficulty}
        />
      )}
      {elements.includes('topics') &&
        metadata.topics &&
        metadata.topics.length > 0 && (
          <QuestionTopics topics={metadata.topics} />
        )}
      {elements.includes('duration') && metadata.duration && (
        <QuestionDurationLabel
          mins={metadata.duration}
          showIcon={true}
          size={size}
        />
      )}
      {elements.includes('users_completed') && metadata.duration && (
        <QuestionUsersCompletedLabelWithFetching
          metadata={metadata}
          showIcon={true}
        />
      )}
    </section>
  );
}
