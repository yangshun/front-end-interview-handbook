import clsx from 'clsx';
import { format } from 'date-fns';
import { FaCheck } from 'react-icons/fa6';
import type { StableActions } from 'react-use/lib/useSet';

import { trpc } from '~/hooks/trpc';

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
import Tooltip from '~/components/ui/Tooltip';

import { SponsorAdFormatConfigs } from '../SponsorsAdFormatConfigs';
import { themeBackgroundElementEmphasizedStateColor_Hover } from '../../ui/theme';

import type { SponsorsAdFormat } from '@prisma/client';

type Props = Readonly<{
  adFormat: SponsorsAdFormat;
  selectedWeeks: Set<string>;
  selectedWeeksActions: StableActions<string>;
}>;

export default function SponsorsAdvertiseRequestFormAdsSectionAvailability({
  adFormat,
  selectedWeeks,
  selectedWeeksActions,
}: Props) {
  const { isLoading, data } = trpc.sponsorships.availability.useQuery({
    format: adFormat,
  });

  return (
    <div>
      <Label
        description="Select the weeks you would like to advertise"
        label="Schedule"
      />
      {data == null ? (
        <div
          className={clsx(
            'flex items-center justify-center',
            'mt-3 h-[220px]',
          )}>
          <Spinner />
        </div>
      ) : (
        <div className="mt-3 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {data.map(({ start, end, available, year, week }) => {
            const weekHash = `${year}/${week}`;
            const selected = selectedWeeks.has(weekHash);

            return (
              <Tooltip
                key={weekHash}
                asChild={true}
                label={`${format(new Date(start), 'do MMM yyyy')} – ${format(new Date(end), 'do MMM yyyy')}`}>
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
                  disabled={!available || isLoading}
                  type="button"
                  onClick={() =>
                    selected
                      ? selectedWeeksActions.remove(weekHash)
                      : selectedWeeksActions.add(weekHash)
                  }>
                  <div className="flex w-full items-center justify-between gap-4">
                    <Text
                      color={!available ? 'secondary' : undefined}
                      size="body2"
                      weight="medium">
                      {format(new Date(start), 'MMM dd')} –{' '}
                      {format(new Date(end), 'MMM dd')}
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
      {selectedWeeks.size > 0 && (
        <div className="mt-6 flex justify-between">
          <Text className="block" color="subtitle" size="body2">
            {selectedWeeks.size} week(s) selected
          </Text>
          <Text className="block" size="body1" weight="bold">
            Total: $
            {selectedWeeks.size *
              SponsorAdFormatConfigs[adFormat].pricePerWeekUSD}
          </Text>
        </div>
      )}
    </div>
  );
}
