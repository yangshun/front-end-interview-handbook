import { useState } from 'react';
import { useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Dialog from '~/components/ui/Dialog';

import ProjectsSkillRoadmapSelection from './ProjectsSkillRoadmapSelection';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  defaultSkills: ReadonlyArray<ProjectsSkillKey>;
  isShown: boolean;
  onClose: () => void;
  onComplete: (newSkills: ReadonlyArray<ProjectsSkillKey>) => void;
}>;

export default function ProjectsSkillRoadmapSelectionDialog({
  defaultSkills,
  onComplete,
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();
  const [skills, setSkills] = useState(defaultSkills);

  return (
    <Dialog
      isShown={isShown}
      primaryButton={
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Confirm',
            description: 'Confirm action button label',
            id: 'M33LzY',
          })}
          size="md"
          variant="primary"
          onClick={() => onComplete(skills)}
        />
      }
      secondaryButton={
        // TODO(projects|skills): Check if reverting to challenge recommendation or initial selection.
        <Button
          label={intl.formatMessage({
            defaultMessage: 'Revert to default',
            description: 'Revert skills section to default',
            id: 'gSoK2P',
          })}
          size="md"
          variant="secondary"
          onClick={() => setSkills(defaultSkills)}
        />
      }
      title={intl.formatMessage({
        defaultMessage: 'Choose additional skills you will use in this project',
        description: 'Dialog title for skills section',
        id: 'sGgZ9N',
      })}
      width="screen-xl"
      onClose={onClose}>
      <ProjectsSkillRoadmapSelection value={skills} onChange={setSkills} />
    </Dialog>
  );
}
