import clsx from 'clsx';
import { FaCheck } from 'react-icons/fa6';
import { RiCircleLine, RiCloseLine, RiPlayLine } from 'react-icons/ri';

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
        return <FaCheck className={clsx(commonClass, passTextClassName)} />;
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
