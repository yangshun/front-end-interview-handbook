import clsx from 'clsx';

import ProjectsChallengeHowItWorksCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksCard';
import Text from '~/components/ui/Text';
import { themeBackgroundCardColor } from '~/components/ui/theme';

export default function ProjectsChallengeHowItWorksDeployCard() {
  return (
    <ProjectsChallengeHowItWorksCard>
      <div
        className={clsx(
          'flex flex-col gap-4 rounded-lg p-4',
          themeBackgroundCardColor,
        )}>
        <Text size="body2">Deploying your project</Text>
        <Text color="secondary" size="body3">
          As mentioned, there are many ways to host your site. Our recommended
          hosts are:
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
