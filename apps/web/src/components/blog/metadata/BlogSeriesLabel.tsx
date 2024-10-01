import { FormattedMessage } from '~/components/intl';
import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  size?: TextSize;
}>;

export default function BlogSeriesLabel({ size = 'body3' }: Props) {
  return (
    <Text
      className="bg-info whitespace-nowrap rounded px-2 py-[2px]"
      size={size}>
      <FormattedMessage
        defaultMessage="Series"
        description="Label for Blog Series"
        id="LSdhYS"
      />
    </Text>
  );
}
