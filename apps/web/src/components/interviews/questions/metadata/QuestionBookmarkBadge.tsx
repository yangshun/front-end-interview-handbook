import clsx from 'clsx';
import { RiBookmarkFill } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import { themeTextColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

export default function QuestionBookmarkBadge() {
  const intl = useIntl();

  return (
    <Tooltip
      label={intl.formatMessage({
        defaultMessage: 'Bookmarked',
        description: 'Label for bookmarked questions',
        id: 'g10u8W',
      })}>
      <div className="p-1">
        <RiBookmarkFill
          aria-label={intl.formatMessage({
            defaultMessage: 'Bookmarked',
            description: 'Label for bookmarked questions',
            id: 'g10u8W',
          })}
          className={clsx('size-3 shrink-0', 'relative', themeTextColor)}
        />
      </div>
    </Tooltip>
  );
}
