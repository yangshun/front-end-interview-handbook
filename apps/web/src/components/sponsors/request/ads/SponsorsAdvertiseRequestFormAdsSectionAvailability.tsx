import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';

import { trpc } from '~/hooks/trpc';

import { FormattedMessage, useIntl } from '~/components/intl';
import Badge from '~/components/ui/Badge';
import Chip from '~/components/ui/Chip';
import Label from '~/components/ui/Label';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';
import {
  themeBorderBrandColor,
  themeBorderElementColor,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';
import { themeBackgroundElementEmphasizedStateColor_Hover } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import { SponsorAdFormatConfigs } from '../../SponsorsAdFormatConfigs';
import {
  sponsorsDateFormatterShort,
  sponsorsDateFormatterWithDayAndYear,
} from '../../SponsorsDatesUtils';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  adFormat: SponsorsAdFormat;
  mode?: 'create' | 'edit' | 'readonly';
  onAddWeek: (value: string) => void;
  onRemoveWeek: (value: string) => void;
  selectedWeeks: ReadonlyArray<string>;
  unavailableWeeks: ReadonlyArray<string>;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionAvailability({
  adFormat,
  selectedWeeks,
  onAddWeek,
  onRemoveWeek,
  unavailableWeeks,
  mode = 'create',
}: Props) {
  const intl = useIntl();
  const isReadonly = mode === 'readonly';
  const { isLoading, data } = trpc.sponsorships.availability.useQuery({
    format: adFormat,
  });

  const availableWeeks = data?.map((slot) => {
    return {
      ...slot,
      available: slot.available
        ? !unavailableWeeks.includes(`${slot.year}/${slot.week}`)
        : false,
    };
  });

  return (
    <div>
      <Label
        description={intl.formatMessage({
          defaultMessage: 'Select the weeks you would like to advertise',
          description: 'Label description for schedule',
          id: 'dCMrlg',
        })}
        label={intl.formatMessage({
          defaultMessage: 'Schedule',
          description: 'Label for schedule',
          id: '3Z408Q',
        })}
      />
      {availableWeeks == null ? (
        <div
          className={clsx(
            'flex items-center justify-center',
            'mt-3 h-[220px]',
          )}>
          <Spinner />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {availableWeeks.map(({ start, end, available, year, week }) => {
            const weekHash = `${year}/${week}`;
            const selected = selectedWeeks.includes(weekHash);

            return (
              <Tooltip
                key={weekHash}
                asChild={true}
                label={[
                  sponsorsDateFormatterWithDayAndYear.format(new Date(start)),
                  sponsorsDateFormatterWithDayAndYear.format(new Date(end)),
                ].join(' – ')}>
                <button
                  className={clsx(
                    'flex items-center justify-between gap-3',
                    'flex-1',
                    [
                      'border',
                      selected
                        ? themeBorderBrandColor
                        : themeBorderElementColor,
                    ],
                    themeBackgroundElementEmphasizedStateColor_Hover,
                    'rounded-md',
                    'transition-colors',
                    'px-4 py-3',
                    themeOutlineElement_FocusVisible,
                    themeOutlineElementBrandColor_FocusVisible,
                    'disabled:bg-neutral-300 dark:disabled:bg-neutral-700',
                    'disabled:opacity-75',
                  )}
                  disabled={!available || isLoading || isReadonly}
                  type="button"
                  onClick={() =>
                    selected ? onRemoveWeek(weekHash) : onAddWeek(weekHash)
                  }>
                  <div className="flex w-full items-center justify-between gap-4">
                    <Text
                      color={!available ? 'secondary' : undefined}
                      size="body2"
                      weight="medium">
                      {sponsorsDateFormatterShort.format(new Date(start))} -{' '}
                      {sponsorsDateFormatterShort.format(new Date(end))}
                    </Text>
                    {selected && (
                      <Chip
                        icon={FaCheck}
                        isLabelHidden={true}
                        label="Selected"
                        size="xs"
                        variant="neutral-active"
                      />
                    )}
                    {!available && (
                      <Badge label="Unavailable" size="xs" variant="neutral" />
                    )}
                  </div>
                </button>
              </Tooltip>
            );
          })}
        </div>
      )}
      {selectedWeeks.length > 0 && (
        <div className="mt-6 flex justify-between">
          <Text className="block" color="subtitle" size="body2">
            <FormattedMessage
              defaultMessage="{count, plural, one {# week} other {# weeks}} selected"
              description="Number of weeks"
              id="wQuRLK"
              values={{
                count: selectedWeeks.length,
              }}
            />
          </Text>
          <Text className="block" size="body1" weight="bold">
            <FormattedMessage
              defaultMessage="Total: ${total}"
              description="Total price label"
              id="0kDCAp"
              values={{
                total:
                  selectedWeeks.length *
                  SponsorAdFormatConfigs[adFormat].pricePerWeekUSD,
              }}
            />
          </Text>
        </div>
      )}
    </div>
  );
}
