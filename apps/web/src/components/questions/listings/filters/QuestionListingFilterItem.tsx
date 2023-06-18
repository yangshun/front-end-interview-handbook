import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

import { Disclosure } from '@headlessui/react';

export type FilterItemGap = 'compact' | 'spacious';

const itemGapClasses: Record<FilterItemGap, string> = {
  compact: 'gap-3',
  spacious: 'gap-6',
};

export default function QuestionListingFilterItem<
  T extends string,
  Q extends QuestionMetadata,
>({
  itemGap,
  section,
  values,
}: Readonly<{
  itemGap: FilterItemGap;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <Disclosure
      key={section.name}
      as="div"
      className={clsx('py-5')}
      defaultOpen={values.size > 0}>
      {({ open }) => (
        <fieldset>
          <legend className="w-full">
            <Disclosure.Button
              className={clsx(
                'focus:ring-brand flex w-full items-center justify-between focus:outline-none focus:ring-2 focus:ring-inset',
                'text-neutral-400 hover:text-neutral-500 dark:text-neutral-600',
              )}>
              <Text size="body2" weight="medium">
                {section.name}
              </Text>
              <span className="ml-6 flex h-7 items-center pr-2">
                <RiArrowDownSLine
                  aria-hidden="true"
                  className={clsx(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-5 w-5 transform',
                  )}
                />
              </span>
            </Disclosure.Button>
          </legend>
          <Disclosure.Panel className="pt-4 pb-2">
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
          </Disclosure.Panel>
        </fieldset>
      )}
    </Disclosure>
  );
}
