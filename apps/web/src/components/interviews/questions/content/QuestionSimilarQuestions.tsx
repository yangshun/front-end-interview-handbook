import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { textVariants } from '~/components/ui/Text';

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
    <div className="flex flex-col gap-y-4">
      <Heading
        className={clsx(textVariants({ size: 'body1', weight: 'medium' }))}
        level="custom">
        <FormattedMessage
          defaultMessage="Similar questions"
          description="Header for similar questions to the current question"
          id="TVrovv"
        />
      </Heading>
      <Section>
        <QuestionsCodingListBrief questions={questions} />
      </Section>
    </div>
  );
}
