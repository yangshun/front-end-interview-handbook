import clsx from 'clsx';

import type { QuestionFilter } from './QuestionFilterType';

import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function QuestionFilterSectionMobile<T extends string>({
  section,
  values,
}: Readonly<{
  section: QuestionFilter<T>;
  values: Set<T>;
}>) {
  return (
    <Disclosure
      key={section.name}
      as="div"
      className="border-t border-slate-200 pt-4 pb-4">
      {({ open }) => (
        <fieldset>
          <legend className="w-full px-2">
            <Disclosure.Button className="focus:ring-brand-500 flex w-full items-center justify-between p-2 text-slate-400 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-inset">
              <span className="text-sm font-medium text-slate-900">
                {section.name}
              </span>
              <span className="ml-6 flex h-7 items-center">
                <ChevronDownIcon
                  aria-hidden="true"
                  className={clsx(
                    open ? '-rotate-180' : 'rotate-0',
                    'h-5 w-5 transform',
                  )}
                />
              </span>
            </Disclosure.Button>
          </legend>
          <Disclosure.Panel className="px-4 pt-4 pb-2">
            <div className="space-y-6">
              {section.options.map((option, optionIdx) => (
                <div key={option.value} className="flex items-center">
                  <input
                    checked={values.has(option.value)}
                    className="text-brand-600 focus:ring-brand-500 h-4 w-4 rounded border-slate-200"
                    id={`${section.id}-${optionIdx}-mobile`}
                    name={`${section.id}[]`}
                    type="checkbox"
                    value={String(option.value)}
                    onChange={() => section.onChange(option.value)}
                  />
                  <label
                    className="ml-3 text-sm text-slate-500"
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
