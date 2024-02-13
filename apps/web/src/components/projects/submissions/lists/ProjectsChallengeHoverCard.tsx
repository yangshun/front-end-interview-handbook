import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeCard from '~/components/projects/challenges/lists/ProjectsChallengeCard';
import Spinner from '~/components/ui/Spinner';

import { useI18nPathname } from '~/next-i18nostic/src';

type Props = Readonly<{
  slug: string;
}>;

export default function ProjectsChallengeHoverCard({ slug }: Props) {
  const { locale } = useI18nPathname();
  const { data, isLoading } = trpc.projects.challenges.hovercard.useQuery({
    locale: locale ?? 'en-US',
    slug,
  });

  return (
    <div
      className={clsx(
        'flex flex-col grow gap-4',
        'w-[350px] sm:w-[400px] md:w-[420px] min-h-[380px]',
        'relative overflow-clip rounded-lg',
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
