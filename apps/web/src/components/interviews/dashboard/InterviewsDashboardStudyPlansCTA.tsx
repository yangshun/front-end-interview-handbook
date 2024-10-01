import clsx from 'clsx';
import { RiArrowRightSLine, RiCalendar2Line } from 'react-icons/ri';

import { FormattedMessage } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import {
  themeBackgroundCardColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeTextBrandColor_GroupHover,
  themeTextSecondaryColor,
} from '~/components/ui/theme';
import { themeBackgroundChipColor } from '~/components/ui/theme';

export default function InterviewsDashboardStudyPlansCTA() {
  return (
    <div className="group flex w-full flex-col gap-4">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Study plans"
          description="Preparation study plans"
          id="dOsu3y"
        />
      </Heading>
      <div
        className={clsx(
          'group relative flex items-center justify-between px-4 py-3',
          'border border-neutral-200 dark:border-transparent',
          'rounded-lg',
          'transition-colors',
          themeBackgroundCardColor,
          themeBackgroundElementEmphasizedStateColor_Hover,
        )}>
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className={clsx(
              'size-12 flex shrink-0 items-center justify-center rounded-md',
              themeBackgroundChipColor,
            )}>
            <RiCalendar2Line
              className={clsx('size-5', themeTextSecondaryColor)}
            />
          </div>
          <Anchor href="/study-plans" variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text className="block" color="subtitle" size="body3">
              <FormattedMessage
                defaultMessage="We help you get ready within 1 week, 1 month or 3 months"
                description="Study plans description"
                id="O9szXK"
              />
            </Text>
          </Anchor>
        </div>
        <RiArrowRightSLine
          className={clsx(
            'size-6 shrink-0 text-neutral-500 dark:text-neutral-400',
            themeTextBrandColor_GroupHover,
          )}
        />
      </div>
    </div>
  );
}
