'use client';

import React, { Fragment, useState } from 'react';
import { RiCalendar2Line } from 'react-icons/ri';
import type { IntlShape } from 'react-intl';

import { useIntl } from '~/components/intl';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/Accordion';
import Button from '~/components/ui/Button';
import Divider from '~/components/ui/Divider';
import FilterButton from '~/components/ui/FilterButton/FilterButton';
import SlideOut from '~/components/ui/SlideOut';
import Text from '~/components/ui/Text';

import { MONTHS } from './constants';
import RoadmapProductFilterButton from './RoadmapProductFilterButton';
import { getMonthsForYear } from './RoadmapUtils';

type RoadmapFiltersType = 'months' | 'years';

const accordionDefaultValues: ReadonlyArray<RoadmapFiltersType> = [
  'months',
  'years',
];

type RoadmapFilter = Record<
  RoadmapFiltersType,
  {
    options: ReadonlyArray<string>;
    selectedOptions: ReadonlyArray<string>;
    type: RoadmapFiltersType;
  }
>;

type FilterSectionOptions = {
  label: string;
  onFilterChange: (
    type: RoadmapFiltersType,
    filters: ReadonlyArray<string>,
  ) => void;
  options: ReadonlyArray<string>;
  selectedOptions: ReadonlyArray<string>;
  type: RoadmapFiltersType;
};

function getInitialFilters(
  years: ReadonlyArray<string>,
  selectedYear: string,
  selectedMonths: ReadonlyArray<string>,
): RoadmapFilter {
  return {
    months: {
      options: MONTHS,
      selectedOptions: selectedMonths,
      type: 'months',
    },
    years: {
      options: years,
      selectedOptions: [selectedYear],
      type: 'years',
    },
  };
}

function FilterSection({
  label,
  type,
  options,
  selectedOptions,
  onFilterChange,
}: FilterSectionOptions) {
  const handleFilterChange = (option: string) => {
    if (type === 'years') {
      onFilterChange(type, [option]);
    }

    if (type === 'months') {
      let nextSelectedOptions = [...selectedOptions];

      if (nextSelectedOptions.includes(option)) {
        nextSelectedOptions = nextSelectedOptions.filter(
          (selected) => selected !== option,
        );
      } else {
        nextSelectedOptions.push(option);
      }

      if (nextSelectedOptions.length) {
        onFilterChange(type, nextSelectedOptions);
      }
    }
  };

  return (
    <AccordionItem value={type}>
      <AccordionTrigger>
        <Text size="body2" weight="medium">
          {label}
        </Text>
      </AccordionTrigger>
      <AccordionContent>
        <div className="grid grid-cols-3 gap-x-4 gap-y-3">
          {options.map((option) => {
            const selected = selectedOptions.includes(option);

            return (
              <RoadmapProductFilterButton
                key={option}
                label={option}
                selected={selected}
                size="sm"
                onClick={() => handleFilterChange(option)}
              />
            );
          })}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

function getLabel(type: RoadmapFiltersType, intl: IntlShape) {
  if (type === 'months') {
    return intl.formatMessage({
      defaultMessage: 'Months',
      description: 'Title of months accordion in Roadmap Slide out filter',
      id: 'vMy9f3',
    });
  }

  if (type === 'years') {
    return intl.formatMessage({
      defaultMessage: 'Years',
      description: 'Title of years accordion in Roadmap Slide out filter',
      id: 'Vh9mwM',
    });
  }

  return '';
}

type Props = Readonly<{
  onApplyFilter: (months: ReadonlyArray<string>, year: string) => void;
  selectedMonths: ReadonlyArray<string>;
  selectedYear: string;
  years: ReadonlyArray<string>;
}>;

function RoadmapFilterSlideOut({
  onApplyFilter,
  years,
  selectedYear,
  selectedMonths,
}: Props) {
  const intl = useIntl();
  const [isFiltersShown, setIsFiltersShown] = useState(false);

  const [filters, setFilters] = useState(
    getInitialFilters(years, selectedYear, selectedMonths),
  );

  const handleFilterChange = (
    type: RoadmapFiltersType,
    options: ReadonlyArray<string>,
  ) => {
    let newFilters = {
      ...filters,
    };

    if (type === 'months') {
      newFilters.months = {
        ...filters.months,
        selectedOptions: options,
      };
    }

    if (type === 'years') {
      newFilters = {
        months: {
          ...filters.months,
          selectedOptions: getMonthsForYear(options[0]),
        },
        years: {
          ...filters.years,
          selectedOptions: options,
        },
      };
    }

    setFilters(newFilters);
  };

  const handleApplyFilter = () => {
    onApplyFilter(
      filters.months.selectedOptions,
      filters.years.selectedOptions[0],
    );
    setIsFiltersShown(false);
  };

  return (
    <SlideOut
      enterFrom="end"
      isShown={isFiltersShown}
      size="md"
      title={intl.formatMessage({
        defaultMessage: 'Filters',
        description: 'Title of Projects project filter slide-out',
        id: 'DdRaW3',
      })}
      trigger={
        <FilterButton
          icon={RiCalendar2Line}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'All filters',
            description:
              'Label for All Filters button for roadmap page on mobile',
            id: '/ElgZZ',
          })}
          selected={true}
          size="sm"
          onClick={() => {
            setIsFiltersShown(true);
          }}
        />
      }
      onClose={() => {
        setIsFiltersShown(false);
        setFilters(getInitialFilters(years, selectedYear, selectedMonths));
      }}>
      <div className="flex flex-col">
        <Divider color="emphasized" />
        <Accordion
          className="flex flex-col"
          defaultValue={accordionDefaultValues.slice()}
          type="multiple">
          {Object.entries(filters).map(([key, filter]) => {
            const label = getLabel(filter.type, intl);

            return (
              <Fragment key={key}>
                <FilterSection
                  label={label}
                  options={filter.options}
                  selectedOptions={filter.selectedOptions}
                  type={filter.type}
                  onFilterChange={handleFilterChange}
                />
              </Fragment>
            );
          })}
        </Accordion>
        <Divider color="emphasized" />
      </div>
      <div className="mt-5 flex flex-1">
        <Button
          display="block"
          label={intl.formatMessage({
            defaultMessage: 'Apply',
            description: 'Label for apply button',
            id: 'aJWJvF',
          })}
          size="md"
          variant="primary"
          onClick={handleApplyFilter}
        />
      </div>
    </SlideOut>
  );
}

export default RoadmapFilterSlideOut;
