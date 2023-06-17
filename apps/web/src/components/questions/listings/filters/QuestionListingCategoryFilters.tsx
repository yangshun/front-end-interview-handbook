import clsx from 'clsx';

import {
  themeBackgroundEmphasizedHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip/Tooltip';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

type Props<T extends string, Q extends QuestionMetadata> = Readonly<{
  limit?: number;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>;

export default function QuestionListingCategoryFilters<
  T extends string,
  Q extends QuestionMetadata,
>({ limit = Infinity, section, values }: Props<T, Q>) {
  return (
    <fieldset>
      <legend className="sr-only">{section.name}</legend>
      <div className={clsx('flex flex-wrap items-center gap-2')}>
        {section.options.slice(0, limit).map(({ icon: Icon, ...option }) => {
          const buttonEl = (
            <button
              key={option.value}
              className={clsx(
                values.has(option.value)
                  ? clsx(
                      'border-brand-dark dark:border-brand',
                      'text-brand-dark dark:text-brand font-semibold',
                      'bg-brand-lightest dark:bg-neutral-800',
                      'hover:text-brand dark:hover:bg-neutral-800',
                    )
                  : clsx(
                      themeBackgroundEmphasizedHover,
                      themeTextSubtleColor,
                      'border-transparent',
                      'bg-neutral-100 dark:bg-neutral-900',
                      'hover:text-brand-dark dark:hover:text-brand',
                    ),
                'focus:ring-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2',
                'dark:focus:ring-offset-neutral-950 focus:ring-offset-white',
                'group relative flex items-center justify-center gap-2 truncate rounded-full border px-3 py-2 text-xs font-medium transition-colors',
              )}
              type="button"
              onClick={() => section.onChange(option.value)}>
              {Icon && <Icon className="h-4 w-4" />}
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
