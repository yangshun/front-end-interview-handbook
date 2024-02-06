import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';

import ProjectsChallengeHowItWorksAssetCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksAssetCard';
import ProjectsChallengeHowItWorksBriefCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksBriefCard';
import ProjectsChallengeHowItWorksDeployCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksDeployCard';
import ProjectsChallengeHowItWorksGuidesCard from '~/components/projects/challenges/header/works/ProjectsChallengeHowItWorksGuidesCard';
import Chip from '~/components/ui/Chip';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  isShown: boolean;
  onClose: () => void;
}>;

type HowItWorksStep = Readonly<{
  card: React.ReactNode;
  description: ReactNode;
  id: string;
}>;

export default function ProjectsChallengeHowItWorksDialog({
  isShown,
  onClose,
}: Props) {
  const intl = useIntl();
  const steps: ReadonlyArray<HowItWorksStep> = [
    {
      card: <ProjectsChallengeHowItWorksBriefCard />,
      description: intl.formatMessage({
        defaultMessage: 'Read the project details',
        description: 'Instruction for projects',
        id: 'VuIvcH',
      }),
      id: 'details',
    },
    {
      card: <ProjectsChallengeHowItWorksAssetCard />,

      description: intl.formatMessage({
        defaultMessage:
          'Start the project and download starter code and assets',
        description: 'Instruction for projects',
        id: 'wGf7+G',
      }),
      id: 'start',
    },
    {
      card: <ProjectsChallengeHowItWorksGuidesCard />,
      description: intl.formatMessage({
        defaultMessage:
          "Reference practical guides, learn from other's submissions and ask any questions in the",
        description: 'Instruction for projects',
        id: 'RjpadL',
      }),
      id: 'reference',
    },
    {
      card: <ProjectsChallengeHowItWorksDeployCard />,
      description: intl.formatMessage({
        defaultMessage:
          'Host the project for free on our recommended hosts and submit your project URL for reviews',
        description: 'Instruction for projects',
        id: 'mcOOtE',
      }),
      id: 'host',
    },
  ];

  return (
    <Dialog
      isShown={isShown}
      title={intl.formatMessage({
        defaultMessage: 'How it works',
        description: 'Instruction for projects',
        id: 'IG13JQ',
      })}
      width="screen-xl"
      onClose={() => onClose()}>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-y-8 gap-x-6 pt-4 pb-8 h-full">
        {steps.map(({ id, description, card }, index) => (
          <div key={id} className="flex flex-col gap-4 lg:gap-6">
            <div className="flex gap-x-3 items-center">
              <Chip label={String(index + 1)} variant="neutral" />
              <Text className="lg:hidden" color="secondary" size="body2">
                {description}
              </Text>
            </div>
            <div className="flex flex-col gap-6 justify-between h-full">
              <Text className="hidden lg:block" color="secondary" size="body2">
                {description}
              </Text>
              {card}
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  );
}
