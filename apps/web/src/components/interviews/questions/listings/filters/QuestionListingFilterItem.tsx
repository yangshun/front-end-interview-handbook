import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';

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
}: Readonly<{
  itemGap: QuestionFilterItemGap;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <AccordionItem value={section.id}>
      <AccordionTrigger>
        <QuestionListingFilterItemLabel
          label={section.name}
          tooltip={section.tooltip}
        />
      </AccordionTrigger>
      <AccordionContent>
        <QuestionListingFilterItemCheckboxes
          itemGap={itemGap}
          section={section}
          values={values}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
