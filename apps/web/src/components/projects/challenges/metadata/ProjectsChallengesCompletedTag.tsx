import clsx from 'clsx';
import { RiCheckboxCircleLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  count: number;
  tooltip?: string;
}>;

export default function ProjectsChallengesCompletedTag({
  count,
  tooltip,
}: Props) {
  const contents = (
    <div className={clsx('flex items-center gap-1', themeTextSubtleColor)}>
      <RiCheckboxCircleLine
        aria-hidden={true}
        className={clsx('size-4 shrink-0')}
      />
      <Text color="inherit" size="body3">
        <FormattedMessage
          defaultMessage="{count, plural, =0 {No challenges completed} one {<bold>1</bold> challenge completed} other {<bold>#</bold> challenges completed}}"
          description="Completed project challenges label"
          id="DSJ98t"
          values={{
            bold: (chunks) => (
              <Text color="secondary" size="body2" weight="medium">
                {chunks}
              </Text>
            ),
            count,
          }}
        />
      </Text>
    </div>
  );

  return tooltip ? <Tooltip label={tooltip}>{contents}</Tooltip> : contents;
}
