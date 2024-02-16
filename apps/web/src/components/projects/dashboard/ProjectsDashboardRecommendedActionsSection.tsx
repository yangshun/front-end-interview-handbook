'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import useProjectsDashboardRecommendedActions from '~/components/projects/dashboard/useProjectsDashboardRecommendedActions';
import { motivationReasonValue } from '~/components/projects/misc';
import type {
  ProjectsMotivationReasonValue,
  ProjectsRecommendedAction,
} from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBackgroundChipColor,
  themeBackgroundLineEmphasizedColor,
  themeTextBrandColor_GroupHover,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

function getRecommendedActions(
  actions: Record<
    ProjectsMotivationReasonValue,
    Array<ProjectsRecommendedAction>
  >,
  motivations: Array<string>,
) {
  if (motivations.length === 0) {
    return actions.beginner;
  }

  let primaryMotivation: ProjectsMotivationReasonValue | string | null =
    motivations[0];
  let secondaryMotivation: ProjectsMotivationReasonValue | string | null =
    motivations[1];
  // TODO(projects): update for motivations array.

  if (primaryMotivation != null) {
    if (secondaryMotivation != null) {
      // Set to default of beginner + portfolio profile
      primaryMotivation = motivationReasonValue.Values.beginner;
      secondaryMotivation = motivationReasonValue.Values.portfolio;
    } else {
      primaryMotivation = secondaryMotivation;
      secondaryMotivation = null;
    }
  }

  // At this point, the user has at least a primary motivation
  if (primaryMotivation === motivationReasonValue.Values.other) {
    // Set to default of beginner + portfolio profile
    primaryMotivation = motivationReasonValue.Values.beginner;
    secondaryMotivation = motivationReasonValue.Values.portfolio;
  }

  if (secondaryMotivation === motivationReasonValue.Values.other) {
    secondaryMotivation =
      primaryMotivation === motivationReasonValue.Values.portfolio
        ? motivationReasonValue.Values.beginner
        : motivationReasonValue.Values.portfolio;
  }

  const primaryMotivationValue = motivationReasonValue.parse(primaryMotivation);
  const primaryActions = actions[primaryMotivationValue];

  if (!secondaryMotivation) {
    return primaryActions;
  }

  // At this point, the user has both a primary and secondary motivation
  const secondaryMotivationValue =
    motivationReasonValue.parse(secondaryMotivation);
  const secondaryActions = actions[secondaryMotivationValue];
  const recommendedActions = [...primaryActions, ...secondaryActions];

  return recommendedActions.slice(0, 3);
}

type Props = Readonly<{
  motivations: Array<string>;
}>;

export default function ProjectsDashboardRecommendedActionsSection({
  motivations,
}: Props) {
  const intl = useIntl();
  const actions = useProjectsDashboardRecommendedActions();
  const recommendedActions = getRecommendedActions(actions, motivations);

  return (
    <div className="flex flex-col gap-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Recommended actions for you"
          description="Title for Recommended actions section on Projects dashboard page"
          id="3aT98+"
        />
      </Heading>
      <Section>
        <div
          className={clsx(
            'isolate',
            'flex flex-col md:flex-row gap-6 md:gap-8',
            'overflow-hidden rounded-lg',
            'px-8 py-6',
            themeBackgroundCardWhiteOnLightColor,
            'transition-colors',
          )}>
          <div
            className={clsx(
              'group relative',
              'flex flex-1 flex-col gap-6 md:gap-10',
            )}>
            <div className="flex flex-col gap-2">
              <Text size="body1" weight="bold">
                {recommendedActions[0].title}
              </Text>
              <Text color="secondary" size="body1">
                {recommendedActions[0].description}
              </Text>
            </div>
            <div>
              <Button
                addonPosition="end"
                href="/projects/challenges"
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'Start a project',
                  description:
                    'Label for Start a project button on Projects dashboard page',
                  id: 'fEoTGW',
                })}
                size="md"
                variant="primary"
              />
            </div>
          </div>
          <div
            className={clsx(
              'h-px w-full',
              'md:h-auto md:w-px',
              themeBackgroundLineEmphasizedColor,
            )}
            role="separator"
          />
          <div className={clsx('flex flex-1 flex-col gap-5 justify-center')}>
            {recommendedActions.slice(1).map((action) => (
              <div
                key={action.title}
                className={clsx(
                  'group relative flex flex-row gap-5',
                  'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                  'transition-colors',
                )}>
                <div>
                  <span
                    className={clsx(
                      'inline-flex items-center justify-center p-2.5 rounded-lg',
                      themeBackgroundChipColor,
                      themeTextColor,
                      'border border-transparent transition',
                    )}>
                    <action.icon aria-hidden={true} className="size-5" />
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Text color="active" size="body3" weight="medium">
                    <Anchor
                      className="focus:outline-none"
                      href={action.href}
                      variant="unstyled">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {action.title}
                    </Anchor>
                  </Text>
                  <Text color="subtitle" size="body2">
                    {action.description}
                  </Text>
                </div>
                <div>
                  <RiArrowRightLine
                    aria-hidden="true"
                    className={clsx(
                      'size-4 shrink-0',
                      themeTextSecondaryColor,
                      themeTextBrandColor_GroupHover,
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}
