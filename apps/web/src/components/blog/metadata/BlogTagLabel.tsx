import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';

type LabelSize = 'md' | 'sm';

type Props = Readonly<{
  size?: LabelSize;
  value: string;
}>;

export default function BlogTagLabel({ value }: Props) {
  return (
    <Anchor className="inline-flex" href={`/blog/tags/${value}`}>
      <Text color="inherit" size="body3">
        #{value}
      </Text>
    </Anchor>
  );
}
