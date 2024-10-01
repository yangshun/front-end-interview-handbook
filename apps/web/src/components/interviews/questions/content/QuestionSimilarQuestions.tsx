import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionMetadata } from '../common/QuestionsTypes';
import QuestionsCodingListBrief from '../listings/items/QuestionsCodingListBrief';

export default function QuestionSimilarQuestions({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-y-4">
      <Heading className="font-semibold" level="custom">
        <FormattedMessage
          defaultMessage="Similar Questions"
          description="Header for similar questions to the current question"
          id="wAOHw9"
        />
      </Heading>
      <Section>
        <QuestionsCodingListBrief questions={questions} />
      </Section>
    </div>
  );
}
