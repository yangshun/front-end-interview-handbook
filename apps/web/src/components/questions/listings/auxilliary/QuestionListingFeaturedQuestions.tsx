import clsx from 'clsx';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import QuestionCard from './QuestionCard';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props = Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
  title: string;
}>;

export default function QuestionListingFeaturedQuestions({
  title,
  questions,
}: Props) {
  return (
    <div className="grid gap-y-4">
      <Heading level="heading6">{title}</Heading>
      <Section>
        <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {questions.map((metadata, index) => (
            <div
              key={metadata.href}
              className={clsx(index >= 2 && 'hidden xl:block')}>
              <QuestionCard metadata={metadata} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
