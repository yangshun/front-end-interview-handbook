import { FormattedMessage } from 'react-intl';

import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import type { QuestionMetadata } from '../common/QuestionsTypes';
import QuestionsCodingListBrief from '../listings/QuestionsCodingListBrief';

export default function QuestionNextQuestions({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  return (
    <div className="grid gap-y-4">
      <Heading className="font-semibold" level="custom">
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
