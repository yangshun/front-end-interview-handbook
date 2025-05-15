import clsx from 'clsx';
import { useState } from 'react';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import type { ProjectsSkillGroupType } from '~/components/projects/skills/data/ProjectsSkillIcons';
import { ProjectsSkillIcons } from '~/components/projects/skills/data/ProjectsSkillIcons';
import type { ProjectsSkillSummaryItemForSubmission } from '~/components/projects/skills/types';
import ProjectsTrackChallengesList from '~/components/projects/tracks/ProjectsTrackChallengesList';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';
import { themeBorderElementColor } from '~/components/ui/theme';

import ProjectsSkillAccordion from '../../skills/ProjectsSkillAccordion';
import ProjectsSkillAccordionItem from '../../skills/ProjectsSkillAccordionItem';
import ProjectsChallengeSubmissionSuccessProgressHeader from './ProjectsChallengeSubmissionSuccessProgressHeader';
import ProjectsChallengeSubmissionSuccessSkillPlanDialog from './ProjectsChallengeSubmissionSuccessSkillPlanDialog';

type Props = Readonly<{
  skills: Readonly<{
    completedSkills: ReadonlyArray<ProjectsSkillSummaryItemForSubmission>;
    incompleteSkills: ReadonlyArray<ProjectsSkillSummaryItemForSubmission>;
  }>;
}>;

const MAX_ITEMS_TO_SHOW = 2;

export default function ProjectsChallengeSubmissionSuccessSkillPlanProgress({
  skills,
}: Props) {
  const intl = useIntl();
  const [showSkillPlanDialog, setShowSkillPlanDialog] = useState(false);
  const { completedSkills, incompleteSkills } = skills;
  const completedSkill = completedSkills[0];
  const nextSkill = incompleteSkills[0];
  const skill = completedSkill || nextSkill;

  if (!skill) {
    return null;
  }

  const challengesQuery = trpc.projects.challenges.listForSkills.useQuery({
    locale: 'en-US',
    skillSlug: nextSkill?.key ?? '',
  });

  return (
    <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
      <ProjectsChallengeSubmissionSuccessProgressHeader
        completedCount={skill.completedChallenges}
        entity="skill"
        icon={ProjectsSkillIcons[skill.parentKey as ProjectsSkillGroupType]}
        iconWrapperClassName={skill.tagClassName}
        title={intl.formatMessage(
          {
            defaultMessage: '{title} skill plan progress',
            description:
              'Label for skill plan progress on project submission success page',
            id: 'Tfuq+t',
          },
          {
            title: skill.label,
          },
        )}
        totalCount={skill.totalChallenges}
      />
      <div className="flex flex-col gap-6">
        {(() => {
          if (!nextSkill || !challengesQuery.data?.challenges) {
            return null;
          }

          const notStartedChallenges = challengesQuery.data?.challenges.filter(
            (challenge) => challenge.status == null,
          );
          const hasMoreThanShownChallenges =
            notStartedChallenges.length > MAX_ITEMS_TO_SHOW;

          if (notStartedChallenges.length === 0) {
            return null;
          }

          return (
            <>
              <div className="flex items-center justify-between">
                <Text color="secondary" size="body2">
                  {completedSkill ? (
                    <FormattedMessage
                      defaultMessage="Next skill"
                      description="Label for next skill plan on project submission success page"
                      id="HheXnK"
                    />
                  ) : (
                    <FormattedMessage
                      defaultMessage="Next challenge:"
                      description="Label for next challenge for skill plan on project submission success page"
                      id="24jiGp"
                    />
                  )}
                </Text>
                {completedSkill ? (
                  <Button
                    className="!text-brand -me-3"
                    href="/projects/skills"
                    label={intl.formatMessage({
                      defaultMessage: 'See all',
                      description:
                        'Label for See all button on project submission success page',
                      id: 'RZedau',
                    })}
                    variant="tertiary"
                  />
                ) : (
                  <Button
                    className="!text-brand -me-3"
                    label={intl.formatMessage({
                      defaultMessage: 'See all',
                      description:
                        'Label for See all button on project submission success page',
                      id: 'RZedau',
                    })}
                    variant="tertiary"
                    onClick={() => setShowSkillPlanDialog(true)}
                  />
                )}
              </div>
              {completedSkill ? (
                <ProjectsSkillAccordion>
                  <ProjectsSkillAccordionItem
                    challenges={notStartedChallenges}
                    skill={nextSkill}
                  />
                </ProjectsSkillAccordion>
              ) : (
                <div
                  className={clsx(
                    'relative',
                    hasMoreThanShownChallenges && 'mb-16',
                  )}>
                  <ProjectsTrackChallengesList
                    challenges={notStartedChallenges.slice(
                      0,
                      MAX_ITEMS_TO_SHOW,
                    )}
                    showEndProgressLine={hasMoreThanShownChallenges}
                    userProfile={null}
                    view="submission"
                  />
                  {hasMoreThanShownChallenges && (
                    <>
                      <div
                        className={clsx(
                          'absolute -bottom-8',
                          'ml-[11px]',
                          'h-10 w-9 border-b border-l border-dashed',
                          themeBorderElementColor,
                        )}
                      />
                      <div
                        className={clsx('absolute -bottom-12', 'ml-12 mt-4')}>
                        <Button
                          className="pointer-events-none"
                          label={intl.formatMessage(
                            {
                              defaultMessage: '{count} more',
                              description: 'Label for more challenges count',
                              id: 'VWlSLh',
                            },
                            {
                              count:
                                notStartedChallenges.length - MAX_ITEMS_TO_SHOW,
                            },
                          )}
                          variant="secondary"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          );
        })()}

        <ProjectsChallengeSubmissionSuccessSkillPlanDialog
          challenges={challengesQuery.data?.challenges}
          currentSkill={skill}
          isShown={showSkillPlanDialog}
          onClose={() => setShowSkillPlanDialog(false)}
        />
      </div>
    </div>
  );
}
