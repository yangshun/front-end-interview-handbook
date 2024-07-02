import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { DialogWidth } from '~/components/ui/Dialog';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import { themeBackgroundLineEmphasizedColor } from '~/components/ui/theme';

import { projectsSkillLabel } from './data/ProjectsSkillListData';

const MAX_COLS_LG = 3;
const MAX_COLS_MD = 2;

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  skillReps: Array<{
    key: string;
    subSkills: Array<{
      key: string;
      points: number;
    }>;
    totalPoints: number;
  }>;
}>;

function ProjectsSkillRepGainDialog({ isShown, onClose, skillReps }: Props) {
  const intl = useIntl();

  const mdCols =
    skillReps.length > MAX_COLS_MD ? MAX_COLS_MD : skillReps.length;

  const lgCols =
    skillReps.length > MAX_COLS_LG ? MAX_COLS_LG : skillReps.length;

  let dialogWidth: DialogWidth = 'screen-sm';

  if (skillReps.length > 1) {
    dialogWidth = 'screen-md';
  }

  if (skillReps.length > 2) {
    dialogWidth = 'screen-lg';
  }

  return (
    <Dialog
      className="pb-2"
      isShown={isShown}
      title={intl.formatMessage({
        defaultMessage: 'Details of rep gain across skills',
        description: 'Details of rep gain across skills for submission',
        id: 'uViVdm',
      })}
      width={dialogWidth}
      onClose={() => onClose()}>
      <div
        className={clsx(
          'grid gap-12 pt-6',
          `grid-cols-1 sm:grid-cols-${mdCols} xl:grid-cols-${lgCols}`,
        )}>
        {skillReps.map((parentSkill, i) => {
          const isLast = skillReps.length === i + 1;

          return (
            <div
              key={parentSkill.key}
              className={clsx('flex flex-col gap-y-4', 'relative')}>
              <div
                className={clsx(
                  'absolute -bottom-6 h-0 w-full border-t border-neutral-700',
                  isLast ? 'hidden' : 'block sm:hidden',
                )}
              />
              <div className="flex items-center justify-between">
                <Text size="body1" weight="bold">
                  {projectsSkillLabel(parentSkill.key)}
                </Text>
                <div
                  className={clsx(
                    'flex items-center gap-1 rounded-full px-2.5 py-0.5',
                    themeBackgroundLineEmphasizedColor,
                  )}>
                  <RiFireLine className={clsx('size-4 text-brand shrink-0')} />
                  <Text size="body1">+{parentSkill.totalPoints}</Text>
                </div>
              </div>
              {parentSkill.subSkills.map((childSkill) => {
                return (
                  <div
                    key={childSkill.key}
                    className="flex items-center justify-between">
                    <Text size="body2" weight="medium">
                      {projectsSkillLabel(childSkill.key)}
                    </Text>
                    <Text size="body2">+{childSkill.points}</Text>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Dialog>
  );
}

export default ProjectsSkillRepGainDialog;
