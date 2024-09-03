import clsx from 'clsx';
import { FormattedMessage } from 'react-intl';

import { textVariants } from '~/components/ui/Text';
import { themeBackgroundColor } from '~/components/ui/theme';

export default function QuestionNewLabel({
  created,
}: Readonly<{
  created: number;
}>) {
  const currentDate = new Date();
  // One month ago.
  const cutoffDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));

  // Don't show "NEW" label if question was created before cutoff time.
  if (created < cutoffDate.getTime() / 1000) {
    return null;
  }

  return (
    <span className="absolute -right-2 top-2 isolate">
      <span
        className={clsx(
          'relative z-[1]',
          'px-2 py-0.5',
          'rounded-l',
          'border border-[#cfcfd1] dark:border-neutral-800',
          themeBackgroundColor,
          textVariants({
            color: 'subtitle',
            size: 'body3',
            weight: 'bold',
          }),
          'shadow-md',
        )}>
        <FormattedMessage
          defaultMessage="NEW"
          description="Label for new questions ribbon"
          id="3FeosO"
        />
      </span>
      <svg
        className={clsx('h-2.5 w-2', 'absolute right-0 -translate-y-0.5')}
        viewBox="0 0 8 10"
        xmlns="http://www.w3.org/2000/svg">
        <path
          className="fill-white stroke-[#cfcfd1] dark:fill-neutral-950 dark:stroke-neutral-800"
          d="M0.5 0.5H6.95969L0.5 8.57461V0.5Z"
        />
      </svg>
    </span>
  );
}
