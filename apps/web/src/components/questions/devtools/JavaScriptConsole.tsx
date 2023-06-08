import clsx from 'clsx';
import { Console } from 'console-feed';
import type { Variants } from 'console-feed/lib/definitions/Component';
import type { Methods } from 'console-feed/lib/definitions/Methods';
import { range } from 'lodash';
import type { UIEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Dialog from '~/components/ui/Dialog';
import Select from '~/components/ui/Select';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import useConsoleStyles from './useConsoleStyles';

import type { SandpackConsoleData } from '@codesandbox/sandpack-react/dist/components/Console/utils/getType';
import {
  ArrowSmallDownIcon,
  Cog6ToothIcon,
  CommandLineIcon,
  NoSymbolIcon,
} from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

type Props = Readonly<{
  logs: SandpackConsoleData;
  onClear: () => void;
  onShouldPreserveLogsChange: (value: boolean) => void;
  shouldPreserveLogs: boolean;
  showExplicitInvocationMessage?: boolean;
}>;

type LogLevelFilter = Methods | 'all';

function NoLogs({
  showExplicitInvocationMessage,
}: Readonly<{
  showExplicitInvocationMessage?: boolean;
}>) {
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

export default function JavaScriptConsole({
  logs,
  onClear,
  shouldPreserveLogs,
  onShouldPreserveLogsChange,
  showExplicitInvocationMessage = false,
}: Props) {
  const intl = useIntl();
  const consoleRef = useRef<HTMLDivElement>(null);

  const { consoleTheme, setConsoleTheme, consoleFontSize, setConsoleFontSize } =
    useCodingPreferences();

  const [query, setQuery] = useState('');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);

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

  const toolbar = (
    <div className="flex flex-col border-b">
      <div className="flex flex-row items-center gap-x-2 p-2">
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
          variant="secondary"
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
            size="sm"
            startIcon={MagnifyingGlassIcon}
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
          size="sm"
          value={logLevelFilter}
          onChange={(v) => setLogLevelFilter(v as LogLevelFilter)}
        />
        <Button
          icon={Cog6ToothIcon}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'More settings',
            description:
              'Button label to show more settings for the console in the coding workspace',
            id: 'nSDLrS',
          })}
          size="sm"
          tooltip={intl.formatMessage({
            defaultMessage: 'More settings',
            description:
              'Button label to show more settings for the console in the coding workspace',
            id: 'nSDLrS',
          })}
          tooltipPosition="start"
          variant="secondary"
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
        <div className="flex flex-col gap-y-4 divide-y">
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

  const consoleComponent = (
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
        searchKeywords={query}
        styles={consoleStyles}
        variant={consoleTheme}
      />
    </div>
  );

  const hasLogs = logs.length > 0;

  return (
    <div className="relative flex h-full flex-col overflow-x-auto">
      {!isScrollPositionAtBottom && (
        <div className="absolute bottom-2 right-2 z-10">
          <Button
            icon={ArrowSmallDownIcon}
            label={intl.formatMessage({
              defaultMessage: 'Scroll to Bottom',
              description:
                'Button label to scroll to bottom of the console logs',
              id: 'hOEGb+',
            })}
            size="sm"
            variant="secondary"
            onClick={scrollToBottom}
          />
        </div>
      )}
      {toolbar}
      {hasLogs ? (
        consoleComponent
      ) : (
        <NoLogs showExplicitInvocationMessage={showExplicitInvocationMessage} />
      )}
    </div>
  );
}
