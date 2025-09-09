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

export default function QuestionSimilarQuestions({
  questions,
}: Readonly<{
  questions: ReadonlyArray<QuestionMetadata>;
}>) {
  if (questions.length === 0) {
    return null;
  }

  return (
    <Accordion collapsible={true} type="single">
      <AccordionItem value="similar-questions">
        <AccordionTrigger
          className={clsx(
            textVariants({
              color: 'subtitle',
              size: 'body2',
              weight: 'medium',
            }),
            '!py-3',
          )}>
          <FormattedMessage
            defaultMessage="Similar questions"
            description="Header for similar questions to the current question"
            id="TVrovv"
          />
        </AccordionTrigger>
        <AccordionContent>
          <QuestionsCodingListBrief questions={questions} />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
