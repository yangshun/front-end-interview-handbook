import Typeahead from '~/components/ui/Typeahead';

import {
  ProjectsSkillArrayToTypeaheadValues,
  ProjectsSkillTypeaheadOptions,
  ProjectsSkillTypeaheadValuesToArray,
} from '../data/ProjectsSkillListData';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  label: string;
  onChange: (value: ReadonlyArray<ProjectsSkillKey> | null) => void;
  placeholder?: string;
  required?: boolean;
  value: ReadonlyArray<ProjectsSkillKey>;
}>;

const options = ProjectsSkillTypeaheadOptions();

export default function ProjectsSkillTechStackInput({
  description,
  errorMessage,
  label,
  placeholder,
  required,
  value,
  onChange,
}: Props) {
  return (
    <Typeahead
      description={description}
      descriptionStyle="tooltip"
      errorMessage={errorMessage}
      label={label}
      options={options}
      placeholder={placeholder}
      required={required}
      value={ProjectsSkillArrayToTypeaheadValues(value)}
      onChange={(newValue) =>
        onChange(ProjectsSkillTypeaheadValuesToArray(newValue))
      }
    />
  );
}
