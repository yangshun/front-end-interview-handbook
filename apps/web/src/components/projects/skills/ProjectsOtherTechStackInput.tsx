import { useState } from 'react';
import { RiAddLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import ProjectsSkillChip from './ProjectsSkillChip';

type Props = Readonly<{
  onChange: (value: Array<string>) => void;
  value: Array<string>;
}>;

export default function ProjectsOtherTechStackInput({
  value,
  onChange,
}: Props) {
  const intl = useIntl();

  const [inputValue, setInputValue] = useState('');

  return (
    <div className="flex flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChange([...value, inputValue]);
          setInputValue('');
        }}>
        <TextInput
          autoComplete="off"
          classNameOuter="mt-6"
          description={intl.formatMessage({
            defaultMessage: 'Separate each tech stack with a comma',
            description: 'Description for "Other tech stack used" text input',
            id: 'ZDZiwj',
          })}
          endIcon={RiAddLine}
          isDescriptionCollapsed={true}
          label={intl.formatMessage({
            defaultMessage:
              'Other tech stack used (not covered in skills tree)',
            description: 'Label for "Other tech stack used" text input',
            id: 'qCCbPu',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Tech stack',
            description: 'Placeholder for "Other tech stack used" text input',
            id: 'jvi6yy',
          })}
          value={inputValue}
          onChange={setInputValue}
        />
      </form>
      <div className="mt-4 flex gap-3">
        {value.map((techStack) => (
          <ProjectsSkillChip
            key={techStack}
            isEditable={true}
            skill={{
              key: techStack,
              label: techStack,
            }}
            onDelete={() => {
              onChange(value.filter((skill) => skill !== techStack));
            }}
          />
        ))}
      </div>
    </div>
  );
}
