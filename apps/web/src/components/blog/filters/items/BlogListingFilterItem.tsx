import clsx from 'clsx';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import type { BlogFilter } from '~/components/blog/filters/BlogFilterType';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';

export type FilterItemGap = 'compact' | 'spacious';

const itemGapClasses: Record<FilterItemGap, string> = {
  compact: 'gap-x-4 gap-y-3',
  spacious: 'gap-6',
};

export default function BlogListingFilterItem<
  T extends string,
  Q extends BlogMetadata,
>({
  itemGap,
  section,
  values,
}: Readonly<{
  itemGap: FilterItemGap;
  section: BlogFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <AccordionItem value={section.id}>
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
  );
}
