import { RiRocketLine } from 'react-icons/ri';

import LogoLink from '~/components/global/Logo';
import DropdownMenu from '~/components/ui/DropdownMenu';

export default function ProjectsSidebarHeaderLogoBar() {
  return (
    <div className="flex items-center gap-2 justify-between">
      <LogoLink height={14} />
      <DropdownMenu
        icon={RiRocketLine}
        label="Projects"
        size="xs"
        variant="bordered">
        Placeholder
      </DropdownMenu>
    </div>
  );
}
