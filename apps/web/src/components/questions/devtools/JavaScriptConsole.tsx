import { Console } from 'console-feed';
import type { Variants } from 'console-feed/lib/definitions/Component';
import type { UIEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useLocalStorage } from 'usehooks-ts';

import Button from '~/components/ui/Button';
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

const DEFAULT_CONSOLE_THEME = 'dark';

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
  const consoleStyles = useConsoleStyles(consoleTheme);
  const toggleConsoleTheme = () => {
    setConsoleTheme(consoleTheme === 'dark' ? 'light' : 'dark');
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
            label={intl.formatMessage({
              defaultMessage: 'Clear Console',
              description:
                'Button label to clear the console in the coding workspace',
              id: 'o+1cag',
            })}
            size="sm"
            variant="tertiary"
            onClick={() => {
              onClear();
            }}
          />
          {!isScrollPositionAtBottom && (
            <Button
              icon={ArrowSmallDownIcon}
              label={intl.formatMessage({
                defaultMessage: 'Scroll to Bottom',
                description:
                  'Button label to scroll to bottom of the console logs',
                id: 'hOEGb+',
              })}
              size="sm"
              variant="tertiary"
              onClick={() => {
                scrollToBottom();
              }}
            />
          )}
        </div>
        <Button
          icon={consoleTheme === 'light' ? OutlineMoonIcon : SolidMoonIcon}
          isLabelHidden={true}
          label={intl.formatMessage({
            defaultMessage: 'Toggle Console Theme',
            description: 'Button label to toggle console theme',
            id: 'onDh1B',
          })}
          size="sm"
          tooltip={intl.formatMessage({
            defaultMessage: 'Toggle Console Theme',
            description: 'Button tooltip to toggle console theme',
            id: 'WYQiTC',
          })}
          tooltipAlignment="center"
          tooltipPosition="start"
          variant="tertiary"
          onClick={toggleConsoleTheme}
        />
      </div>
      <div
        ref={consoleRef}
        className={`overflow-y-auto ${
          consoleTheme === 'light' ? 'bg-white' : 'bg-slate-900'
        }`}
        onScroll={handleScroll}>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Console logs={logs} styles={consoleStyles} variant={consoleTheme} />
      </div>
    </div>
  );
}
