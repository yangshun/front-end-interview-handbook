import clsx from 'clsx';

import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextSecondaryColor } from '~/components/ui/theme';

type Props = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
}>;

export default function ProjectsAssetProvidedCard({
  icon: Icon,
  label,
}: Props) {
  return (
    <Card disableBackground={true} padding={false} pattern={false}>
      <div
        className={clsx(
          'flex items-center gap-2 p-4',
          themeTextSecondaryColor,
        )}>
        <Icon className="h-4 w-4 shrink-0" />
        <Text color="inherit" size="body2">
          {label}
        </Text>
      </div>
    </Card>
  );
}
