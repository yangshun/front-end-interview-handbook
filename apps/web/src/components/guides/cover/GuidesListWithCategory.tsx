import clsx from 'clsx';
import { last, reduce } from 'lodash-es';
import { usePathname, useRouter } from 'next/navigation';

import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import type { GuideCardMetadataWithCompletedStatus } from '~/components/guides/types';
import Heading from '~/components/ui/Heading';
import { themeTextColor } from '~/components/ui/theme';

import GuidesCountLabel from './GuidesCountLabel';
import GuidesList from './GuidesList';
import GuideReadingTimeLabel from './GuidesReadingTimeLabel';
import useGuidesActions from '../hooks/useGuidesActions';

import { useUser } from '@supabase/auth-helpers-react';

type Props = Readonly<{
  guides: ReadonlyArray<{
    articles: ReadonlyArray<GuideCardMetadataWithCompletedStatus>;
    title: string;
    totalReadingTime: number;
  }>;
}>;

export default function GuidesListWithCategory({ guides }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useUser();
  const { signInUpHref } = useAuthSignInUp();
  const { addQueryParamToPath, markGuideAsCompleted, markGuideAsNotCompleted } =
    useGuidesActions();

  // For the starting value of the guides list
  const cumulativeCounts = reduce(
    guides,
    (result, item) => {
      const lastCount = last(result) || 0;

      result.push(lastCount + item.articles.length);

      return result;
    },
    [0],
  );

  return (
    <div className={clsx('grid lg:grid-cols-12')}>
      <div
        className={clsx(
          'flex flex-col gap-10',
          'lg:col-span-10 xl:col-span-9',
        )}>
        {guides.map(({ title, totalReadingTime, articles }, index) => (
          <div key={title}>
            <Heading className={themeTextColor} color="custom" level="heading6">
              {title}
            </Heading>
            <div className="mb-4 mt-6 flex items-center gap-10">
              <GuidesCountLabel count={articles.length} />
              <GuideReadingTimeLabel readingTime={totalReadingTime} />
            </div>
            <GuidesList
              articles={articles}
              checkIfCompletedGuide={(guide) => guide.isCompleted}
              startingValue={cumulativeCounts[index]}
              onMarkAsCompleted={
                user == null
                  ? (guide) =>
                      router.push(
                        signInUpHref({
                          next: addQueryParamToPath(pathname || '', {
                            book: guide.book,
                            id: guide.id,
                            title: guide.title,
                          }),
                        }),
                      )
                  : markGuideAsCompleted
              }
              onMarkAsNotCompleted={markGuideAsNotCompleted}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
