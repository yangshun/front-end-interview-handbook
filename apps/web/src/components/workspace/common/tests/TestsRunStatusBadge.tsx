import {
  RiCheckLine,
  RiCloseLine,
  RiCrossLine,
  RiHourglassLine,
} from 'react-icons/ri';

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
                <RiCheckLine aria-hidden="true" className="h-4 w-4 shrink-0" />
                Run completed
              </>
            );
          case 'error':
            return (
              <>
                <RiCloseLine aria-hidden="true" className="h-4 w-4 shrink-0" />
                Error
              </>
            );
          case 'idle':
            return (
              <>
                <RiHourglassLine
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
                Idle
              </>
            );
          case 'initializing':
            return (
              <>
                <Spinner size="xs" />
                Initializing
              </>
            );
          case 'running':
            return (
              <>
                <Spinner size="xs" /> Running tests
              </>
            );
        }
      })()}
    </Text>
  );
}
