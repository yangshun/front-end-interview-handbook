import { useIntl } from 'react-intl';

import useMotivationReasonOptions from '~/components/projects/hooks/useMotivationReasonOptions';
import ProjectsProfileInfoSectionLayout from '~/components/projects/profile/info/ProjectsProfileInfoSectionLayout';
import type { MotivationReasonValue } from '~/components/projects/types';
import Text from '~/components/ui/Text';

export default function ProjectsProfileMotivation({
  primaryMotivation,
  secondaryMotivation,
}: {
  primaryMotivation: string | null;
  secondaryMotivation: string | null;
}) {
  const intl = useIntl();
  const motivations: Array<MotivationReasonValue> = [
    primaryMotivation,
    secondaryMotivation,
  ].filter(Boolean) as Array<MotivationReasonValue>;
  const { reasons } = useMotivationReasonOptions();

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
              {reasons[motivation]}
            </Text>
          </div>
        ))}
      </div>
    </ProjectsProfileInfoSectionLayout>
  );
}
