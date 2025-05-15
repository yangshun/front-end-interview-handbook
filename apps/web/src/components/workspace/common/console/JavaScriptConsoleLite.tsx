import clsx from 'clsx';
import { Console } from 'console-feed';
import type { ComponentProps } from 'react';

import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';
import { useColorSchemePreferences } from '~/components/global/color-scheme/ColorSchemePreferencesProvider';

import JavaScriptConsoleEmptyState from './JavaScriptConsoleEmptyState';
import { getConsoleStyles } from './JavaScriptConsoleStyles';

type Props = Readonly<{
  logs: ComponentProps<typeof Console>['logs'];
}>;

export default function JavaScriptConsoleLite({ logs }: Props) {
  const { consoleFontSize } = useCodingPreferences();
  const { colorScheme } = useColorSchemePreferences();
  const consoleStyles = getConsoleStyles(colorScheme, consoleFontSize);
  const hasLogs = logs.length > 0;

  return (
    <div
      className={clsx(
        'relative isolate size-full',
        'flex flex-col',
        'overflow-x-auto',
        !hasLogs && 'justify-center',
      )}>
      {hasLogs ? (
        <div
          className={clsx(
            'console not-prose',
            'overflow-y-auto',
            colorScheme === 'light' ? 'bg-white' : 'bg-neutral-900',
          )}>
          <Console logs={logs} styles={consoleStyles} variant={colorScheme} />
        </div>
      ) : (
        <JavaScriptConsoleEmptyState verticalPadding={false} />
      )}
    </div>
  );
}
