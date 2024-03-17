import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import {
  themeBackgroundLayerEmphasized,
  themeBorderSubtleColor,
  themeTextBrandColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type TagVariant = 'filled' | 'flat' | 'underline';

type Props = Readonly<{
  className?: string;
  points: number;
  variant?: TagVariant;
}>;

export default function ProjectsChallengeReputationTag({
  points,
  className,
  variant = 'flat',
}: Props) {
  return (
    <div
      className={clsx(
        'flex items-center gap-1',
        variant === 'filled' && [
          'rounded-full px-3 py-1',
          themeBackgroundLayerEmphasized,
        ],
        className,
      )}>
      <RiFireLine
        className={clsx(
          'size-4',
          variant === 'filled' ? themeTextBrandColor : themeTextSecondaryColor,
        )}
      />
      <Text
        className={clsx(
          variant === 'underline' && [
            'py-1',
            '-mb-0.5',
            'border-b border-dashed',
            themeBorderSubtleColor,
          ],
        )}
        color={variant === 'filled' ? 'default' : 'secondary'}
        size="body3"
        weight={variant === 'filled' ? 'medium' : 'normal'}>
        <FormattedMessage
          defaultMessage="{points} rep"
          description="Reputation points to be gained"
          id="md057S"
          values={{
            points,
          }}
        />
      </Text>
    </div>
  );
}
