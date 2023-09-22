import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';

export type TestsOutcome = 'accepted' | 'none' | 'wrong_answer';

type Props = Readonly<{
  outcome: TestsOutcome;
}>;

export default function TestsOutcomeBadge({ outcome }: Props) {
  switch (outcome) {
    case 'accepted':
      return (
        <Text color="success" size="body3" weight="medium">
          Accepted
        </Text>
      );
    case 'wrong_answer':
      return (
        <Text color="error" size="body3" weight="medium">
          Wrong answer
        </Text>
      );
    case 'none':
      return null;
  }
}
