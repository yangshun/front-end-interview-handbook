import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

import { Disclosure } from '@headlessui/react';

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
    <Disclosure
      key={section.name}
      as="div"
      className={clsx('py-5')}
      defaultOpen={defaultOpen ?? values.size > 0}>
      {({ open }) => (
        <fieldset>
          <legend className="w-full">
            <Disclosure.Button
              className={clsx(
                'flex w-full items-center justify-between',
                'text-neutral-400 hover:text-neutral-500 dark:text-neutral-600',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset',
                'focus-visible:ring-brand-dark dark:focus-visible:ring-brand',
              )}>
              <Text size="body2" weight="medium">
                {section.name}
              </Text>
              <span className="ml-6 flex h-7 items-center pr-2">
                <RiArrowDownSLine
                  aria-hidden="true"
                  className={clsx(
                    open ? '-rotate-180' : 'rotate-0',
                    'size-5 transform',
                  )}
                />
              </span>
            </Disclosure.Button>
          </legend>
          <Disclosure.Panel className="pb-2 pt-4">
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
