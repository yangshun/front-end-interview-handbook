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
    <div className={clsx('flex flex-wrap items-center gap-6')}>
      {features.map(({ icon: FeatureIcon, label }, index) => (
        <div key={label} className={clsx('flex items-center gap-6')}>
          <div className={clsx('flex items-center gap-2')}>
            <FeatureIcon className={clsx('size-5', themeTextSubtitleColor)} />
            <Text color="secondary" size="body2" weight="medium">
              {label}
            </Text>
          </div>
          {index + 1 !== features.length && (
            <div
              className={clsx('h-3 w-px', 'bg-neutral-400 dark:bg-neutral-600')}
            />
          )}
        </div>
      ))}
    </div>
  );
}
