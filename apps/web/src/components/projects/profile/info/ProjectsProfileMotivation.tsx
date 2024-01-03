import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';

import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import Text from '~/components/ui/Text';

import type { ReasonValue } from '~/app/[locale]/projects/(marketing)/onboarding/ProjectsOnboardingReasonPage';

const useMotivationOptions = (intl: IntlShape) => ({
  beginner: intl.formatMessage({
    defaultMessage: 'Want to learn skills for practical front end development',
    description: 'Motivation label for beginner reason',
    id: 'nvBKGE',
  }),
  experienced: intl.formatMessage({
    defaultMessage:
      'Want to bridge some skill gaps in modern front end or full stack',
    description: 'Motivation level for experienced reason',
    id: 'C0dq+J',
  }),
  'mentor-others': intl.formatMessage({
    defaultMessage: 'Want to help mentor others',
    description: 'Motivation level for mentor others reason',
    id: 'r14As6',
  }),
  other: intl.formatMessage({
    defaultMessage: 'Other',
    description: 'Motivation level for other reason',
    id: 'A/9dZ7',
  }),
  portfolio: intl.formatMessage({
    defaultMessage: 'Want to build my portfolio',
    description: 'Motivation level for portfolio reason',
    id: '4Q3JMg',
  }),
  'side-projects': intl.formatMessage({
    defaultMessage: 'Want to build my side projects',
    description: 'Motivation level for side projects reason',
    id: 'LLsMT8',
  }),
});

export default function ProjectsProfileMotivation({
  primaryMotivation,
  secondaryMotivation,
}: {
  primaryMotivation: string | null;
  secondaryMotivation: string | null;
}) {
  const intl = useIntl();
  const motivations: Array<ReasonValue> = [
    primaryMotivation,
    secondaryMotivation,
  ].filter(Boolean) as Array<ReasonValue>;
  const motivationOptions: Record<ReasonValue, string> =
    useMotivationOptions(intl);

  return (
    <ProjectsProfileInfoSectionLayout
      heading={intl.formatMessage({
        defaultMessage: 'Motivation for joining',
        description: 'Projects profile motivation for joining section title',
        id: 'Zeae/j',
      })}>
      <div className="flex gap-2 flex-wrap">
        {motivations.map((motivation, index) => (
          <div
            key={motivation}
            className="bg-neutral-100 dark:bg-neutral-800 rounded-full px-3 py-0.5 inline-flex justify-center gap-1">
            <Text color="active" size="body3">
              {index + 1}.
            </Text>
            <Text color="secondary" size="body3">
              {motivationOptions[motivation]}
            </Text>
          </div>
        ))}
      </div>
    </ProjectsProfileInfoSectionLayout>
  );
}
