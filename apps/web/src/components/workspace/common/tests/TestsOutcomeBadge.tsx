import clsx from 'clsx';

import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';

import {
  failTextClassName,
  passTextClassName,
  skipTextClassName,
} from './style';
import type { TestResults } from './types';

export type TestsOutcome =
  | 'accepted'
  | 'indeterminate'
  | 'none'
  | 'wrong_answer';

type Props = Readonly<{
  outcome: TestsOutcome;
  results: TestResults;
}>;

export default function TestsOutcomeBadge({ outcome, results }: Props) {
  return (
    <div className="flex gap-x-4">
      {outcome === 'accepted' && (
        <Text color="success" size="body3" weight="medium">
          Accepted
        </Text>
      )}
      {outcome === 'wrong_answer' && (
        <Text color="error" size="body3" weight="medium">
          Wrong answer
        </Text>
      )}
      <Text size="body3">
        {results.fail > 0 && (
          <>
            <Text color="error" size="body3" weight="medium">
              {results.fail} failed
            </Text>
            ,{' '}
          </>
        )}
        {results.skip > 0 && (
          <>
            <span className={clsx(skipTextClassName)}>
              {results.skip} skipped
            </span>
            ,{' '}
          </>
        )}
        {results.pass > 0 && (
          <>
            <Text color="success" size="body3" weight="medium">
              {results.pass} passed
            </Text>
            ,{' '}
          </>
        )}
        <span>{results.total} total</span>
      </Text>
    </div>
  );
}
