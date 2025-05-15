import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Tooltip from '~/components/ui/Tooltip';

import type { InterviewsQuestionItemMinimal } from '../../common/QuestionsTypes';
import type { QuestionFilter } from './QuestionFilterType';
import QuestionListingFilterItemCheckboxes from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemLabel from './QuestionListingFilterItemLabel';

export default function QuestionListingFilterItem<
  T extends string,
  Q extends InterviewsQuestionItemMinimal,
>({
  section,
  values,
  coveredValues,
}: Readonly<{
  coveredValues?: Set<T>;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  // No need filter if there's only a single option.
  if (coveredValues != null && coveredValues.size <= 1) {
    return null;
  }

  const trigger = (
    <AccordionTrigger className="pb-5 pt-6">
      <QuestionListingFilterItemLabel
        label={section.name}
        showInfoIcon={section.tooltip != null}
      />
    </AccordionTrigger>
  );

  return (
    <AccordionItem value={section.id}>
      {section.tooltip ? (
        <Tooltip asChild={true} label={section.tooltip}>
          {trigger}
        </Tooltip>
      ) : (
        trigger
      )}
      <AccordionContent className="pb-6">
        <QuestionListingFilterItemCheckboxes
          coveredValues={coveredValues}
          section={section}
          values={values}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
