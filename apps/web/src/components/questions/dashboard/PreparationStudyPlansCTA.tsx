import clsx from 'clsx';
import { RiArrowRightSLine, RiCalendar2Line } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

import { themeLineBackgroundColor } from '../../ui/theme';

export default function PreparationStudyPlansCTA() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Study plans"
          description="Preparation study plans"
          id="dOsu3y"
        />
      </Heading>
      <Card
        border={false}
        className={clsx(
          'group flex items-center justify-between gap-2 p-4',
          'border border-neutral-200 dark:border-transparent',
        )}
        padding={false}
        pattern={false}>
        <div className="flex items-center gap-3">
          <div
            aria-hidden="true"
            className={clsx(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-md',
              themeLineBackgroundColor,
            )}>
            <RiCalendar2Line
              className={clsx('h-5 w-5', themeTextSecondaryColor)}
            />
          </div>
          <Anchor href="/study-plans" variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text color="subtitle" display="block" size="body2">
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
            'h-6 w-6 shrink-0 text-neutral-500 dark:text-neutral-400',
          )}
        />
      </Card>
    </div>
  );
}
