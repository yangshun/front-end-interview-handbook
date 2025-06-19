import clsx from 'clsx';

import Text from '~/components/ui/Text';
import { themeTextSubtitleColor } from '~/components/ui/theme';

type Props = Readonly<{
  features: ReadonlyArray<{
    icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
    label: string;
  }>;
}>;

export default function InterviewsPageFeatures({ features }: Props) {
  return (
    <div
      className={clsx(
        'flex flex-wrap sm:flex-row',
        'gap-x-6 gap-y-4 sm:gap-x-8 md:gap-x-12',
      )}>
      {features.map(({ icon: FeatureIcon, label }) => (
        <div key={label} className={clsx('flex items-center gap-2')}>
          <FeatureIcon className={clsx('size-5', themeTextSubtitleColor)} />
          <Text color="secondary" size="body2" weight="medium">
            {label}
          </Text>
        </div>
      ))}
    </div>
  );
}
