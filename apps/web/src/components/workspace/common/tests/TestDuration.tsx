import Text from '~/components/ui/Text';

type Props = Readonly<{
  duration?: number;
}>;

export default function TestDuration({ duration }: Props) {
  if (!duration) {
    return null;
  }

  return (
    <Text className="whitespace-nowrap" color="subtle" size="body3">
      {duration} ms
    </Text>
  );
}
