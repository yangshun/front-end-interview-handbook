import clsx from 'clsx';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../common/QuestionsTypes';

export default function QuestionListingFilterSectionDesktop<
  T extends string,
  Q extends QuestionMetadata,
>({
  isFirstSection = false,
  section,
  values,
}: Readonly<{
  isFirstSection?: boolean;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <div className={clsx(!isFirstSection && 'pt-6')}>
      <fieldset>
        <legend className="block text-sm font-medium text-neutral-900">
          {section.name}
        </legend>
        <div className="space-y-3 pt-4">
          {section.options.map((option, optionIdx) => (
            <div key={option.value} className="flex items-center">
              <input
                checked={values.has(option.value)}
                className="text-brand-600 focus:ring-brand-500 h-4 w-4 rounded border-neutral-200"
                id={`${section.id}-${optionIdx}`}
                name={`${section.id}[]`}
                type="checkbox"
                value={String(option.value)}
                onChange={() => section.onChange(option.value)}
              />
              <label
                className="ml-3 text-sm text-neutral-600"
                htmlFor={`${section.id}-${optionIdx}`}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
