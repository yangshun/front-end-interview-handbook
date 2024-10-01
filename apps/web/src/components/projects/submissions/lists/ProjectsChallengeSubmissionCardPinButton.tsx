import clsx from 'clsx';
import { RiPushpinLine, RiUnpinLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

export default function ProjectsChallengeSubmissionCardPinButton({
  onUnpin,
  isPinned,
}: {
  isPinned: boolean;
  onUnpin?: () => void;
}) {
  const intl = useIntl();

  return (
    <Button
      className={clsx(
        isPinned &&
          'dark:!text-danger !text-danger dark:!border-danger !border-danger',
      )}
      icon={isPinned ? RiUnpinLine : RiPushpinLine}
      label={
        isPinned
          ? intl.formatMessage({
              defaultMessage: 'Unpin',
              description: 'Unpin button label',
              id: 'Y2R80N',
            })
          : intl.formatMessage({
              defaultMessage: 'Pin',
              description: 'Pin button label',
              id: 'Fb1C2W',
            })
      }
      size="xs"
      variant="secondary"
      onClick={onUnpin}
    />
  );
}
