import type { useSandpackConsole } from '@codesandbox/sandpack-react';
import clsx from 'clsx';
import { Console } from 'console-feed';
import type { Variants } from 'console-feed/lib/definitions/Component';
import type { Methods } from 'console-feed/lib/definitions/Methods';
import { range } from 'lodash-es';
import type { UIEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import {
  RiArrowDownSLine,
  RiDeleteBinLine,
  RiSearchLine,
  RiSettings3Line,
} from 'react-icons/ri';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import { useIntl } from '~/components/intl';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Dialog from '~/components/ui/Dialog';
import Select from '~/components/ui/Select';
import TextInput from '~/components/ui/TextInput';
import { themeBorderColor, themeDivideColor } from '~/components/ui/theme';

import JavaScriptConsoleEmptyState from './JavaScriptConsoleEmptyState';
import { getConsoleStyles } from './JavaScriptConsoleStyles';

type Props = Readonly<{
  logs: ReturnType<typeof useSandpackConsole>['logs'];
  onClear: () => void;
  onShouldPreserveLogsChange: (value: boolean) => void;
  shouldPreserveLogs: boolean;
}>;

type LogLevelFilter = Methods | 'all';

export default function JavaScriptConsole({
  logs,
  onClear,
  onShouldPreserveLogsChange,
  shouldPreserveLogs,
}: Props) {
  const intl = useIntl();
  const consoleRef = useRef<HTMLDivElement>(null);

  const { consoleFontSize, consoleTheme, setConsoleFontSize, setConsoleTheme } =
    useCodingPreferences();

  const [query, setQuery] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

  const consoleStyles = getConsoleStyles(consoleTheme, consoleFontSize);

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

  const toolbar = (
    <div className={clsx('flex flex-col border-b', themeBorderColor)}>
      <div className="flex flex-row items-center gap-x-2 px-2 py-1">
        <Button
          icon={RiDeleteBinLine}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Clear Console',
            description:
              'Button label to clear the console in the coding workspace',
            id: 'o+1cag',
          })}
          size="xs"
          tooltip={intl.formatMessage({
            defaultMessage: 'Clear Console',
            description:
              'Button tooltip to clear the console in the coding workspace',
            id: '5RlLAP',
          })}
          tooltipSide="right"
          variant="tertiary"
          onClick={() => {
            onClear();
          }}
        />
        <div className="flex-1">
          <TextInput
            autoComplete="off"
            isLabelHidden={true}
            label={intl.formatMessage({
              defaultMessage: 'Filter logs',
              description: 'Placeholder for filter input of console logs',
              id: '7solt2',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'Filter logs',
              description: 'Placeholder for filter input of console logs',
              id: '7solt2',
            })}
            size="xs"
            startIcon={RiSearchLine}
            value={query}
            onChange={(value) => setQuery(value)}
          />
        </div>
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
          size="xs"
          value={logLevelFilter}
          onChange={(v) => setLogLevelFilter(v as LogLevelFilter)}
        />
        <Button
          icon={RiSettings3Line}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'More settings',
            description:
              'Button label to show more settings for the console in the coding workspace',
            id: 'nSDLrS',
          })}
          size="xs"
          tooltip={intl.formatMessage({
            defaultMessage: 'More settings',
            description:
              'Button label to show more settings for the console in the coding workspace',
            id: 'nSDLrS',
          })}
          tooltipSide="left"
          variant="tertiary"
          onClick={() => {
            setShowAdvancedOptions(!showAdvancedOptions);
          }}
        />
      </div>
      <Dialog
        isShown={showAdvancedOptions}
        title={intl.formatMessage({
          defaultMessage: 'Console settings',
          description: 'Title for console settings dialog',
          id: 'Mgs3RU',
        })}
        onClose={() => {
          setShowAdvancedOptions(false);
        }}>
        <div
          className={clsx('flex flex-col gap-y-4 divide-y', themeDivideColor)}>
          <div className="flex gap-x-2">
            <Select
              label={intl.formatMessage({
                defaultMessage: 'Theme',
                description:
                  'Select label to choose console theme in console settings',
                id: 'lMXh4f',
              })}
              options={[
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Light',
                    description:
                      'Select label for light console theme in console settings',
                    id: 'HaIAzk',
                  }),
                  value: 'light',
                },
                {
                  label: intl.formatMessage({
                    defaultMessage: 'Dark',
                    description:
                      'Select label for dark console theme in console settings',
                    id: 'WBKQzA',
                  }),
                  value: 'dark',
                },
              ]}
              size="sm"
              value={consoleTheme}
              onChange={(v) => setConsoleTheme(v as Variants)}
            />
            <Select
              label={intl.formatMessage({
                defaultMessage: 'Font size',
                description: 'Select label to choose console font size',
                id: 'aeeTOy',
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
          <div className="pt-4">
            <CheckboxInput
              label={intl.formatMessage({
                defaultMessage: 'Preserve logs',
                description:
                  'Checkbox label to preserve logs in the console in the coding workspace',
                id: '54g6sz',
              })}
              value={shouldPreserveLogs}
              onChange={onShouldPreserveLogsChange}
            />
          </div>
        </div>
      </Dialog>
    </div>
  );

  const hasLogs = logs.length > 0;

  return (
    <div className="relative isolate flex size-full flex-col overflow-x-auto">
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
      {toolbar}
      {hasLogs ? (
        <div
          ref={consoleRef}
          className={clsx(
            'console',
            'overflow-y-auto',
            consoleTheme === 'light' ? 'bg-white' : 'bg-neutral-900',
          )}
          onScroll={handleScroll}>
          <Console
            filter={getLogLevelFilter(logLevelFilter)}
            /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
            /* @ts-ignore */
            logs={logs}
            /* Escapes special regex characters `- / \ ^ $ * + ? . ( ) | [ ] { }` in the query string to
        treat them as literals, preventing unintended regex behavior when using the query in a regular expression. */
            searchKeywords={query.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}
            styles={consoleStyles}
            variant={consoleTheme}
          />
        </div>
      ) : (
        <div className={clsx('h-full overflow-y-auto')}>
          <div
            className={clsx(
              'h-full min-h-fit',
              'px-4 py-4 sm:px-6 lg:px-4',
              'flex items-center justify-center',
            )}>
            <JavaScriptConsoleEmptyState />
          </div>
        </div>
      )}
    </div>
  );
}
