import type { ComponentPropsWithRef } from 'react';

import DropdownMenu from '~/components/ui/DropdownMenu';
import Text from '~/components/ui/Text';

type Props = Omit<ComponentPropsWithRef<typeof DropdownMenu>, 'children'>;

export default function ProjectsListFilterDropdown({ ...props }: Props) {
  return (
    <DropdownMenu {...props}>
      <div>
        <Text color="secondary">Filter placeholder</Text>
      </div>
    </DropdownMenu>
  );
}
