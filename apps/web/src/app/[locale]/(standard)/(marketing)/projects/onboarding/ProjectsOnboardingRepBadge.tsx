import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeBackgroundLayerEmphasized } from '~/components/ui/theme';

type Props = Readonly<{
  className?: string;
  repCount: number;
}>;

export function ProjectsOnboardingRepBadge({ className, repCount }: Props) {
  return (
    <div
      className={clsx(
        'flex items-center gap-1 rounded-full px-3 py-1',
        themeBackgroundLayerEmphasized,
        className,
      )}>
      <RiFireLine className="text-brand h-4 w-4" />
      <Text size="body3">
        <FormattedMessage
          defaultMessage="+{repCount} rep"
          description="Label for reputation count on Projects profile onboarding page"
          id="6+Kd4B"
          values={{
            repCount,
          }}
        />
      </Text>
    </div>
  );
}
