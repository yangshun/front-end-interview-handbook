import clsx from 'clsx';

import CountdownTimerPage from '~/components/countdown/CountdownTimerPage';

export default function Page() {
  return (
    <div
      className={clsx(
        'flex grow justify-center md:items-center',
        'pt-20 md:pt-0',
      )}>
      <CountdownTimerPage />
    </div>
  );
}
