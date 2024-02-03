import clsx from 'clsx';
import { RiArrowRightLine, RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import Anchor from '~/components/ui/Anchor';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeTextFaintColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import ProjectsSkillLabel from '../metadata/ProjectsSkillLabel';
import type { ProjectsSkillRoadmapItem } from '../types';

type Props = Readonly<{
  skillItem: ProjectsSkillRoadmapItem;
}>;

export default function ProjectsSkillRoadmapItemDetails({ skillItem }: Props) {
  const intl = useIntl();

  return (
    // TODO(projects): Add skills redirection
    <Anchor className="w-full" href="#" variant="unstyled">
      <div
        className={clsx(
          'group flex px-4 py-3 md:gap-4 gap-2 rounded-lg w-full items-center',
          themeBackgroundLayerEmphasized,
        )}>
        <div className="flex md:gap-4 gap-2 w-full md:flex-row flex-col">
          <div className="flex-1">
            <Text size="body2" weight="medium">
              <ProjectsSkillLabel value={skillItem.key} />
            </Text>
          </div>
          <div className="flex gap-4">
            <ProjectsChallengeReputationTag
              className="gap-2"
              points={skillItem.points}
              variant="flat"
            />
            <div
              className={clsx('flex items-center gap-2', themeTextSubtleColor)}>
              <RiRocketLine className="h-4 w-4" />
              <Text color="inherit" size="body2">
                <FormattedMessage
                  defaultMessage="<bold>{completedCount}</bold>/{totalCount} challenges"
                  description="Rep count label in Projects"
                  id="26Xmcd"
                  values={{
                    bold: (chunks) => (
                      <Text color="secondary" size="body2" weight="medium">
                        {chunks}
                      </Text>
                    ),
                    completedCount: skillItem.completed,
                    totalCount: skillItem.total,
                  }}
                />
              </Text>
            </div>
          </div>
          <div className="items-center flex">
            <ProgressBar
              heightClass="h-2 dark:!bg-neutral-700"
              label={intl.formatMessage(
                {
                  defaultMessage:
                    'Label for "Completed projects" progress bar of a Projects component track',
                  description:
                    '{completedCount} out of {totalCount} challenges',
                  id: 'GSfE/S',
                },
                {
                  completedCount: skillItem.completed,
                  totalCount: skillItem.total,
                },
              )}
              total={skillItem.total}
              value={skillItem.completed}
            />
          </div>
        </div>
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'h-5 w-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      </div>
    </Anchor>
  );
}
