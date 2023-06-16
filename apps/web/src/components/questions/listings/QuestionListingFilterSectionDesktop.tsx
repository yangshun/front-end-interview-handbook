import clsx from 'clsx';

import CheckboxInput from '~/components/ui/CheckboxInput';
import Text from '~/components/ui/Text';

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
        <legend>
          <Text display="block" size="body2" weight="medium">
            {section.name}
          </Text>
        </legend>
        <div className="space-y-3 pt-4">
          {section.options.map((option) => (
            <CheckboxInput
              key={option.value}
              label={option.label}
              value={values.has(option.value)}
              onChange={() => section.onChange(option.value)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
