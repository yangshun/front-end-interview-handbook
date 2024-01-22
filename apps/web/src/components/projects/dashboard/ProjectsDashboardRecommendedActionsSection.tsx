'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import useProjectsRecommendedActions from '~/components/projects/hooks/useProjectsRecommendedActions';
import { motivationReasonValue } from '~/components/projects/misc';
import type {
  MotivationReasonValue,
  RecommendedAction,
} from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import {
  themeBackgroundEmphasizedHover,
  themeBorderColor,
  themeCardBackgroundWhiteOnLightColor,
  themeChipBackgroundColor,
  themeElementBorderColor,
  themeTextBrandGroupHoverColor,
  themeTextColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

function getRecommendedActions(
  actions: Record<MotivationReasonValue, Array<RecommendedAction>>,
  primaryMotivation: string | null | undefined,
  secondaryMotivation: string | null | undefined,
) {
  if (!primaryMotivation) {
    if (!secondaryMotivation) {
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
  primaryMotivation: string | null | undefined;
  secondaryMotivation: string | null | undefined;
}>;

export default function ProjectsDashboardRecommendedActionsSection({
  primaryMotivation,
  secondaryMotivation,
}: Props) {
  const intl = useIntl();
  const actions = useProjectsRecommendedActions();
  const recommendedActions = getRecommendedActions(
    actions,
    primaryMotivation,
    secondaryMotivation,
  );

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
            'isolate grid px-8 py-6',
            'overflow-hidden rounded-lg',
            'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
            themeCardBackgroundWhiteOnLightColor,
            'transition-colors',
            [themeBorderColor, 'border-l', 'md:border-t'],
            'md:grid-cols-2',
          )}>
          <div
            className={clsx(
              'group relative flex flex-col md:gap-10 gap-6',
              'md:border-r md:border-b-0 border-b md:pr-6 md:pb-0 pb-8',
              themeElementBorderColor,
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
          <div className={clsx('flex flex-col gap-5 md:pl-6 md:pt-0 pt-8')}>
            {recommendedActions.slice(1).map((action) => (
              <div
                key={action.title}
                className={clsx(
                  'group relative flex flex-row gap-5',
                  'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
                  'transition-colors',
                  themeBackgroundEmphasizedHover,
                )}>
                <div>
                  <span
                    className={clsx(
                      'inline-flex items-center justify-center p-2.5 rounded-lg',
                      themeChipBackgroundColor,
                      themeTextColor,
                      'border border-transparent transition',
                    )}>
                    <action.icon aria-hidden={true} className="h-5 w-5" />
                  </span>
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <Text color="active" size="body3" weight="medium">
                    <Anchor
                      className="focus:outline-none"
                      href="#" // TODO: get the href (from the action?)
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
                      'h-4 w-4 shrink-0',
                      themeTextSecondaryColor,
                      themeTextBrandGroupHoverColor,
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
