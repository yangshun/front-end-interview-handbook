'use client';

import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import FilterButton from '~/components/common/FilterButton';
import ProjectsChallengeCard from '~/components/projects/challenges/lists/ProjectsChallengeCard';
import useProjectsSessionStatusFilter from '~/components/projects/common/useProjectsSessionStatusFilter';

import { ProjectsChallengeSessionStatus } from '@prisma/client';

export default function ProjectsAllChallengesTab() {
  const [challengeFilters, challengeFilterOptions] =
    useProjectsSessionStatusFilter({
      initialValue: [],
      namespace: 'all-challenges',
    });

  const { data: allSessions } =
    trpc.projects.sessions.getSessionsBasedOnStatus.useQuery({
      statuses: [
        ProjectsChallengeSessionStatus.IN_PROGRESS,
        ProjectsChallengeSessionStatus.COMPLETED,
      ],
    });

  const shownSessions = allSessions?.filter((session) => {
    return challengeFilterOptions.matches(session);
  });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-4">
        <fieldset>
          <legend className="sr-only">{challengeFilterOptions.name}</legend>
          <div className={clsx('flex flex-wrap items-center gap-2')}>
            {challengeFilterOptions.options.map(({ icon: Icon, ...option }) => (
              <FilterButton
                key={option.value}
                icon={Icon}
                label={String(option.label)}
                purpose="tab"
                selected={challengeFilters.has(option.value)}
                tooltip={option.tooltip}
                onClick={() => challengeFilterOptions.onChange(option.value)}
              />
            ))}
          </div>
        </fieldset>
      </div>
      <div className="md:grid-cols-2 lg:grid-cols-3 grid-cols-1 grid gap-3 md:gap-4 lg:gap-6">
        {shownSessions?.map((session) =>
          session.challenge ? (
            <ProjectsChallengeCard
              key={session.id}
              challenge={session.challenge}
            />
          ) : null,
        )}
      </div>
    </div>
  );
}
