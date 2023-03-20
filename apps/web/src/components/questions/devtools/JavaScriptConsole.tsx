import { Console } from 'console-feed';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import type { SandpackConsoleData } from '@codesandbox/sandpack-react/dist/types/components/Console/utils/getType';
import { CommandLineIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

type Props = Readonly<{
  logs: SandpackConsoleData;
  onClear: () => void;
}>;

export default function JavaScriptConsole({ logs, onClear }: Props) {
  const intl = useIntl();

  if (logs == null || logs.length === 0) {
    return (
      <div className="flex h-full grow items-center justify-center py-4 px-4 sm:px-6 lg:px-4">
        <div className="flex flex-col items-center space-y-2 text-center">
          <CommandLineIcon className="h-12 w-12 shrink-0 text-slate-300" />
          <Text color="secondary" display="block" variant="body2">
            <FormattedMessage
              defaultMessage="Any <code>console.log()</code> statements will appear here."
              description="Text in coding workspace's console to let users know that they can expect console logs to be found there"
              id="hOD4kM"
              values={{
                code: (chunks) => <code>{chunks}</code>,
              }}
            />
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-x-auto">
      <div className="flex p-2">
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
              'Tooltip for button to clear the console in the coding workspace',
            id: 'ejq1dY',
          })}
          tooltipPosition="end"
          variant="tertiary"
          onClick={() => {
            onClear();
          }}
        />
      </div>
      <div className="overflow-y-auto bg-slate-700">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <Console logs={logs} variant="dark" />
      </div>
    </div>
  );
}
