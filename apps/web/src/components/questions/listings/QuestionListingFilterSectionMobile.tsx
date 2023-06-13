import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';

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
      className="border-t border-neutral-200 pt-4 pb-4">
      {({ open }) => (
        <fieldset>
          <legend className="w-full">
            <Disclosure.Button className="focus:ring-brand flex w-full items-center justify-between text-neutral-400 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset">
              <span className="text-sm font-medium text-neutral-900">
                {section.name}
              </span>
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
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    checked={values.has(option.value)}
                    className="text-brand-dark focus:ring-brand h-4 w-4 rounded border-neutral-200"
                    id={`${section.id}-${optionIdx}-mobile`}
                    name={`${section.id}[]`}
                    type="checkbox"
                    value={String(option.value)}
                    onChange={() => section.onChange(option.value)}
                  />
                  <label
                    className="ml-3 text-sm text-neutral-500"
                    htmlFor={`${section.id}-${optionIdx}-mobile`}>
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </Disclosure.Panel>
        </fieldset>
      )}
    </Disclosure>
  );
}
