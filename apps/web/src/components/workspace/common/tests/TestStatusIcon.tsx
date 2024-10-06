import {
  failTextClassName,
  passTextClassName,
  runningTextClassName,
  skipTextClassName,
} from './style';
import type { TestStatus } from './types';

export default function TestStatusIcon({
  status,
}: Readonly<{
  status: TestStatus;
}>) {
  return (
    <span className="size-3 flex shrink-0 items-center text-lg">
      {(() => {
        switch (status) {
          case 'pass':
            return <span className={passTextClassName}>✓</span>;
          case 'fail':
            return <span className={failTextClassName}>✕</span>;
          case 'running':
            return <span className={runningTextClassName}>ᐅ</span>;
          case 'idle':
            return <span className={skipTextClassName}>○</span>;
        }
      })()}
    </span>
  );
}
