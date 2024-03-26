import clsx from 'clsx';
import { RiArrowRightLine, RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import Anchor from '~/components/ui/Anchor';
import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor_Hover,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { projectsSkillLabel } from '../data/ProjectsSkillListData';
import type { ProjectsSkillRoadmapItem } from '../types';

type Props = Readonly<{
  skillItem: ProjectsSkillRoadmapItem;
}>;

export default function ProjectsSkillRoadmapItemSummary({ skillItem }: Props) {
  const intl = useIntl();
  const label = projectsSkillLabel(skillItem.key);
  const href = `/projects/skills/${skillItem.key}`;

  return (
    // TODO(projects|skills): Add skills redirection
    <div
      className={clsx(
        'relative isolate',
        'group flex w-full items-center gap-2 md:gap-4',
        'rounded-lg px-4 py-3',
        'transition-colors',
        ['border', themeBorderElementColor, themeBorderBrandColor_Hover],
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
      )}>
      <div className="flex w-full flex-col gap-2 md:flex-row md:gap-4">
        <div className="flex-1">
          <Anchor
            className="relative z-[1]"
            href={href}
            scroll={false}
            scrollToTop={false}
            variant="flat">
            <Text size="body2" weight="medium">
              {label}
            </Text>
          </Anchor>
        </div>
        <div className="flex gap-4">
          <ProjectsChallengeReputationTag
            className="gap-2"
            points={skillItem.points}
            variant="flat"
          />
          <div
            className={clsx('flex items-center gap-2', themeTextSubtleColor)}>
            <RiRocketLine className="size-4" />
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
        <div className="flex items-center">
          <ProgressBar
            heightClass="h-2 dark:!bg-neutral-700"
            label={intl.formatMessage(
              {
                defaultMessage:
                  'Label for "Completed projects" progress bar of a Projects component track',
                description: '{completedCount} out of {totalCount} challenges',
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
          'size-5 shrink-0',
          themeTextSubtleColor,
          themeTextBrandColor_GroupHover,
        )}
      />
      <Anchor
        aria-label={label}
        className="absolute inset-0"
        href={href}
        scroll={false}
        scrollToTop={false}
      />
    </div>
  );
}
