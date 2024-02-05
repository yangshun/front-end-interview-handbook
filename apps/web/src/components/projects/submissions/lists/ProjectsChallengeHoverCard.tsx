import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeCard from '~/components/projects/challenges/lists/ProjectsChallengeCard';
import Spinner from '~/components/ui/Spinner';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  challengeSlug: string;
  profileId: string;
}>;

export default function ProjectsChallengeHoverCard({
  challengeSlug,
  profileId,
}: Props) {
  const { locale } = useI18nPathname();
  const { data, isLoading } = trpc.projects.challenges.hovercard.useQuery({
    locale: locale ?? 'en-US',
    profileId,
    slug: challengeSlug,
  });

  return (
    <div
      className={clsx(
        'relative overflow-clip rounded-lg md:w-[420px] sm:w-[400px] w-[350px] min-h-[380px] p-4 grow flex flex-col gap-4',
      )}>
      {isLoading || !data ? (
        <div className="flex items-center justify-center w-full min-h-[400px]">
          <Spinner size="md" />
        </div>
      ) : (
        <ProjectsChallengeCard challenge={data} type="hover" />
      )}
    </div>
  );
}
