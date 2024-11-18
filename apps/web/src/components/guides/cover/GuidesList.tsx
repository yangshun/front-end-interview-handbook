import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import type { GuideCardMetadata } from '~/components/guides/types';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeTextBrandColor_GroupHover,
  themeTextSubtleColor,
} from '~/components/ui/theme';

import { hashGuide } from '~/db/guides/GuidesUtils';

import GuidesListItemProgressChip from './GuidesListItemProgressChip';

type Props<Q extends GuideCardMetadata> = Readonly<{
  articles: ReadonlyArray<Q>;
  checkIfCompletedGuide: (guide: Q) => boolean;
  onMarkAsCompleted?: (guide: Q) => void;
  onMarkAsNotCompleted?: (guide: Q) => void;
  startingValue?: number;
}>;

export default function GuidesList<Q extends GuideCardMetadata>({
  articles,
  checkIfCompletedGuide,
  onMarkAsCompleted,
  onMarkAsNotCompleted,
  startingValue = 0,
}: Props<Q>) {
  return (
    <ul className={clsx('flex flex-col gap-4')}>
      {articles.map((guide, index) => {
        const hasCompletedQuestion = checkIfCompletedGuide(guide);

        return (
          <li
            key={hashGuide(guide.book, guide.slug)}
            className={clsx(
              'group',
              'relative isolate',
              'flex flex-grow items-center gap-6',
              'rounded-lg',
              'px-6 py-4',
              themeBackgroundCardWhiteOnLightColor,
              ['border', themeBorderElementColor],
            )}>
            <GuidesListItemProgressChip
              className="z-[1]"
              guide={guide}
              hasCompleted={hasCompletedQuestion}
              index={index + startingValue}
              onMarkAsCompleted={onMarkAsCompleted}
              onMarkAsNotCompleted={onMarkAsNotCompleted}
            />
            <div className="flex flex-1 flex-col items-start gap-2">
              <Text size="body1" weight="bold">
                {guide.title}
              </Text>
              <Text color="secondary" size="body2">
                {guide.description}
              </Text>
            </div>
            <RiArrowRightLine
              className={clsx(
                'size-6 shrink-0 transition-colors',
                themeTextSubtleColor,
                themeTextBrandColor_GroupHover,
              )}
            />
            <Anchor
              aria-label={guide.title}
              className="absolute inset-0"
              href={guide.href}
            />
          </li>
        );
      })}
    </ul>
  );
}
