import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion/Accordion';
import { textVariants } from '~/components/ui/Text';

import type { QuestionMetadata } from '../common/QuestionsTypes';
import QuestionsCodingListBrief from '../listings/items/QuestionsCodingListBrief';

export default function QuestionNextQuestions({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <Accordion collapsible={true} type="single">
      <AccordionItem value="next-questions">
        <AccordionTrigger
          className={clsx(
            textVariants({ color: 'subtitle', size: 'body2', weight: 'medium' }),
            '!py-3',
          )}>
          <FormattedMessage
            defaultMessage="Try these questions next"
            description="Text above suggested questions to indicate to the user that they can try those questions next"
            id="7HLv+l"
          />
        </AccordionTrigger>
        <AccordionContent>
          <QuestionsCodingListBrief questions={questions} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
