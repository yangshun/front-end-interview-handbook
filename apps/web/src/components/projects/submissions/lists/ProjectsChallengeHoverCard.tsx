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
        'flex grow flex-col items-center justify-center gap-4',
        'h-full min-h-[340px] w-[316px]',
        'relative overflow-clip rounded-lg',
        'p-2',
      )}>
      {isLoading || !data ? (
        <Spinner size="md" />
      ) : (
        <ProjectsChallengeCard challenge={data} type="hover" />
      )}
    </div>
  );
}
