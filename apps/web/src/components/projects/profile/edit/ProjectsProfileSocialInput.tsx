import type { Control } from 'react-hook-form';

import type { ProjectsProfileEditFormValues } from '../../types';
import ProjectsProfileGithubInput from './ProjectsProfileGithubInput';
import ProjectsProfileLinkedInInput from './ProjectsProfileLinkedInInput';
import ProjectsProfileWebsiteInput from './ProjectsProfileWebsiteInput';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

export default function ProjectsProfileSocialInput({ control }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex">
        <ProjectsProfileGithubInput control={control} />
      </div>
      <div className="flex">
        <ProjectsProfileLinkedInInput control={control} />
      </div>
      <div className="flex">
        <ProjectsProfileWebsiteInput control={control} />
      </div>
    </div>
  );
}
