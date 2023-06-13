import clsx from 'clsx';

import {
  themeBackgroundEmphasizedHover,
  themeLineColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip/Tooltip';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../common/QuestionsTypes';

type Props<T extends string, Q extends QuestionMetadata> = Readonly<{
  itemsPerRow?: 2 | 3 | 4 | 5 | 6;
  limit?: number;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>;

export default function QuestionListingSquareFilterSectionDesktop<
  T extends string,
  Q extends QuestionMetadata,
>({ limit = Infinity, itemsPerRow = 4, section, values }: Props<T, Q>) {
  return (
    <fieldset>
      <legend className="sr-only">{section.name}</legend>
      <div
        className={clsx(
          'grid grid-cols-2 items-center gap-3',
          itemsPerRow === 3 && 'sm:grid-cols-3',
          itemsPerRow === 4 && 'sm:grid-cols-4',
          itemsPerRow === 5 && 'sm:grid-cols-3 xl:grid-cols-5',
          itemsPerRow === 6 && 'sm:grid-cols-3 xl:grid-cols-6',
        )}>
        {section.options.slice(0, limit).map((option) => {
          const buttonEl = (
            <button
              key={option.value}
              className={clsx(
                values.has(option.value)
                  ? clsx(
                      'border-brand-dark dark:border-brand',
                      'text-brand-dark dark:text-brand',
                      'hover:bg-brand-lightest dar hover:text-brand dark:hover:bg-neutral-800',
                    )
                  : clsx(
                      themeBackgroundEmphasizedHover,
                      themeLineColor,
                      'text-neutral-700 hover:text-neutral-600 dark:text-neutral-300',
                    ),
                'focus:ring-brand-dark group relative block w-full truncate rounded-full border px-3 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
              )}
              type="button"
              onClick={() => section.onChange(option.value)}>
              {option.label}
            </button>
          );

          if (option.tooltip != null) {
            return (
              <Tooltip
                key={option.value}
                className="block"
                label={option.tooltip}
                position="above">
                {buttonEl}
              </Tooltip>
            );
          }

          return buttonEl;
        })}
      </div>
    </fieldset>
  );
}
