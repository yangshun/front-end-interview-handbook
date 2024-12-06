import clsx from 'clsx';
import { useMemo } from 'react';

import { FormattedMessage, useIntl } from '~/components/intl';
import ScrollArea from '~/components/ui/ScrollArea';
import Text from '~/components/ui/Text';
import { themeBackgroundLineEmphasizedColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { daysInMonth, getAllDatesInRange, groupByDateFormatter } from './utils';

const contributionColorMap: Record<number, string> = {
  0: themeBackgroundLineEmphasizedColor,
  1: 'bg-green-400 dark:bg-green-900',
  2: 'bg-green-500 dark:bg-green-800',
  3: 'bg-green-600 dark:bg-green-600',
  4: 'bg-green-800 dark:bg-green-500',
};

type Props = Readonly<{
  contributions?: Record<string, number>;
  endTime: Date;
  isContributionsLoading: boolean;
  startTime: Date;
}>;

export default function InterviewsDashboardContributionsChart({
  contributions,
  startTime,
  endTime,
  isContributionsLoading,
}: Props) {
  const intl = useIntl();
  const months = useMemo(
    () => getAllDatesInRange(startTime, endTime),
    [startTime, endTime],
  );
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <div className="flex flex-col gap-6">
      <ScrollArea scrollbars="horizontal">
        <div
          className={clsx(
            'grid auto-cols-max grid-flow-col grid-rows-4 sm:grid-rows-2 lg:grid-rows-1',
            'place-content-center',
            'gap-x-0.5 gap-y-2',
          )}>
          {months.map((item) => {
            const { month, days } = item;
            const iteratingDate = new Date(days[0].date);
            const iteratingYear = iteratingDate.getFullYear();
            const iteratingMonth = iteratingDate.getMonth();
            const numberOfDays = daysInMonth(iteratingYear, iteratingMonth);

            // Skip the incomplete months from UI but not from the current month of the year
            // E.g if 26 july 2023 to 26 july 2024, show only 1st Aug 2023 to 26 July 2024
            if (iteratingYear !== currentYear && numberOfDays !== days.length) {
              return null;
            }

            return (
              <div key={month} className="flex flex-col items-center gap-2.5">
                <div className="grid-rows-7 grid shrink-0 auto-cols-max grid-flow-col items-start gap-0.5">
                  {days.map((day, index) => {
                    const { date, dayOfWeek } = day;
                    const formattedDate = groupByDateFormatter.format(
                      new Date(date),
                    );
                    const contributionCount =
                      contributions?.[formattedDate] ?? 0;
                    const formatter = new Intl.DateTimeFormat('en-US', {
                      day: 'numeric',
                      month: 'long',
                    });

                    const tooltipLabel =
                      contributionCount === 0
                        ? intl.formatMessage(
                            {
                              defaultMessage: 'No completions on {date}',
                              description: 'Tooltip label for completion count',
                              id: 'Eah4gl',
                            },
                            {
                              date: formatter.format(new Date(date)),
                            },
                          )
                        : intl.formatMessage(
                            {
                              defaultMessage:
                                '{count, plural, one {# completion on {date}} other {# completions on {date}}}',
                              description: 'Tooltip label for completion count',
                              id: 'yin+9r',
                            },
                            {
                              count: contributionCount,
                              date: formatter.format(new Date(date)),
                            },
                          );

                    return (
                      <Tooltip key={date} asChild={true} label={tooltipLabel}>
                        <div
                          className={clsx(
                            'size-4 md:size-[19px] lg:size-[13.4px] rounded-sm',
                            index === 0 && [
                              dayOfWeek === 'Sunday' && 'row-start-1',
                              dayOfWeek === 'Monday' && 'row-start-2',
                              dayOfWeek === 'Tuesday' && 'row-start-3',
                              dayOfWeek === 'Wednesday' && 'row-start-4',
                              dayOfWeek === 'Thursday' && 'row-start-5',
                              dayOfWeek === 'Friday' && 'row-start-6',
                              dayOfWeek === 'Saturday' && 'row-start-7',
                            ],
                            [
                              'transition-colors duration-500',
                              isContributionsLoading && contributionColorMap[0],
                            ],
                            [
                              contributionCount >= 4
                                ? contributionColorMap[4]
                                : contributionColorMap[contributionCount],
                            ],
                          )}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
                <Text color="subtitle" size="body3" weight="medium">
                  {month}
                </Text>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <div className="flex items-center justify-end gap-2">
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="Less"
            description="Label for less contribution"
            id="etKgoR"
          />
        </Text>
        <div className="flex gap-1">
          {[0, 1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className={clsx(
                'size-3.5 rounded-sm',
                contributionColorMap[item],
              )}
            />
          ))}
        </div>
        <Text color="secondary" size="body2">
          <FormattedMessage
            defaultMessage="More"
            description="Label for more contribution"
            id="vyB72k"
          />
        </Text>
      </div>
    </div>
  );
}
