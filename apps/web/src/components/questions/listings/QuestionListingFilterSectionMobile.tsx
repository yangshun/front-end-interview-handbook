import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';
import { themeLineColor } from '~/components/ui/theme';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../common/QuestionsTypes';

import { Disclosure } from '@headlessui/react';

export default function QuestionFilterSectionMobile<
  T extends string,
  Q extends QuestionMetadata,
>({
  section,
  values,
}: Readonly<{
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <Disclosure
      key={section.name}
      as="div"
      className={clsx('border-t pt-4 pb-4', themeLineColor)}>
      {({ open }) => (
        <fieldset>
          <legend className="w-full">
            <Disclosure.Button
              className={clsx(
                'focus:ring-brand flex w-full items-center justify-between focus:outline-none focus:ring-2 focus:ring-inset',
                'text-neutral-400 hover:text-neutral-500 dark:text-neutral-600',
              )}>
              <Text variant="body2" weight="medium">
                {section.name}
              </Text>
              <span className="ml-6 flex h-7 items-center">
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
            <div className="space-y-6">
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
