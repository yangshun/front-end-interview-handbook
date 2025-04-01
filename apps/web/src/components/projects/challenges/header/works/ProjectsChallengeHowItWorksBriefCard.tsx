'use client';

import { useIntl } from '~/components/intl';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
import Text from '~/components/ui/Text';

export default function ProjectsChallengeHowItWorksBriefCard() {
  const intl = useIntl();

  return (
    <ProjectsChallengeHowItWorksCard>
      <div className="flex flex-col">
        <Text size="body2">
          {intl.formatMessage({
            defaultMessage: 'Project Brief',
            description: 'Projects brief',
            id: 'BNjIa/',
          })}
        </Text>
        <Text className="mt-3 block" size="body3">
          {intl.formatMessage({
            defaultMessage: 'Objective',
            description: 'Objective label',
            id: 's12zD2',
          })}
        </Text>
        <Text className="text-2xs mt-2 block" color="secondary" size="inherit">
          {intl.formatMessage({
            defaultMessage:
              'The Newsletter Section aims to seamlessly capture user interest and encourage them to subscribe to our newsletters. This section serves as the initial point of interaction, requiring an intuitive and engaging design to maximize conversions.',
            description: 'Objective description',
            id: 'KU6GCH',
          })}
        </Text>
        <Text className="mt-3 block" size="body3">
          {intl.formatMessage({
            defaultMessage: 'Key Features',
            description: 'Key features label',
            id: '36Ei20',
          })}
        </Text>
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
