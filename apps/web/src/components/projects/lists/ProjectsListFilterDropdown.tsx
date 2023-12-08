import type { ComponentPropsWithRef } from 'react';

import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Omit<ComponentPropsWithRef<typeof DropdownMenu>, 'children'> & {
  tooltip: string;
};

export default function ProjectsListFilterDropdown({
  tooltip,
  ...props
}: Props) {
  return (
    <Tooltip label={tooltip}>
      <DropdownMenu {...props}>
        <div>
          <Text color="secondary">Filter placeholder</Text>
        </div>
      </DropdownMenu>
    </Tooltip>
  );
}
