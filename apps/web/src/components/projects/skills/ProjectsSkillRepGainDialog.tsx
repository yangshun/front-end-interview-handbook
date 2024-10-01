import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { useMediaQuery } from 'usehooks-ts';

import { useIntl } from '~/components/intl';
import type { DialogWidth } from '~/components/ui/Dialog';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLineEmphasizedColor,
  themeDivideEmphasizeColor,
} from '~/components/ui/theme';

import { projectsSkillLabel } from './data/ProjectsSkillListData';
import type { ProjectsSubSkill } from './types';

const MAX_COLS_LG = 3;
const MAX_COLS_MD = 2;

type SkillReps = ReadonlyArray<{
  key: string;
  subSkills: ReadonlyArray<ProjectsSubSkill>;
  totalPoints: number;
}>;

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
  skillReps: SkillReps;
}>;

function splitSkillReps({
  skillReps,
  size,
}: Readonly<{ size: number; skillReps: SkillReps }>) {
  const result = [];

  for (let i = 0; i < skillReps.length; i += size) {
    const chunk = skillReps.slice(i, i + size);

    result.push(chunk);
  }

  return result;
}

export default function ProjectsSkillRepGainDialog({
  isShown,
  onClose,
  skillReps,
}: Props) {
  const intl = useIntl();
  const isTabletAndAbove = useMediaQuery('(min-width: 768px)');
  const isLaptopAndAbove = useMediaQuery('(min-width: 1024px)');

  const mdCols =
    skillReps.length > MAX_COLS_MD ? MAX_COLS_MD : skillReps.length;

  const lgCols =
    skillReps.length > MAX_COLS_LG ? MAX_COLS_LG : skillReps.length;

  const splitSize = isLaptopAndAbove ? lgCols : isTabletAndAbove ? mdCols : 1;

  const splitedSkillReps = splitSkillReps({ size: splitSize, skillReps });

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
      scrollable={true}
      title={intl.formatMessage({
        defaultMessage: 'Details of rep gain across skills',
        description: 'Details of rep gain across skills for submission',
        id: 'uViVdm',
      })}
      width={dialogWidth}
      onClose={() => onClose()}>
      <div
        className={clsx(
          'mt-3.5',
          'flex flex-col',
          'divide-y',
          themeDivideEmphasizeColor,
        )}>
        {splitedSkillReps.map((newSkillsReps) => {
          return (
            <div
              key={`row${Math.random()}`}
              className={clsx(
                `grid md:grid-cols-${mdCols} lg:grid-cols-${lgCols} grid-cols-1`,
                'w-full',
                'py-6 first:pt-0 last:pb-0',
                'divide-x',
                themeDivideEmphasizeColor,
              )}>
              {newSkillsReps.map((parentSkill, i) => {
                const isLastItemInRow = splitSize === i + 1;

                return (
                  <div
                    key={parentSkill.key}
                    className={clsx(
                      'flex flex-col gap-y-4',
                      'relative w-full',
                      'px-6 first:pl-0',
                      isLastItemInRow && 'last:pr-0',
                    )}>
                    <div className="flex items-center justify-between">
                      <Text size="body1" weight="bold">
                        {projectsSkillLabel(parentSkill.key)}
                      </Text>
                      <div
                        className={clsx(
                          'flex items-center gap-1 rounded-full px-2.5 py-0.5',
                          themeBackgroundLineEmphasizedColor,
                        )}>
                        <RiFireLine
                          className={clsx('size-4 text-brand shrink-0')}
                        />
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
                          <Text className="px-2.5" size="body2">
                            +{childSkill.points}
                          </Text>
                        </div>
                      );
                    })}
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
