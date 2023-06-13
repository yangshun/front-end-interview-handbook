import clsx from 'clsx';
import { RiCheckLine } from 'react-icons/ri';

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
                  ? 'border-brand-dark text-brand-dark hover:border-brand hover:bg-brand-lightest hover:text-brand'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-600',
                'focus:ring-brand-dark group relative block w-full truncate border px-3 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
              )}
              type="button"
              onClick={() => section.onChange(option.value)}>
              {values.has(option.value) && (
                <span
                  aria-hidden={true}
                  className="absolute top-0 left-0 h-4 w-4">
                  <span className="border-brand-dark group-hover:border-brand absolute block h-4 w-4 border-8 !border-r-transparent !border-b-transparent transition-colors" />
                  <RiCheckLine className="absolute h-2 w-2 scale-125 text-white" />
                </span>
              )}
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
