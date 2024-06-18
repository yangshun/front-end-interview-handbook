import clsx from 'clsx';
import { RiArrowDownSLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import Popover from '~/components/ui/Popover';

import { MONTHS } from './constants';
import RoadmapProductFilterButton from './RoadmapProductFilterButton';

type Props = Readonly<{
  months: Array<string>;
  onMonthsChange: (months: Array<string>) => void;
}>;

function RoadmapMonthFilter({ months, onMonthsChange }: Props) {
  const intl = useIntl();

  const handleMonthChange = (month: string) => {
    let selectedMonths = [...months];

    if (months.includes(month)) {
      selectedMonths = selectedMonths.filter((option) => option !== month);
    } else {
      selectedMonths = [...selectedMonths, month];
    }
    // There should be at least one option selected and we should not allow users to deselect all
    if (selectedMonths.length !== 0) {
      onMonthsChange(selectedMonths);
    }
  };

  return (
    <Popover
      align="center"
      className={clsx('w-[186px] !p-3')}
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label={intl.formatMessage({
            defaultMessage: 'Months',
            description: 'Label for Months filter button',
            id: '8GDujz',
          })}
          purpose="button"
          selected={true}
          size="md"
        />
      }>
      <div className="grid grid-cols-3 gap-3">
        {MONTHS.map((month) => {
          const selected = months.includes(month);

          return (
            <RoadmapProductFilterButton
              key={month}
              label={month}
              selected={selected}
              size="sm"
              onClick={() => handleMonthChange(month)}
            />
          );
        })}
      </div>
    </Popover>
  );
}

export default RoadmapMonthFilter;
