'use client';

import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Text from '~/components/ui/Text';

import { skipTextClassName } from './style';
import type { TestResults } from './types';

export type TestsOutcome = 'correct' | 'indeterminate' | 'none' | 'wrong';

type Props = Readonly<{
  outcome: TestsOutcome;
  results: TestResults;
}>;

export default function TestsOutcomeBadge({ outcome, results }: Props) {
  const intl = useIntl();

  return (
    <div className="flex gap-x-2 font-mono">
      {outcome === 'correct' && (
        <Text color="success" size="body3" weight="bold">
          {intl.formatMessage({
            defaultMessage: 'Correct',
            description: 'Workspace test outcome correct label',
            id: 'ITigYA',
          })}
        </Text>
      )}
      {outcome === 'wrong' && (
        <Text color="error" size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Wrong answer',
            description: 'Workspace test outcome wrong label',
            id: 'Jb6oWn',
          })}
        </Text>
      )}
      <Text size="body3">
        {results.fail > 0 && (
          <>
            <Text color="error" size="body3" weight="medium">
              {intl.formatMessage(
                {
                  defaultMessage: '{failCount} failed',
                  description: 'Workspace test outcome failed label',
                  id: 'iKwzQ1',
                },
                { failCount: results.fail },
              )}
            </Text>
            ,{' '}
          </>
        )}
        {results.skip > 0 && (
          <>
            <span className={clsx(skipTextClassName)}>
              {intl.formatMessage(
                {
                  defaultMessage: '{skipCount} skipped',
                  description: 'Workspace test outcome skipped label',
                  id: '4jymHU',
                },
                { skipCount: results.skip },
              )}
            </span>
            ,{' '}
          </>
        )}
        {results.pass > 0 && (
          <>
            <Text color="success" size="body3" weight="medium">
              {intl.formatMessage(
                {
                  defaultMessage: '{passCount} passed',
                  description: 'Workspace test outcome passed label',
                  id: 'r2sftL',
                },
                { passCount: results.pass },
              )}
            </Text>
            ,{' '}
          </>
        )}
        <span>
          {intl.formatMessage(
            {
              defaultMessage: '{totalCount} total',
              description: 'Workspace test outcome total count label',
              id: 'CONsK1',
            },
            { totalCount: results.total },
          )}
        </span>
      </Text>
    </div>
  );
}
