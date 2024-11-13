import clsx from 'clsx';
import {
  RiCheckLine,
  RiCircleLine,
  RiCloseLine,
  RiPlayLine,
} from 'react-icons/ri';

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
  const commonClass = 'size-4 shrink-0';

  return (() => {
    switch (status) {
      case 'pass':
        return <RiCheckLine className={clsx(commonClass, passTextClassName)} />;
      case 'fail':
        return <RiCloseLine className={clsx(commonClass, failTextClassName)} />;
      case 'running':
        return (
          <RiPlayLine className={clsx(commonClass, runningTextClassName)} />
        );
      case 'idle':
        return (
          <RiCircleLine className={clsx(commonClass, skipTextClassName)} />
        );
    }
  })();
}
