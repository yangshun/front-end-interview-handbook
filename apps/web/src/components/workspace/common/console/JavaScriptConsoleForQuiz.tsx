import clsx from 'clsx';
import { Console } from 'console-feed';
import type { Methods } from 'console-feed/lib/definitions/Methods';
import type { UIEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';

import { getConsoleStyles } from './JavaScriptConsoleStyles';

type LogMessage = Readonly<{
  data: Array<unknown>;
  id: string;
  method: Methods;
}>;

type Props = Readonly<{
  logs: Array<LogMessage>;
}>;

export default function JavaScriptConsoleForQuiz({ logs }: Props) {
  const intl = useIntl();
  const consoleRef = useRef<HTMLDivElement>(null);

  const { consoleTheme, consoleFontSize } = useCodingPreferences();

  const consoleStyles = getConsoleStyles(consoleTheme, consoleFontSize);

  const [isScrollPositionAtBottom, setIsScrollPositionAtBottom] =
    useState(true);
  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const roundingErrorThreshold = 1;

    setIsScrollPositionAtBottom(
      event.currentTarget.scrollHeight -
        (event.currentTarget.scrollTop + event.currentTarget.clientHeight) <
        roundingErrorThreshold,
    );
  };

  const scrollToBottom = () => {
    consoleRef.current?.scrollBy(0, consoleRef.current?.scrollHeight);
  };

  useEffect(() => {
    if (isScrollPositionAtBottom) {
      scrollToBottom();
    }
  }, [logs, isScrollPositionAtBottom]);

  const consoleComponent = (
    <div
      ref={consoleRef}
      className={clsx(
        'overflow-y-auto',
        consoleTheme === 'light' ? 'bg-white' : 'bg-neutral-900',
      )}
      onScroll={handleScroll}>
      <Console logs={logs} styles={consoleStyles} variant={consoleTheme} />
    </div>
  );

  return (
    <div className="size-full relative isolate flex flex-col overflow-x-auto">
      {!isScrollPositionAtBottom && (
        <div className="absolute bottom-2 right-2 z-10">
          <Button
            icon={RiArrowDownSLine}
            label={intl.formatMessage({
              defaultMessage: 'Scroll to Bottom',
              description:
                'Button label to scroll to bottom of the console logs',
              id: 'hOEGb+',
            })}
            size="xs"
            variant="secondary"
            onClick={scrollToBottom}
          />
        </div>
      )}
      {consoleComponent}
    </div>
  );
}
