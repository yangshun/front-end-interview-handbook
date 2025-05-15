'use client';

import type { RoadmapItem as RoadmapItemType } from '@prisma/client';
import clsx from 'clsx';

import RoadmapDateCard from './RoadmapDateCard';
import RoadmapItemCard from './RoadmapItemCard';

type Props = Readonly<{
  date: string;
  roadmapItems: ReadonlyArray<RoadmapItemType>;
}>;

function RoadmapItem({ date, roadmapItems }: Props) {
  const [day, month] = date.split('-');

  return (
    <div className={clsx('flex items-start gap-x-4 md:gap-x-6')}>
      <div className="sticky top-[calc(var(--global-sticky-height)_+_24px)] w-[68px]">
        <RoadmapDateCard day={day} month={month} />
      </div>
      <div className="flex flex-1 flex-col gap-4">
        {roadmapItems.map((item) => {
          const { description, id, launched, tags, title, url } = item;

          return (
            <RoadmapItemCard
              key={id}
              description={description}
              launched={launched}
              tags={tags}
              title={title}
              url={url}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RoadmapItem;
