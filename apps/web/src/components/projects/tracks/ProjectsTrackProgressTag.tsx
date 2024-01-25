import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  completed: number;
  iconClassName?: string;
  showProgress?: boolean;
  total: number;
}>;

export default function ProjectsTrackProgressTag({
  completed,
  total,
  showProgress = true,
  iconClassName,
}: Props) {
  const intl = useIntl();

  return (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiRocketLine className={clsx('h-5 w-5', iconClassName)} />
      <Text color="inherit" size="body2">
        <FormattedMessage
          defaultMessage="<bold>{completedCount}</bold>/{totalCount} challenges"
          description="Rep count label in Projects"
          id="26Xmcd"
          values={{
            bold: (chunks) => (
              <Text color="secondary" size="body2" weight="medium">
                {chunks}
              </Text>
            ),
            completedCount: completed,
            totalCount: total,
          }}
        />
      </Text>
      {showProgress && (
        <div>
          <ProgressBar
            label={intl.formatMessage(
              {
                defaultMessage:
                  'Label for "Completed projects" progress bar of a Projects component track',
                description: '{completedCount} out of {totalCount} challenges',
                id: 'GSfE/S',
              },
              {
                completedCount: completed,
                totalCount: total,
              },
            )}
            total={total}
            value={completed}
          />
        </div>
      )}
    </div>
  );
}
