import Badge from '~/components/ui/Badge';

export type TestsOutcome = 'accepted' | 'none' | 'wrong_answer';

type Props = Readonly<{
  outcome: TestsOutcome;
}>;

export default function TestsOutcomeBadge({ outcome }: Props) {
  switch (outcome) {
    case 'accepted':
      return <Badge label="Accepted" size="sm" variant="success" />;
    case 'wrong_answer':
      return <Badge label="Wrong Answer" size="sm" variant="danger" />;
    case 'none':
      return null;
  }
}
