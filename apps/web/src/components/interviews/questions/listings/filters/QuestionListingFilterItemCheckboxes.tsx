import clsx from 'clsx';
import { RiInformationLine } from 'react-icons/ri';

import CheckboxInput from '~/components/ui/CheckboxInput';
import { themeIconColor, themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { QuestionFilter } from './QuestionFilterType';
import type { QuestionMetadata } from '../../common/QuestionsTypes';

export default function QuestionListingFilterItemCheckboxes<
  T extends string,
  Q extends QuestionMetadata,
>({
  coveredValues,
  section,
  values,
}: Readonly<{
  coveredValues?: Set<T>;
  section: QuestionFilter<T, Q>;
  values: Set<T>;
}>) {
  return (
    <div className={clsx('flex flex-wrap', 'gap-x-8 gap-y-4')}>
      {section.options
        .filter((option) =>
          coveredValues == null ? true : coveredValues?.has(option.value),
        )
        .map((option) => (
          <div key={option.value} className="flex items-center gap-2">
            <CheckboxInput
              label={
                option.icon ? (
                  <div className="flex items-center gap-2">
                    <option.icon
                      className={clsx('size-4 shrink-0', themeIconColor)}
                    />
                    {option.label}
                  </div>
                ) : (
                  option.label
                )
              }
              value={values.has(option.value)}
              onChange={() => section.onChange(option.value)}
            />
            {option.tooltip && (
              <Tooltip label={option.tooltip}>
                <RiInformationLine
                  className={clsx('size-4 shrink-0', themeTextSubtleColor)}
                />
              </Tooltip>
            )}
          </div>
        ))}
    </div>
  );
}
