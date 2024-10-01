import clsx from 'clsx';
import { useState } from 'react';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  widthClasses,
} from '~/components/ui/Dialog';
import Divider from '~/components/ui/Divider';

import ProjectsSkillRoadmapSelection from './ProjectsSkillRoadmapSelection';
import type { ProjectsSkillKey } from '../types';

type Props = Readonly<{
  challengeDefaultSkills?: ReadonlyArray<ProjectsSkillKey>;
  defaultSkills: ReadonlyArray<ProjectsSkillKey>;
  footerInfoContent?: React.ReactNode;
  isShown: boolean;
  onClose: () => void;
  onComplete: (newSkills: ReadonlyArray<ProjectsSkillKey>) => void;
}>;

export default function ProjectsSkillRoadmapSelectionDialog({
  challengeDefaultSkills,
  defaultSkills,
  onComplete,
  isShown,
  onClose,
  footerInfoContent,
}: Props) {
  const intl = useIntl();
  const [skills, setSkills] = useState(defaultSkills);

  return (
    <DialogRoot open={isShown} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay>
          <div
            className={clsx(
              'relative',
              'm-4',
              ['w-auto', widthClasses['screen-lg']],
              'pointer-events-none',
              'flex min-h-[calc(100%_-_32px)] items-center',
            )}>
            <DialogContent scrollable={true}>
              <DialogHeader onClose={onClose}>
                <DialogTitle>
                  {intl.formatMessage({
                    defaultMessage:
                      'Choose additional skills you will use in this project',
                    description: 'Dialog title for skills section',
                    id: 'sGgZ9N',
                  })}
                </DialogTitle>
              </DialogHeader>
              <DialogBody scrollable={true}>
                <div className="pb-6">
                  <ProjectsSkillRoadmapSelection
                    value={skills}
                    onChange={setSkills}
                  />
                </div>
              </DialogBody>
              <Divider className="-mx-6" color="emphasized" />
              <DialogFooter className="flex-col md:flex-row md:items-center">
                {footerInfoContent}
                <div
                  className={clsx(
                    'flex flex-1 gap-2 ',
                    footerInfoContent ? 'md:justify-end' : 'justify-end',
                  )}>
                  {challengeDefaultSkills != null && (
                    <Button
                      label={intl.formatMessage({
                        defaultMessage: 'Revert to default',
                        description: 'Revert skills section to default',
                        id: 'gSoK2P',
                      })}
                      size="md"
                      variant="secondary"
                      onClick={() => setSkills(challengeDefaultSkills)}
                    />
                  )}
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
                </div>
              </DialogFooter>
            </DialogContent>
          </div>
        </DialogOverlay>
      </DialogPortal>
    </DialogRoot>
  );
}
