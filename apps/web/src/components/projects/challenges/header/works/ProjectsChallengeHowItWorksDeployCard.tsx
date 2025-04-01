'use client';

import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
import Text from '~/components/ui/Text';
import { themeBackgroundCardColor } from '~/components/ui/theme';

export default function ProjectsChallengeHowItWorksDeployCard() {
  const intl = useIntl();

  return (
    <ProjectsChallengeHowItWorksCard>
      <div
        className={clsx(
          'flex flex-col gap-4 rounded-lg p-4',
          themeBackgroundCardColor,
        )}>
        <Text size="body2">
          {intl.formatMessage({
            defaultMessage: 'Deploying your project',
            description: 'Deploying your project',
            id: 'azLXDh',
          })}
        </Text>
        <Text color="secondary" size="body3">
          {intl.formatMessage({
            defaultMessage:
              'As mentioned, there are many ways to host your site. Our recommended hosts are:',
            description: 'Recommended hosts to deploy project',
            id: 'Hu5E0P',
          })}
        </Text>
        <div className="flex flex-col">
          <Text color="secondary" size="body3">
            - Github Pages
          </Text>
          <Text color="secondary" size="body3">
            - Vercel
          </Text>
          <Text color="secondary" size="body3">
            - Netlify
          </Text>
        </div>
      </div>
    </ProjectsChallengeHowItWorksCard>
  );
}
