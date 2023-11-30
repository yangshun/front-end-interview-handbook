import clsx from 'clsx';
import { RiFlashlightLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

export default function ProjectsStarterTag() {
  return (
    <div className="flex items-center gap-1">
      <RiFlashlightLine className={clsx('h-4 w-4', themeTextSubtleColor)} />
      <Text color="success" size="body2">
        <FormattedMessage
          defaultMessage="Starter"
          description="Label for starter project"
          id="DZGIbR"
        />
      </Text>
    </div>
  );
}
