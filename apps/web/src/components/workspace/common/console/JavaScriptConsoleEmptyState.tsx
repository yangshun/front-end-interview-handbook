import { RiTerminalBoxLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import EmptyState from '~/components/ui/EmptyState';

type Props = Readonly<{
  verticalPadding?: boolean;
}>;

export default function JavaScriptConsoleEmptyState({
  verticalPadding,
}: Props) {
  return (
    <EmptyState
      icon={RiTerminalBoxLine}
      size="sm"
      subtitle={
        <FormattedMessage
          defaultMessage="<code>console.log()</code> statements will appear here."
          description="Text in coding workspace's console to let users know that they can expect console logs to be found there"
          id="XygrPg"
          values={{
            code: (chunks) => <code>{chunks}</code>,
          }}
        />
      }
      title={
        <FormattedMessage
          defaultMessage="JavaScript Console"
          description="Title of JavaScript console panel"
          id="TL822E"
        />
      }
      verticalPadding={verticalPadding}
    />
  );
}
