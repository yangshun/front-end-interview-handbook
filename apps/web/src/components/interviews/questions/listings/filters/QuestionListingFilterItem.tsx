import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionFilterItemGap } from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemCheckboxes from './QuestionListingFilterItemCheckboxes';
import QuestionListingFilterItemLabel from './QuestionListingFilterItemLabel';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

export default function QuestionListingFilterItem<
  T extends string,
  Q extends QuestionMetadata,
>({
  itemGap,
  section,
  values,
  coveredValues,
}: Readonly<{
  coveredValues?: Set<T>;
  itemGap: QuestionFilterItemGap;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  // No need filter if there's only a single option.
  if (coveredValues != null && coveredValues.size <= 1) {
    return null;
  }

  const trigger = (
    <AccordionTrigger>
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
      <AccordionContent>
        <QuestionListingFilterItemCheckboxes
          coveredValues={coveredValues}
          itemGap={itemGap}
          section={section}
          values={values}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
