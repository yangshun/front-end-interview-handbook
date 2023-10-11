import type { ForwardedRef } from 'react';
import { forwardRef } from 'react';
import { useIntl } from 'react-intl';

import Select from '~/components/ui/Select';

import type { QuestionCodingWorkingLanguage } from '../../questions/common/QuestionsTypes';

const options: ReadonlyArray<{
  label: string;
  value: QuestionCodingWorkingLanguage;
}> = [
  {
    label: 'JavaScript',
    value: 'js',
  },
  {
    label: 'TypeScript',
    value: 'ts',
  },
];

type Props = Readonly<{
  onChange: (language: QuestionCodingWorkingLanguage) => void;
  value: QuestionCodingWorkingLanguage;
}>;

function JavaScriptCodingWorkspaceWorkingLanguageSelect(
  { value, onChange }: Props,
  ref?: ForwardedRef<HTMLSelectElement>,
) {
  const intl = useIntl();

  return (
    <Select
      ref={ref}
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Question Language',
        description: 'Coding question language',
        id: 'IXT5w0',
      })}
      options={options}
      size="xs"
      value={value}
      onChange={(newValue) => {
        onChange(newValue);
      }}
    />
  );
}

export default forwardRef(JavaScriptCodingWorkspaceWorkingLanguageSelect);
