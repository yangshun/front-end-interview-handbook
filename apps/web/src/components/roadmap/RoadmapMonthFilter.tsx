import clsx from 'clsx';
import { startCase } from 'lodash-es';
import { RiArrowDownSLine } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import FilterButton from '~/components/common/FilterButton';
import { useIntl } from '~/components/intl';
import Popover from '~/components/ui/Popover';

import { MONTHS } from './constants';
import RoadmapProductFilterButton from './RoadmapProductFilterButton';

function getMonthLabel(
  isDefaultSelected: boolean,
  months: ReadonlyArray<string>,
  intl: IntlShape,
) {
  if (isDefaultSelected) {
    return `${months[0]} - ${months.at(-1)}`;
  }

  if (months.length === 1) {
    return startCase(months[0]);
  }

  return intl.formatMessage({
    defaultMessage: 'Months',
    description: 'Label for  Months filter button',
    id: '6CQPs9',
  });
}
type Props = Readonly<{
  months: ReadonlyArray<string>;
  onMonthsChange: (months: ReadonlyArray<string>) => void;
  showDefaultMonths: boolean;
}>;

function RoadmapMonthFilter({
  months,
  onMonthsChange,
  showDefaultMonths,
}: Props) {
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
      align="end"
      className={clsx('w-[186px] !p-3')}
      trigger={
        <FilterButton
          addonPosition="end"
          icon={RiArrowDownSLine}
          label={getMonthLabel(showDefaultMonths, months, intl)}
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
