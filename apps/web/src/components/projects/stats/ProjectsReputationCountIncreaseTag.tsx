import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeTextSubtleColor,
} from '~/components/ui/theme';

type TagVariant = 'filled' | 'flat';

type Props = Readonly<{
  className?: string;
  repCount: number;
  variant: TagVariant;
}>;

export default function ProjectsReputationCountIncreaseTag({
  repCount,
  className,
  variant,
}: Props) {
  return (
    <div
      className={clsx(
        'flex items-center gap-1',
        variant === 'filled' && [
          'rounded-full px-3 py-1',
          themeBackgroundLayerEmphasized,
        ],
        variant === 'flat' && themeTextSubtleColor,
        className,
      )}>
      <RiFireLine
        className={clsx('h-4 w-4', variant === 'filled' && 'text-brand')}
      />
      <Text
        color={variant === 'filled' ? 'default' : 'inherit'}
        size="body3"
        weight={variant === 'filled' ? 'medium' : 'normal'}>
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
