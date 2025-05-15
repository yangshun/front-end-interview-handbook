'use client';

import { RiFolderOpenLine } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';

import EmptyState from '../ui/EmptyState';
import Heading from '../ui/Heading';
import Section from '../ui/Heading/HeadingContext';
import Spinner from '../ui/Spinner';
import Text from '../ui/Text';
import { useRoadmap } from './hooks/useRoadmap';
import RoadmapFilterSlideOut from './RoadmapFilterSlideOut';
import RoadmapItem from './RoadmapItem';
import RoadmapMonthFilter from './RoadmapMonthFilter';
import RoadmapProductFilter from './RoadmapProductFilter';
import YearFilter from './RoadmapYearFilter';

export type Product = 'interviews' | 'projects';

function RoadmapPage() {
  const intl = useIntl();
  const {
    data,
    error,
    isLoading,
    months,
    onApplyFilter,
    onMonthChange,
    onProductFilterChange,
    onYearChange,
    selectedProducts,
    selectedYear,
    showDefaultMonths,
    years,
  } = useRoadmap();

  const hasError = !isLoading && !!error;
  const noData = !isLoading && Array.from(data).length === 0;

  function render() {
    if (isLoading) {
      return (
        <div className="flex min-h-[120px] w-full items-center justify-center p-24">
          <Spinner size="md" />
        </div>
      );
    }

    if (hasError) {
      return (
        <div className="py-24 md:p-24">
          <EmptyState
            title={intl.formatMessage({
              defaultMessage: 'Something went wrong. Please try again later.',
              description: 'Title for error state for roadmap',
              id: 'I1R2rY',
            })}
            variant="error"
          />
        </div>
      );
    }

    return (
      <div className="flex items-start gap-6">
        <div className="flex flex-1 flex-col gap-y-6">
          <div className="flex justify-between">
            <RoadmapProductFilter
              selectedProducts={selectedProducts}
              onProductFilterChange={onProductFilterChange}
            />
            <div className="hidden md:block">
              <RoadmapMonthFilter
                months={months}
                showDefaultMonths={showDefaultMonths}
                onMonthsChange={onMonthChange}
              />
            </div>
            <div className="block md:hidden">
              <RoadmapFilterSlideOut
                key={`${selectedYear}-${months.join('-')}`}
                selectedMonths={months}
                selectedYear={selectedYear}
                years={years}
                onApplyFilter={onApplyFilter}
              />
            </div>
          </div>
          {noData ? (
            <div className="py-24 md:p-24">
              <EmptyState
                icon={RiFolderOpenLine}
                subtitle={intl.formatMessage({
                  defaultMessage:
                    'Adjust your filters a bit, and let’s see what we can find!',
                  description: 'Subtitle for empty state for roadmap',
                  id: 'USCbSv',
                })}
                title={intl.formatMessage({
                  defaultMessage: 'Nothing found just yet',
                  description: 'Title for empty state for roadmap',
                  id: '/5Oi3r',
                })}
                variant="empty"
              />
            </div>
          ) : (
            Array.from(data).map(([date, roadmapItems]) => (
              <RoadmapItem key={date} date={date} roadmapItems={roadmapItems} />
            ))
          )}
        </div>
        {years.length > 1 && (
          <div className="hidden md:block">
            <YearFilter
              selectedYear={selectedYear}
              years={years}
              onYearChange={onYearChange}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-8">
      <div className="flex max-w-prose flex-col gap-1">
        <Heading level="heading5">
          <FormattedMessage
            defaultMessage="Public roadmap"
            description="Title of Public roadmap page"
            id="qJhNva"
          />
        </Heading>
        <Section>
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="Upcoming content or features to be launched. Not all features will be publicized on the roadmap."
              description="Description of Public roadmap page"
              id="zUB9Jv"
            />
          </Text>
        </Section>
      </div>
      {render()}
    </div>
  );
}

export default RoadmapPage;
