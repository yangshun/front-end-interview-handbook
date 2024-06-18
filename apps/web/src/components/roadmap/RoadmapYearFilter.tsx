import clsx from 'clsx';
import React, { useState } from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri';

import Button from '~/components/ui/Button';
import Card from '~/components/ui/Card';

type Props = Readonly<{
  onYearChange: (year: string) => void;
  years: Array<string>;
}>;

function RoadmapYearFilter({ onYearChange, years }: Props) {
  const [selectedYear, setSelectedYear] = useState(() => years[0]);

  return (
    <Card
      className={clsx('space-y-1', 'w-40  p-3')}
      disableBackground={true}
      disableSpotlight={true}
      padding={false}
      pattern={false}>
      {years.map((year) => {
        const selected = selectedYear === year;

        return (
          <Button
            key={year}
            addonPosition="start"
            className={clsx(
              'gap-x-2',
              'text-primary  border-none !px-3 py-2',
              selected && '!text-brand',
            )}
            icon={RiCheckboxCircleLine}
            label={year}
            size="md"
            variant="unstyled"
            onClick={() => {
              setSelectedYear(year);
              onYearChange(year);
            }}
          />
        );
      })}
    </Card>
  );
}

export default RoadmapYearFilter;
