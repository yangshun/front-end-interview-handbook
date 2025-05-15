import Text from './Text';

type Props = Readonly<{
  maxLength: number;
  valueLength: number;
}>;

export default function TextMaxLengthLabel({ maxLength, valueLength }: Props) {
  return (
    <Text size="body3">
      <Text color={valueLength > maxLength ? 'error' : 'subtle'} size="inherit">
        {valueLength}
      </Text>
      <Text color="subtle" size="inherit">
        /{maxLength}
      </Text>
    </Text>
  );
}
