import clsx from 'clsx';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

export type FilterItemGap = 'compact' | 'spacious';

const itemGapClasses: Record<FilterItemGap, string> = {
  compact: 'gap-x-4 gap-y-3',
  spacious: 'gap-6',
};

export default function QuestionListingFilterItem<
  T extends string,
  Q extends QuestionMetadata,
>({
  defaultOpen,
  itemGap,
  section,
  values,
}: Readonly<{
  defaultOpen?: boolean;
  itemGap: FilterItemGap;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <Accordion
      defaultValue={
        defaultOpen ? section.options.map((option) => option.value) : []
      }
      type="multiple">
      <AccordionItem value={section.name}>
        <AccordionTrigger>
          <Text size="body2" weight="medium">
            {section.name}
          </Text>
        </AccordionTrigger>
        <AccordionContent>
          <div className={clsx('flex flex-wrap', itemGapClasses[itemGap])}>
            {section.options.map((option) => (
              <div key={option.value} className="flex items-center">
                <CheckboxInput
                  label={option.label}
                  value={values.has(option.value)}
                  onChange={() => section.onChange(option.value)}
                />
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
