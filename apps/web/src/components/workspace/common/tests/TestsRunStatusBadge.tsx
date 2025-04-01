'use client';

import { FaCheck } from 'react-icons/fa6';
import { RiCloseLine, RiHourglassLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import Spinner from '~/components/ui/Spinner';
import Text from '~/components/ui/Text';

export type TestsRunStatus =
  | 'complete'
  | 'error'
  | 'idle'
  | 'initializing'
  | 'running';

type Props = Readonly<{
  status: TestsRunStatus;
}>;

export default function TestsRunStatusBadge({ status }: Props) {
  const intl = useIntl();

  return (
    <Text
      className="inline-flex items-center gap-x-2"
      color="subtle"
      size="body3">
      {(() => {
        switch (status) {
          case 'complete':
            return (
              <>
                <FaCheck aria-hidden="true" className="size-4 shrink-0" />
                {intl.formatMessage({
                  defaultMessage: 'Run completed',
                  description: 'Workspace test run completed label',
                  id: 'dU7KZb',
                })}
              </>
            );
          case 'error':
            return (
              <>
                <RiCloseLine aria-hidden="true" className="size-4 shrink-0" />
                {intl.formatMessage({
                  defaultMessage: 'Error',
                  description: 'Workspace test error label',
                  id: 'apFngj',
                })}
              </>
            );
          case 'idle':
            return (
              <>
                <RiHourglassLine
                  aria-hidden="true"
                  className="size-4 shrink-0"
                />
                {intl.formatMessage({
                  defaultMessage: 'Idle',
                  description: 'Workspace test idle label',
                  id: '6NG4Ep',
                })}
              </>
            );
          case 'initializing':
            return (
              <>
                <Spinner size="xs" />
                {intl.formatMessage({
                  defaultMessage: 'Initializing',
                  description: 'Workspace test initializing label',
                  id: 'WM9+ww',
                })}
              </>
            );
          case 'running':
            return (
              <>
                <Spinner size="xs" />
                {intl.formatMessage({
                  defaultMessage: 'Running tests',
                  description: 'Workspace test running label',
                  id: 'rAQNYk',
                })}
              </>
            );
        }
      })()}
    </Text>
  );
}
