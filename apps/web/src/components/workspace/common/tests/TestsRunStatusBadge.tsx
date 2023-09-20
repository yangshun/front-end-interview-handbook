import Badge from '~/components/ui/Badge';

export type TestsRunStatus = 'complete' | 'idle' | 'initializing' | 'running';

type Props = Readonly<{
  status: TestsRunStatus;
}>;

export default function TestsRunStatusBadge({ status }: Props) {
  switch (status) {
    case 'complete':
      return <Badge label="Tests completed" size="sm" variant="info" />;
    case 'idle':
      return <Badge label="Idle" size="sm" variant="neutral" />;
    case 'initializing':
      return <Badge label="Initializing" size="sm" variant="neutral" />;
    case 'running':
      return <Badge label="Running tests" size="sm" variant="warning" />;
  }
}
