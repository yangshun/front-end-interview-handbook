import type { ReactNode } from 'react';
import { RiCodeSSlashFill, RiLoader4Fill } from 'react-icons/ri';
import { useIntl } from 'react-intl';
import { useSessionStorage } from 'usehooks-ts';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';

import type { ProjectsChallengeSessionStatus } from '@prisma/client';
import type { ProjectsChallengeSession } from '@prisma/client';

type ProjectsChallenge = ProjectsChallengeSession & {
  challenge: ProjectsChallengeItem | undefined;
};

export type ChallengeFilter<
  T extends string,
  Q extends ProjectsChallenge = ProjectsChallenge,
> = Readonly<{
  id: string;
  matches: (challenge: Q) => boolean;
  name: string;
  onChange: (value: T) => void;
  options: ReadonlyArray<{
    icon?: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: ReactNode;
    tooltip?: string;
    value: T;
  }>;
}>;

type Props = Readonly<{
  filter?: (challenge: ProjectsChallengeSessionStatus) => boolean;
  initialValue?: ProjectsChallengeSessionStatus;
  namespace: string;
  order?: (
    a: ProjectsChallengeSessionStatus,
    b: ProjectsChallengeSessionStatus,
  ) => number;
}>;

export default function useProjectsSessionStatusFilter({
  initialValue = 'IN_PROGRESS',
  filter,
  namespace,
  order,
}: Props): [
  ProjectsChallengeSessionStatus,
  ChallengeFilter<ProjectsChallengeSessionStatus>,
] {
  const intl = useIntl();
  const [challengeFilter, setChallengeFilter] =
    useSessionStorage<ProjectsChallengeSessionStatus>(
      `gfe:${namespace}:challenge-filter`,
      initialValue,
    );

  let options: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
    tooltip: string;
    value: ProjectsChallengeSessionStatus;
  }> = [
    {
      icon: RiLoader4Fill,
      label: intl.formatMessage({
        defaultMessage: 'In progress',
        description: 'Projects challenge in progress',
        id: '0ZZ4Vl',
      }),
      tooltip: intl.formatMessage({
        defaultMessage: 'Show in progress challenges',
        description: 'Description of in progress challenges filter',
        id: 'KIP7Ey',
      }),
      value: 'IN_PROGRESS',
    },
    {
      icon: RiCodeSSlashFill,
      label: intl.formatMessage({
        defaultMessage: 'Completed',
        description: 'Projects challenge completed',
        id: 'wDKscz',
      }),
      tooltip: intl.formatMessage({
        defaultMessage: 'Show completed challenges',
        description: 'Description of completed challenges filter',
        id: 'LChIT/',
      }),
      value: 'COMPLETED',
    },
  ];

  if (filter != null) {
    options = options.filter((option) => filter(option.value));
  }
  if (order != null) {
    options = options.slice().sort((a, b) => order(a.value, b.value));
  }

  const challengeFilterOptions: ChallengeFilter<ProjectsChallengeSessionStatus> =
    {
      id: 'challenge-status',
      matches: (challenge) => {
        return challenge.status === challengeFilter;
      },
      name: intl.formatMessage({
        defaultMessage: 'Session status',
        description: 'Completed and in progress challenges',
        id: 'o3nhZ8',
      }),
      onChange: (value) => {
        setChallengeFilter(value);
      },
      options,
    };

  return [challengeFilter, challengeFilterOptions];
}
