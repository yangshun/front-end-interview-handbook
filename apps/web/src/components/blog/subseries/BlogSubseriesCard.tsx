'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import type { BlogSubseries } from '~/components/blog/BlogTypes';
import BlogCountLabel from '~/components/blog/metadata/BlogCountLabel';
import BlogReadingTimeLabel from '~/components/blog/metadata/BlogReadingTimeLabel';
import BlogSubseriesItemCard from '~/components/blog/subseries/BlogSubseriesItemCard';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  initialItemsToShow?: number;
  subseries: BlogSubseries;
}>;

export default function BlogSubseriesCard({
  initialItemsToShow = 3,
  subseries,
}: Props) {
  const intl = useIntl();
  const [showAll, setShowAll] = useState(false);
  const visibleSubseriesItems = showAll
    ? subseries.items
    : subseries.items.slice(0, initialItemsToShow);

  return (
    <div
      className={clsx(
        'flex h-full flex-col gap-x-4 gap-y-4 overflow-hidden rounded-lg border p-4 lg:p-8',
        themeBorderColor,
        themeBackgroundCardWhiteOnLightColor,
      )}>
      <div className="flex flex-col gap-y-1">
        <Heading className="my-0" level="heading6">
          {subseries.title}
        </Heading>
        <Text color="secondary" size="body2">
          {subseries.description}
        </Text>
      </div>
      <div className="flex items-center gap-4">
        <BlogCountLabel count={subseries.items.length} />
        <BlogReadingTimeLabel readingTime={subseries.readingTime} />
      </div>
      {visibleSubseriesItems.map((item) => (
        <div key={item.href} className="my-4 lg:my-5">
          <BlogSubseriesItemCard data={item} />
        </div>
      ))}
      {subseries.items.length > initialItemsToShow && (
        <Button
          className={clsx(
            'dark:text-brand text-brand-darker -ml-4 w-fit border-transparent',
          )}
          icon={showAll ? RiArrowUpSLine : RiArrowDownSLine}
          label={
            showAll
              ? intl.formatMessage({
                  defaultMessage: 'Hide',
                  description: 'Hide articles',
                  id: 'KbgzvC',
                })
              : intl.formatMessage({
                  defaultMessage: 'See all',
                  description: 'See all articles',
                  id: 'zIZsqX',
                })
          }
          size="md"
          variant="unstyled"
          onClick={() => setShowAll(!showAll)}
        />
      )}
    </div>
  );
}
