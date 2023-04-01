import clsx from 'clsx';
import { Console } from 'console-feed';
import type { Variants } from 'console-feed/lib/definitions/Component';
import type { Methods } from 'console-feed/lib/definitions/Methods';
import { range } from 'lodash';
import type { UIEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocalStorage } from 'usehooks-ts';

import Button from '~/components/ui/Button';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';

import useConsoleStyles from './useConsoleStyles';

import type { SandpackConsoleData } from '@codesandbox/sandpack-react/dist/types/components/Console/utils/getType';
import {
  ArrowSmallDownIcon,
  CommandLineIcon,
  MoonIcon as OutlineMoonIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
import { MoonIcon as SolidMoonIcon } from '@heroicons/react/24/solid';

type Props = Readonly<{
  logs: SandpackConsoleData;
  onClear: () => void;
  showExplicitInvocationMessage?: boolean;
}>;

type LogLevelFilter = Methods | 'all';

const DEFAULT_CONSOLE_THEME = 'dark';
const DEFAULT_CONSOLE_FONT_SIZE = '12px';

export default function JavaScriptConsole({
  logs,
  onClear,
  showExplicitInvocationMessage = false,
}: Props) {
  const intl = useIntl();
  const consoleRef = useRef<HTMLDivElement>(null);

  const [consoleTheme, setConsoleTheme] = useLocalStorage<Variants>(
    'gfe:console:theme',
    DEFAULT_CONSOLE_THEME,
  );
  const toggleConsoleTheme = () => {
    setConsoleTheme(consoleTheme === 'dark' ? 'light' : 'dark');
  };

  const [consoleFontSize, setConsoleFontSize] = useLocalStorage<string>(
    'gfe:console:font-size',
    DEFAULT_CONSOLE_FONT_SIZE,
  );

  const consoleStyles = useConsoleStyles(consoleTheme, consoleFontSize);

  const [logLevelFilter, setLogLevelFilter] = useState<LogLevelFilter>('all');
  const getLogLevelFilter = (val: LogLevelFilter) => {
    if (val === 'all') {
      return [];
    }

    return [val];
  };

  const [isScrollPositionAtBottom, setIsScrollPositionAtBottom] =
    useState(true);
  const handleScroll = (e: UIEvent<HTMLElement>) => {
    const roundingErrorThreshold = 1;

    setIsScrollPositionAtBottom(
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + e.currentTarget.clientHeight) <
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

  if (logs == null || logs.length === 0) {
    return (
      <div className="flex h-full grow items-center justify-center py-4 px-4 sm:px-6 lg:px-4">
        <div className="grid gap-y-2">
          <div className="flex justify-center">
            <CommandLineIcon className="h-12 w-12 shrink-0 text-slate-300" />
          </div>
          <Text
            className="text-center"
            color="secondary"
            display="block"
            variant="body2">
            <FormattedMessage
              defaultMessage="<code>console.log()</code> statements will appear here."
              description="Text in coding workspace's console to let users know that they can expect console logs to be found there"
              id="XygrPg"
              values={{
                code: (chunks) => <code>{chunks}</code>,
              }}
            />
          </Text>
          <Text
            className="text-center"
            color="secondary"
            display="block"
            variant="body2">
            {showExplicitInvocationMessage && (
              <FormattedMessage
                defaultMessage="To test your function without submitting, call the function below the declaration."
                description="Text in coding workspace's console to inform users they have to call the function themselves to test"
                id="1mtNyQ"
              />
            )}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-x-auto">
      <div className="flex flex-row justify-between gap-x-2 p-2">
        <div className="flex gap-x-2">
          <Button
            icon={NoSymbolIcon}
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Clear Console',
              description:
                'Button label to clear the console in the coding workspace',
              id: 'o+1cag',
            })}
            size="sm"
            tooltip={intl.formatMessage({
              defaultMessage: 'Clear Console',
              description:
                'Button tooltip to clear the console in the coding workspace',
              id: '5RlLAP',
            })}
            tooltipPosition="end"
            variant="tertiary"
            onClick={() => {
              onClear();
            }}
          />
          <Select
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Filter by log level',
              description: 'Select label to filter console log by level',
              id: 'UQh7Xv',
            })}
            options={[
              {
                label: intl.formatMessage({
                  defaultMessage: 'All log levels',
                  description:
                    'Select label for all log levels in console filter',
                  id: 'xjHSyF',
                }),
                value: 'all',
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Info',
                  description:
                    'Select label for info log level in console filter',
                  id: '4cjRbk',
                }),
                value: 'info',
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Warnings',
                  description:
                    'Select label for warning log level in console filter',
                  id: 'nxJioH',
                }),
                value: 'warn',
              },
              {
                label: intl.formatMessage({
                  defaultMessage: 'Errors',
                  description:
                    'Select label for error log level in console filter',
                  id: 'kCkca8',
                }),
                value: 'error',
              },
            ]}
            size="sm"
            value={logLevelFilter}
            onChange={(v) => setLogLevelFilter(v as LogLevelFilter)}
          />
          <Select
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Choose console font size',
              description: 'Select label to choose console font size',
              id: 'x1nxve',
            })}
            options={range(10, 17).map((v) => ({
              label: `${v}px`,
              value: `${v}px`,
            }))}
            size="sm"
            value={consoleFontSize}
            onChange={(v) => setConsoleFontSize(v)}
          />
        </div>
        <div className="flex gap-x-2">
          {!isScrollPositionAtBottom && (
            <Button
              icon={ArrowSmallDownIcon}
              isLabelHidden={true}
              label={intl.formatMessage({
                defaultMessage: 'Scroll to Bottom',
                description:
                  'Button label to scroll to bottom of the console logs',
                id: 'hOEGb+',
              })}
              size="sm"
              tooltip={intl.formatMessage({
                defaultMessage: 'Scroll to Bottom',
                description:
                  'Button tooltip to scroll to bottom of the console logs',
                id: 'L7Fz5f',
              })}
              tooltipPosition="start"
              variant="tertiary"
              onClick={() => {
                scrollToBottom();
              }}
            />
          )}
          <Button
            icon={consoleTheme === 'light' ? OutlineMoonIcon : SolidMoonIcon}
            isLabelHidden={true}
            label={
              consoleTheme === 'light'
                ? intl.formatMessage({
                    defaultMessage: 'Use dark console theme',
                    description: 'Button label to use dark console theme',
                    id: 'VYrdoZ',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Use light console theme',
                    description: 'Button label to use light console theme',
                    id: 'A592IF',
                  })
            }
            size="sm"
            tooltip={
              consoleTheme === 'light'
                ? intl.formatMessage({
                    defaultMessage: 'Use dark console theme',
                    description: 'Button tooltip to use dark console theme',
                    id: 'ONV44/',
                  })
                : intl.formatMessage({
                    defaultMessage: 'Use light console theme',
                    description: 'Button tooltip to use light console theme',
                    id: 'Kdmu8e',
                  })
            }
            tooltipAlignment="center"
            tooltipPosition="start"
            variant="tertiary"
            onClick={toggleConsoleTheme}
          />
        </div>
      </div>
      <div
        ref={consoleRef}
        className={clsx(
          'overflow-y-auto',
          consoleTheme === 'light' ? 'bg-white' : 'bg-slate-900',
        )}
        onScroll={handleScroll}>
        <Console
          filter={getLogLevelFilter(logLevelFilter)}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          /* @ts-ignore */
          logs={logs}
          styles={consoleStyles}
          variant={consoleTheme}
        />
      </div>
    </div>
  );
}
