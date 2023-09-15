import { useIntl } from 'react-intl';

import Select from '~/components/ui/Select';

import type { QuestionCodingWorkingLanguage } from '../common/QuestionsTypes';

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

export default function QuestionCodingWorkingLanguageSelect({
  value,
  onChange,
}: Props) {
  const intl = useIntl();

  return (
    <Select
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
