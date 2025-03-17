import useAdminSidebarLinks from './useAdminSidebarLinks';
import { SidebarCollapsed, SidebarExpanded } from '../global/sidebar/Sidebar';

type Props = Readonly<{
  isCollapsed: boolean;
  onCollapseClick: () => void;
}>;

export default function AdminSidebar({ isCollapsed, onCollapseClick }: Props) {
  const sidebarItems = useAdminSidebarLinks();

  return isCollapsed ? (
    <SidebarCollapsed
      moreMenuItems={null}
      product="interviews"
      showPremiumDiscord={false}
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  ) : (
    <SidebarExpanded
      isLoading={false}
      isViewerPremium={false}
      moreMenuItems={null}
      product="interviews"
      sidebarItems={sidebarItems}
      onCollapseClick={onCollapseClick}
    />
  );
}
