import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import { textVariants } from '~/components/ui/Text';

import type { InterviewsQuestionItemMinimal } from '../common/QuestionsTypes';
import QuestionsCodingListBrief from '../listings/items/QuestionsCodingListBrief';

export default function QuestionNextQuestions({
  questions,
}: Readonly<{
  questions: ReadonlyArray<InterviewsQuestionItemMinimal>;
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
          defaultMessage="Try these questions next"
          description="Text above suggested questions to indicate to the user that they can try those questions next"
          id="7HLv+l"
        />
      </Heading>
      <Section>
        <QuestionsCodingListBrief questions={questions} />
      </Section>
    </div>
  );
}
