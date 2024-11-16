import clsx from 'clsx';
import { sum, values } from 'lodash-es';
import { useMemo } from 'react';
import { RiInformationLine } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardWhiteOnLightColor,
  themeBorderElementColor,
  themeTextSubtleColor,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import InterviewsDashboardContributionsChart from './InterviewsDashboardContributionsChart';
import { findMaxConsecutiveDays, getDateRangeFromToday } from './utils';

type Props = Readonly<{
  contributions?: Record<string, number>;
  isContributionsLoading: boolean;
}>;

export default function InterviewsDashboardContributionsHeatmapCard({
  contributions,
  isContributionsLoading,
}: Props) {
  const { startTime, endTime } = useMemo(() => getDateRangeFromToday(), []);
  const maxConsecutiveDays = findMaxConsecutiveDays(contributions);
  const totalActiveDays = Object.keys(contributions ?? {}).length;
  const totalContributions = sum(values(contributions));

  return (
    <div
      className={clsx(
        'flex flex-col gap-6',
        'rounded-lg',
        'px-6 py-5',
        themeBackgroundCardWhiteOnLightColor,
        ['border', themeBorderElementColor],
      )}>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        {/* Contributions count */}
        <div className="flex items-center gap-2">
          <Text
            className={clsx([
              'transition-opacity duration-500',
              isContributionsLoading ? 'opacity-0' : 'opacity-100',
            ])}
            color="secondary"
            size="body1">
            <FormattedMessage
              defaultMessage="{count, plural, =0 {0 completions} one {<bold>{value}</bold> completion} other {<bold>{value}</bold> completions}} in the last year"
              description="Label for completions count"
              id="jOyFXD"
              values={{
                bold: (chunks) => (
                  <Text size="inherit" weight="bold">
                    {chunks}
                  </Text>
                ),
                count: totalContributions,
                value: new Intl.NumberFormat().format(totalContributions),
              }}
            />
          </Text>
          <Tooltip
            className={clsx([
              'transition-opacity duration-500',
              isContributionsLoading ? 'opacity-0' : 'opacity-100',
            ])}
            label={
              <div>
                <FormattedMessage
                  defaultMessage="Completions include both questions and articles across the interviews platform"
                  description="Label for completions tooltip"
                  id="b+T14M"
                />
                <ul className="list-inside list-disc">
                  <li>
                    <FormattedMessage
                      defaultMessage="An 'active day' is a day you completed at least 1 question"
                      description="Tooltip label for active day in completions"
                      id="lMWmct"
                    />
                  </li>
                  <li>
                    <FormattedMessage
                      defaultMessage="'Max streak' is the number of continuous active days"
                      description="Tooltip label for active day in completions"
                      id="C9XhYm"
                    />
                  </li>
                </ul>
              </div>
            }>
            <RiInformationLine
              className={clsx('size-4', themeTextSubtleColor, [
                'transition-opacity duration-500',
                isContributionsLoading ? 'opacity-0' : 'opacity-100',
              ])}
            />
          </Tooltip>
        </div>
        {/* Active days and max streak */}
        <div className="flex flex-col flex-wrap items-start gap-x-4 gap-y-1.5 md:flex-row">
          <Tooltip
            className={clsx(
              [
                'transition-opacity duration-500',
                isContributionsLoading ? 'opacity-0' : 'opacity-100',
              ],
              [!isContributionsLoading && totalActiveDays === 0 && 'hidden'],
            )}
            label={
              <FormattedMessage
                defaultMessage="In the past year, you have been active for {days, plural, =0 {0 days} =1 {1 day} other {# days}}, completing at least one question each day."
                description="Tooltip for max completion streak"
                id="STZzq1"
                values={{
                  days: totalActiveDays,
                }}
              />
            }>
            <Text
              className={clsx(
                [
                  'transition-opacity duration-500',
                  isContributionsLoading ? 'opacity-0' : 'opacity-100',
                ],
                [!isContributionsLoading && totalActiveDays === 0 && 'hidden'],
              )}
              color="secondary"
              size="body2">
              <FormattedMessage
                defaultMessage="Total active days: <bold>{count}</bold>"
                description="Label for active days"
                id="dpBKYx"
                values={{
                  bold: (chunks) => (
                    <Text color="subtitle" size="inherit" weight="medium">
                      {chunks}
                    </Text>
                  ),
                  count: new Intl.NumberFormat().format(totalActiveDays),
                }}
              />
            </Text>
          </Tooltip>
          <Tooltip
            className={clsx(
              [
                'transition-opacity duration-500',
                isContributionsLoading ? 'opacity-0' : 'opacity-100',
              ],
              [!isContributionsLoading && maxConsecutiveDays === 0 && 'hidden'],
            )}
            label={
              <FormattedMessage
                defaultMessage="In the past year, you remained active for {days, plural, =0 {0 days} =1 {1 day} other {# consecutive days}}, completing at least one question per day"
                description="Tooltip for contributions max streak"
                id="zkccTX"
                values={{
                  days: maxConsecutiveDays,
                }}
              />
            }>
            <Text
              className={clsx(
                [
                  'transition-opacity duration-500',
                  isContributionsLoading ? 'opacity-0' : 'opacity-100',
                ],
                [
                  !isContributionsLoading &&
                    maxConsecutiveDays === 0 &&
                    'hidden',
                ],
              )}
              color="secondary"
              size="body2">
              <FormattedMessage
                defaultMessage="Max streak: <bold>{count}</bold>"
                description="Label for max streak"
                id="glZsYe"
                values={{
                  bold: (chunks) => (
                    <Text color="subtitle" size="inherit" weight="medium">
                      {chunks}
                    </Text>
                  ),
                  count: new Intl.NumberFormat().format(maxConsecutiveDays),
                }}
              />
            </Text>
          </Tooltip>
        </div>
      </div>
      {/* Contributions heatmap */}
      <InterviewsDashboardContributionsChart
        contributions={contributions}
        endTime={endTime}
        isContributionsLoading={isContributionsLoading}
        startTime={startTime}
      />
    </div>
  );
}
