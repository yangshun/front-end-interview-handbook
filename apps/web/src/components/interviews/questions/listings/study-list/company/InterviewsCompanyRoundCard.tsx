import clsx from 'clsx';
import type { ReactNode } from 'react';

import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import {
  themeBackgroundChipColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type Props = Readonly<{
  description: ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
}>;

export default function InterviewsCompanyRoundCard({
  icon: Icon,
  title,
  description,
}: Props) {
  return (
    <Card
      className="group/card relative isolate flex flex-col items-start gap-3 p-4"
      padding={false}>
      <div className="flex justify-between self-stretch">
        <span
          className={clsx(
            'inline-flex size-10 items-center justify-center rounded-md',
            themeBackgroundChipColor,
            themeTextSecondaryColor,
            'border border-transparent transition',
            'group-hover/card:border-brand-dark group-hover/card:text-brand-dark',
            'dark:group-hover/card:border-brand dark:group-hover/card:text-brand',
          )}>
          <Icon aria-hidden={true} className="size-6" />
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <Text
          className="block w-full truncate"
          color="label"
          size="body1"
          weight="medium">
          {title}
        </Text>
        <Text className="block w-full" color="subtle" size="body2">
          {description}
        </Text>
      </div>
    </Card>
  );
}
