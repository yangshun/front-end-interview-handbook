import type { TextVariant } from '~/components/ui/Text';

import QuestionAuthor from './QuestionAuthor';
import QuestionDifficultyLabel from './QuestionDifficultyLabel';
import QuestionDurationLabel from './QuestionDurationLabel';
import QuestionLanguages from './QuestionLanguages';
import type { QuestionMetadata } from './QuestionsTypes';

type Props = Readonly<{
  metadata: QuestionMetadata;
  showAuthor?: boolean;
  variant?: TextVariant;
}>;

export default function QuestionMetadataSection({
  metadata,
  showAuthor = true,
  variant = 'body3',
}: Props) {
  return (
    <section className="flex items-center space-x-6">
      {showAuthor && metadata.author && (
        <QuestionAuthor author={metadata.author} variant={variant} />
      )}
      {metadata.languages && metadata.languages.length > 0 && (
        <QuestionLanguages
          languages={metadata.languages}
          showIcon={true}
          variant={variant}
        />
      )}
      {metadata.difficulty && (
        <QuestionDifficultyLabel
          showIcon={true}
          value={metadata.difficulty}
          variant={variant}
        />
      )}
      {metadata.duration && (
        <QuestionDurationLabel
          mins={metadata.duration}
          showIcon={true}
          variant={variant}
        />
      )}
    </section>
  );
}
