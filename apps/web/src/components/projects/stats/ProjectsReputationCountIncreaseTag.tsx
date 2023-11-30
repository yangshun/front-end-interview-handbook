import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

type Props = Readonly<{
  repCount: number;
}>;

export default function ProjectsReputationCountIncreaseTag({
  repCount,
}: Props) {
  return (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiFireLine className="h-4 w-4" />
      <Text color="inherit" size="body2">
        <FormattedMessage
          defaultMessage="+{repCount} rep"
          description="Rep count increase label in Projects"
          id="LfoHxa"
          values={{
            repCount,
          }}
        />
      </Text>
    </div>
  );
}
