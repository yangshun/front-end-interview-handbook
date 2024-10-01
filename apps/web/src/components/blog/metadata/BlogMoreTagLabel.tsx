import clsx from 'clsx';

import { FormattedMessage } from '~/components/intl';
import Tooltip from '~/components/ui/Tooltip';

type LabelSize = 'md' | 'sm';

type Props = Readonly<{
  count: number;
  moreTags: ReadonlyArray<string>;
  size?: LabelSize;
}>;

const sizeClasses: Record<LabelSize, string> = {
  md: 'px-3 text-sm gap-1.5',
  sm: 'px-2 text-xs gap-1',
};

export default function BlogMoreTagLabel({
  count,
  size = 'sm',
  moreTags = [],
}: Props) {
  return (
    <Tooltip className="inline-flex" label={moreTags.join(', ')}>
      <span
        className={clsx(
          'relative inline-flex items-center whitespace-nowrap rounded-full border border-neutral-700 bg-neutral-200 py-px font-medium dark:border-neutral-300 dark:bg-neutral-600',
          sizeClasses[size],
        )}>
        <span className="text-neutral-700 dark:text-neutral-300">
          <FormattedMessage
            defaultMessage="+ {numberOfTags} more"
            description="Number of tags in a list"
            id="Ctnuuc"
            values={{
              numberOfTags: count,
            }}
          />
        </span>
      </span>
    </Tooltip>
  );
}
