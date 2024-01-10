import clsx from 'clsx';
import { RiRocketLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  total: number;
  value: number;
}>;

export default function ProjectsChallengeCountTag({ value, total }: Props) {
  const intl = useIntl();

  return (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiRocketLine className="h-5 w-5" />
      <Text color="inherit" size="body2">
        <FormattedMessage
          defaultMessage="<bold>{value}</bold>/{total} projects"
          description="Rep count label in Projects"
          id="E2hv0Z"
          values={{
            bold: (chunks) => (
              <Text color="secondary" size="body2" weight="medium">
                {chunks}
              </Text>
            ),
            total,
            value,
          }}
        />
      </Text>
      <div>
        <ProgressBar
          label={intl.formatMessage(
            {
              defaultMessage:
                'Label for "Completed projects" progress bar of a Projects component track',
              description: '{value} out of {total} projects',
              id: 'Mw/xN0',
            },
            {
              total,
              value,
            },
          )}
          total={total}
          value={value}
        />
      </div>
    </div>
  );
}
